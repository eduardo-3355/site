document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    alert('Produto adicionado ao carrinho!');
  });
});
// Cria um array para armazenar os itens do carrinho
let cart = [];

// Função para atualizar o número de itens no carrinho
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

// Função para adicionar um item ao carrinho
function addToCart(product) {
  cart.push(product);
  updateCartCount();
  saveCartToLocalStorage(); // Salva o carrinho no LocalStorage
  alert(`${product.name} foi adicionado ao carrinho!`);
}

// Função para salvar o carrinho no LocalStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Função para carregar o carrinho do LocalStorage
function loadCartFromLocalStorage() {
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  if (savedCart) {
    cart = savedCart;
  }
  updateCartCount();
  renderCartItems();
}

// Função para renderizar os itens no carrinho
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  let total = 0;

  cartItemsContainer.innerHTML = ""; // Limpa o carrinho

  cart.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>R$ ${item.price}</p>
      <button class="btn" onclick="removeFromCart(${cart.indexOf(item)})">Remover</button>
    `;
    cartItemsContainer.appendChild(itemElement);
    total += item.price;
  });

  totalPrice.textContent = total.toFixed(2);
}

// Função para remover um item do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  saveCartToLocalStorage();
  renderCartItems();
}

// Quando o documento carrega
document.addEventListener("DOMContentLoaded", function() {
  loadCartFromLocalStorage(); // Carrega o carrinho do LocalStorage na inicialização
});
