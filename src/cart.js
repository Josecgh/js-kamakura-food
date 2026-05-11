import { products } from "../assets/data/data.js";
// Seleccionamos el elemento del carrito
const cartContainer = document.getElementById('cart-container');

export const openCart = () => {
  cartContainer.style.display = 'flex';
};

export const closeCart = () => {
  cartContainer.style.display = 'none';
}

export function mostrarContenidoCarrito(products) {
  const listaIds = JSON.parse(localStorage.getItem("carritoIds")) || [];
  console.log(listaIds);

  const carritoContainer = document.getElementById("cart-products");

  const cartContainer = document.querySelector(".cart-container");
  
  const h3NoProducts = document.querySelector("#cart-products > h3");
  
  const productosAnteriores = carritoContainer.querySelectorAll(".cart-container");
  productosAnteriores.forEach(prod => prod.remove());

  if(listaIds.length === 0) {
    h3NoProducts.style.display = "flex";
    cartContainer.style.display = "none";
  } else {
    
    listaIds.forEach((id, index) => {
      
      const productoEncontrado = products.find(p => String(p.id) === String(id));
      if(productoEncontrado) {
        const cartProduct = document.createElement("div");
        cartProduct.className = "cart-container";
        carritoContainer.appendChild(cartProduct);
        h3NoProducts.style.display = "none";
        cartProduct.style.display = "flex";

        console.log(cartContainer);
      
        const buttonClean = document.createElement("button");
        buttonClean.className = "close-button";
        cartProduct.appendChild(buttonClean);

        buttonClean.addEventListener("click", () => {
          let currentIds = JSON.parse(localStorage.getItem("carritoIds")) || [];
          currentIds.splice(index, 1);
          localStorage.setItem("carritoIds", JSON.stringify(currentIds));
          mostrarContenidoCarrito(products);
        })

        const crossImg = document.createElement("img");
        crossImg.src = "./assets/img/close.svg";
        crossImg.alt = "close";
        buttonClean.appendChild(crossImg);

        const contenedorProducto = document.createElement("div");
        contenedorProducto.className = "text-container";
        cartProduct.appendChild(contenedorProducto);

        const nombreProducto = document.createElement("h3");
        nombreProducto.textContent = productoEncontrado.name;
        contenedorProducto.appendChild(nombreProducto);

        const precioProducto = document.createElement("h5");
        precioProducto.textContent = "precio";
        contenedorProducto.appendChild(precioProducto);

        const selectorCantidad = document.createElement("div");
        selectorCantidad.className = "quantity-container";
        cartProduct.appendChild(selectorCantidad);

        const buttonMas = document.createElement("button");
        buttonMas.textContent = "+";
        const cantidad = document.createElement("p");
        cantidad.className = "quantity";
        cantidad.textContent = "1";
        const buttonMenos = document.createElement("button");
        buttonMenos.textContent = "-";

        selectorCantidad.appendChild(buttonMas);
        selectorCantidad.appendChild(cantidad);
        selectorCantidad.appendChild(buttonMenos);
      }
    });
  }
}