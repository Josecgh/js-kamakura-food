//DEBE imprimir en pantalla la información de filtros.
import { products, filters } from "../assets/data/data.js";
import { mostrarContenidoCarrito } from "./cart.js";

export function mostrarFiltros(filters) {
  const filtros = document.getElementById('filters');
  filtros.innerHTML = ""; 

  filters.forEach(filtro => {
    const botonFiltro = document.createElement('button');
    botonFiltro.textContent = filtro;
    botonFiltro.className = "filter";
    filtros.appendChild(botonFiltro);
  });
}

export function mostrarProductos(products) {
  const productos = document.getElementById("products");
  productos.innerHTML = "";

  products.forEach(item => {
    const producto = document.createElement("div");
    producto.className = "product-container";
    const name = document.createElement("h3");
    name.textContent = `${item['name']}`;
    const descripcion = document.createElement("p");
    descripcion.textContent = `${item['description']}`;

    const priceContainer = document.createElement("div");
    priceContainer.className = "price-container";
    const h5Precio = document.createElement("h5");
    h5Precio.textContent = `${item.price} €`;
    const buttonAdd = document.createElement("button");
    buttonAdd.className = "add-button";
    buttonAdd.textContent = "Añadir";
    
    productos.appendChild(producto);
    producto.appendChild(name);
    producto.appendChild(descripcion);
    producto.appendChild(priceContainer);
    priceContainer.appendChild(h5Precio);
    priceContainer.appendChild(buttonAdd);

    buttonAdd.addEventListener("click", () => {
      const listaIds = JSON.parse(localStorage.getItem("carritoIds")) || [];

      if (listaIds.includes(item.id)) {
        alert("¡Cuidado! Este producto ya está en el carrito.");
      } else {
        listaIds.push(item.id);
        localStorage.setItem("carritoIds", JSON.stringify(listaIds));
        alert(`${item.name} añadido correctamente.`);
        mostrarContenidoCarrito(products);
      }
    });
  });
  // const productNull = document.getElementsByClassName("product-container")[0];
  // productNull.remove();
}

