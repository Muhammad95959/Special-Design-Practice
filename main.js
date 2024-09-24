const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");

menuBtn.onclick = function () {
  if (links.classList.contains("show")) {
    links.style.opacity = 0;
    setTimeout(() => {
      links.style.opacity = 1;
      links.classList.remove("show");
    }, 300);
  } else {
    links.style.opacity = 1;
    links.classList.add("show");
  }
};
