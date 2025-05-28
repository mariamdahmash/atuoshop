const cartItemsContainer = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");
    let cart = loadFromStorage("cart") || [];

    function checkout() {
      if (cart.length === 0) {
        alert("cart is empty!");
        return;
      }
      window.location.href = "checkout.html";
    }

    function renderCart() {
      cartItemsContainer.innerHTML = "";
      let total = 0;

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty 😔</p>";
        totalAmount.textContent = "Total: 0 EGP";
        return;
      }

      cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <div>
            <h4>${item.title}</h4>
            <p class="price">${item.price} EGP</p>
          </div>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        `;

        total += item.price;
        cartItemsContainer.appendChild(itemDiv);
      });

      totalAmount.textContent = `Total: ${total.toFixed(2)} EGP`;
    }

    function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      saveToStorage("cart", cart);
      renderCart();
    }

    renderCart();