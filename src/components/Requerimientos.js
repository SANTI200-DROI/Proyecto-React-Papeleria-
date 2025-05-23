import React, { useState } from 'react';

function Requerimientos({ onIniciarCompra, onLimpiarCampos }) {
  const [nombre, setNombre] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tipoEntrega, setTipoEntrega] = useState('normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    onIniciarCompra({ nombre, presupuesto, direccion, tipoEntrega });
  };

  const handleLimpiar = () => {
    setNombre('');
    setPresupuesto('');
    setDireccion('');
    setTipoEntrega('normal');
    onLimpiarCampos();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Requerimientos de Compra</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br/>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Presupuesto máximo:</label><br/>
          <input type="number" value={presupuesto} onChange={e => setPresupuesto(e.target.value)} required />
        </div>
        <div>
          <label>Dirección:</label><br/>
          <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} required />
        </div>
        <div>
          <label>Tipo de entrega:</label><br/>
          <label>
            <input
              type="radio"
              value="normal"
              checked={tipoEntrega === 'normal'}
              onChange={e => setTipoEntrega(e.target.value)}
            /> Normal
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="radio"
              value="express"
              checked={tipoEntrega === 'express'}
              onChange={e => setTipoEntrega(e.target.value)}
            /> Express
          </label>
        </div>
        <div style={{ marginTop: '15px' }}>
          <button type="submit" style={{ marginRight: '10px' }}>Iniciar compra </button>
          <button type="button" onClick={handleLimpiar}>Limpiar campos </button>
        </div>
      </form>
    </div>
  );
}

export default Requerimientos;
