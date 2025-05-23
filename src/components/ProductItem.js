import React from 'react';

const ProductItem = ({ product, onDelete, onEdit }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h3>{product.nombre}</h3>
      <p>Precio: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.precio * 1000)}</p>
      <p>{product.descripcion}</p>
      <button onClick={() => onEdit(product)}>Editar</button>{' '}
      <button onClick={() => onDelete(product.id)}>Eliminar</button>
    </div>
  );
};

export default ProductItem;
