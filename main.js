"use strict";

// local storage
function actualizarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (!carrito) {
    localStorage.setItem("carrito", JSON.stringify([]));
  }
  return carrito;
}

// Abre carrito

function abrirCarrito() {
  let icono = document.querySelector("#logoCarrito");
  icono.addEventListener("click", function () {
    crearCarrito();
    let modal = document.querySelector(".principal");
    if (modal.style) {
      document.body.style = "overflow: hidden; padding-right: 17px;";
      document.body.classList.add("modal-open");
      document.querySelector("nav").style = "padding-right: 17px;";
      modal.classList.add("show");
      modal.style.display = "block";
    }

    let btnClose = document.querySelectorAll(".btn-close")[2];
    let btnContinuar = document.querySelector(".btn-secondary");
    [btnClose, btnContinuar].forEach((btn) => {
      btn.addEventListener("click", function () {
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.style = "";
        document.body.classList.remove("modal-open");
        document.querySelector("nav").style = "";
        location.reload();
      });
    });
  });
}

// Creo carrito DOM
function crearCarrito() {
  let modalCheck = document.querySelector(".principal");
  if (!modalCheck) {
    let modal = document.createElement("div");
    modal.classList.add("modal", "fade", "principal");
    modal.id = "exampleModal";

    let modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-view", "modal-dialog");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-view-content", "modal-content");

    let modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    let modalTitle = document.createElement("h1");
    modalTitle.classList.add("modal-title", "fs-5");
    modalTitle.id = "exampleModalLabel";
    modalTitle.innerText = "Tu Carrito";

    let btnHeader = document.createElement("button");
    btnHeader.classList.add("btn-close");

    let modalBody = document.createElement("div");
    modalBody.classList.add("modal-body", "overflow-auto", "body-unique");

    let carritoDetalles = document.createElement("div");
    carritoDetalles.classList.add(
      "carritoItem",
      "fw-semibold",
      "border-bottom"
    );
    carritoDetalles.id = "carritoDetalles";

    let textProductos = document.createElement("div");
    textProductos.classList.add("text-center");
    textProductos.innerText = "Productos";

    let textCantidad = document.createElement("div");
    textCantidad.classList.add("text-center");
    textCantidad.innerText = "Cantidad";

    let textPrecio = document.createElement("div");
    textPrecio.classList.add("text-center");
    textPrecio.innerText = "Precio";

    let carritoBody = document.createElement("div");
    carritoBody.classList.add("carrito-body");

    let precioTotal = document.createElement("div");
    precioTotal.classList.add("precio-total", "fw-semibold");

    let modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");

    let buttonVaciar = document.createElement("button");
    let buttonContinuar = document.createElement("button");
    let buttonPagar = document.createElement("button");

    buttonVaciar.classList.add("btn", "btn-danger");
    buttonContinuar.classList.add("btn", "btn-secondary");
    buttonPagar.classList.add("btn", "btn-primary", "btn-pago");

    buttonVaciar.id = "reset";

    buttonVaciar.innerText = "Vaciar carrito";
    buttonContinuar.innerText = "Continuar comprando";
    buttonPagar.innerText = "Continuar";

    buttonContinuar.setAttribute("data-bs-dismiss", "modal");
    buttonVaciar.setAttribute("data-bs-vaciar", "vaciar");

    document.body.appendChild(modal);
    modal.appendChild(modalDialog);
    modalDialog.appendChild(modalContent);
    modalContent.append(modalHeader, modalBody, precioTotal, modalFooter);

    modalHeader.append(modalTitle, btnHeader);

    modalBody.append(carritoDetalles, carritoBody);

    carritoDetalles.append(textProductos, textCantidad, textPrecio);

    modalFooter.append(buttonVaciar, buttonContinuar, buttonPagar);
  }
}

// agregar al carrito
function agregarCarrito(productos) {
  let btnAgregar = document.querySelectorAll("#btnAgregar");
  btnAgregar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      crearCarrito();
      productos.forEach((producto) => {
        if (e.target.getAttribute("data-id") == producto.id) {
          let carrito = actualizarCarrito();
          let filtrado = carrito?.filter((item) => item.id == producto.id)[0];
          if (filtrado) {
            let index = carrito.indexOf(filtrado);
            let prodInv = carrito.splice(index, 1)[0];
            prodInv.cantidad++;
            carrito.push(prodInv);
            let val = parseInt(e.target.dataset.val);
            filtrado.precio = filtrado.precio + val;
            localStorage.carrito = JSON.stringify(carrito);
          } else {
            producto.cantidad = 1;
            carrito.push(producto);
            localStorage.carrito = JSON.stringify(carrito);
          }
        }
      });

      //toast
      let toast = document.querySelector(".toast");
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
}

// carrito
function mostrarCarrito() {
  let modalBody = document.querySelectorAll(".modal-body")[2];

  let modalBodyChildren = document.querySelectorAll(".body-unique *");
  modalBodyChildren.forEach((item) => item.remove());

  let carritoDetalles = document.createElement("div");
  let carritoBody = document.createElement("div");

  modalBody.append(carritoDetalles, carritoBody);

  carritoBody.classList.add("carrito-body");
  carritoDetalles.id = "carritoDetalles";

  let carrito = actualizarCarrito();
  let total = document.querySelector(".precio-total");

  let btnDisabled = document.querySelector(".btn-pago");
  if (!carrito || carrito.length == 0) {
    btnDisabled.disabled = true;
  } else {
    btnDisabled.disabled = false;
  }

  if (carrito && carrito.length > 0) {
    if (carritoDetalles) {
      carritoDetalles.style.display = "grid";
    }
    let precioTotal = 0;
    carrito.forEach((item) => {
      precioTotal += item.precio;
      let val;
      productos.forEach((producto) => {
        if (item.id == producto.id) {
          val = producto.precio;
        }
      });

      let itemCarrito = document.createElement("div");
      itemCarrito.setAttribute("id", "carritoItem");
      itemCarrito.classList.add("border-bottom", "py-3");
      itemCarrito.innerHTML = `
        <div class="img-prod"><img src="${item.img}" /><span>${
        item.nombre
      }</span></div>
        <div class="text-center"><span>${item.cantidad}</span></div>
        <div class="text-center"><span>${Intl.NumberFormat("de-DE", {
          maximumSignificantDigits: 3,
          style: "currency",
          currency: "USD",
        }).format(item.precio)}</span></div>
        <div class="productBtns text-center">
        <i id="restar" class="fs-3 bi bi-dash" data-id="${
          item.id
        }" data-val="${val}"></i>
        <i id="sumar" class="fs-3 bi bi-plus" data-id="${
          item.id
        }" data-val="${val}"></i>
        <i id="trash" class="bi bi-trash" data-id="${item.id}"></i>
        </div>`;
      carritoBody?.appendChild(itemCarrito);

      btnSumarRestar();
    });

    let spanPrecio = document.createElement("span");
    total.innerText = "Total:";
    total.style.display = "block";
    total.appendChild(spanPrecio);
    spanPrecio.innerText = Intl.NumberFormat("de-DE", {
      maximumSignificantDigits: 3,
      style: "currency",
      currency: "USD",
    }).format(precioTotal);
  } else {
    if (total) {
      total.style.display = "none";
    }
    if (carritoDetalles) {
      carritoDetalles.style.display = "none";
    }
    let span = document.createElement("span");
    span.textContent = "No posee ningún producto en su carrito!";
    carritoBody?.appendChild(span);
  }

  continuar();
}

// boton vaciar carrito
function vaciarCarrito() {
  let btnVaciar = document.querySelector("#reset");
  btnVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    badge();
  });
}

//botonos carrito
function btnSumarRestar() {
  let btnSumar = document.querySelectorAll("#sumar");
  let btnRestar = document.querySelectorAll("#restar");
  let btnTrash = document.querySelectorAll("#trash");
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
            let modal = document.querySelector(".modalEliminarProd");
            modal.style.display = "block";

            let conservar = document.querySelector("#mantenerProd");
            let eliminar = document.querySelector("#eliminarProd");

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
          }
          mostrarCarrito();
        }
      });
    });

    btnTrash.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = parseInt(e.target.dataset.id);
        let index = carrito.indexOf(item);
        if (id == item.id) {
          carrito.splice(index, 1);
          localStorage.carrito = JSON.stringify(carrito);
          mostrarCarrito();
          badge();
        }
      });
    });
  });
}

// badge
let span = document.createElement("span");
function badge() {
  let carrito = actualizarCarrito();
  let iconoCarrito = document.querySelector("#logoCarrito");
  span.classList.add(
    "position-absolute",
    "translate-middle",
    "badge",
    "rounded-pill",
    "bg-carrito"
  );
  iconoCarrito.appendChild(span);

  if (carrito.length == 0) {
    span.remove();
  } else {
    let cantidadProd = 0;
    carrito.forEach((item) => {
      cantidadProd += item.cantidad;
    });
    span.innerHTML = "";
    span.innerHTML = parseInt(`${cantidadProd}`);
  }
}
span.addEventListener("change", badge());

//filtros
function filtros() {
  let filtros = document.querySelectorAll(".filtros a");

  filtros.forEach((filtro) => {
    filtro.addEventListener("click", (e) => {
      let row = document.querySelector(".row");
      let cat = e.target.dataset.cat;

      let filtrado = productos.filter((producto) => producto.categoria == cat);
      let articulos = mostrarProductos(filtrado);
      row.replaceChildren(...articulos);

      if (!cat) {
        mostrarProductos(productos);
      }

      agregarCarrito(filtrado);

      let modalFiltros = document.querySelector("#exampleModal3");
      modalFiltros.classList.add("show");
      modalFiltros.style.display = "block";
      let divModalFiltros = document.createElement("div");
      divModalFiltros.classList.add("divModalFiltros");
      document.body.append(divModalFiltros);
      document.body.style.overflow = "hidden";

      let btnModalFiltros = document.querySelector(".btnModalFiltros");
      btnModalFiltros.addEventListener("click", function () {
        modalFiltros.classList.remove("show");
        modalFiltros.style.display = "none";
        divModalFiltros.classList.remove("divModalFiltros");
        document.body.style.overflow = "scroll";
        divModalFiltros.remove();
        index = 11000;
      });

      let modalFiltros2 = document.querySelector("#modalFiltros");
      if (!document.querySelector(".modal-mensaje")) {
        var mensaje = document.createElement("div");
        modalFiltros2.append(mensaje);
        mensaje.classList.add("modal-mensaje");
      }

      var index = 11000;
      var intervalo = setInterval(() => {
        mensaje.innerText = `OFERTA EXCLUSIVA: Tienes ${
          index / 1000 - 1
        } segundos para adquirirla!`;
        index -= 1000;
        if (index == 0) {
          modalFiltros.classList.remove("show");
          modalFiltros.style.display = "none";
          divModalFiltros.classList.remove("divModalFiltros");
          document.body.style.overflow = "scroll";
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
  let random = productos[Math.floor(Math.random() * productos.length)];
  randomArray.push(random);
  let randomProd = mostrarProductos(randomArray);

  let modalFiltros = document.querySelector("#modalFiltros");
  modalFiltros.appendChild(...randomProd);

  agregarCarrito(randomArray);
};

function continuar() {
  let btn = document.querySelector(".btn-pago");
  let tarjeta = JSON.parse(localStorage.getItem("tarjeta"));

  btn.addEventListener("click", function () {
    btn.style.display = "none";
    let modalBody = document.querySelectorAll(".modal-body")[2];
    modalBody.innerHTML = "";

    if (!tarjeta) {
      let form = document.createElement("form");
      let inputTarjeta = document.createElement("input");
      let inputNombre = document.createElement("input");
      let inputVencimiento = document.createElement("input");
      let inputCCV = document.createElement("input");
      let button = document.createElement("button");

      form.classList.add("form");
      button.classList.add("btn", "btn-success", "guardar");

      modalBody.appendChild(form);
      form.append(
        inputTarjeta,
        inputNombre,
        inputVencimiento,
        inputCCV,
        button
      );

      inputTarjeta.placeholder = "NUMERO DE LA TARJETA";
      inputNombre.placeholder = "NOMBRE DEL TITULAR";
      inputVencimiento.placeholder = "VENCIMIENTO";
      inputCCV.placeholder = "CCV";

      inputTarjeta.type = "number";
      inputNombre.type = "text";
      inputVencimiento.type = "text";
      inputCCV.type = "number";

      inputTarjeta.classList.add("inputTarjeta");
      inputNombre.classList.add("inputNombre");
      inputVencimiento.classList.add("inputVencimiento");
      inputCCV.classList.add("inputCCV");

      button.innerText = "Confirmar datos de tarjeta";

      let inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.setCustomValidity("El campo no puede quedar vacio");
      });

      checkerInput();

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let data = {
          numero: inputTarjeta.value,
          nombre: inputNombre.value,
          vencimiento: inputVencimiento.value,
          ccv: inputCCV.value,
        };

        localStorage.setItem("tarjeta", JSON.stringify(data));
        modalBody.innerHTML = "";
        let p = document.createElement("p");
        modalBody.appendChild(p);
        p.innerHTML = `Gracias por confirmar su tarjeta <span style="font-weight:bold;">${inputNombre.value}</span>. <br />
        <span style="font-weight:bold;">Presione PAGAR</span> para terminar con su compra`;
        pagar();
      });
    } else {
      let p = document.createElement("p");
      modalBody.appendChild(p);
      p.innerHTML = `Usted ya tiene una tarjeta cargada. <br />
      <span style="font-weight:bold;">Presione PAGAR</span> para terminar con su compra`;
      pagar();
    }
  });
};

function pagar() {
  let modalFooter = document.querySelectorAll(".modal-footer")[1];
  let btnPagar = document.querySelector(".btn-new");
  btnPagar?.remove();

  let newBtn = document.createElement("button");
  newBtn.classList.add("btn", "btn-primary", "btn-new");
  modalFooter.append(newBtn);
  newBtn.innerText = "Pagar";

  newBtn.addEventListener("click", function () {
    let btnPagar = document.querySelector(".btn-new");
    btnPagar?.remove();

    let botonContinuar = document.querySelector(".btn-pago");
    botonContinuar.style.display = "block";

    localStorage.setItem("carrito", JSON.stringify([]));
    let modal = document.querySelector(".show");
    let modalBack = document.querySelector(".modal-backdrop");

    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.removeAttribute("aria-modal");
      modal.setAttribute("aria-hidde", "true");
    }
    modalBack?.remove();
    document.body.style = "overflow-y: scroll";
    badge();
    crearCarrito();
    mostrarCarrito();

    // toast que muestra mensaje de agradecimiento
    let toast = document.querySelector(".toast");
    let toastBody = document.querySelector(".toast-body");
    toastBody.textContent = "¡ Gracias por tu compra !";
    toast.style.opacity = "1";
    toast.style.display = "flex";

    function showToast() {
      toast.style.opacity = "0";
    }

    setTimeout(showToast, 10000);
  });
};

function checkerInput() {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.trim().length < 1) {
        e.target.setCustomValidity("No puede haber campos vacios");
      } else {
        e.target.setCustomValidity("");
      }
    });
  });

  // Número de tarjeta
  document.querySelector(".inputTarjeta").addEventListener('input', (e)=>{
    if(e.target.value.length !== 16){
        e.target.setCustomValidity("El numero de la tarjeta debe tener 16 números sin espacios.");
    } else {
        e.target.setCustomValidity("");
    }
  });

  // CCV
  document.querySelector(".inputCCV").addEventListener('input', (e)=>{
    if(e.target.value.length !== 3){
        e.target.setCustomValidity("El CCV debe estar compuesto de tres números, Ejemplo: 109.");
    } else {
        e.target.setCustomValidity("");
    }
  });
};


crearCarrito();
abrirCarrito();
agregarCarrito(productos);
mostrarCarrito();
vaciarCarrito();
filtros();
modalFiltros();