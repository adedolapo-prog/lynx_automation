const {
  fetchSingleProductService,
  fetchMostViewedProductService,
} = require("../services/productService.js");

const fetchSingleProductController = async (req, res) => {
  const id = req.params.id;
  const { currency = "CAD" } = req.query;

  try {
    const product = await fetchSingleProductService({ id, currency });

    res.status(product.code).json(product);
  } catch (error) {
    console.log("err", error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

const fetchMostViewedProductController = async (req, res) => {
  const { currency = "USD", numberOfProducts = 5 } = req.query;

  try {
    const mostViewedProducts = await fetchMostViewedProductService(
      Number(numberOfProducts),
      currency
    );

    res.status(mostViewedProducts.code).json(mostViewedProducts);
  } catch (error) {
    console.log("err", error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  fetchSingleProductController,
  fetchMostViewedProductController,
};
