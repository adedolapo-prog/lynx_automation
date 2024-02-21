const { productRoute } = require("./productRoute.js");

const routes = (app) => {
  app.use("/products", productRoute);
};

module.exports = { routes };
