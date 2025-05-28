const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");

let allProducts = []; // منتجات API

// دالة عرض المنتجات
function renderProducts(productArray) {
  productList.innerHTML = ""; 

  if (productArray.length === 0) {
    productList.innerHTML = "<p>No products available.</p>";
    return;
  }

  productArray.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="clickable-img" />
      <h3 class="clickable-title">${product.title}</h3>
      <p>${product.description.slice(0, 100)}...</p>
      <p class="price">${product.price} EGP</p>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    productList.appendChild(card);

    // ⬅️ كليك على الصورة أو الاسم يفتح صفحة تفاصيل
    card.querySelector(".clickable-img").addEventListener("click", () => {
      window.location.href = `productDitail.html?id=${product.id}`;
    });

    card.querySelector(".clickable-title").addEventListener("click", () => {
      window.location.href = `productDitail.html?id=${product.id}`;
    });

    // ⬅️ زر الإضافة للسلة
    const btn = card.querySelector(".add-to-cart-btn");
    btn.addEventListener("click", (event) => {
      event.stopPropagation(); // يمنع تفعيل الكليك بتاع الكارد كله
      addToCart(product);
    });
  });
}

// دالة الإضافة للسلة
function addToCart(product) {
  let cart = loadFromStorage("cart") || [];

  const alreadyExists = cart.find(item => item.id === product.id);
  if (alreadyExists) {
    alert("The product is already in the cart!");
    return;
  }

  cart.push(product);
  saveToStorage("cart", cart);
  alert("The product has been added to the cart.");
}

// تصنيف
categoryFilter.addEventListener("change", () => {
  const selected = categoryFilter.value;

  if (selected === "all") {
    renderProducts(allProducts); 
  } else {
    const filtered = allProducts.filter(p => p.category === selected);
    renderProducts(filtered);
  }
});

// البحث
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = allProducts.filter(product => {
    const matchesName = product.title.toLowerCase().includes(searchValue);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  renderProducts(filtered);
});

// جلب البيانات من API
async function fetchProducts() {
  productList.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    allProducts = data;
    saveToStorage("products", data);

    renderProducts(data);
  } catch (err) {
    productList.innerHTML = "<p>Failed to load products 😢</p>";
    console.error("Error fetching products:", err);
  }
}

fetchProducts();
