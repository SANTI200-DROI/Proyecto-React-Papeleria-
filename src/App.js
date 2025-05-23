// En la parte superior de src/App.js agrega:
import React, { useState, useEffect } from 'react';
import ProductItem from './components/ProductItem';
import VistaProductos from './components/VistaProductos'; // 
import ProductForm from './components/ProductForm';
import Requerimientos from './components/Requerimientos';  // <-- Importa el nuevo componente


function App() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // Este estado controla si ya iniciamos la compra y mostramos productos o no
  const [compraIniciada, setCompraIniciada] = useState(false);

  // Guardamos los datos del formulario de requerimientos aquí
  const [datosCompra, setDatosCompra] = useState(null);

  useEffect(() => {
    const dataGuardada = localStorage.getItem('productos');
    try {
      const productosParseados = JSON.parse(dataGuardada);
  
      if (Array.isArray(productosParseados) && productosParseados.length > 0) {
        setProductos(productosParseados);
      } else {
        throw new Error(); // fuerza que se carguen los iniciales
      }
    } catch (error) {
      const productosIniciales = [
        {
          id: 1,
          nombre: 'Lápiz HB',
          precio: 0.5,
          categoria: 'Escritura',
          marca: 'Faber-Castell'
        },
        {
          id: 2,
          nombre: 'Cuaderno rayado',
          precio: 2.5,
          categoria: 'Papelería',
          marca: 'Norma'
        },
        {
          id: 3,
          nombre: 'Resaltador amarillo',
          precio: 1.2,
          categoria: 'Marcadores',
          marca: 'Stabilo'
        },
        {
          id: 4,
          nombre: 'Tijeras escolares',
          precio: 1.8,
          categoria: 'Accesorios',
          marca: 'Maped'
        },
        {
          id: 5,
          nombre: 'Bolígrafo azul',
          precio: 0.7,
          categoria: 'Escritura',
          marca: 'BIC'
        },
        {
          id: 6,
          nombre: 'Corrector líquido',
          precio: 1.0,
          categoria: 'Accesorios',
          marca: 'Pelikan'
        },
        {
          id: 7,
          nombre: 'Pegante en barra',
          precio: 0.9,
          categoria: 'Pegantes',
          marca: 'Pritt'
        },
        {
          id: 8,
          nombre: 'Cartulina blanca',
          precio: 0.6,
          categoria: 'Papel',
          marca: 'Fabriano'
        },
        {
          id: 9,
          nombre: 'Borrador de nata',
          precio: 0.3,
          categoria: 'Accesorios',
          marca: 'Milan'
        },
        {
          id: 10,
          nombre: 'Colores 12 unidades',
          precio: 3.5,
          categoria: 'Colores',
          marca: 'Crayola'
        }
      ];
      setProductos(productosIniciales);
      localStorage.setItem('productos', JSON.stringify(productosIniciales));
    }
  }, []);
  
  

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const limpiarMensaje = () => {
    setTimeout(() => setMensaje(''), 3000);
  };

  const agregarProducto = (producto) => {
    setProductos(prev => [...prev, producto]);
    setMensaje('Producto agregado con éxito');
    limpiarMensaje();
  };

  const eliminarProducto = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
    setMensaje('Producto eliminado');
    limpiarMensaje();
  };

  const iniciarEdicion = (producto) => {
    setProductoEditando(producto);
  };

  const actualizarProducto = (productoActualizado) => {
    setProductos(prev => prev.map(p => p.id === productoActualizado.id ? productoActualizado : p));
    setProductoEditando(null);
    setMensaje('Producto actualizado 😈');
    limpiarMensaje();
  };

  // Aquí esta la función que se pasa al componente Requerimientos para iniciar la compra
  const handleIniciarCompra = (datos) => {
    setDatosCompra(datos); // guardamos los datos del formulario
    setCompraIniciada(true); // cambiamos la vista para mostrar productos
  };

  // Función para limpiar campos y volver a la vista inicial
  const handleLimpiarCampos = () => {
    setDatosCompra(null);
    setCompraIniciada(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Papelería React 💼✨</h1>
  
      {mensaje && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}
  
      {!compraIniciada ? (
        <Requerimientos
          onIniciarCompra={handleIniciarCompra}
          onLimpiarCampos={handleLimpiarCampos}
        />
      ) : (
        
        <VistaProductos
          productos={productos}
          onAdd={agregarProducto}
          onDelete={eliminarProducto}
          onEdit={iniciarEdicion}
          onUpdate={actualizarProducto}
          productoEditando={productoEditando}
        />
      )}
    </div>
  );
  
}

export default App;
