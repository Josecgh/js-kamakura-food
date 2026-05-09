// Seleccionamos el elemento del carrito
const cartContainer = document.getElementById('cart-container');

export const openCart = () => {
  cartContainer.style.display = 'flex';
};

export const closeCart = () => {
  cartContainer.style.display = 'none';
}