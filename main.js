const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
const aside = document.querySelector("aside");
const navBullets = document.querySelector(".nav-bullets");

let intervalId;

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

// toggle side panel on gear icon click
document.querySelector("aside .icon").onclick = () =>
  aside.classList.toggle("show");

document.querySelectorAll("aside .colors .box a").forEach(function (e) {
  e.onclick = function () {
    handleSelected(e);
    const mainColor = e.dataset.mainColor;
    const secColor = e.dataset.secColor;
    window.localStorage.setItem("mainColor", mainColor);
    document.documentElement.style.setProperty("--main-color", mainColor);
    window.localStorage.setItem("secColor", secColor);
    document.documentElement.style.setProperty("--sec-color", secColor);
  };
});
// restore color settings from local storage
const savedMainColor = window.localStorage.getItem("mainColor");
const savedSecColor = window.localStorage.getItem("secColor");
if (savedMainColor !== null && savedSecColor !== null) {
  handleSelected(
    document.querySelector(
      `aside .colors .box [data-main-color="${savedMainColor}"]`,
    ),
  );
  document.documentElement.style.setProperty("--main-color", savedMainColor);
  document.documentElement.style.setProperty("--sec-color", savedSecColor);
}

document.querySelectorAll(".random-bg a").forEach(function (e) {
  e.onclick = function () {
    handleSelected(e);
    if (e.classList.contains("yes")) {
      startRandomBackgroundInterval();
      window.localStorage.setItem("randomBg", "yes");
    } else if (e.classList.contains("no")) {
      clearInterval(intervalId);
      window.localStorage.setItem("randomBg", "no");
    }
  };
});
// restore random background settings from local storage
if (window.localStorage.randomBg !== "no") {
  startRandomBackgroundInterval();
} else handleSelected(document.querySelector(".random-bg .no"));

document.querySelectorAll(".bullets a").forEach(function (e) {
  e.onclick = function () {
    handleSelected(e);
    if (e.classList.contains("yes")) {
      navBullets.classList.remove("hide");
      window.localStorage.setItem("bullets", "yes");
    } else if (e.classList.contains("no")) {
      navBullets.classList.add("hide");
      window.localStorage.setItem("bullets", "no");
    }
  };
});
// restore bullets settings from local storage
if (window.localStorage.bullets === "no") {
  handleSelected(document.querySelector(".bullets .no"));
  navBullets.classList.add("hide");
}

document.querySelector("aside .reset-btn").onclick = function () {
  window.localStorage.removeItem("mainColor");
  window.localStorage.removeItem("randomBg");
  window.localStorage.removeItem("bullets");
  window.location.reload();
};

function handleSelected(e) {
  [...e.parentNode.children].forEach(function (element) {
    element.classList.remove("selected");
  });
  e.classList.add("selected");
}

function startRandomBackgroundInterval() {
  const backgrounds = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
  let counter = 1;
  intervalId = setInterval(function () {
    document.getElementById("landing").style.backgroundImage =
      `url("images/${backgrounds[counter % backgrounds.length]}")`;
    counter++;
  }, 10000);
}
