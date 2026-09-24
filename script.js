const products = [
  { id: 1, name: "Maçã Fuji", unit: "500g", price: 7.9, category: "Frutas", emoji: "🍎", tag: "Mais pedido" },
  { id: 2, name: "Banana-prata", unit: "1kg", price: 6.5, category: "Frutas", emoji: "🍌", tag: "Do sítio" },
  { id: 3, name: "Tomate italiano", unit: "500g", price: 8.9, category: "Legumes", emoji: "🍅", tag: "Fresquinho" },
  { id: 4, name: "Cenoura orgânica", unit: "500g", price: 5.9, category: "Legumes", emoji: "🥕", tag: "Orgânico" },
  { id: 5, name: "Alface crespa", unit: "unidade", price: 4.5, category: "Verduras", emoji: "🥬", tag: "Colhido hoje" },
  { id: 6, name: "Abacate", unit: "unidade", price: 9.9, category: "Frutas", emoji: "🥑", tag: "Da estação" },
  { id: 7, name: "Ovos caipiras", unit: "dúzia", price: 14.9, category: "Especiais", emoji: "🥚", tag: "Artesanal" },
  { id: 8, name: "Mel silvestre", unit: "250g", price: 18.5, category: "Especiais", emoji: "🍯", tag: "Natural" },
];

const state = {
  category: "Todos",
  search: "",
  cart: [],
  stock: JSON.parse(localStorage.getItem("verdejarStock") || "[]"),
};
const productGrid = document.querySelector("#product-grid");
const productTemplate = document.querySelector("#product-template");
const emptyState = document.querySelector("#empty-state");
const cartPanel = document.querySelector("#cart-panel");
const cartOverlay = document.querySelector("#cart-overlay");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const loginScreen = document.querySelector("#login-screen");
const loginForm = document.querySelector("#login-form");
const formMessage = document.querySelector("#form-message");
const userGreeting = document.querySelector("#user-greeting");
const signupForm = document.querySelector("#signup-form");
const signupMessage = document.querySelector("#signup-message");
const loginSwitch = document.querySelector("#login-switch");
const signupSwitch = document.querySelector("#signup-switch");
const stockForm = document.querySelector("#stock-form");
const stockTableBody = document.querySelector("#stock-table-body");
const stockEmpty = document.querySelector("#stock-empty");
const stockMessage = document.querySelector("#stock-message");
const stockItemsCount = document.querySelector("#stock-items-count");
const stockTotalValue = document.querySelector("#stock-total-value");
const stockTotalProfit = document.querySelector("#stock-total-profit");

function showSignup() {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  loginSwitch.classList.add("hidden");
  signupSwitch.classList.remove("hidden");
  document.querySelector(".login-card .eyebrow").textContent = "Faça seu cadastro";
  document.querySelector(".login-card h1").innerHTML = "Crie sua conta<br /><em>e aproveite.</em>";
  document.querySelector(".login-description").textContent = "Preencha seus dados para começar a comprar fresquinho.";
  signupMessage.textContent = "";
}

function showLogin() {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  signupSwitch.classList.add("hidden");
  loginSwitch.classList.remove("hidden");
  document.querySelector(".login-card .eyebrow").textContent = "Bem-vindo à nossa quitanda";
  document.querySelector(".login-card h1").innerHTML = "Entre para comprar<br /><em>fresquinho.</em>";
  document.querySelector(".login-description").textContent = "Informe seus dados para acessar a feira de hoje.";
  formMessage.textContent = "";
}

function showAuthenticatedUser() {
  const savedUser = JSON.parse(localStorage.getItem("verdejarUser"));
  if (!savedUser) return;
  document.body.classList.add("authenticated");
  loginScreen.classList.add("hidden");
  userGreeting.textContent = `Olá, ${savedUser.name.split(" ")[0]}`;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  if (!loginForm.checkValidity()) {
    formMessage.textContent = "Preencha seu nome e uma senha com pelo menos 6 caracteres.";
    loginForm.reportValidity();
    return;
  }
  const formData = new FormData(loginForm);
  const savedUser = JSON.parse(localStorage.getItem("verdejarUser") || "null");
  const user = {
    name: formData.get("name").trim(),
    email: savedUser?.email || "",
  };
  localStorage.setItem("verdejarUser", JSON.stringify(user));
  loginForm.reset();
  showAuthenticatedUser();
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signupMessage.textContent = "";
  if (!signupForm.checkValidity()) {
    signupMessage.textContent = "Use nome completo, e-mail válido e uma senha forte.";
    signupForm.reportValidity();
    return;
  }
  const formData = new FormData(signupForm);
  const password = formData.get("password");
  const confirmation = formData.get("password-confirm");
  if (password !== confirmation) {
    signupMessage.textContent = "As duas senhas precisam ser iguais.";
    return;
  }
  const user = { name: formData.get("name").trim(), email: formData.get("email").trim() };
  localStorage.setItem("verdejarUser", JSON.stringify(user));
  signupForm.reset();
  showAuthenticatedUser();
});

document.querySelector("#show-signup").addEventListener("click", showSignup);
document.querySelector("#show-login").addEventListener("click", showLogin);

document.querySelectorAll(".toggle-password").forEach((button) => {
  button.addEventListener("click", () => {
    const passwordInput = document.querySelector(`#${button.dataset.passwordTarget}`);
    const showingPassword = passwordInput.type === "text";
    passwordInput.type = showingPassword ? "password" : "text";
    button.textContent = showingPassword ? "Mostrar" : "Ocultar";
    button.setAttribute("aria-label", `${showingPassword ? "Mostrar" : "Ocultar"} senha`);
  });
});

document.querySelector("#logout-button").addEventListener("click", () => {
  localStorage.removeItem("verdejarUser");
  document.body.classList.remove("authenticated");
  loginScreen.classList.remove("hidden");
  cartPanel.classList.remove("open");
  formMessage.textContent = "";
  showLogin();
});

const formatPrice = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function getFilteredProducts() {
  return products.filter((product) => {
    const matchesCategory =
      state.category === "Todos" || product.category === state.category;
    const matchesSearch = product.name
      .toLocaleLowerCase("pt-BR")
      .includes(state.search.toLocaleLowerCase("pt-BR"));
    return matchesCategory && matchesSearch;
  });
}

function renderProducts() {
  productGrid.innerHTML = "";
  const filteredProducts = getFilteredProducts();
  emptyState.classList.toggle("hidden", filteredProducts.length > 0);

  filteredProducts.forEach((product) => {
    const card = productTemplate.content.cloneNode(true);
    card.querySelector(".product-emoji").textContent = product.emoji;
    card.querySelector(".product-tag").textContent = product.tag;
    card.querySelector(".product-name").textContent = product.name;
    card.querySelector(".product-unit").textContent = product.unit;
    card.querySelector(".product-price").textContent = formatPrice(product.price);
    card.querySelector(".add-button").addEventListener("click", () => addToCart(product.id));
    productGrid.appendChild(card);
  });
}

function addToCart(productId) {
  const item = state.cart.find((cartItem) => cartItem.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    state.cart.push({ id: productId, quantity: 1 });
  }
  renderCart();
  openCart();
}

function changeQuantity(productId, change) {
  const item = state.cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== productId);
  }
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.cart.reduce((total, item) => {
    const product = products.find((currentProduct) => currentProduct.id === item.id);
    return total + product.price * item.quantity;
  }, 0);
  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(totalPrice);

  if (state.cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Sua sacola está vazia.<br />Escolha algo bem gostoso!</p>';
    return;
  }

  state.cart.forEach((item) => {
    const product = products.find((currentProduct) => currentProduct.id === item.id);
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-item-image">${product.emoji}</div>
      <div>
        <h3>${product.name}</h3>
        <p>${formatPrice(product.price)} / ${product.unit}</p>
        <div class="quantity-controls">
          <button type="button" aria-label="Diminuir ${product.name}">−</button>
          <span>${item.quantity}</span>
          <button type="button" aria-label="Aumentar ${product.name}">+</button>
        </div>
      </div>
      <strong class="item-price">${formatPrice(product.price * item.quantity)}</strong>
    `;
    const buttons = cartItem.querySelectorAll("button");
    buttons[0].addEventListener("click", () => changeQuantity(product.id, -1));
    buttons[1].addEventListener("click", () => changeQuantity(product.id, 1));
    cartItems.appendChild(cartItem);
  });
}

function openCart() {
  cartPanel.classList.add("open");
  cartOverlay.classList.remove("hidden");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.add("hidden");
  cartPanel.setAttribute("aria-hidden", "true");
}

function renderStock() {
  stockTableBody.innerHTML = "";
  let totalValue = 0;
  let totalProfit = 0;

  state.stock.forEach((stockItem) => {
    const profitPerUnit = stockItem.price - stockItem.cost;
    const totalStockValue = stockItem.quantity * stockItem.cost;
    totalValue += totalStockValue;
    totalProfit += profitPerUnit * stockItem.quantity;

    const row = document.createElement("tr");
    const values = [
      stockItem.code,
      stockItem.item,
      stockItem.category,
      `${stockItem.quantity.toLocaleString("pt-BR")} ${stockItem.unit}`,
      formatPrice(stockItem.cost),
      formatPrice(stockItem.price),
      formatPrice(profitPerUnit),
      formatPrice(totalStockValue),
    ];
    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.className = "stock-delete";
    deleteButton.type = "button";
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", () => {
      state.stock = state.stock.filter((item) => item.id !== stockItem.id);
      localStorage.setItem("verdejarStock", JSON.stringify(state.stock));
      renderStock();
    });
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    stockTableBody.appendChild(row);
  });

  stockEmpty.classList.toggle("hidden", state.stock.length > 0);
  stockItemsCount.textContent = state.stock.length;
  stockTotalValue.textContent = formatPrice(totalValue);
  stockTotalProfit.textContent = formatPrice(totalProfit);
}

stockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  stockMessage.textContent = "";
  if (!stockForm.checkValidity()) {
    stockMessage.textContent = "Preencha todos os campos do produto.";
    stockForm.reportValidity();
    return;
  }
  const data = new FormData(stockForm);
  const cost = Number(data.get("cost"));
  const price = Number(data.get("price"));
  if (price < cost) {
    stockMessage.textContent = "O preço de venda não pode ser menor que o preço de custo.";
    return;
  }
  state.stock.push({
    id: Date.now(),
    code: data.get("code").trim(),
    item: data.get("item").trim(),
    category: data.get("category"),
    quantity: Number(data.get("quantity")),
    unit: data.get("unit"),
    cost,
    price,
  });
  localStorage.setItem("verdejarStock", JSON.stringify(state.stock));
  stockForm.reset();
  stockMessage.textContent = "Produto adicionado ao estoque.";
  renderStock();
});

document.querySelector("#search-input").addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});

document.querySelector("#category-list").addEventListener("click", (event) => {
  const button = event.target.closest(".category-button");
  if (!button) return;
  state.category = button.dataset.category;
  document.querySelectorAll(".category-button").forEach((categoryButton) => {
    categoryButton.classList.toggle("active", categoryButton === button);
  });
  renderProducts();
});

document.querySelector("#open-cart").addEventListener("click", openCart);
document.querySelector("#close-cart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});
document.querySelector("#checkout-button").addEventListener("click", () => {
  if (state.cart.length === 0) {
    alert("Adicione pelo menos um produto à sacola.");
    return;
  }
  alert("Pedido recebido! Em uma loja real, aqui entraria o pagamento.");
});

renderProducts();
renderCart();
renderStock();
showAuthenticatedUser();
