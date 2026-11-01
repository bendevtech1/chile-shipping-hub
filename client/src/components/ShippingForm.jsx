import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Weight, ArrowRight } from 'lucide-react';

const REGIONES_CHILE = [
  'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
  'Valparaíso', 'Metropolitana', 'O\'Higgins', 'Maule', 'Ñuble',
  'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
];

export default function ShippingForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    origin: 'Metropolitana',
    destination: 'Coquimbo',
    weight: 1.5,
    length: 20,
    width: 15,
    height: 10
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="shipping-form-card"
    >
      <div className="form-header">
        <h2>Cotizador Logístico Multicanal</h2>
        <p>Calcula en paralelo las tarifas de los principales couriers de Chile.</p>
      </div>

      <div className="form-grid">
        {/* Origen */}
        <div className="input-group">
          <label>
            <MapPin size={16} /> Región Origen
          </label>
          <select name="origin" value={formData.origin} onChange={handleChange}>
            {REGIONES_CHILE.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Destino */}
        <div className="input-group">
          <label>
            <MapPin size={16} /> Región Destino
          </label>
          <select name="destination" value={formData.destination} onChange={handleChange}>
            {REGIONES_CHILE.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Peso */}
        <div className="input-group">
          <label>
            <Weight size={16} /> Peso Estimado (Kg)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        {/* Dimensiones (L x A x A) */}
        <div className="input-group">
          <label>
            <Package size={16} /> Dimensiones (Largo x Ancho x Alto cm)
          </label>
          <div className="dimensions-row">
            <input
              type="number"
              name="length"
              placeholder="L"
              value={formData.length}
              onChange={handleChange}
            />
            <span>×</span>
            <input
              type="number"
              name="width"
              placeholder="A"
              value={formData.width}
              onChange={handleChange}
            />
            <span>×</span>
            <input
              type="number"
              name="height"
              placeholder="A"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="submit-button"
      >
        {loading ? (
          <span className="spinner">Consultando APIs...</span>
        ) : (
          <>
            Cotizar Envíos <ArrowRight size={18} />
          </>
        )}
      </motion.button>
    </motion.form>
  );
}