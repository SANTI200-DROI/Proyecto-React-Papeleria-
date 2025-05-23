import React, { useState, useEffect } from 'react';

const ProductForm = ({ onAdd, productoEditando, onUpdate }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre);
      setPrecio(productoEditando.precio);
      setDescripcion(productoEditando.descripcion);
      setId(productoEditando.id);
    } else {
      limpiarFormulario();
    }
  }, [productoEditando]);

  const limpiarFormulario = () => {
    setNombre('');
    setPrecio('');
    setDescripcion('');
    setId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !precio) {
      alert('Completa los campos obligatorios, papi 😈');
      return;
    }

    const producto = {
      id: id || Date.now(),
      nombre,
      precio: Number(precio),
      descripcion,
    };

    if (id) {
      onUpdate(producto);
    } else {
      onAdd(producto);
      limpiarFormulario();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
        min="0"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">{id ? 'Actualizar' : 'Agregar'} producto</button>
    </form>
  );
};

export default ProductForm;
