const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // السطر ده مهم جدًا عشان تعريف users
  const users = loadFromStorage("users") || [];

  const newUser = {
    username,
    email,
    password,
    isAdmin: false
  };

  users.push(newUser);
  saveToStorage("users", users);

  alert("Registration successful!");
});


// 1. نربط بالفورم بتاع تسجيل الدخول
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // 2. ناخد البيانات اللي المستخدم كتبها
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  // 3. نقرأ كل المستخدمين من localStorage باستخدام الدالة اللي عملناها
  const users = loadFromStorage("users") || [];

  // 4. ندور على المستخدم اللي بياناته متطابقة
  const matchedUser = users.find(user => user.username === username && user.password === password);

  if (matchedUser) {
    // 5. لو موجود، نحفظه كـ مستخدم حالي
    saveToStorage("loggedInUser", matchedUser);

    alert("You have successfully logged in.");

    // 6. نروح بيه لصفحة المنتجات مثلاً
    window.location.href = "products.html";
  } else {
    alert("Incorrect username or password❌");
  }
});

