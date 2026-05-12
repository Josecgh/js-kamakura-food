import { products } from "../assets/data/data.js";

// Seleccionamos el elemento del carrito (el modal/overlay)
const modalCarrito = document.getElementById('cart-container');

export const openCart = () => {
  modalCarrito.style.display = 'flex';
};

export const closeCart = () => {
  modalCarrito.style.display = 'none';
}

export function mostrarContenidoCarrito(products) {
  // 1. Obtenemos la lista de objetos {id, cantidad}
  const listaProductos = JSON.parse(localStorage.getItem("carritoIds")) || [];
  
  const carritoContainer = document.getElementById("cart-products");
  const h3NoProducts = document.querySelector("#cart-products > h3");
  
  // 2. Limpiamos solo los productos dibujados anteriormente
  const productosAnteriores = carritoContainer.querySelectorAll(".cart-container");
  productosAnteriores.forEach(prod => prod.remove());

  // 3. Si el carrito está vacío
  if (listaProductos.length === 0) {
    if (h3NoProducts) h3NoProducts.style.display = "flex";
    return; // Cortamos la ejecución aquí
  } 

  if (h3NoProducts) h3NoProducts.style.display = "none";

  // 4. Dibujamos cada producto
  listaProductos.forEach((item, index) => {
    // IMPORTANTE: Extraemos el ID y la cantidad del objeto
    const idProducto = item.id;
    const cantidadActual = item.cantidad || 1;
    
    const productoEncontrado = products.find(p => String(p.id) === String(idProducto));

    if (productoEncontrado) {
      const cartProduct = document.createElement("div");
      cartProduct.className = "cart-container";
      cartProduct.style.display = "flex";
      carritoContainer.appendChild(cartProduct);

      // --- BOTÓN ELIMINAR ---
      const buttonClean = document.createElement("button");
      buttonClean.className = "close-button";
      cartProduct.appendChild(buttonClean);

      buttonClean.addEventListener("click", () => {
        let currentIds = JSON.parse(localStorage.getItem("carritoIds")) || [];
        currentIds.splice(index, 1);
        localStorage.setItem("carritoIds", JSON.stringify(currentIds));
        mostrarContenidoCarrito(products);
      });

      const crossImg = document.createElement("img");
      crossImg.src = "./assets/img/close.svg";
      crossImg.alt = "close";
      buttonClean.appendChild(crossImg);

      // --- INFO ---
      const contenedorProducto = document.createElement("div");
      contenedorProducto.className = "text-container";
      cartProduct.appendChild(contenedorProducto);

      const nombreProducto = document.createElement("h3");
      nombreProducto.textContent = productoEncontrado.name;
      contenedorProducto.appendChild(nombreProducto);

      const precioProducto = document.createElement("h5");
      precioProducto.textContent = `${productoEncontrado.price} €`;
      contenedorProducto.appendChild(precioProducto);

      // --- SELECTOR CANTIDAD ---
      const selectorCantidad = document.createElement("div");
      selectorCantidad.className = "quantity-container";
      cartProduct.appendChild(selectorCantidad);

      const buttonMas = document.createElement("button");
      buttonMas.textContent = "+";
      
      const cantidadLabel = document.createElement("p");
      cantidadLabel.className = "quantity";
      cantidadLabel.textContent = cantidadActual;
      
      const buttonMenos = document.createElement("button");
      buttonMenos.textContent = "-";

      // --- LÓGICA DE ACTUALIZACIÓN ---
      const actualizarStorage = (nuevaCantidad) => {
        let currentCarrito = JSON.parse(localStorage.getItem("carritoIds")) || [];
        currentCarrito[index].cantidad = nuevaCantidad;
        localStorage.setItem("carritoIds", JSON.stringify(currentCarrito));
        mostrarContenidoCarrito(products);
      };

      buttonMas.addEventListener("click", () => {
        actualizarStorage(cantidadActual + 1);
        calcularTotal(products);
      });

      buttonMenos.addEventListener("click", () => {
        if (cantidadActual > 1) {
          actualizarStorage(cantidadActual - 1);
          calcularTotal(products);
        }
      });

      selectorCantidad.appendChild(buttonMas);
      selectorCantidad.appendChild(cantidadLabel);
      selectorCantidad.appendChild(buttonMenos);
    }
  });
}

export function calcularTotal(products) {
  const listaProductos = JSON.parse(localStorage.getItem("carritoIds")) || [];
  const total = document.getElementById("cart-total");
  let sumaTotal = 0;

  listaProductos.forEach(item => {
    const idItem = item.id;
    const cantidadItem = item.cantidad;
    
    const productoEncontrado = products.find(p => String(p.id) === String(idItem))

    if(productoEncontrado) {
      const subtotal = productoEncontrado.price * cantidadItem;
      sumaTotal += subtotal;
    }
  });

  if(total) {
    total.textContent = `Total: ${sumaTotal.toFixed(2)} €`;
  }
}

export const procederPago = () => {
  
}