// ReactDOMServer.renderToStream
const handler = require("serve-handler");

module.exports = async (req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    const supportsDynamicImport = false;
    const script = supportsDynamicImport
      ? '<script type="module" src="/client.mjs"></script>'
      : '<script src="https://unpkg.com/systemjs/dist/system-production.js"></script><script>SystemJS.import("/client.js");</script>';
    return res.end(`<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <meta content="width=device-width" name=viewport>
    ${script}
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
    `);
  }
  await handler(req, res, { public: "public" });
};
