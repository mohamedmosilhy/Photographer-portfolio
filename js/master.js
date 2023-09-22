//settings box
let mainColor = localStorage.getItem("color-option");
let localRandom = localStorage.getItem("background-option");
let colors = document.querySelectorAll(".option-box li");
let randBackground = true;
let backgroundInterval;
let randBackgroundSpans = document.querySelectorAll(".random-background span");

// check the value of main color in local storage and apply it as the main color after reload
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  colors.forEach((li) => {
    li.classList.remove("active");
    if (mainColor === li.dataset.color) {
      li.classList.add("active");
    }
  });
}

// return the user preference for random background image for the last visit for the website
if (localRandom !== null) {
  randBackgroundSpans.forEach((span) => {
    span.classList.remove("active");
    if (localRandom === "yes") {
      randBackground = true;
      randBackgroundFun();
    } else {
      randBackground = false;
      clearInterval(backgroundInterval);
    }
  });
  document
    .querySelector(`.random-background .${localRandom}`)
    .classList.add("active");
}

// activate the settingsBox and make the icon spins
let settingsIcon = document.querySelector(".settings-icon");
let settingsBox = document.querySelector(".settings-box");

settingsIcon.addEventListener("click", () => {
  document.querySelector(".settings-icon i").classList.toggle("fa-spin");
  settingsBox.classList.toggle("opened");
});

// make the background random in settings box

randBackgroundSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (span.dataset.background === "yes") {
      randBackground = true;
      randBackgroundFun();
    } else {
      randBackground = false;
      clearInterval(backgroundInterval);
    }
    localStorage.setItem("background-option", span.dataset.background);
  });
});

// set the color you chose to be the main color of the website

colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    handleActive(e);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
  });
});

//landing page

// make random background image for the landing page
let landingPage = document.querySelector(".landing-page");

let imagesArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

function randBackgroundFun() {
  if (randBackground) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * (imagesArray.length - 1)) + 1;
      landingPage.style.backgroundImage = `url("../imgs/${randomNum}.jpg")`;
    }, 10000);
  }
}

// Select the element with the class "skills"
let skills = document.querySelector(".skills");

// Attach an event listener to the window's scroll event
window.onscroll = () => {
  // Get the offset top position of the "skills" element
  let skillsOffsetTop = skills.offsetTop;

  // Get the height of the "skills" element
  let skillsOffsetHeight = skills.offsetHeight;

  // Get the current scroll position of the window
  let windowScrollTop = window.scrollY;

  // Get the height of the window viewport
  let windowHeight = window.innerHeight;

  // Check if the user has scrolled to the position where the "skills" section is in view
  if (
    windowScrollTop + 50 >
    skillsOffsetTop + skillsOffsetHeight - windowHeight
  ) {
    // Select all "span" elements within elements with the class "skill-progress"

    document
      .querySelectorAll(".skill-box .skill-progress span")
      .forEach((skill) => {
        // Set the width of each skill progress bar based on the "data-progress" attribute
        skill.style.width = skill.dataset.progress;
      });
  }
};

let images = document.querySelectorAll(".images-box img");

images.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");

    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");

    let popupBoxImage = document.createElement("img");

    popupBox.className = "popup-box";

    popupBoxImage.src = img.src;

    if (img.alt !== null) {
      let h3 = document.createElement("h3");

      let h3Text = document.createTextNode(img.alt);

      h3.appendChild(h3Text);

      popupBox.appendChild(h3);
    }

    popupBox.appendChild(popupBoxImage);

    document.body.appendChild(popupBox);

    let closeButton = document.createElement("div");

    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);

    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    document.querySelector(".popup-box").remove();
    document.querySelector(".popup-overlay").remove();
  }
});

function scrollTo(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".header-area .links a");

scrollTo(allBullets);
scrollTo(allLinks);

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });

  ev.target.classList.add("active");
}

let bulletsSpans = document.querySelectorAll(".show-bullets span");

let navBullets = document.querySelector(".nav-bullets");

let localBulletsItem = localStorage.getItem("bullets-option");

if (localBulletsItem !== null) {
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
    if (localBulletsItem === "yes") {
      navBullets.style.display = "block";
    } else {
      navBullets.style.display = "none";
    }

    document
      .querySelector(`.show-bullets .${localBulletsItem}`)
      .classList.add("active");
  });
}

bulletsSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.display === "yes") {
      navBullets.style.display = "block";
      localStorage.setItem("bullets-option", "yes");
    }

    if (e.target.dataset.display === "no") {
      navBullets.style.display = "none";
      localStorage.setItem("bullets-option", "no");
    }
  });
});

document.querySelector(".reset").onclick = () => {
  localStorage.clear();

  window.location.reload();
};

let toggleBtn = document.querySelector(".toggle-menu");

let links = document.querySelector(".links");

toggleBtn.onclick = () => {
  toggleBtn.classList.toggle("menu-active");

  links.classList.toggle("open");
};

links.onclick = (e) => {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (
    e.target !== toggleBtn &&
    e.target !== links &&
    links.classList.contains("open")
  ) {
    toggleBtn.classList.toggle("menu-active");

    links.classList.toggle("open");
  }
});
