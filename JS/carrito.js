let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const btnCarrito       = document.getElementById("btnCarrito");
const btnCerrarCarrito = document.getElementById("btnCerrarCarrito");
const carritoPanel     = document.getElementById("carritoPanel");
const carritoOverlay   = document.getElementById("carritoOverlay");
const btnBorrarCarrito = document.getElementById("btnBorrarCarrito");
const btnComprar       = document.getElementById("btnComprar");

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

let toastTimeout = null;
 
function mostrarToast(nombre) {
  let toast = document.getElementById("toastCarrito");
 
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastCarrito";
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--color-base);
      color: var(--cl-blancos);
      padding: 0.75rem 1.25rem;
      border-radius: 9999px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      z-index: 999;
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      white-space: nowrap;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(toast);
  }
 
  toast.innerHTML = `<i class="bi bi-check-circle-fill" style="color: var(--color-primario);"></i> ${nombre} agregado al carrito`;
 
  setTimeout(() => {
    toast.style.transform = "translateX(-50%) translateY(0)";
    toast.style.opacity   = "1";
  }, 10);
 
  if (toastTimeout) clearTimeout(toastTimeout);
 
  toastTimeout = setTimeout(() => {
    toast.style.transform = "translateX(-50%) translateY(100px)";
    toast.style.opacity   = "0";
    toastTimeout = null;
  }, 2500);
}

function crearModalCompra() {
  if (document.getElementById("modalCompra")) return;

  const estilos = document.createElement("style");
  estilos.textContent = `
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 15, 15, 0.75);
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal-overlay.visible {
      opacity: 1;
      visibility: visible;
    }

    .modal {
      background: var(--cards);
      border-radius: 20px;
      padding: 2.5rem 2rem;
      max-width: 420px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
      transform: translateY(24px) scale(0.97);
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
    }

    .modal-overlay.visible .modal {
      transform: translateY(0) scale(1);
    }

    .modal__icono {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: var(--color-primario);
      margin-bottom: 0.25rem;
    }

    .modal__tag {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--acento);
    }

    .modal__titulo {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 1.5rem;
      color: var(--color-base);
      line-height: 1.2;
      margin: 0;
    }

    .modal__titulo span {
      color: var(--color-primario);
    }

    .modal__descripcion {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      color: var(--acento);
      line-height: 1.6;
      margin: 0;
      max-width: 300px;
    }

    .modal__orden {
      background: var(--bg);
      border-radius: 10px;
      padding: 0.6rem 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.15rem;
      width: 100%;
    }

    .modal__orden-label {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--acento);
    }

    .modal__orden-numero {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--color-base);
      letter-spacing: 0.05em;
    }

    .modal__progreso {
      width: 100%;
      height: 4px;
      background: var(--bg);
      border-radius: 9999px;
      overflow: hidden;
    }

    .modal__progreso-barra {
      height: 100%;
      background: var(--color-primario);
      border-radius: 9999px;
      width: 0%;
      transition: width 2.8s ease-out;
    }

    .modal__progreso-barra.animando {
      width: 100%;
    }

    .modal__estado {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.8rem;
      color: var(--acento);
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .modal__estado i {
      color: var(--color-primario);
      font-size: 0.85rem;
    }

    .modal__btn-cerrar {
      margin-top: 0.5rem;
      padding: 0.7rem 2rem;
      background: var(--color-primario);
      color: var(--cl-blancos);
      border: none;
      border-radius: 9999px;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.2s ease;
      width: 100%;
    }

    .modal__btn-cerrar:hover {
      background: var(--acento-secundario);
    }
  `;
  document.head.appendChild(estilos);

  const overlay = document.createElement("div");
  overlay.id = "modalCompra";
  overlay.classList.add("modal-overlay");
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitulo">
      <div class="modal__icono">
        <i class="bi bi-keyboard"></i>
      </div>
      <p class="modal__tag">Compra confirmada</p>
      <h2 class="modal__titulo" id="modalTitulo">
        ¡Gracias por tu<br><span>compra!</span>
      </h2>
      <p class="modal__descripcion">
        Tu pedido está siendo procesado. Te notificaremos cuando
        esté listo para envío.
      </p>
      <div class="modal__orden">
        <span class="modal__orden-label">Número de orden</span>
        <span class="modal__orden-numero" id="modalNumeroOrden">#OT-000000</span>
      </div>
      <div class="modal__progreso">
        <div class="modal__progreso-barra" id="modalBarra"></div>
      </div>
      <p class="modal__estado">
        <i class="bi bi-arrow-repeat"></i>
        Procesando pago...
      </p>
      <button class="modal__btn-cerrar" id="btnCerrarModal">
        Seguir comprando
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cerrarModalCompra();
  });
  document.getElementById("btnCerrarModal").addEventListener("click", cerrarModalCompra);
}

function generarNumeroOrden() {
  return "#OT-" + Math.floor(Math.random() * 900000 + 100000);
}

function mostrarModalCompra() {
  crearModalCompra();

  document.getElementById("modalNumeroOrden").textContent = generarNumeroOrden();

  const overlay = document.getElementById("modalCompra");
  overlay.classList.add("visible");

  setTimeout(() => {
    document.getElementById("modalBarra").classList.add("animando");
  }, 50);
}

function cerrarModalCompra() {
  const overlay = document.getElementById("modalCompra");
  if (!overlay) return;

  overlay.classList.remove("visible");

  setTimeout(() => {
    const barra = document.getElementById("modalBarra");
    if (barra) barra.classList.remove("animando");
  }, 300);
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
  const total   = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const contador = document.getElementById("contadorCarrito");
  contador.textContent   = total;
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
  if (!boton) return;

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
  mostrarToast(`${teclado.marca} ${teclado.modelo}`);
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

  setTimeout(() => {
    mostrarModalCompra();
  }, 320);
});

actualizarContador();
renderizarCarrito();