const serveHandler = require("serve-handler");
const { matchesUA } = require("browserslist-useragent");
const caniuse = require("caniuse-api");
const accepts = require("accepts");

const support = caniuse.getSupport("es6-module-dynamic-import");
const browsers = Object.keys(support).reduce(
  (browsers, browser) =>
    support[browser].y
      ? [...browsers, `${browser} >= ${support[browser].y}`]
      : browsers,
  []
);

const htmlHandler = (req, res) => {
  const supportsDynamicImport = matchesUA(req.headers["user-agent"], {
    browsers,
    allowHigherVersions: true
  });
  console.log(
    "supports",
    browsers,
    req.headers["user-agent"],
    supportsDynamicImport,
    browsers
  );
  const script = supportsDynamicImport
    ? '<script async type="module" src="/esm/client.js"></script>'
    : '<script src="https://unpkg.com/systemjs/dist/system-production.js"></script><script>SystemJS.import("/es5/client.js");</script>';
  return `<!doctype html>
<html>
<head>
  <meta charset=utf-8>
  <meta content="width=device-width" name=viewport>
  <link rel="SHORTCUT ICON" href="/favicon.ico?v2" type="image/x-icon"/>
</head>
<body>
  <div id="root"></div>
  ${script}
</body>
</html>
  `;
};
const { send } = require("micro");

module.exports = async (req, res) => {
  switch (accepts(req).type(["js", "css", "json", "html"])) {
    case "js":
    case "css":
      return serveHandler(req, res, {
        public: "public",
        directoryListing: false
      });
    case "json":
      return { "@TODO": "implement API" };
    case "html":
      return htmlHandler(req, res);
    default:
      send(res, 404);
  }
};
