//Aquí intenta poner las funcionalidades del recibo
export const verRecibo = (products) => {
  const receipt = document.getElementById("receipt-container");
  const productsContainer = document.getElementById("products-container");
  const receiptProductsList = document.getElementById("receipt-product");
  const totalDisplay = document.getElementById("receipt-total");

  receipt.style.display = "flex";
  productsContainer.style.display = "none";

  // IMPORTANTE: Limpiamos el contenedor antes de empezar para no duplicar datos
  receiptProductsList.innerHTML = "";
  
  let sumaTotal = 0;
  const listaSimple = JSON.parse(localStorage.getItem("carritoIds")) || [];

  if (listaSimple.length !== 0) {
    listaSimple.forEach(item => {
      const productoEncontrado = products.find(p => String(p.id) === String(item.id));
      
      if (productoEncontrado) {
        const calculoSubtotal = productoEncontrado.price * item.cantidad;
        sumaTotal += calculoSubtotal;

        // Creamos un contenedor para cada producto individualmente
        const productRow = document.createElement("div");
        productRow.className = "receipt-product"; // Puedes darle estilos en CSS

        // Inyectamos la estructura necesaria
        productRow.innerHTML = `
          <h3>${productoEncontrado.name}</h3>
          <div class="receipt-price">
            <p>Cantidad: ${item.cantidad}</p>
            <h5>Subtotal: ${calculoSubtotal.toFixed(2)}€</h5>
          </div>
        `;

        // Lo agregamos a la lista del recibo
        receiptProductsList.appendChild(productRow);
      }
    });
  } else {
    receiptProductsList.innerHTML = "<h3>Aún no has escogido tu orden</h3>";
  }
  totalDisplay.textContent = `Total: ${sumaTotal.toFixed(2)} €`;

  const paybutton = document.getElementById("pay-button");
  paybutton.addEventListener('click', procederPago)
};

export const ocultarRecibo = () => {
  const receipt = document.getElementById("receipt-container");
  receipt.style.display = "none";
  const productsContainer = document.getElementById("products-container");
  productsContainer.style.display = "flex";
}

// Asumiendo que tienes una función que renderiza los productos iniciales, 
// por ejemplo: import { renderHome } from "./home.js";

export const procederPago = () => {
  const receipt = document.getElementById("receipt-container");
  const productosContainer = document.getElementById("products-container");
  const listaProductos = JSON.parse(localStorage.getItem("carritoIds")) || [];

  if (listaProductos.length !== 0) {
    // Crear el Overlay (Fondo oscuro)
    const overlay = document.createElement("section");
    overlay.className = "modal-overlay"; // <-- CLASE CSS
    
    // Crear el Modal
    const modal = document.createElement("div");
    modal.className = "modal-content"; // <-- CLASE CSS

    // Botón cerrar
    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close-btn"; // <-- CLASE CSS
    
    const imgClose = document.createElement("img");
    imgClose.src = "./assets/img/close.svg";
    imgClose.className = "modal-close-icon"; // <-- CLASE CSS
    closeBtn.appendChild(imgClose);

    // Lógica de reset
    closeBtn.onclick = () => {
      overlay.remove();
      window.location.reload(); 
    };

    const title = document.createElement("h2");
    title.textContent = "Gracias por tu Compra";
    title.className = "modal-title"; // <-- CLASE CSS

    const text = document.createElement("p");
    text.textContent = "¡Pedido realizado con éxito, gracias por comprar en Kamakura Food!";
    text.className = "modal-text"; // <-- CLASE CSS

    const logo = document.createElement("img");
    logo.src = "./assets/img/logo.svg"; 
    logo.alt = "Kamakura Food Logo";
    logo.className = "modal-logo"; // <-- CLASE CSS

    // Construcción de la estructura
    modal.appendChild(closeBtn);
    modal.appendChild(title);
    modal.appendChild(text);
    modal.appendChild(logo);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    localStorage.removeItem("carritoIds");
    
    if (receipt) {
      receipt.style.display = "none";
      productosContainer.style.display = "flex";
    }

  } else {
    const mensajeExistente = receipt.querySelector(".error-message");
    if(!mensajeExistente) {
      const message = document.createElement("p");
      message.textContent = "Tu orden está vacía";
      message.className = "error-message"; // <-- CLASE CSS
      setTimeout(() => message.remove(), 3000)
      receipt.appendChild(message);
    }
  }
};