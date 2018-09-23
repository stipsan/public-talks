const serveHandler = require("serve-handler");
const { matchesUA } = require("browserslist-useragent");
const caniuse = require("caniuse-api");
const accepts = require("accepts");
const { send } = require("micro");
const pathToRegexp = require("path-to-regexp");

const support = caniuse.getSupport("es6-module-dynamic-import");
const browsers = Object.keys(support).reduce(
  (browsers, browser) =>
    support[browser].y
      ? [...browsers, `${browser} >= ${support[browser].y}`]
      : browsers,
  []
);

const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
const cacheBust = Date.now();

const htmlHandler = req => {
  const supportsDynamicImport = matchesUA(req.headers["user-agent"], {
    browsers,
    allowHigherVersions: true
  });
  const script = supportsDynamicImport
    ? `<script async type="module" src="/esm/client.js?${cacheBust}"></script>`
    : `<script src="https://unpkg.com/systemjs/dist/system-production.js"></script><script>SystemJS.import("/es5/client.js?${cacheBust}");</script>`;
  return `<!doctype html>
<html>
<head>
  <meta charset=utf-8>
  <meta content="width=device-width" name=viewport>
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
  <link rel="stylesheet" href="/client.css?${cacheBust}" type="text/css"/>
</head>
<body>
  <div id="root"></div>
  ${script}
</body>
</html>
  `;
};

const data = require("./data.json");
const productDetailsRoute = pathToRegexp("/api/products/:slug");
const jsonHandler = req => {
  if (req.url === "/api/products") {
    // Only send the essential data required to render the list
    return data.map(
      ({ slug, thumbnail, thumbnailHover, title, subtitle, placement }) => ({
        slug,
        thumbnail,
        thumbnailHover,
        title,
        subtitle,
        placement
      })
    );
  }

  const [, slug] = productDetailsRoute.exec(req.url);
  return data.find(product => product.slug === slug);
};

module.exports = async (req, res) => {
  const url = req.url.split("?")[0];

  if (url.startsWith("/assets/")) {
    // await sleep(Math.floor(Math.random() * 10000));

    return serveHandler(req, res, {
      public: "assets",
      directoryListing: false,
      rewrites: [{ source: "/assets/:id", destination: "/:id" }]
    });
  }

  if (url.startsWith("/api/")) {
    //await sleep(Math.floor(Math.random() * 10000));

    return jsonHandler(req, res);
  }

  if (url.endsWith(".js") || url.endsWith(".css") || url.endsWith(".map")) {
    //await sleep(3000)

    return serveHandler(req, res, {
      public: "public",
      directoryListing: false
    });
  }

  if (accepts(req).type("html") === "html") {
    return htmlHandler(req, res);
  }

  send(res, 404);
};
