const productImage = document.querySelector(".hero_producto_img");
const intensidad = 20;
document.addEventListener("mousemove", (evento) => {
  const centroPantallaX = window.innerWidth / 2;
  const centroPantallaY = window.innerHeight / 2;

  const mouseX = evento.clientX - centroPantallaX;
  const mouseY = evento.clientY - centroPantallaY;

  const moverX = mouseX / intensidad;
  const moverY = mouseY / intensidad;

  productImage.style.transform = `translate(calc(-50% + ${moverX}px), calc(-42% + ${moverY}px))`;
});

document.addEventListener("mouseleave", () => {
  productImage.style.transform = "translate(-50%, -42%)";
});
