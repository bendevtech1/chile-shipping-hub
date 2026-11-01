// server/services/shipping.service.js

async function getStarkenQuote(origin, destination, weight) {
  return {
    provider: 'Starken',
    serviceType: 'Courrier Normal',
    price: Math.floor(3500 + weight * 1200),
    deliveryDays: '2 a 3 días hábiles',
    logo: ''
  };
}

async function getChilexpressQuote(origin, destination, weight) {
  return {
    provider: 'Chilexpress',
    serviceType: 'Día Hábil Siguiente',
    price: Math.floor(4800 + weight * 1500),
    deliveryDays: '1 día hábil',
    logo: ''
  };
}

async function getBlueExpressQuote(origin, destination, weight) {
  return {
    provider: 'Blue Express',
    serviceType: 'Standard E-commerce',
    price: Math.floor(3000 + weight * 1000),
    deliveryDays: '3 a 5 días hábiles',
    logo: ''
  };
}

module.exports = {
  getStarkenQuote,
  getChilexpressQuote,
  getBlueExpressQuote
};