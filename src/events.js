import { closeCart, openCart } from "./cart.js";
import { initFilterEvents } from "./searcher.js";
//Intenta separar los eventos en este archivo.

initFilterEvents;

const btnOpenCart = document.getElementById('cart');
btnOpenCart.addEventListener('click', openCart);

const btnCloseCart = document.querySelector(".close-button");
btnCloseCart.addEventListener('click', closeCart);