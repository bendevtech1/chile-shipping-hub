const express = require('express');
const cors = require('cors');

// Importamos el servicio de logística separado
const { 
  getStarkenQuote, 
  getChilexpressQuote, 
  getBlueExpressQuote 
} = require('./services/shipping.service');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint de prueba rápida
app.get('/', (req, res) => {
  res.send('Backend del Cotizador Logístico funcionando ');
});

// Endpoint principal para cotizar envíos en paralelo
app.post('/api/v1/quote', async (req, res) => {
  try {
    const { origin, destination, weight } = req.body;
    const parsedWeight = parseFloat(weight) || 1;

    // Llamadas concurrentes usando el servicio externo
    const results = await Promise.all([
      getStarkenQuote(origin, destination, parsedWeight),
      getChilexpressQuote(origin, destination, parsedWeight),
      getBlueExpressQuote(origin, destination, parsedWeight)
    ]);

    // Ordenar de menor a mayor precio
    results.sort((a, b) => a.price - b.price);

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`);
});