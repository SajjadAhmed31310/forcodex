const buttons = document.querySelectorAll(".primary, .secondary, .nav-button");
const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const contactForm = document.querySelector(".contact-form");
const countdown = document.querySelector(".countdown-timer");
const newsletterForm = document.querySelector(".newsletter-form");
const themeToggle = document.querySelector("#theme-toggle");
const yearSpan = document.querySelector("#year");
const backToTop = document.querySelector(".back-to-top");
const challengeSearch = document.querySelector("#challenge-search");
const challengeCategory = document.querySelector("#challenge-category");
const challengeLevel = document.querySelector("#challenge-level");
const challengeCount = document.querySelector(".challenge-count");
const challenges = Array.from(document.querySelectorAll(".challenge"));

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

const updateChallengeCount = (visibleCount) => {
  if (challengeCount) {
    challengeCount.textContent = `${visibleCount} تحدي`;
  }
};

const applyChallengeFilters = () => {
  const searchValue = challengeSearch ? challengeSearch.value.trim().toLowerCase() : "";
  const categoryValue = challengeCategory ? challengeCategory.value : "all";
  const levelValue = challengeLevel ? challengeLevel.value : "all";
  let visible = 0;

  challenges.forEach((challenge) => {
    const title = challenge.querySelector("h4")?.textContent?.toLowerCase() ?? "";
    const category = challenge.dataset.category;
    const level = challenge.dataset.level;
    const matchesSearch = title.includes(searchValue);
    const matchesCategory = categoryValue === "all" || category === categoryValue;
    const matchesLevel = levelValue === "all" || level === levelValue;
    const isVisible = matchesSearch && matchesCategory && matchesLevel;
    challenge.style.display = isVisible ? "flex" : "none";
    if (isVisible) {
      visible += 1;
    }
  });

  updateChallengeCount(visible);
};

if (challengeSearch || challengeCategory || challengeLevel) {
  [challengeSearch, challengeCategory, challengeLevel].forEach((input) => {
    input?.addEventListener("input", applyChallengeFilters);
    input?.addEventListener("change", applyChallengeFilters);
  });
  applyChallengeFilters();
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

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    themeToggle.setAttribute("aria-pressed", String(!isLight));
  });
}

if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
