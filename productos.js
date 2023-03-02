'use strict';

class Producto {
  nombre;
  descripcion;
  categoria;
  img;
  precio;
  id;

  constructor(nombre, descripcion, categoria, precio, id, img) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.img = img;
    this.precio = precio;
    this.id = id;
  }
};

let productos = [];
let producto1;
producto1 = new Producto("Comet Evo", "Surfboard", "Surfboard", 140000, 1, "https://www.sunsetsurfshop.com.ar/wp-content/uploads/2022/05/FUN-B4BC.jpg");
let producto2;
producto2 = new Producto("Aquatone Sup", "Surfboard", "Surfboard", 100000, 2, 'https://www.nspsurfboards.com/wp-content/uploads/2022/09/1600x1600-Nature_Flax_The_Cheater_Bottom.webp');
let producto3;
producto3 = new Producto("Bullet PP", "Surfboard", "Surfboard", 70000, 3, 'https://www.nspsurfboards.com/wp-content/uploads/2022/03/1600x1600-PU-Atomic-flyer-Sea-Foam-66-bottom.webp');
let producto4;
producto4 = new Producto("Parafina Basecoat", "Parafina", "Parafinas", 5000);
producto4.nombre = "Parafina Basecoat";
producto4.descripcion = "Parafina";
producto4.categoria = "Parafinas"
producto4.precio = 5000;
producto4.id = 4;
producto4.img = 'https://www.sunsetsurfshop.com.ar/wp-content/uploads/2022/05/BASE.webp'
let producto5;
producto5 = new Producto;
producto5.nombre = "Pita Bicep Coil Pro";
producto5.descripcion = "Pita";
producto5.categoria = "Pitas"
producto5.precio = 4500;
producto5.id = 5;
producto5.img = 'https://www.sunsetsurfshop.com.ar/wp-content/uploads/2022/05/BET_1564__ALTA-400x400.jpg'
let producto6;
producto6 = new Producto;
producto6.nombre = "Liquid Shredder ";
producto6.descripcion = "Quilla";
producto6.categoria = "Quillas"
producto6.precio = 7000;
producto6.id = 6;
producto6.img = 'https://www.sunsetsurfshop.com.ar/wp-content/uploads/2022/05/50.-Quilla-x1-flexible-5-300x300.jpg'
let producto7;
producto7 = new Producto("Performance Thruster 4.7", "Quilla", "Quillas", 7000, 7, 'https://www.nspsurfboards.com/wp-content/uploads/2020/07/Performance-Series-Fin-4.7._1.jpg');
let producto8;
producto8 = new Producto("Parafina Strufle", "Parafina", "Parafinas", 3000, 8, 'https://somosriders.com/wp-content/uploads/2020/11/Parafina-Frio-600x600.jpeg');
let producto9;
producto9 = new Producto("Pita Leash Freelife", "Pita", "Pitas", 4000, 9, 'https://d2r9epyceweg5n.cloudfront.net/stores/566/841/products/pitas-leash-surf-creatures-lite-6-tobillo-d_nq_np_992987-mla29101156265_012019-f1-c7991cdd1c1ec6946f15929260074288-480-0.jpg');

productos.push(producto1);
productos.push(producto2);
productos.push(producto3);
productos.push(producto4);
productos.push(producto5);
productos.push(producto6);
productos.push(producto7);
productos.push(producto8);
productos.push(producto9);

let main = document.querySelector("#main");
main.classList.add('container');
let h2 = document.createElement("h2");
h2.innerText = 'Productos';
h2.classList.add('pb-3');
main.appendChild(h2);
let row = document.createElement("div");
row.classList.add('row', 'g-3', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'row-cols-xl-4' );
main.appendChild(row);

function mostrarProductos(filtros) {

  let articulos = [];

  filtros.forEach((producto) => {
    let nombre = producto.nombre;
    let descripcion = producto.descripcion;
    let precio = producto.precio;

    let col = document.createElement("div");
    col.classList.add('col');
    row.appendChild(col);

    let card = document.createElement("div");
    card.classList.add('card', 'h-100', 'shadow', 'p-3');
    col.appendChild(card);

    let img = document.createElement('img');
    let url = producto.img;
    img.classList.add('card-img-top')
    img.setAttribute("src", url);
    card.appendChild(img);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between');
    img.after(cardBody);

    let h3 = document.createElement("h3");
    h3.innerText = nombre;
    h3.classList.add('card-title', 'h4', 'm-0');

    let p = document.createElement("p");
    p.innerText = descripcion;
    p.classList.add('card-text');

    let span = document.createElement("span");
    span.innerText = Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3, style: 'currency', currency: 'USD' }).format(precio);
    span.classList.add('card-text', 'd-block', 'mb-3', 'precio');

    let btn = document.createElement('button');
    btn.setAttribute('id', 'btnAgregar');
    btn.classList.add('btn', 'btn-primary');
    btn.innerText = 'Agregar al carrito';
    btn.setAttribute('data-id', producto.id);
    btn.setAttribute('data-val', producto.precio);

    cardBody.appendChild(h3);
    h3.after(p);
    p.after(span);
    span.after(btn);

    articulos.push(col);
  });

  return articulos;
};

mostrarProductos(productos);