window.catalogoTeclados = [];
const gridProductosPage = document.getElementById("gridProductosPage");
const contadorInline = document.getElementById("contadorProductosInline");
const contadorBanner = document.getElementById("contadorProductosBanner");

if (!gridProductosPage) {
  console.warn("gridProductosPage no existe en esta página");
}

// render productos
function renderizarProductosPagina(productos) {
  if (!gridProductosPage) return;

  gridProductosPage.innerHTML = "";

  // act contadores
  const texto = `${productos.length} producto${productos.length !== 1 ? "s" : ""} encontrado${productos.length !== 1 ? "s" : ""}`;
  if (contadorInline) contadorInline.textContent = texto;

  if (productos.length === 0) {
    const vacio = document.createElement("div");
    vacio.classList.add("productos-page__vacio");
    vacio.innerHTML = `
      <i class="bi bi-search"></i>
      <p>No se encontraron productos con esos filtros.</p>
      <p style="font-size:0.85rem">Intenta con otros términos o borra los filtros.</p>
    `;
    gridProductosPage.appendChild(vacio);
    return;
  }

  productos.forEach((teclado) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card__imagen">
        <img src="${teclado.imagen}" alt="${teclado.marca} ${teclado.modelo}" loading="lazy">
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

    gridProductosPage.appendChild(card);
  });
}

function aplicarFiltros(catalogo) {
  const busqueda = document
    .getElementById("inputBuscarPage")
    .value.toLowerCase()
    .trim();
  const marca = document.getElementById("filtroMarcaPage").value;
  const formato = document.getElementById("filtroFormatoPage").value;
  const precio = document.getElementById("filtroPrecioPage").value;

  let resultados = [...catalogo];

  if (busqueda) {
    resultados = resultados.filter(
      (t) =>
        t.marca.toLowerCase().includes(busqueda) ||
        t.modelo.toLowerCase().includes(busqueda) ||
        t.tipoSwitch.toLowerCase().includes(busqueda) ||
        t.formato.toLowerCase().includes(busqueda),
    );
  }

  if (marca) resultados = resultados.filter((t) => t.marca === marca);
  if (formato) resultados = resultados.filter((t) => t.formato === formato);
  if (precio === "menor") resultados.sort((a, b) => a.precio - b.precio);
  if (precio === "mayor") resultados.sort((a, b) => b.precio - a.precio);

  renderizarProductosPagina(resultados);
}

async function cargarCatalogo() {
  try {
    const res = await fetch("../data/productos.json");

    if (!res.ok) {
      throw new Error("No se pudo cargar el JSON");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error cargando catálogo:", error);
    return [];
  }
}

async function iniciar() {
  if (!gridProductosPage) return;

  mostrarSkeletons(gridProductosPage, 6);

  const catalogo = await cargarCatalogo();

  if (catalogo.length === 0) return;

  window.catalogoTeclados = catalogo;

  if (contadorBanner)
    contadorBanner.textContent = `${catalogo.length} teclados en catálogo`;

  renderizarProductosPagina(catalogo);

  // eventos

  const inputBuscar = document.getElementById("inputBuscarPage");
  if (inputBuscar) {
    inputBuscar.addEventListener("input", () => aplicarFiltros(catalogo));
  }

  const btnAplicar = document.getElementById("btnAplicarFiltroPage");
  if (btnAplicar) {
    btnAplicar.addEventListener("click", () => aplicarFiltros(catalogo));
  }

  // borrar
  const btnBorrar = document.getElementById("btnBorrarFiltroPage");
  if (btnBorrar) {
    btnBorrar.addEventListener("click", () => {
      document.getElementById("inputBuscarPage").value = "";
      document.getElementById("filtroMarcaPage").value = "";
      document.getElementById("filtroFormatoPage").value = "";
      document.getElementById("filtroPrecioPage").value = "";
      renderizarProductosPagina(catalogo);
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
