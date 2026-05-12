//Aquí intenta poner las funcionalidades del recibo
export const verRecibo = () => {
  const receipt = document.getElementById("receipt-container");
  receipt.style.display = "flex";
  const productsContainer = document.getElementById("products-container");
  productsContainer.style.display = "none";
}

export const ocultarRecibo = () => {
  const receipt = document.getElementById("receipt-container");
  receipt.style.display = "none";
  const productsContainer = document.getElementById("products-container");
  productsContainer.style.display = "flex";
}

export const procederPago = () => {
  const listaProductos = JSON.parse(localStorage.getItem("carritoId")) || [];

  if(listaProductos.length === 0) {

  }
}