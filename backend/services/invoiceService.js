const calculateVAT = (price) => price * 0.19;

const calculateTotalValue = (price, discountValue, vat) => {
  const discount = (price * discountValue) / 100;
  return price - discount + vat;
};

module.exports = {
  calculateVAT,
  calculateTotalValue
};
