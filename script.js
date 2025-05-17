document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const icon = document.querySelector("#toggle-mode i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});
