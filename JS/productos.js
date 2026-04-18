let catalogoTeclados = null;

async function cargarCatalogo(path = "../data/productos.json") {
  try {
    const respuesta = await fetch(path);
    if (!respuesta.ok) {
      throw new Error(
        `Error al cargar productos: ${respuesta.status} ${respuesta.statusText}`,
      );
    }

    const datos = await respuesta.json();
    catalogoTeclados = datos;

    return datos;
  } catch (error) {
    console.error("No se pudo cargar el catálogo de productos:", error.message);

    mostrarErrorCatalogo();

    catalogoTeclados = [];
    return [];
  } finally {
    ocultarSkeletons();
  }
}

function mostrarErrorCatalogo() {
  const grid =
    document.getElementById("gridProductos") ||
    document.getElementById("gridProductosPage");

  if (!grid) return;

  grid.innerHTML = `
    <div style="
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem 1rem;
      color: var(--acento);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    ">
      <i class="bi bi-exclamation-circle" style="font-size: 2rem; color: var(--color-primario);"></i>
      <p style="font-family: 'DM Sans', sans-serif; font-size: 1rem; color: var(--color-base);">
        No se pudieron cargar los productos.
      </p>
      <p style="font-size: 0.85rem;">
        Intenta recargar la página.
      </p>
    </div>
  `;
}

function ocultarSkeletons() {
  const skeletons = document.querySelectorAll(".skeleton");
  skeletons.forEach((s) => s.remove());
}