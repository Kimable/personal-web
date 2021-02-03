const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const closeBtn = '<i class="material-icons">close</i>';

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
