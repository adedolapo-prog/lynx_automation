const {
  fetchSingleProductRepo,
  incrementProductViewedRepo,
  fetchProducts,
} = require("../repository/productRepo");
const { convertCurrency } = require("../utils/api/currencyConverterApi");

const fetchSingleProductService = async ({ id, currency }) => {
  const product = await fetchSingleProductRepo(id);

  if (!product) return { code: 400, msg: "Product not found" };

  // update the product count here
  const increaseProductViewCount = await incrementProductCount({
    id,
    increment: 1,
  });

  if (increaseProductViewCount.code !== 200) return increaseProductViewCount;

  if (currency.toLowerCase() === "cad") {
    const convertedAmount = await convertCurrency({
      currencyToBeConverted: "CAD",
      initialCurrency: "USD",
      amount: product.price,
    });

    product.price = convertedAmount.result;
  }

  return { code: 200, msg: "Successfully fetched product", data: product };
};

const incrementProductCount = async ({ id, increment }) => {
  const [updateProductCount] = await incrementProductViewedRepo({
    id,
    increment,
  });

  if (!updateProductCount[1])
    return { code: 500, msg: "Unable to increment product viewed count" };

  return { code: 200, msg: "Successfully updated count" };
};

const fetchMostViewedProductService = async (numberOfProducts, currency) => {
  let products = await fetchProducts(numberOfProducts);

  if (!products.length) return { code: 404, msg: "No products found" };

  // convert currency here
  if (currency.toLowerCase() === "cad") {
    const convertedAmount = await convertCurrency({
      currencyToBeConverted: "CAD",
      initialCurrency: "USD",
      amount: 1,
    });

    products = products.map(function (t) {
      return {
        ...t,
        price: t.price * convertedAmount.result,
      };
    });
  }

  return { code: 200, msg: "Successfully fetched products", data: products };
};

module.exports = { fetchSingleProductService, fetchMostViewedProductService };
