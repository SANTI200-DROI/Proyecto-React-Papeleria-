// src/components/ProductList.js
import React, { useState, useEffect, useRef } from 'react';

function ProductList({ productos, onSelect }) {
  const [visible, setVisible] = useState(15);
  const containerRef = useRef();

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setVisible((prev) => prev + 15);
    }
  };

  useEffect(() => {
    const ref = containerRef.current;
    ref.addEventListener('scroll', handleScroll);
    return () => ref.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '10px',
        width: '45%',
      }}
    >
      <h2>Productos disponibles</h2>
      {productos.slice(0, visible).map((producto) => (
        <div key={producto.id} style={{ marginBottom: '10px' }}>
          <strong>{producto.nombre}</strong><br />
          Precio: ${producto.precio}<br />
          Categoría: {producto.categoria}<br />
          Marca: {producto.marca}<br />
          <button onClick={() => onSelect(producto)}>Ver detalle</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
