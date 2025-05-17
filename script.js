const toggleBtn = document.getElementById("toggle-mode");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  if (icon.classList.contains("fa-moon")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});
