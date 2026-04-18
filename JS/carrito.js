let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const btnCarrito      = document.getElementById("btnCarrito");
const btnCerrarCarrito = document.getElementById("btnCerrarCarrito");
const carritoPanel    = document.getElementById("carritoPanel");
const carritoOverlay  = document.getElementById("carritoOverlay");
const btnBorrarCarrito = document.getElementById("btnBorrarCarrito");
const btnComprar      = document.getElementById("btnComprar");

// abrir/cerrar
btnCarrito.addEventListener("click", () => {
  carritoPanel.classList.add("abierto");
  carritoOverlay.classList.add("abierto");
});

btnCerrarCarrito.addEventListener("click", cerrarCarrito);
carritoOverlay.addEventListener("click", cerrarCarrito);

function cerrarCarrito() {
  carritoPanel.classList.remove("abierto");
  carritoOverlay.classList.remove("abierto");
}

function calcularTotal() {
  return carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

function actualizarCarrito() {
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

// guardar
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// contador
function actualizarContador() {
  const total = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const contador = document.getElementById("contadorCarrito");
  contador.textContent = total;
  contador.style.display = total === 0 ? "none" : "flex";
}

// productos
function renderizarCarrito() {
  const contenedor = document.getElementById("carritoItems");
  const totalEl    = document.getElementById("carritoTotal");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <p style="color: var(--acento); font-size: 0.9rem;">
        Tu carrito está vacío.
      </p>`;
    totalEl.textContent = "$0.00";
    return;
  }

  totalEl.textContent = `$${calcularTotal().toFixed(2)}`;

  carrito.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <img class="carrito-item__imagen" src="${item.imagen}" alt="${item.modelo}">
      <div class="carrito-item__info">
        <p class="carrito-item__nombre poppins-bold">${item.marca} ${item.modelo}</p>
        <p class="carrito-item__precio">$${item.precio}</p>
        <div class="carrito-item__cantidad">
          <button class="carrito-item__btn" data-accion="restar" data-id="${item.id}">−</button>
          <span>${item.cantidad}</span>
          <button class="carrito-item__btn" data-accion="sumar" data-id="${item.id}">+</button>
        </div>
        <button class="carrito-item__eliminar" data-accion="eliminar" data-id="${item.id}">
          <i class="bi bi-trash"></i> Eliminar
        </button>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

document.getElementById("carritoItems").addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-accion]");
  if (!boton) return; // si no, ignorar

  const id     = Number(boton.dataset.id);
  const accion = boton.dataset.accion;

  if (accion === "sumar")    cambiarCantidad(id, 1);
  if (accion === "restar")   cambiarCantidad(id, -1);
  if (accion === "eliminar") eliminarDelCarrito(id);
});

// agregar al carrito
function agregarAlCarrito(id) {
  const teclado = catalogoTeclados.find((t) => t.id === id);
  if (!teclado) {
    console.error(`agregarAlCarrito: no se encontró el producto con id ${id}`);
    return;
  }

  const existente = carrito.find((item) => item.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...teclado, cantidad: 1 });
  }

  actualizarCarrito();
}

// cantidad
function cambiarCantidad(id, cambio) {
  const item = carrito.find((item) => item.id === id);
  if (!item) {
    console.error(`cambiarCantidad: no se encontró el item con id ${id} en el carrito`);
    return;
  }

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    eliminarDelCarrito(id);
    return;
  }

  actualizarCarrito();
}

// eliminar producto
function eliminarDelCarrito(id) {
  const existia = carrito.some((item) => item.id === id);
  if (!existia) {
    console.warn(`eliminarDelCarrito: el item con id ${id} no estaba en el carrito`);
    return;
  }

  carrito = carrito.filter((item) => item.id !== id);
  actualizarCarrito();
}

// borrar todos los productos
btnBorrarCarrito.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

// comprar
btnComprar.addEventListener("click", () => {
  if (carrito.length === 0) return;
  carrito = [];
  actualizarCarrito();
  cerrarCarrito();
});

actualizarContador();
renderizarCarrito();