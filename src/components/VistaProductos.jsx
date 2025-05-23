import React, { useState, useEffect, useRef } from 'react';
import ProductItem from './ProductItem';
import ProductForm from './ProductForm';

const VistaProductos = ({ productos, onAdd, onDelete, onEdit, productoEditando, onUpdate }) => {
  const [productosMostrados, setProductosMostrados] = useState([]);
  const [cantidad, setCantidad] = useState(15);
  const [filtroNombre, setFiltroNombre] = useState('');
const [filtroCategoria, setFiltroCategoria] = useState('');

  const scrollRef = useRef(null);

  useEffect(() => {
    setCantidad(15); // Resetea la cantidad cuando cambian filtros para empezar de nuevo
  }, [filtroNombre, filtroCategoria]);
  
  useEffect(() => {
    const productosFiltrados = productos.filter((producto) => {
      const nombreMatch = producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
      const categoriaMatch = producto.categoria.toLowerCase().includes(filtroCategoria.toLowerCase());
      return nombreMatch && categoriaMatch;
    });
  
    setProductosMostrados(productosFiltrados.slice(0, cantidad));
  }, [productos, cantidad, filtroNombre, filtroCategoria]);
  
  const handleScroll = () => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
  
    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
  
    // Filtramos productos antes para la comparación correcta
    const productosFiltrados = productos.filter((producto) => {
      const nombreMatch = producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
      const categoriaMatch = producto.categoria.toLowerCase().includes(filtroCategoria.toLowerCase());
      return nombreMatch && categoriaMatch;
    });
  
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (cantidad < productosFiltrados.length) {
        setCantidad(prev => prev + 15);
      }
    }
  };
  

  return (
    <div>
        <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
  <input
    type="text"
    placeholder="Filtrar por nombre..."
    value={filtroNombre}
    onChange={(e) => setFiltroNombre(e.target.value)}
    style={{ flex: 1, padding: '8px' }}
  />

  <input
    type="text"
    placeholder="Filtrar por categoría..."
    value={filtroCategoria}
    onChange={(e) => setFiltroCategoria(e.target.value)}
    style={{ flex: 1, padding: '8px' }}
  />
</div>

      <ProductForm
        onAdd={onAdd}
        productoEditando={productoEditando}
        onUpdate={onUpdate}
      />

      {productos.length === 0 ? (
        <p>No hay productos aún. Agrega alguno 🧾</p>
      ) : (
        <div
          style={{
            height: '500px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            padding: '10px',
            marginTop: '20px'
          }}
          onScroll={handleScroll}
          ref={scrollRef}
        >
          {productosMostrados.map(producto => (
            <ProductItem
              key={producto.id}
              product={producto}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VistaProductos;
