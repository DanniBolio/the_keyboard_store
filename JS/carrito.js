let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const btnCarrito = document.getElementById("btnCarrito");
const btnCerrarCarrito = document.getElementById("btnCerrarCarrito");
const carritoPanel = document.getElementById("carritoPanel");
const carritoOverlay = document.getElementById("carritoOverlay");
const btnBorrarCarrito = document.getElementById("btnBorrarCarrito");
const btnComprar = document.getElementById("btnComprar");

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

//Contador

function actualizarContador() {
  const total = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const contador = document.getElementById("contadorCarrito");
  contador.textContent = total;
  contador.style.display = total === 0 ? "none" : "flex";
}

// Guardar

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Productos

function renderizarCarrito() {
  const contenedor = document.getElementById("carritoItems");
  const totalEl = document.getElementById("carritoTotal");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <p style="color: var(--acento); font-size: 0.9rem;">
        Tu carrito está vacío.
      </p>`;
    totalEl.textContent = "$0.00";
    return;
  }

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  );
  totalEl.textContent = `$${total.toFixed(2)}`;

  carrito.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <img class="carrito-item__imagen" src="${item.imagen}" alt="${item.modelo}">
      <div class="carrito-item__info">
        <p class="carrito-item__nombre poppins-bold">${item.marca} ${item.modelo}</p>
        <p class="carrito-item__precio">$${item.precio}</p>
        <div class="carrito-item__cantidad">
          <button class="carrito-item__btn" onclick="cambiarCantidad(${item.id}, -1)">−</button>
          <span>${item.cantidad}</span>
          <button class="carrito-item__btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
        </div>
        <button class="carrito-item__eliminar" onclick="eliminarDelCarrito(${item.id})">
          <i class="bi bi-trash"></i> Eliminar
        </button>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

// Agregar/Eliminar del carrito

function agregarAlCarrito(id) {
  const teclado = catalogoTeclados.find((t) => t.id === id);
  const existente = carrito.find((item) => item.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...teclado, cantidad: 1 });
  }

  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

function cambiarCantidad(id, cambio) {
  const item = carrito.find((item) => item.id === id);
  item.cantidad += cambio;

  if (item.cantidad === 0) {
    eliminarDelCarrito(id);
    return;
  }

  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

btnBorrarCarrito.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
});

btnComprar.addEventListener("click", () => {
  if (carrito.length === 0) return;
  carrito = [];
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
  cerrarCarrito();
});

actualizarContador();
renderizarCarrito();
