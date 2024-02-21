const axios = require("axios");

const convertCurrency = async ({
  currencyToBeConverted,
  initialCurrency,
  amount,
}) => {
  const convertCurrencyCall = await axios.post(
    `http://api.currencylayer.com/convert?access_key=${process.env.CURRENCY_CONVERTER_KEY}&from=${initialCurrency}&to=${currencyToBeConverted}&amount=${amount}`
  );

  return convertCurrencyCall.data;
};

module.exports = { convertCurrency };
