const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");

// toggle menu visibility with a fade effect
menuBtn.onclick = function () {
  if (links.classList.contains("show")) {
    links.classList.remove("opacity-1");
    setTimeout(() => {
      links.classList.remove("show");
    }, 300);
  } else {
    links.classList.add("opacity-1");
    links.classList.add("show");
  }
};

// close menuBtn after clicking outside the menu and its icon
document.addEventListener("click", function (e) {
  if (
    e.target.parentNode !== menuBtn &&
    e.target !== menuBtn &&
    e.target !== links &&
    links.classList.contains("show")
  ) {
    links.classList.remove("opacity-1");
    setTimeout(() => {
      links.classList.remove("show");
    }, 300);
  }
});

// show skills progress after reaching the section
window.onscroll = function () {
  document.querySelectorAll(".skill .progress-bar > div").forEach(function (e) {
    const elementHeight = e.offsetHeight;
    const elementOffset = e.offsetTop;
    const windowHeight = window.innerHeight;
    const windowScroll = window.scrollY;
    if (windowScroll > elementHeight + elementOffset - windowHeight)
      e.style.transform = "translateX(0)";
  });
};
