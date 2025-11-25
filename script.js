// Бургер-меню
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav__link")) {
      nav.classList.remove("nav--open");
    }
  });
}

// Подсветка активного пункта меню при скролле
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function updateActiveNav() {
  let currentId = "";
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("nav__link--active");
    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("nav__link--active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// Плавное появление блоков при скролле
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Фоллбек: сразу показываем
  revealElements.forEach((el) => el.classList.add("reveal--visible"));
}

// Лёгкий 3D-tilt эффек для карточки в hero
const heroArt = document.querySelector(".hero__art-card");

if (heroArt) {
  heroArt.addEventListener("mousemove", (event) => {
    const rect = heroArt.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10; // от -5 до 5
    const rotateX = (0.5 - (y / rect.height)) * 10; // от -5 до 5

    heroArt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroArt.addEventListener("mouseleave", () => {
    heroArt.style.transform = "";
  });
}

// Модалка трейлера
const trailerModal = document.getElementById("trailer-modal");
const openTrailerBtn = document.querySelector(".js-open-trailer");
const modalCloseEls = document.querySelectorAll(".js-close-modal");

function openModal() {
  if (trailerModal) {
    trailerModal.classList.add("modal--open");
  }
}

function closeModal() {
  if (trailerModal) {
    trailerModal.classList.remove("modal--open");
  }
}

if (openTrailerBtn && trailerModal) {
  openTrailerBtn.addEventListener("click", openModal);
}

modalCloseEls.forEach((el) => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && trailerModal && trailerModal.classList.contains("modal--open")) {
    closeModal();
  }
});

// FAQ-аккордеон
const accordion = document.getElementById("faq-accordion");

if (accordion) {
  accordion.addEventListener("click", (event) => {
    const header = event.target.closest(".accordion__header");
    if (!header) return;

    const item = header.parentElement;
    const isOpen = item.classList.contains("accordion__item--open");

    accordion.querySelectorAll(".accordion__item").forEach((el) => {
      el.classList.remove("accordion__item--open");
    });

    if (!isOpen) {
      item.classList.add("accordion__item--open");
    }
  });
}

// Форма подписки (демо)
const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const email = formData.get("email");
    const platform = formData.get("platform");

    alert(
      `Спасибо за интерес к NEON RIFT!\n` +
      `В демо-версии данные никуда не отправляются.\n` +
      `Email: ${email || "не указан"}\n` +
      `Платформа: ${platform || "не указана"}`
    );

    newsletterForm.reset();
  });
}
