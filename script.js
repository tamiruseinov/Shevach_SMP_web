document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = e.target.username.value.trim();
  const email = e.target.email.value.trim();
  const badWords = ['nigger', 'nigga']; // Add more if needed

  if (badWords.some(word => username.toLowerCase().includes(word))) {
    alert("Offensive username not allowed.");
    return;
  }

  console.log("Registered:", {
    username, email, class: e.target.class.value.trim()
  });

  document.getElementById("message").textContent = "✅ Registered successfully!";
  e.target.reset();
});