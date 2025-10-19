let users = JSON.parse(localStorage.getItem("users")) || [];

// Register user
function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById("reg_username").value.trim();
  const email = document.getElementById("reg_email").value.trim();
  const password = document.getElementById("reg_password").value;
  const confirm = document.getElementById("reg_confirm").value;
  const message = document.getElementById("register_message");

  message.textContent = "";

  if (!username || !email || !password || !confirm) {
    message.textContent = "❌ All fields are required.";
    message.style.color = "red";
    return;
  }

  if (password !== confirm) {
    message.textContent = "❌ Passwords do not match.";
    message.style.color = "red";
    return;
  }

  const exists = users.find(u => u.username === username || u.email === email);
  if (exists) {
    message.textContent = "❌ Username or email already exists.";
    message.style.color = "red";
    return;
  }

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "✅ Registered successfully! Go to login.";
  message.style.color = "green";
  document.getElementById("registerForm").reset();
}

// Login user
function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById("login_username").value.trim();
  const password = document.getElementById("login_password").value;
  const message = document.getElementById("login_message");

  const foundUser = users.find(u => u.username === username && u.password === password);

  if (foundUser) {
    message.textContent = `✅ Welcome, ${username}!`;
    message.style.color = "green";
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    // Optionally redirect
    // window.location.href = "dashboard.html";
  } else {
    message.textContent = "❌ Invalid username or password.";
    message.style.color = "red";
  }

  document.getElementById("loginForm").reset();
}
