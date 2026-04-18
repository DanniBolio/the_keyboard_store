const gridProductosPage  = document.getElementById("gridProductosPage");
const contadorInline     = document.getElementById("contadorProductosInline");
const contadorBanner     = document.getElementById("contadorProductosBanner");
 
// render productos
function renderizarProductosPagina(productos) {
  gridProductosPage.innerHTML = "";
 
  // act contadores
  const texto = `${productos.length} producto${productos.length !== 1 ? "s" : ""} encontrado${productos.length !== 1 ? "s" : ""}`;
  if (contadorInline) contadorInline.textContent = texto;
  if (contadorBanner) contadorBanner.textContent = `${catalogoTeclados.length} teclados en catálogo`;
 
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
        <img src="../${teclado.imagen}" alt="${teclado.marca} ${teclado.modelo}" loading="lazy">
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
 
    const botonComprar = card.querySelector(".card__boton");
    botonComprar.addEventListener("click", () => {
      agregarAlCarrito(teclado.id);
    });
 
    gridProductosPage.appendChild(card);
  });
}
 
function aplicarFiltros() {
  const busqueda = document.getElementById("inputBuscarPage").value.toLowerCase().trim();
  const marca    = document.getElementById("filtroMarcaPage").value;
  const formato  = document.getElementById("filtroFormatoPage").value;
  const precio   = document.getElementById("filtroPrecioPage").value;
 
  let resultados = [...catalogoTeclados];
 
  if (busqueda) {
    resultados = resultados.filter((t) =>
      t.marca.toLowerCase().includes(busqueda)      ||
      t.modelo.toLowerCase().includes(busqueda)     ||
      t.tipoSwitch.toLowerCase().includes(busqueda) ||
      t.formato.toLowerCase().includes(busqueda)
    );
  }
 
  if (marca)   resultados = resultados.filter((t) => t.marca === marca);
  if (formato) resultados = resultados.filter((t) => t.formato === formato);
 
  if (precio === "menor") resultados.sort((a, b) => a.precio - b.precio);
  if (precio === "mayor") resultados.sort((a, b) => b.precio - a.precio);
 
  renderizarProductosPagina(resultados);
}
 
// eventos
 
document.getElementById("inputBuscarPage").addEventListener("input", aplicarFiltros);
 
document.getElementById("btnAplicarFiltroPage").addEventListener("click", aplicarFiltros);
 
// borrar
document.getElementById("btnBorrarFiltroPage").addEventListener("click", () => {
  document.getElementById("inputBuscarPage").value   = "";
  document.getElementById("filtroMarcaPage").value   = "";
  document.getElementById("filtroFormatoPage").value = "";
  document.getElementById("filtroPrecioPage").value  = "";
  renderizarProductosPagina(catalogoTeclados);
});
 
renderizarProductosPagina(catalogoTeclados);