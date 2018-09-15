// ReactDOMServer.renderToStream
const handler = require("serve-handler");

module.exports = async (req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    return res.end('<script type="module" src="/client.js" ></script>');
  }
  await handler(req, res, { public: "public" });
};
