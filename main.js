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

// expand the image after clicking it in the gallery section
document.querySelectorAll("#gallery .images .image").forEach(function (e) {
  e.onclick = function () {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.querySelector("#gallery").appendChild(overlay);
    const box = document.createElement("div");
    box.classList.add("box");
    overlay.appendChild(box);
    const title = document.createElement("h2");
    title.textContent = e.firstChild.alt;
    box.appendChild(title);
    const image = document.createElement("img");
    image.src = e.firstChild.src;
    box.appendChild(image);
    const closeBtn = document.createElement("a");
    closeBtn.classList.add("close-btn");
    closeBtn.textContent = "X";
    closeBtn.onclick = function () {
      overlay.style.opacity = 0;
      setTimeout(() => overlay.remove(), 300);
    };
    box.appendChild(closeBtn);
    setTimeout(() => (overlay.style.opacity = 1), 1);
  };
});
