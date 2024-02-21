const { Sequelize, Product } = require("../models/index.js");
const { Op } = require("sequelize");

const fetchSingleProductRepo = async (id) => {
  const product = await Product.findOne({
    raw: true,
    where: {
      id,
    },
  });

  return product;
};

const incrementProductViewedRepo = async ({ id, increment }) => {
  const updateProduct = await Product.increment(
    { productViewed: increment },
    { where: { id } }
  );

  return updateProduct;
};

const fetchProducts = async (limit) => {
  const products = await Product.findAll({
    raw: true,
    where: {
      productViewed: {
        [Op.gt]: 0,
      },
    },
    attributes: [
      "id",
      "name",
      "price",
      "description",
      "isDeleted",
      "productViewed",
      "createdDate",
      "updatedDate",
      "deletedDate",
      [
        Sequelize.literal("(RANK() OVER (ORDER BY productViewed DESC))"),
        "rank",
      ],
    ],
    limit,
  });

  return products;
};

module.exports = {
  fetchSingleProductRepo,
  incrementProductViewedRepo,
  fetchProducts,
};
