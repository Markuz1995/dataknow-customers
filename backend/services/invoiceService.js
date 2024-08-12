/**
 * Calcula el valor del IVA (19%) basado en el precio proporcionado.
 * 
 * @function calculateVAT
 * @param {number} price - El precio sobre el cual se calculará el IVA.
 * @returns {number} El valor del IVA calculado.
 */
const calculateVAT = (price) => price * 0.19;

/**
 * Calcula el valor total de una factura, incluyendo el precio, el descuento y el IVA.
 * 
 * @function calculateTotalValue
 * @param {number} price - El precio base del producto o servicio.
 * @param {number} discountValue - El valor del descuento como un porcentaje (por ejemplo, 10 para un 10% de descuento).
 * @param {number} vat - El valor del IVA calculado a partir del precio.
 * @returns {number} El valor total de la factura después de aplicar el descuento y sumar el IVA.
 */
const calculateTotalValue = (price, discountValue, vat) => {
  const discount = (price * discountValue) / 100;
  return price - discount + vat;
};

module.exports = {
  calculateVAT,
  calculateTotalValue
};
