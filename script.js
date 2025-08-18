// Mobile Menu Toggle Logic
document.querySelector(".sidebar-icon button").addEventListener("click", () => {
  document.querySelector(".sidebar-area").classList.add("active");
});
document.querySelector(".sidebar-trigger.close").addEventListener("click", () => {
  document.querySelector(".sidebar-area").classList.remove("active");
});

document.querySelectorAll(".side-menu-wrap .menu-item-has-children > a").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    const parent = item.parentElement;
    parent.classList.toggle("open");
  });
});

// Inner Navigation Display Logic
const innerNav = document.getElementById("inner-nav");
const expandBtn = document.getElementById("expand-btn");

expandBtn.addEventListener("click", () => {
  if (innerNav.style.display == "none") {
    innerNav.style.display = "block";
    expandBtn.innerHTML = `<span>-</span>`
    expandBtn.style.backgroundColor = "#11151C";
  } else {
    innerNav.style.display = "none";
    expandBtn.innerHTML = `<span>+</span>`
    expandBtn.style.backgroundColor = "#ba0df4";
  }
})

// Scroll Event Logic
const header = document.querySelector(".header");
const darklogo = document.querySelector(".logo-dark")
const lightLogo = document.querySelector(".logo-light")

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    darklogo.style.display = "inline";
    lightLogo.style.display = "none";
  } else {
    header.classList.remove("scrolled");
    darklogo.style.display = "none";
    lightLogo.style.display = "inline";
  }
});



// const sidebarTrigger = document.querySelector(".sidebar-trigger");
// const mobileMenu = document.createElement("div");
// mobileMenu.className = "mobile-menu";
// document.body.appendChild(mobileMenu);

// const mobileMenuContent = document.querySelector(".mobile-menu-items").cloneNode(true);
// mobileMenu.appendChild(mobileMenuContent);

// const closeBtn = document.createElement("button");
// closeBtn.innerHTML = "&times;";
// mobileMenu.prepend(closeBtn);

// sidebarTrigger.addEventListener("click", () => {
//   mobileMenu.classList.add("open");
// });

// closeBtn.addEventListener("click", () => {
//   mobileMenu.classList.remove("open");
// });

// mobileMenu.querySelectorAll(".menu-item-has-children > a").forEach(link => {
//   link.addEventListener('click', (e) => {
//     e.preventDefault();
//     const parent = link.parentElement;
//     parent.classList.toggle('active');
//   });
// })

// Slider code
const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Get original slides
let originalSlides = Array.from(slider.children);
let slideWidth = originalSlides[0].offsetWidth;
let currentIndex = 0;

// Clone first and last slides
const firstClone = originalSlides[0].cloneNode(true);
const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

// Append/prepend clones
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slider.firstChild);

// Re-fetch all slides (including clones)
let allSlides = Array.from(slider.children);

// Set initial position
slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

// Move to a slide by index
function goToSlide(index) {
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(-${slideWidth * index}px)`;
}

// Next Slide
nextBtn.addEventListener('click', () => {
  if (currentIndex >= allSlides.length - 1) return;
  currentIndex++;
  goToSlide(currentIndex);
});

// Prev Slide
prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  goToSlide(currentIndex);
});

// Reset to real slide after reaching clone
slider.addEventListener('transitionend', () => {
  if (allSlides[currentIndex] === firstClone) {
    slider.style.transition = 'none';
    currentIndex = 1;
    slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  if (allSlides[currentIndex] === lastClone) {
    slider.style.transition = 'none';
    currentIndex = allSlides.length - 2;
    slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }
});

// Update on resize
window.addEventListener('resize', () => {
  slideWidth = originalSlides[0].offsetWidth;
  slider.style.transition = 'none';
  slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});


// Faq Accrodions 
const allDetails = document.querySelectorAll("details");

allDetails.forEach((targetDetail) => {
  targetDetail.addEventListener("toggle", () => {
    if (targetDetail.open) {
      allDetails.forEach((detail) => {
        if (detail !== targetDetail) {
          detail.removeAttribute("open");
        }
      });
    }
  });
});

// Tech Stack Card Display Logic
const cards = [...document.querySelectorAll(".tech-stack-card")];
const viewBtn = document.querySelector(".view-more-btn");
let visible = 8;

function showBatch(count = 4) {
  const hidden = cards.filter(card => !card.classList.contains('is-revealed'));
  const batch = hidden.slice(0, count);

  batch.forEach((card, i) => {
    // 1) make it participate in layout + set initial animated state
    card.classList.add('is-revealed');

    // 2) set a small stagger delay for prettier reveal
    card.style.setProperty('--delay', `${i * 70}ms`);

    // 3) next frame: toggle the end state so CSS transitions can run
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add('appear');
      });
    });
  });

  if (cards.every(card => card.classList.contains('is-revealed'))) {
    viewBtn.style.display = 'none';
  }
}

function showCards() {
  for (let card = 0; card < visible; card++) {
    if (cards[card]) cards[card].style.display = "block";
  }
  if (visible >= cards.length) {
    viewBtn.style.display = "none"; // hide button when no more left
  }
}

// initial paint (first 8 visible immediately)
cards.slice(0, visible).forEach((card, i) => {
  card.classList.add('is-revealed');
  // run the “appear” step so initial 8 also animate nicely
  card.style.setProperty('--delay', `${i * 70}ms`);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => card.classList.add('appear'));
  });
});

viewBtn.addEventListener("click", () => {
  showBatch(4);
});
