const buttons = document.querySelectorAll(".primary, .secondary, .nav-button");
const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const contactForm = document.querySelector(".contact-form");
const countdown = document.querySelector(".countdown-timer");
const newsletterForm = document.querySelector(".newsletter-form");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.animate(
      [
        { transform: "scale(1)", boxShadow: "0 0 0 rgba(0,0,0,0)" },
        { transform: "scale(0.97)", boxShadow: "0 0 18px rgba(95,245,214,0.35)" },
        { transform: "scale(1)", boxShadow: "0 0 0 rgba(0,0,0,0)" }
      ],
      { duration: 260, easing: "ease-out" }
    );
  });
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("a[href^=\"#\"]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      navLinks?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("تم استلام رسالتك، سنعود إليك قريباً.");
    contactForm.reset();
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("تم اشتراكك في النشرة الأمنية.");
    newsletterForm.reset();
  });
}

if (countdown) {
  const targetDate = new Date(countdown.dataset.target).getTime();
  const updateCountdown = () => {
    const now = Date.now();
    const diff = Math.max(targetDate - now, 0);
    const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    countdown.textContent = `${hours}:${minutes}:${seconds}`;
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
