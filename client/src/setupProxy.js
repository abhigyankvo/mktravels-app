const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/auth/*"],
    createProxyMiddleware({
      changeOrigin: true,
      target: "http://localhost:4000",
    })
  );
};
 