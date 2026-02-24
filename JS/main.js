//Primera entrega
/*
const catalogoTeclados = [
  {
    id: 1,
    marca: "RK Royal Kludge",
    modelo: "Wireless Mechanical",
    tipoSwitch: "Gateron Brown",
    formato: "60%",
    precio: 50,
    disponible: true,
  },
  {
    id: 2,
    marca: "Logitech",
    modelo: "MX Mechanical",
    tipoSwitch: "Tactile Quiet",
    formato: "100%",
    precio: 45,
    disponible: false,
  },
  {
    id: 3,
    marca: "RK Royal Kludge",
    modelo: "Wired Gaming",
    tipoSwitch: "Gateron Red",
    formato: "75%",
    precio: 60,
    disponible: true,
  },
];
let nombreUsuario = prompt("¡Hola, bienvenido!, ¿Cómo te llamas?");
if (nombreUsuario === null || nombreUsuario === "") {
  nombreUsuario = "Usuario";
}
let respuesta = prompt(
  "Mucho gusto " +
    nombreUsuario +
    ", ¿Deseas ver nuestro cátalogo de teclados? (Si/No)",
);
if (respuesta === "Si" || respuesta === "si" || respuesta === "Sí") {
  let textoCatalogo = catalogoTeclados
    .map((teclado) => {
      return `ID: ${teclado.id} | ${teclado.marca} ${teclado.modelo} | $${teclado.precio}`;
    })
    .join("\n");
  alert(`Lista de Teclados: \n\n ${textoCatalogo}`);
  let especificaciones = prompt(
    "¿Quieres ver las especificaciones de algún teclado? (Si/No)",
  );
  if (
    especificaciones === "Si" ||
    especificaciones === "Sí" ||
    especificaciones === "si"
  ) {
    let intentar = "Si";
    while (intentar === "Si" || intentar === "Sí" || intentar === "si") {
      let respEspecificaciones = prompt(
        "Ingresa la ID del teclado que te llamó la atención",
      );
      let idbuscar = Number(respEspecificaciones);

      let tecladoEncontrado = catalogoTeclados.find(
        (teclado) => teclado.id === idbuscar,
      );

      if (tecladoEncontrado) {
        alert(`Te presentamos las especificaciones del teclado:
        Marca: ${tecladoEncontrado.marca}
        Modelo: ${tecladoEncontrado.modelo}
        Switch: ${tecladoEncontrado.tipoSwitch}
        Formato: ${tecladoEncontrado.formato}
        Precio: $${tecladoEncontrado.precio}`);
        intentar = "No";
      } else {
        intentar = prompt(
          "Lo sentimos, no se encontró el teclado con la ID, ¿Quieres intentar de nuevo? (Si/No)",
        );
      }
    }
  }
  let comprarTeclado = prompt("¿Comprar teclado? (Si/No)");
  if (
    comprarTeclado === "Si" ||
    comprarTeclado === "Sí" ||
    comprarTeclado === "si"
  ) {
    let intentarCompra = "Si";
    while (
      intentarCompra === "Si" ||
      intentarCompra === "Sí" ||
      intentarCompra === "si"
    ) {
      let respCompra = prompt("ID del teclado a comprar:");
      let idCompra = Number(respCompra);
      let tecladoCompra = catalogoTeclados.find(
        (teclado) => teclado.id === idCompra,
      );
      if (tecladoCompra) {
        if (tecladoCompra.disponible === true) {
          let respCantidad = prompt("¿Cuántas unidades deseas comprar?");
          let cantidad = Number(respCantidad);
          alert(
            "¡Increible" +
              nombreUsuario +
              "! Revisa la consola para ver tus productos comprados.",
          );
          console.log("Tu nota de compra");
          for (let contador = 1; contador <= cantidad; contador++) {
            console.log(
              `Unidad ${contador}: ${tecladoCompra.marca} ${tecladoCompra.modelo} | Switch: ${tecladoCompra.tipoSwitch} | Precio: $${tecladoCompra.precio}`,
            );
          }
          intentarCompra = "No";
        } else {
          intentarCompra = prompt(
            "Este producto no esta disponible, ¿Quieres intentar con otra ID? (Si/No)",
          );
        }
      } else {
        intentarCompra = prompt("ID no existe, ¿Intentar de nuevo? (Si/No)");
      }
    }
  } else {
    alert("¡Excente" + nombreUsuario + ", gracias por tu visita!");
  }
} else {
  alert("Gracias por visitarnos, ¡Excelente día!");
}
*/
