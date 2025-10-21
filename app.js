// Array: almacena informacion de servicios ampliados
const serviciosAmpliados = [
  { id: 1, nombre: 'Tintas para impresoras domésticas', precio: 'Desde $500', descripcion: 'Perfectas para uso en el hogar' },
  { id: 2, nombre: 'Tintas profesionales para negocios', precio: 'Desde $1,200', descripcion: 'Alta calidad para impresiones comerciales' },
  { id: 3, nombre: 'Asesoramiento personalizado', precio: 'Gratis', descripcion: 'Te ayudamos a elegir la mejor opción' },
  { id: 4, nombre: 'Instalación y configuración', precio: 'Desde $300', descripcion: 'Servicio técnico especializado' }
];

// Map: almacena informacion de productos por categoria
const productosMap = new Map();
productosMap.set('Canon', ['PG-245', 'CL-246', 'PG-243', 'CL-244']);
productosMap.set('HP', ['664', '662', '954', '952XL']);
productosMap.set('Epson', ['T664', 'T544', '774', '103']);
productosMap.set('Brother', ['LC3011', 'LC3013', 'LC3019', 'TN760']);

// Set: almacena caracteristicas unicas de los productos
const caracteristicas = new Set([
  'Alta calidad de impresión',
  'Compatible con múltiples marcas',
  'Larga duración',
  'Precio competitivo',
  'Envío rápido',
  'Garantía de satisfacción'
]);

//configuracioon de navegacion
const navConfig = {
  secciones: ['inicio', 'productos', 'servicios', 'contacto'],
  titulos: {
    inicio: 'Inicio',
    productos: 'Productos',
    servicios: 'Servicios',
    contacto: 'Contacto'
  }
};

// Variable para rastrear la sección actual
let seccionActual = 'inicio';

// ============================================
// NAVEGACION
// ============================================

// Función para renderizar la barra de navegación
function renderNav() {
  const nav = document.getElementById('nav');
  nav.innerHTML = '';

  // Uso de bucle for para crear botones de navegación
  for (let i = 0; i < navConfig.secciones.length; i++) {
    const seccion = navConfig.secciones[i];
    const button = document.createElement('button');
    button.textContent = navConfig.titulos[seccion];
    button.className = 'nav-button';

    // Estructura if: marcar el botón activo
    if (seccion === seccionActual) {
      button.classList.add('active');
    }

    // Agregar evento de clic
    button.addEventListener('click', () => cambiarSeccion(seccion));
    nav.appendChild(button);
  }
}

// Función para cambiar de sección (usa estructura switch)
function cambiarSeccion(nuevaSeccion) {
  // Ocultar todas las secciones usando bucle for
  const secciones = document.querySelectorAll('.seccion');
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = 'none';
  }

  // Actualizar sección actual
  seccionActual = nuevaSeccion;
  renderNav();

  // Estructura switch para determinar qué sección mostrar
  switch (nuevaSeccion) {
    case 'inicio':
      document.getElementById('seccion-inicio').style.display = 'block';
      iniciarContador();
      break;
    case 'productos':
      document.getElementById('seccion-productos').style.display = 'block';
      renderProductos();
      break;
    case 'servicios':
      document.getElementById('seccion-servicios').style.display = 'block';
      renderServicios();
      break;
    case 'contacto':
      document.getElementById('seccion-contacto').style.display = 'block';
      break;
    default:
      // Si la sección no existe, mostrar inicio
      document.getElementById('seccion-inicio').style.display = 'block';
  }
}

// ============================================
// CONTADOR ANIMADO (SECCIÓN INICIO)
// ============================================

function iniciarContador() {
  const contador = document.getElementById('contador');

  // Estructura if: verificar si el contador existe y no tiene contenido
  if (contador && !contador.textContent) {
    let clientes = 0;
    const meta = 120;

    const intervalo = setInterval(() => {
      clientes++;
      contador.textContent = `Hemos servido a +${clientes} clientes felices este mes 🎉`;

      // Estructura if para detener el contador
      if (clientes >= meta) {
        clearInterval(intervalo);
      }
    }, 30);
  }
}

// ============================================
// RENDERIZADO DE SECCIÓN PRODUCTOS
// ============================================

function renderProductos() {
  const contenedor = document.getElementById('productos-contenido');

  // Estructura if: solo renderizar si el contenedor esta vacio
  if (contenedor.innerHTML === '') {
    // Crear contenedor para características (usando Set)
    const divCaracteristicas = document.createElement('div');
    divCaracteristicas.className = 'caracteristicas';

    const tituloCaract = document.createElement('h3');
    tituloCaract.textContent = 'Características de nuestros productos:';
    divCaracteristicas.appendChild(tituloCaract);

    const ulCaract = document.createElement('ul');
    ulCaract.className = 'lista-caracteristicas';

    // Uso de for...of para iterar sobre el Set
    for (const caracteristica of caracteristicas) {
      const li = document.createElement('li');
      li.textContent = caracteristica;
      ulCaract.appendChild(li);
    }

    divCaracteristicas.appendChild(ulCaract);
    contenedor.appendChild(divCaracteristicas);

    // Crear contenedor para productos por marca (usando Map)
    const divProductos = document.createElement('div');
    divProductos.className = 'productos-grid';

    // Uso de forEach con Map
    productosMap.forEach((productos, marca) => {
      const divMarca = document.createElement('div');
      divMarca.className = 'producto-marca';

      const h3 = document.createElement('h3');
      h3.textContent = marca;
      divMarca.appendChild(h3);

      const ul = document.createElement('ul');

      // Estructura if: verificar si hay productos
      if (productos.length > 0) {
        // Uso de bucle while para crear lista de productos
        let i = 0;
        while (i < productos.length) {
          const li = document.createElement('li');
          li.textContent = `Modelo: ${productos[i]}`;
          ul.appendChild(li);
          i++;
        }
      } else {
        const li = document.createElement('li');
        li.textContent = 'Sin productos disponibles';
        ul.appendChild(li);
      }

      divMarca.appendChild(ul);
      divProductos.appendChild(divMarca);
    });

    contenedor.appendChild(divProductos);
  }
}

// ============================================
// RENDERIZADO DE SECCIÓN SERVICIOS
// ============================================

function renderServicios() {
  const contenedor = document.getElementById('servicios-contenido');

  // Estructura if: solo renderizar si el contenedor está vacío
  if (contenedor.innerHTML === '') {
    const divServicios = document.createElement('ul');
    divServicios.className = 'servicios';

    // Uso de bucle for con el array de servicios
    for (let i = 0; i < serviciosAmpliados.length; i++) {
      const servicio = serviciosAmpliados[i];
      const li = document.createElement('li');
      li.className = 'servicio';

      const h3 = document.createElement('h3');
      h3.textContent = servicio.nombre;

      const pDescripcion = document.createElement('p');
      pDescripcion.textContent = servicio.descripcion;

      const pPrecio = document.createElement('p');
      pPrecio.textContent = servicio.precio;
      pPrecio.className = 'precio';

      li.appendChild(h3);
      li.appendChild(pDescripcion);
      li.appendChild(pPrecio);
      divServicios.appendChild(li);
    }

    contenedor.appendChild(divServicios);

    // Agregar información adicional
    const divInfo = document.createElement('div');
    divInfo.className = 'info-servicios';

    const pInfo = document.createElement('p');
    pInfo.textContent = 'Todos nuestros servicios incluyen garantía de satisfacción. Consulta por paquetes especiales para empresas.';
    pInfo.className = 'texto-centro';

    divInfo.appendChild(pInfo);
    contenedor.appendChild(divInfo);
  }
}

// ============================================
// MANEJO DEL FORMULARIO DE CONTACTO
// ============================================

function configurarFormulario() {
  const form = document.querySelector('#seccion-contacto form');

  // Estructura if: verificar que el formulario existe
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obtener valores del formulario
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const mensaje = document.getElementById('mensaje').value;

      // Estructura if-else para validar campos
      if (nombre && email && mensaje) {
        alert(`Gracias ${nombre}, hemos recibido tu mensaje. Te contactaremos pronto a ${email}.`);
        form.reset();
      } else {
        alert('Por favor completa todos los campos requeridos.');
      }
    });
  }
}

// ============================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ============================================

// Función que inicializa toda la aplicación
function init() {
  renderNav();
  iniciarContador();
  configurarFormulario();

  // Mostrar sección de inicio por defecto
  cambiarSeccion('inicio');
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
