import { filters, products } from "../assets/data/data.js";
import { mostrarFiltros, mostrarProductos } from "./menu.js";

mostrarFiltros(filters);
mostrarProductos(products);

const contenedorFiltros = document.getElementById('filters');
const productos = document.getElementById("products");

// 2. ¡IMPORTANTE! Debes llamar a la función para que el event listener se registre
initFilterEvents(contenedorFiltros);

export function initFilterEvents(contenedor) {
  if (!contenedor) return; // Validación por si el ID no existe

  contenedor.addEventListener('click', (e) => {
    // Usamos trim() y toLowerCase() para evitar errores por espacios o mayúsculas
    const categoriaSelect = e.target.textContent.trim().toLowerCase();
    console.log("Categoría seleccionada:", categoriaSelect);
    
    seleccionarCategoria(categoriaSelect);
  });
}

function seleccionarCategoria(categoriaSelect) {
  productos.innerHTML = "";
  
  if (categoriaSelect === "todos") {
    mostrarProductos(products);
  } else {
    const filtrados = products.filter(p => p.category.toLowerCase() === categoriaSelect);
    mostrarProductos(filtrados);
  }
}