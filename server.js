const serveHandler = require("serve-handler");
const { matchesUA } = require("browserslist-useragent");
const caniuse = require("caniuse-api");
const accepts = require("accepts");
const { send } = require("micro");

const support = caniuse.getSupport("es6-module-dynamic-import");
const browsers = Object.keys(support).reduce(
  (browsers, browser) =>
    support[browser].y
      ? [...browsers, `${browser} >= ${support[browser].y}`]
      : browsers,
  []
);

const cacheBust = Date.now();

const htmlHandler = (req, res) => {
  const supportsDynamicImport = matchesUA(req.headers["user-agent"], {
    browsers,
    allowHigherVersions: true
  });
  const script = supportsDynamicImport
    ? '<script async type="module" src="/esm/client.js"></script>'
    : '<script src="https://unpkg.com/systemjs/dist/system-production.js"></script><script>SystemJS.import("/es5/client.js");</script>';
  return `<!doctype html>
<html>
<head>
  <meta charset=utf-8>
  <meta content="width=device-width" name=viewport>
  <link rel="stylesheet" href="/client.css?${cacheBust}" type="text/css"/>
</head>
<body>
  <div id="root"></div>
  ${script}
</body>
</html>
  `;
};

module.exports = async (req, res) => {
  const url = req.url.split("?")[0];

  if (url.startsWith("/assets/")) {
    return serveHandler(req, res, {
      public: "assets",
      directoryListing: false,
      rewrites: [{ source: "/assets/:id", destination: "/:id" }]
    });
  }

  if (url.endsWith(".js") || url.endsWith(".css")) {
    return serveHandler(req, res, {
      public: "public",
      directoryListing: false
    });
  }

  switch (accepts(req).type(["json", "html"])) {
    case "json":
      return { "@TODO": "implement API" };
    case "html":
      return htmlHandler(req, res);
    default:
      send(res, 404);
  }
};
