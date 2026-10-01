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
  stock: JSON.parse(localStorage.getItem("gasparStock") || "[]"),
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
const adminLoginForm = document.querySelector("#admin-login-form");
const adminMessage = document.querySelector("#admin-message");
const adminSignupForm = document.querySelector("#admin-signup-form");
const adminSignupMessage = document.querySelector("#admin-signup-message");
const adminRecoverForm = document.querySelector("#admin-recover-form");
const adminRecoverMessage = document.querySelector("#admin-recover-message");
const loginSwitch = document.querySelector("#login-switch");
const signupSwitch = document.querySelector("#signup-switch");
const adminSwitch = document.querySelector("#admin-switch");
const adminLoginSwitch = document.querySelector("#admin-login-switch");
const adminSignupSwitch = document.querySelector("#admin-signup-switch");
const adminRecoverSwitch = document.querySelector("#admin-recover-switch");
const adminBackSwitch = document.querySelector("#admin-back-switch");
const adminDashboard = document.querySelector("#admin-dashboard");
const adminUsernameDisplay = document.querySelector("#admin-username-display");
const adminPasswordDisplay = document.querySelector("#admin-password-display");
const changePasswordModal = document.querySelector("#change-password-modal");
const changePasswordForm = document.querySelector("#change-password-form");
const changePasswordMessage = document.querySelector("#change-password-message");
let adminPasswordVisible = false;
const stockForm = document.querySelector("#stock-form");
const stockTableBody = document.querySelector("#stock-table-body");
const stockEmpty = document.querySelector("#stock-empty");
const stockMessage = document.querySelector("#stock-message");
const stockItemsCount = document.querySelector("#stock-items-count");
const stockTotalValue = document.querySelector("#stock-total-value");
const stockTotalProfit = document.querySelector("#stock-total-profit");

function showSignup() {
  loginForm.classList.add("hidden");
  adminLoginForm.classList.add("hidden");
  adminSignupForm.classList.add("hidden");
  adminRecoverForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  loginSwitch.classList.add("hidden");
  signupSwitch.classList.remove("hidden");
  adminSwitch.classList.add("hidden");
  adminLoginSwitch.classList.add("hidden");
  adminSignupSwitch.classList.add("hidden");
  adminRecoverSwitch.classList.add("hidden");
  adminBackSwitch.classList.add("hidden");
  document.querySelector(".login-card .eyebrow").textContent = "Faça seu cadastro";
  document.querySelector(".login-card h1").innerHTML = "Crie sua conta<br /><em>e aproveite.</em>";
  document.querySelector(".login-description").textContent = "Preencha seus dados para começar a comprar na Quitanda do Gaspar.";
  signupMessage.textContent = "";
}

function showLogin() {
  signupForm.classList.add("hidden");
  adminLoginForm.classList.add("hidden");
  adminSignupForm.classList.add("hidden");
  adminRecoverForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  signupSwitch.classList.add("hidden");
  loginSwitch.classList.remove("hidden");
  adminSwitch.classList.remove("hidden");
  adminLoginSwitch.classList.add("hidden");
  adminSignupSwitch.classList.add("hidden");
  adminRecoverSwitch.classList.add("hidden");
  adminBackSwitch.classList.add("hidden");
  document.querySelector(".login-card .eyebrow").textContent = "Bem-vindo à nossa quitanda";
  document.querySelector(".login-card h1").innerHTML = "O fresquinho<br /><em>da feira.</em>";
  document.querySelector(".login-description").textContent = "Entre para escolher seus produtos favoritos.";
  document.querySelector("#show-admin-login").textContent = localStorage.getItem("gasparAdmin")
    ? "Acesso do administrador"
    : "Cadastrar administrador";
  formMessage.textContent = "";
}

function showAdminLogin() {
  if (!localStorage.getItem("gasparAdmin")) {
    showAdminSignup();
    return;
  }
  loginForm.classList.add("hidden");
  signupForm.classList.add("hidden");
  adminSignupForm.classList.add("hidden");
  adminLoginForm.classList.remove("hidden");
  adminRecoverForm.classList.add("hidden");
  loginSwitch.classList.add("hidden");
  signupSwitch.classList.add("hidden");
  adminSwitch.classList.add("hidden");
  adminLoginSwitch.classList.add("hidden");
  document.querySelector("#show-recover-password").classList.remove("hidden");
  adminSignupSwitch.classList.add("hidden");
  adminRecoverSwitch.classList.add("hidden");
  adminBackSwitch.classList.remove("hidden");
  document.querySelector(".login-card .eyebrow").textContent = "Acesso restrito";
  document.querySelector(".login-card h1").innerHTML = "Painel do<br /><em>Gaspar.</em>";
  document.querySelector(".login-description").textContent = "Entre com suas credenciais administrativas para gerenciar o estoque.";
  adminMessage.textContent = "";
  adminMessage.classList.remove("success");
}

function showAdminSignup() {
  if (localStorage.getItem("gasparAdmin")) {
    showAdminLogin();
    return;
  }
  loginForm.classList.add("hidden");
  signupForm.classList.add("hidden");
  adminLoginForm.classList.add("hidden");
  adminRecoverForm.classList.add("hidden");
  adminSignupForm.classList.remove("hidden");
  loginSwitch.classList.add("hidden");
  signupSwitch.classList.add("hidden");
  adminSwitch.classList.add("hidden");
  adminLoginSwitch.classList.add("hidden");
  adminSignupSwitch.classList.add("hidden");
  adminRecoverSwitch.classList.add("hidden");
  adminBackSwitch.classList.remove("hidden");
  document.querySelector(".login-card .eyebrow").textContent = "Configuração inicial";
  document.querySelector(".login-card h1").innerHTML = "Crie o acesso<br /><em>do Gaspar.</em>";
  document.querySelector(".login-description").textContent = "Cadastre a primeira conta administrativa para gerenciar a quitanda.";
  adminSignupMessage.textContent = "";
}

function showAdminAccess() {
  if (localStorage.getItem("gasparAdmin")) {
    showAdminLogin();
  } else {
    showAdminSignup();
  }
}

function showAdminRecover() {
  loginForm.classList.add("hidden");
  signupForm.classList.add("hidden");
  adminLoginForm.classList.add("hidden");
  adminSignupForm.classList.add("hidden");
  adminRecoverForm.classList.remove("hidden");
  loginSwitch.classList.add("hidden");
  signupSwitch.classList.add("hidden");
  adminSwitch.classList.add("hidden");
  adminLoginSwitch.classList.add("hidden");
  adminSignupSwitch.classList.add("hidden");
  adminRecoverSwitch.classList.remove("hidden");
  adminBackSwitch.classList.add("hidden");
  document.querySelector(".login-card .eyebrow").textContent = "Recuperar acesso";
  document.querySelector(".login-card h1").innerHTML = "Recupere sua<br /><em>senha.</em>";
  document.querySelector(".login-description").textContent = "Informe seu usuário, a palavra de recuperação e defina uma nova senha.";
  adminRecoverMessage.textContent = "";
}

function showAuthenticatedUser(user) {
  if (!user || user.role !== "customer") return;
  document.body.classList.remove("is-admin");
  document.body.classList.add("authenticated");
  loginScreen.classList.add("hidden");
  adminDashboard.classList.add("hidden");
  userGreeting.textContent = `Olá, ${user.name}`;
}

function showAdminDashboard() {
  document.body.classList.remove("authenticated");
  document.body.classList.add("is-admin");
  loginScreen.classList.add("hidden");
  adminDashboard.classList.remove("hidden");
  adminPasswordVisible = false;
  renderAdminCredentials();
  renderStock();
}

function renderAdminCredentials() {
  const adminData = JSON.parse(localStorage.getItem("gasparAdmin") || "null");
  if (!adminData) return;
  adminUsernameDisplay.textContent = adminData.username;
  adminPasswordDisplay.textContent = adminPasswordVisible ? adminData.password : "••••••••";
  const toggleButton = document.querySelector("#toggle-admin-password");
  toggleButton.textContent = adminPasswordVisible ? "Ocultar" : "Mostrar";
  toggleButton.setAttribute("aria-label", `${adminPasswordVisible ? "Ocultar" : "Mostrar"} senha`);
}

function normalizeName(value) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  if (!loginForm.checkValidity()) {
    formMessage.textContent = "Informe seu nome completo e sua senha.";
    loginForm.reportValidity();
    return;
  }
  const formData = new FormData(loginForm);
  const savedUser = JSON.parse(localStorage.getItem("gasparCustomer") || "null");
  const name = String(formData.get("name")).trim().replace(/\s+/g, " ");
  const password = String(formData.get("password"));
  if (
    !savedUser ||
    normalizeName(name) !== normalizeName(`${savedUser.name} ${savedUser.surname}`) ||
    password !== savedUser.password
  ) {
    formMessage.textContent = "Nome ou senha incorretos. Confira seus dados ou faça seu cadastro.";
    return;
  }
  const user = { name: savedUser.name, role: "customer" };
  localStorage.setItem("gasparSession", JSON.stringify(user));
  loginForm.reset();
  showAuthenticatedUser(user);
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signupMessage.textContent = "";
  if (!signupForm.checkValidity()) {
    signupMessage.textContent = "Preencha seu nome, sobrenome e uma senha forte.";
    signupForm.reportValidity();
    return;
  }
  const formData = new FormData(signupForm);
  const user = {
    name: String(formData.get("name")).trim().replace(/\s+/g, " "),
    surname: String(formData.get("surname")).trim().replace(/\s+/g, " "),
    password: String(formData.get("password")),
  };
  localStorage.setItem("gasparCustomer", JSON.stringify(user));
  localStorage.setItem("gasparSession", JSON.stringify({ name: user.name, role: "customer" }));
  signupForm.reset();
  showAuthenticatedUser({ name: user.name, role: "customer" });
});

document.querySelector("#show-signup").addEventListener("click", showSignup);
document.querySelector("#show-login").addEventListener("click", showLogin);
document.querySelector("#show-admin-login").addEventListener("click", showAdminAccess);
document.querySelector("#show-admin-signup").addEventListener("click", showAdminSignup);
document.querySelector("#show-recover-password").addEventListener("click", showAdminRecover);
document.querySelector("#back-to-customer").addEventListener("click", showLogin);
document.querySelector("#back-to-admin-login-from-recover").addEventListener("click", showAdminLogin);

adminLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  adminMessage.textContent = "";
  adminMessage.classList.remove("success");
  if (!adminLoginForm.checkValidity()) {
    adminMessage.textContent = "Informe o usuário e a senha do administrador.";
    adminLoginForm.reportValidity();
    return;
  }
  const formData = new FormData(adminLoginForm);
  const username = String(formData.get("name")).trim();
  const password = String(formData.get("password"));
  const savedAdmin = localStorage.getItem("gasparAdmin");
  if (!savedAdmin) {
    adminMessage.textContent = "Ainda não há administrador cadastrado. Crie a primeira conta.";
    adminLoginSwitch.classList.remove("hidden");
    return;
  }
  const adminData = JSON.parse(savedAdmin);
  if (username !== adminData.username || password !== adminData.password) {
    adminMessage.textContent = "Usuário ou senha incorretos.";
    return;
  }
  localStorage.setItem("gasparSession", JSON.stringify({ role: "admin" }));
  adminLoginForm.reset();
  showAdminDashboard();
});

adminSignupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  adminSignupMessage.textContent = "";
  if (localStorage.getItem("gasparAdmin")) {
    adminSignupMessage.textContent = "Já existe uma conta de administrador. Entre com ela.";
    showAdminLogin();
    adminMessage.textContent = "Já existe uma conta de administrador. Entre com ela.";
    return;
  }
  if (!adminSignupForm.checkValidity()) {
    adminSignupMessage.textContent = "Preencha os campos e escolha uma senha forte.";
    adminSignupForm.reportValidity();
    return;
  }

  const formData = new FormData(adminSignupForm);
  const username = String(formData.get("name")).trim();
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirmPassword"));
  const recoveryAnswer = normalizeName(String(formData.get("recoveryAnswer")));
  if (username.length < 3 || recoveryAnswer.length < 3) {
    adminSignupMessage.textContent = "O usuário e a palavra de recuperação precisam ter pelo menos três caracteres.";
    return;
  }
  if (password !== confirmPassword) {
    adminSignupMessage.textContent = "As senhas não coincidem. Confira e tente novamente.";
    document.querySelector("#admin-signup-confirm").focus();
    return;
  }

  localStorage.setItem("gasparAdmin", JSON.stringify({ username, password, recoveryAnswer }));
  localStorage.setItem("gasparSession", JSON.stringify({ role: "admin" }));
  adminSignupForm.reset();
  showAdminDashboard();
});

adminRecoverForm.addEventListener("submit", (event) => {
  event.preventDefault();
  adminRecoverMessage.textContent = "";
  adminRecoverMessage.classList.remove("success");
  if (!adminRecoverForm.checkValidity()) {
    adminRecoverMessage.textContent = "Preencha todos os campos.";
    adminRecoverForm.reportValidity();
    return;
  }
  const formData = new FormData(adminRecoverForm);
  const username = String(formData.get("username")).trim();
  const answer = normalizeName(String(formData.get("answer")));
  const newPassword = String(formData.get("newPassword"));
  const confirmPassword = String(formData.get("confirmPassword"));
  const savedAdmin = localStorage.getItem("gasparAdmin");
  if (!savedAdmin) {
    adminRecoverMessage.textContent = "Ainda não há administrador cadastrado.";
    return;
  }
  const adminData = JSON.parse(savedAdmin);
  if (username !== adminData.username) {
    adminRecoverMessage.textContent = "Usuário não encontrado.";
    return;
  }
  const isCorrectAnswer = adminData.recoveryAnswer
    ? answer === adminData.recoveryAnswer
    : ["quitanda do gaspar", "gaspar", "quitanda gaspar"].includes(answer);
  if (!isCorrectAnswer) {
    adminRecoverMessage.textContent = "Resposta incorreta. Tente novamente.";
    return;
  }

  if (newPassword !== confirmPassword) {
    adminRecoverMessage.textContent = "As senhas não coincidem. Confira e tente novamente.";
    document.querySelector("#admin-recover-confirm-password").focus();
    return;
  }

  localStorage.setItem("gasparAdmin", JSON.stringify({ ...adminData, password: newPassword }));
  adminRecoverForm.reset();
  showAdminLogin();
  adminMessage.textContent = "Senha redefinida. Entre com sua nova senha.";
  adminMessage.classList.add("success");
});

document.querySelector("#toggle-admin-password").addEventListener("click", () => {
  adminPasswordVisible = !adminPasswordVisible;
  renderAdminCredentials();
});

document.querySelector("#change-admin-password-button").addEventListener("click", () => {
  changePasswordForm.reset();
  changePasswordMessage.textContent = "";
  changePasswordMessage.classList.remove("success");
  changePasswordModal.classList.remove("hidden");
  document.querySelector("#current-password").focus();
});

function closeChangePassword() {
  changePasswordModal.classList.add("hidden");
  changePasswordForm.reset();
  changePasswordMessage.textContent = "";
  changePasswordMessage.classList.remove("success");
}

document.querySelector("#close-password-modal").addEventListener("click", closeChangePassword);
changePasswordModal.addEventListener("click", (event) => {
  if (event.target === changePasswordModal) closeChangePassword();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !changePasswordModal.classList.contains("hidden")) {
    closeChangePassword();
  }
});

changePasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  changePasswordMessage.textContent = "";
  changePasswordMessage.classList.remove("success");
  if (!changePasswordForm.checkValidity()) {
    changePasswordMessage.textContent = "Informe a senha atual e uma nova senha forte.";
    changePasswordForm.reportValidity();
    return;
  }

  const formData = new FormData(changePasswordForm);
  const currentPassword = String(formData.get("current"));
  const newPassword = String(formData.get("new"));
  const confirmPassword = String(formData.get("confirm"));
  const adminData = JSON.parse(localStorage.getItem("gasparAdmin") || "null");
  if (!adminData || currentPassword !== adminData.password) {
    changePasswordMessage.textContent = "A senha atual está incorreta.";
    document.querySelector("#current-password").focus();
    return;
  }
  if (newPassword !== confirmPassword) {
    changePasswordMessage.textContent = "As novas senhas não coincidem.";
    document.querySelector("#confirm-new-password").focus();
    return;
  }

  localStorage.setItem("gasparAdmin", JSON.stringify({ ...adminData, password: newPassword }));
  adminPasswordVisible = false;
  renderAdminCredentials();
  changePasswordForm.reset();
  changePasswordMessage.textContent = "Senha alterada com sucesso.";
  changePasswordMessage.classList.add("success");
});

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
  localStorage.removeItem("gasparSession");
  document.body.classList.remove("authenticated");
  loginScreen.classList.remove("hidden");
  cartPanel.classList.remove("open");
  formMessage.textContent = "";
  showLogin();
});

document.querySelector("#admin-logout-button").addEventListener("click", () => {
  localStorage.removeItem("gasparSession");
  document.body.classList.remove("is-admin");
  adminDashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
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
      localStorage.setItem("gasparStock", JSON.stringify(state.stock));
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
  localStorage.setItem("gasparStock", JSON.stringify(state.stock));
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
document.querySelector("#show-admin-login").textContent = localStorage.getItem("gasparAdmin")
  ? "Acesso do administrador"
  : "Cadastrar administrador";
const savedSession = JSON.parse(localStorage.getItem("gasparSession") || "null");
if (savedSession?.role === "admin") {
  showAdminDashboard();
} else if (savedSession?.role === "customer") {
  showAuthenticatedUser(savedSession);
}
