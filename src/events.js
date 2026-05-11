import { products } from "../assets/data/data.js";
import { closeCart, mostrarContenidoCarrito, openCart } from "./cart.js";
import { initFilterEvents } from "./searcher.js";
//Intenta separar los eventos en este archivo.

initFilterEvents;

const btnCart = document.getElementById('cart');
btnCart.addEventListener('click', openCart);

btnCart.addEventListener('dblclick', closeCart);

mostrarContenidoCarrito(products);