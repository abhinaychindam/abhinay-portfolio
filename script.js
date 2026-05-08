const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

year.textContent = new Date().getFullYear();

toggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-42% 0px -52% 0px", threshold: 0.01 }
);

sections.forEach((section) => observer.observe(section));
