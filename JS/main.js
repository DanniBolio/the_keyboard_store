const base = window.location.hostname.includes("github")
  ? "/the_keyboard_store"
  : "";

// Mostrar últimos productos

const grid = document.getElementById("gridProductos");

function renderizarProductos(productos) {
  if (!grid) return;

  grid.innerHTML = "";

  productos.forEach((teclado) => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card__imagen">
        <img src="${base}/${teclado.imagen}" alt="${teclado.marca} ${teclado.modelo}" loading="lazy">
      </div>
      <div class="card__info">
        <p class="card__nombre">${teclado.marca} ${teclado.modelo} ${teclado.formato}</p>
        <div class="card__precios">
          <span class="card__precio-actual">$${teclado.precio}</span>
        </div>
      </div>
      <button class="card__boton" data-id="${teclado.id}">
        <i class="bi bi-cart"></i> Comprar ahora
      </button>
    `;

    card.querySelector(".card__boton").addEventListener("click", () => {
      agregarAlCarrito(teclado.id);
    });

    grid.appendChild(card);
  });
}

async function iniciar() {
  if (grid) mostrarSkeletons(grid, 4);

  function mostrarSkeletons(contenedor, cantidad) {
    if (!contenedor) return;

    contenedor.innerHTML = "";
  }

  const productos = await cargarCatalogo("data/productos.json");

  if (productos.length === 0) return;

  window.catalogoTeclados = productos;

  const productosRecientes = productos.slice(-4);
  renderizarProductos(productosRecientes);

  const inputBuscar = document.getElementById("inputBuscar");

  if (inputBuscar) {
    inputBuscar.addEventListener("input", (e) => {
      const texto = e.target.value.toLowerCase();
      const resultados = productosRecientes.filter(
        (t) =>
          t.marca.toLowerCase().includes(texto) ||
          t.modelo.toLowerCase().includes(texto) ||
          t.tipoSwitch.toLowerCase().includes(texto) ||
          t.formato.toLowerCase().includes(texto),
      );
      renderizarProductos(resultados);
    });
  }

  const btnFiltro = document.getElementById("btnFiltro");
  const btnCerrarFiltro = document.getElementById("btnCerrarFiltro");
  const filtroPanel = document.getElementById("filtroPanel");
  const filtroOverlay = document.getElementById("filtroOverlay");
  const btnAplicarFiltro = document.getElementById("btnAplicarFiltro");
  const btnBorrarFiltro = document.getElementById("btnBorrarFiltro");

  const abrirPanel = () => {
    filtroPanel.classList.add("abierto");
    filtroOverlay.classList.add("abierto");
  };
  const cerrarPanel = () => {
    filtroPanel.classList.remove("abierto");
    filtroOverlay.classList.remove("abierto");
  };

  if (btnFiltro) btnFiltro.addEventListener("click", abrirPanel);
  if (btnCerrarFiltro) btnCerrarFiltro.addEventListener("click", cerrarPanel);
  if (filtroOverlay) filtroOverlay.addEventListener("click", cerrarPanel);

  if (btnAplicarFiltro) {
    btnAplicarFiltro.addEventListener("click", () => {
      const marca = document.getElementById("filtroMarca").value;
      const formato = document.getElementById("filtroFormato").value;
      const precio = document.getElementById("filtroPrecio").value;

      let resultados = [...productosRecientes];
      if (marca) resultados = resultados.filter((t) => t.marca === marca);
      if (formato) resultados = resultados.filter((t) => t.formato === formato);
      if (precio === "menor") resultados.sort((a, b) => a.precio - b.precio);
      if (precio === "mayor") resultados.sort((a, b) => b.precio - a.precio);

      renderizarProductos(resultados);
      cerrarPanel();
    });
  }

  if (btnBorrarFiltro) {
    btnBorrarFiltro.addEventListener("click", () => {
      document.getElementById("filtroMarca").value = "";
      document.getElementById("filtroFormato").value = "";
      document.getElementById("filtroPrecio").value = "";
      renderizarProductos(productosRecientes);
      cerrarPanel();
    });
  }
}

function mostrarSkeletons(contenedor, cantidad) {
  if (!contenedor) return;

  contenedor.innerHTML = "";
  for (let i = 0; i < cantidad; i++) {
    const sk = document.createElement("div");
    sk.classList.add("card", "skeleton");
    sk.style.cssText =
      "min-height: 320px; background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite;";
    contenedor.appendChild(sk);
  }

  if (!document.getElementById("shimmerStyle")) {
    const style = document.createElement("style");
    style.id = "shimmerStyle";
    style.textContent =
      "@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }";
    document.head.appendChild(style);
  }
}

document.addEventListener("DOMContentLoaded", iniciar);