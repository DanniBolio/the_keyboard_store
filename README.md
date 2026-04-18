<h1>THE KEYBOARD STORE - Actualización</h1>

<p>
Tienda web de teclados mecánicos desarrollada como proyecto final del curso de JavaScript. Construida con HTML, CSS y JavaScript, enfocada tanto en la funcionalidad como en el diseño visual para uso como pieza de portfolio.
</p>

<p>
Como diseñador, quise aprovechar el proyecto no solo para practicar JavaScript,
sino también para construir algo que realmente se vea bien y pueda usar como parte de mi portfolio de Diseño.
</p>

## Funcionalidades

<ul>
  <li>Catálogo de productos cargado desde <code>data/productos.json</code> mediante Fetch API</li>
  <li>Skeletons animados mientras se cargan los datos</li>
  <li>Buscador en tiempo real por nombre, marca, switch o formato</li>
  <li>Filtros por marca, formato y precio</li>
  <li>Carrito de compras con panel lateral deslizable</li>
  <li>Ajuste de cantidad y eliminación de productos en el carrito</li>
  <li>Contador de productos en el navbar</li>
  <li>Guardado del carrito con <code>localStorage</code></li>
  <li>Toast notification al agregar productos al carrito</li>
  <li>Efecto parallax en el hero según posición del mouse</li>
  <li>Menú hamburguesa para móvil</li>
  <li>Animaciones al hacer scroll con AOS (pendiente en cards por problemas de compatibilidad)</li>
</ul>

## Tecnologías
 
- HTML5 / CSS3
- JavaScript ES6+ (DOM, Fetch API, `localStorage`, eventos, spread operator, arrow functions)
- [AOS](https://michalsnik.github.io/aos/) — animaciones al scroll
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- Google Fonts — Poppins, DM Sans, Figtree
  
## Estructura del proyecto
 
```
├── index.html
├── Paginas/
│   └── productos.html
├── CSS/
│   ├── mainstyle.css
│   ├── header.css
│   ├── hero.css
│   ├── productos.css
│   ├── productos_pag.css
│   ├── carrito.css
│   ├── filtros.css
│   ├── footer.css
│   ├── sobrenosotros.css
│   ├── contactosec.css
│   ├── colors.css
│   └── font_family.css
├── JS/
│   ├── main.js
│   ├── mainproductos.js
│   ├── carrito.js
│   ├── hero.js
│   ├── burgermenu.js
│   └── productos.js
├── data/
│   └── productos.json
└── image/
```

<br>
<p><strong>Alumno:</strong> Daniel Bolio<br>
<strong>Comisión:</strong> 89570<br>
<strong>Profesor:</strong> Javier Giménez<br>
<strong>Tutor:</strong> Nahuel Presa</p>
