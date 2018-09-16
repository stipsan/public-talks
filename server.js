const handler = require("serve-handler");
const { matchesUA } = require("browserslist-useragent");
const caniuse = require("caniuse-api");

const support = caniuse.getSupport("es6-module-dynamic-import");
const browsers = Object.keys(support).reduce(
  (browsers, browser) =>
    support[browser].y
      ? [...browsers, `${browser} >= ${support[browser].y}`]
      : browsers,
  []
);

module.exports = async (req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    const supportsDynamicImport = matchesUA(req.headers["user-agent"], {
      browsers,
      allowHigherVersions: true
    });
    console.log(supportsDynamicImport, req.headers["user-agent"]);
    const script = supportsDynamicImport
      ? '<script type="module" src="/esm/client.js"></script>'
      : '<script src="https://unpkg.com/systemjs/dist/system-production.js"></script><script>SystemJS.import("/es5/client.js");</script>';
    return res.end(`<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <meta content="width=device-width" name=viewport>
    ${script}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
    `);
  }
  await handler(req, res, { public: "public" });
};
