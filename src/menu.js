//DEBE imprimir en pantalla la información de filtros.
import { products, filters } from "../assets/data/data.js";

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

  products.forEach(products => {
    const producto = document.createElement("div");
    producto.className = "product-container";
    const name = document.createElement("h3");
    name.textContent = `${products['name']}`;
    const descripcion = document.createElement("p");
    descripcion.textContent = `${products['description']}`;

    const priceContainer = document.createElement("div");
    priceContainer.className = "price-container";
    const h5Precio = document.createElement("h5");
    h5Precio.textContent = `${products.price} €`;
    const buttonAdd = document.createElement("button");
    buttonAdd.className = "add-button";
    buttonAdd.textContent = "Añadir";
    
    productos.appendChild(producto);
    producto.appendChild(name);
    producto.appendChild(descripcion);
    producto.appendChild(priceContainer);
    priceContainer.appendChild(h5Precio);
    priceContainer.appendChild(buttonAdd);
  });
  // const productNull = document.getElementsByClassName("product-container")[0];
  // productNull.remove();
}

