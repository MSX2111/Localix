// Tab switching logic
document.querySelectorAll(".tab-btn").forEach((btn) => {
  /**
   *
   *
   */
  btn.onclick = function () {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((tc) => tc.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

// Modal logic
const modal = document.getElementById("addProductModal");
const openBtn = document.getElementById("openAddProductModal");
const closeBtn = modal.querySelector(".close");
openBtn.onclick = () => (modal.style.display = "block");
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts() {
  const products = getProducts();
  const list = document.querySelector(".products-list");
  list.innerHTML = "";
  products.forEach((product) => {
    list.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <h4>${product.name}</h4>
          <p>$${product.price}</p>
        </div>
      </div>
    `;
  });
  renderInsights(products); // Update insights when products change
}

function renderInsights(products) {
  // If not passed, get from storage
  if (!products) products = getProducts();
  // Total products
  const totalProducts = products.length;
  // Catalog value
  const catalogValue = products.reduce(
    (sum, p) => sum + Number(p.price || 0),
    0
  );
  // Best selling product: pick a random one if any exist
  let bestProduct = "—";
  if (products.length > 0) {
    const randomIndex = Math.floor(Math.random() * products.length);
    bestProduct = products[randomIndex].name;
  }
  // Update the DOM
  document.querySelector(".insight-card:nth-child(1) p").textContent =
    totalProducts;
  document.querySelector(
    ".insight-card:nth-child(2) p"
  ).textContent = `$${catalogValue}`;
  document.querySelector(".insight-card:nth-child(3) p").textContent =
    bestProduct;
}

// On page load
renderProducts();

// Add product form
document.getElementById("addProductForm").onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;
  const products = getProducts();
  products.push({ name, price, image });
  saveProducts(products);
  renderProducts();
  document.getElementById("addProductModal").style.display = "none";
  this.reset();
};

// Price input: only allow numbers, auto-add $ on display
const priceInput = document.getElementById("productPrice");
priceInput.addEventListener("input", function () {
  // Only allow numbers, no $ in input
  this.value = this.value.replace(/[^0-9.]/g, "");
});

// Theme toggle logic (switch)
const themeToggle = document.getElementById("themeToggle");
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") && prefersDark)
) {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}
themeToggle.onchange = function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

// --- POSTS LOGIC ---

function getPosts() {
  return JSON.parse(localStorage.getItem("posts") || "[]");
}
function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}
function renderPosts() {
  const posts = getPosts();
  const list = document.querySelector(".posts-list");
  if (!list) return;
  list.innerHTML = "";
  posts.forEach((post) => {
    list.innerHTML += `
      <div class="post-card">
        <h4>${post.title}</h4>
        <p>${post.content}</p>
      </div>
    `;
  });
}

// Modal logic for posts
const postModal = document.getElementById("addPostModal");
const openPostBtn = document.getElementById("openAddPostModal");
const closePostBtn = postModal ? postModal.querySelector(".post-close") : null;
if (openPostBtn && postModal && closePostBtn) {
  openPostBtn.onclick = () => (postModal.style.display = "block");
  closePostBtn.onclick = () => (postModal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === postModal) postModal.style.display = "none";
  });
  document.getElementById("addPostForm").onsubmit = function (e) {
    e.preventDefault();
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const posts = getPosts();
    posts.push({ title, content });
    savePosts(posts);
    renderPosts();
    postModal.style.display = "none";
    this.reset();
  };
}

// Render posts on page load
renderPosts();
