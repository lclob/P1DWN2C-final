'use strict';

// local storage
function actualizarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito'));
  if (!carrito) {
    localStorage.setItem('carrito', JSON.stringify([]));
  }
  return carrito;
}

// agregar al carrito
function agregarCarrito(productos) {
  let btnAgregar = document.querySelectorAll('#btnAgregar');
  btnAgregar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      productos.forEach((producto) => {
        if (e.target.getAttribute('data-id') == producto.id) {
          let carrito = actualizarCarrito();
          let filtrado = carrito?.filter(item => item.id == producto.id)[0];
          if (filtrado) {
            let index = carrito.indexOf(filtrado);
            let prodInv = carrito.splice(index, 1)[0];
            prodInv.cantidad++
            carrito.push(prodInv);
            let val = parseInt(e.target.dataset.val);
            filtrado.precio = filtrado.precio + val;
            localStorage.carrito = JSON.stringify(carrito);
          } else {
            producto.cantidad = 1;
            carrito.push(producto);
            localStorage.carrito = JSON.stringify(carrito);
          }
        };
      });

      //toast
      let toast = document.querySelector('.toast');
      toast.style.opacity = "1";
      toast.style.display = "flex";
      function showToast() {
        toast.style.opacity = "0";
      }
      setTimeout(showToast, 5000);
      mostrarCarrito();
      badge();
    });
  });
};

// carrito
function mostrarCarrito() {
  let carritoDetalles = document.querySelector('#carritoDetalles');
  let carritoBody = document.querySelector('.carrito-body');
  carritoBody.innerHTML = '';
  let carrito = actualizarCarrito();
  let total = document.querySelector('.precio-total');

  if (carrito && carrito.length > 0) {
    carritoDetalles.style.display = "grid";
    let precioTotal = 0;
    carrito.forEach((item) => {
      precioTotal += item.precio;
      let val;
      productos.forEach((producto) => {
        if (item.id == producto.id) {
          val = producto.precio;
        }
      });

      let itemCarrito = document.createElement('div');
      itemCarrito.setAttribute('id', 'carritoItem');
      itemCarrito.classList.add('border-bottom', 'py-3')
      itemCarrito.innerHTML = `
        <div class="img-prod"><img src="${item.img}" /><span>${item.nombre}</span></div>
        <div class="text-center"><span>${item.cantidad}</span></div>
        <div class="text-center"><span>${Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3, style: 'currency', currency: 'USD' }).format(item.precio)}</span></div>
        <div class="productBtns text-center">
        <i id="restar" class="fs-3 bi bi-dash" data-id="${item.id}" data-val="${val}"></i>
        <i id="sumar" class="fs-3 bi bi-plus" data-id="${item.id}" data-val="${val}"></i>
        <i id="trash" class="bi bi-trash" data-id="${item.id}"></i>
        </div>`;
      carritoBody.appendChild(itemCarrito);

      btnSumarRestar();
    });

    let spanPrecio = document.createElement('span');
    total.innerText = "Total:";
    total.style.display = "block";
    total.appendChild(spanPrecio);
    spanPrecio.innerText = Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3, style: 'currency', currency: 'USD' }).format(precioTotal);

  } else {
    total.style.display = "none";
    carritoDetalles.style.display = "none";
    let span = document.createElement('span');
    span.textContent = 'No posee ningún producto en su carrito!';
    carritoBody.appendChild(span);
  };
};

// boton vaciar carrito
function vaciarCarrito() {
  let btnVaciar = document.querySelector('#reset');
  btnVaciar.addEventListener('click', () => {
    localStorage.clear();
    mostrarCarrito();
    badge();
  });
};

//botonos carrito
function btnSumarRestar() {
  let btnSumar = document.querySelectorAll('#sumar');
  let btnRestar = document.querySelectorAll('#restar');
  let btnTrash = document.querySelectorAll('#trash');
  let carrito = actualizarCarrito();

  carrito.forEach((item) => {

    btnSumar.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = parseInt(e.target.dataset.id);
        let val = parseInt(e.target.dataset.val);

        if (id == item.id) {
          item.cantidad++;
          item.precio = item.precio + val;
          localStorage.carrito = JSON.stringify(carrito);
          mostrarCarrito();
          badge();
        }
      });
    });

    btnRestar.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = parseInt(e.target.dataset.id);
        let val = parseInt(e.target.dataset.val);

        if (id == item.id) {

          let index = carrito.indexOf(item);
          item.cantidad--;
          item.precio = item.precio - val;
          localStorage.carrito = JSON.stringify(carrito);

          if (item.cantidad == 0) {
            let modal = document.querySelector('.modalEliminarProd');
            modal.style.display = "block";

            let conservar = document.querySelector('#mantenerProd');
            let eliminar = document.querySelector('#eliminarProd');

            eliminar.addEventListener("click", () => {
              carrito.splice(index, 1);
              localStorage.carrito = JSON.stringify(carrito);
              modal.style.display = "none";
              mostrarCarrito();
              badge();
            });

            conservar.addEventListener("click", () => {
              item.cantidad++;
              item.precio = item.precio + val;
              localStorage.carrito = JSON.stringify(carrito);
              modal.style.display = "none";
              mostrarCarrito();
            });
          };
          mostrarCarrito();
        };
      });
    });

    btnTrash.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        let id = parseInt(e.target.dataset.id);
        let index = carrito.indexOf(item);
        if (id == item.id) {
          carrito.splice(index, 1);
          localStorage.carrito = JSON.stringify(carrito);
          mostrarCarrito();
          badge();
        };
      });
    });
  });
};

// badge
let span = document.createElement('span');
function badge() {
  let carrito = actualizarCarrito();
  let iconoCarrito = document.querySelector('#logoCarrito');
  span.classList.add('position-absolute', 'translate-middle', 'badge', 'rounded-pill', 'bg-carrito');
  iconoCarrito.appendChild(span);
  
  if (carrito.length == 0) {
    span.remove();
  } else {
    let cantidadProd = 0;
    carrito.forEach((item) => {cantidadProd += item.cantidad});
    span.innerHTML = '';
    span.innerHTML = parseInt(`${cantidadProd}`);
  };
};
span.addEventListener('change', badge());

//filtros
function filtros() {
  let filtros = document.querySelectorAll('.filtros a');
  
  filtros.forEach((filtro) => {
    filtro.addEventListener('click', (e) => {
      let row = document.querySelector('.row');
      let cat = e.target.dataset.cat;
      
      let filtrado = productos.filter((producto) => producto.categoria == cat);  
      let articulos = mostrarProductos(filtrado);
      row.replaceChildren(...articulos);

      if(!cat){
        mostrarProductos(productos)
      };

      agregarCarrito(filtrado); 

      let modalFiltros = document.querySelector('#exampleModal3');
      modalFiltros.classList.add('show');
      modalFiltros.style.display = 'block';
      let divModalFiltros = document.createElement('div');
      divModalFiltros.classList.add('divModalFiltros');
      document.body.append(divModalFiltros);
      document.body.style.overflow = 'hidden';

      let btnModalFiltros = document.querySelector('.btnModalFiltros');
      btnModalFiltros.addEventListener('click', function () {
        modalFiltros.classList.remove('show');
        modalFiltros.style.display = 'none';
        divModalFiltros.classList.remove('divModalFiltros');
        document.body.style.overflow = 'scroll';
        divModalFiltros.remove();
        index = 11000;
        mensaje.remove();
      });

      let modalFiltros2 = document.querySelector('#modalFiltros');
      var mensaje = document.createElement('div');
      modalFiltros2.append(mensaje);
      mensaje.classList.add('modal-mensaje');
    
      var index = 11000;
      var intervalo = setInterval(() => {
        mensaje.innerText = `OFERTA EXCLUSIVA: Tienes ${(index / 1000) - 1} segundos para adquirirla!`;
        index -= 1000;
        if(index == 0) {
          mensaje.remove();
          modalFiltros.classList.remove('show');
          modalFiltros.style.display = 'none';
          divModalFiltros.classList.remove('divModalFiltros');
          document.body.style.overflow = 'scroll';
          divModalFiltros.remove();
          clearInterval(intervalo);
        }
      }, 1000);
    });
  });
};

// promo filtros
function modalFiltros() {
  let randomArray = [];
  let random = productos[Math.floor(Math.random()*productos.length)];
  randomArray.push(random);
  let randomProd = mostrarProductos(randomArray);
  
  let modalFiltros = document.querySelector('#modalFiltros');
  modalFiltros.appendChild(...randomProd);
  
  agregarCarrito(randomArray);
};

agregarCarrito(productos);
mostrarCarrito();
vaciarCarrito();
filtros();
modalFiltros();