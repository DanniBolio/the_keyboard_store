// Mostrar últimos productos
 
const grid = document.getElementById("gridProductos");
 
const productosRecientes = catalogoTeclados.slice(-4);
 
function renderizarProductos(productos) {
  grid.innerHTML = "";
 
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
 
    const botonComprar = card.querySelector(".card__boton");
    botonComprar.addEventListener("click", () => {
      agregarAlCarrito(teclado.id);
    });
 
    grid.appendChild(card);
  });
}
 
renderizarProductos(productosRecientes);