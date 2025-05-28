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



const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();


  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const users = loadFromStorage("users") || [];

  const matchedUser = users.find(user => user.username === username && user.password === password);

  if (matchedUser) {
    
    saveToStorage("loggedInUser", matchedUser);

    alert("You have successfully logged in.");

    
    window.location.href = "home.html";
  } else {
    alert("Incorrect username or password❌");
  }
});

