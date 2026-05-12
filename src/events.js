import { products } from "../assets/data/data.js";
import { calcularTotal, openCart, closeCart, mostrarContenidoCarrito } from "./cart.js";
import { ocultarRecibo, verRecibo } from "./receipt.js";
import { initFilterEvents } from "./searcher.js";
//Intenta separar los eventos en este archivo.

initFilterEvents;

const btnCart = document.getElementById('cart');
btnCart.addEventListener('click', openCart);

btnCart.addEventListener('dblclick', closeCart);

mostrarContenidoCarrito(products);

const proceedButon = document.getElementById("proceedPay-button");
proceedButon.addEventListener('click', () => {
  verRecibo(products);
});

const closeReceipt = document.getElementById("close-receipt");
closeReceipt.addEventListener('click', ocultarRecibo);