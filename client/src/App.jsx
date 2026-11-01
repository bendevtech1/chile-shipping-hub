import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShippingForm from './components/ShippingForm';
import './App.css';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleCalculateShipping = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/v1/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setError('Ocurrió un error al calcular las tarifas.');
      }
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar con el servidor backend. ¿Está encendido en el puerto 5000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <ShippingForm onSubmit={handleCalculateShipping} loading={loading} />

      {error && (
        <div style={{ color: '#ef4444', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {/* Resultados animados con Framer Motion */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="results-grid"
          >
            {results.map((item, index) => (
              <motion.div
                key={item.provider}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="result-card"
              >
                <div className="provider-logo">{item.logo}</div>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem' }}>{item.provider}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>
                  {item.serviceType}
                </p>
                <div className="price-tag">
                  ${item.price.toLocaleString('es-CL')} CLP
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.8rem', margin: '0' }}>
                  Entrega estimada: <strong>{item.deliveryDays}</strong>
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
