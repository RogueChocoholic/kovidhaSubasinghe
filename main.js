// Initialize AOS
AOS.init({
  once: true,
  duration: 800,
  easing: "ease-out-cubic",
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Current Year
document.getElementById("current-year").textContent = new Date().getFullYear();

// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.classList.add("fade-out");
  }, 500);
});

// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});

document.addEventListener("mousedown", () => {
  cursor.style.width = "15px";
  cursor.style.height = "15px";
  cursor.style.backgroundColor = "rgba(79, 70, 229, 0.6)";
});

document.addEventListener("mouseup", () => {
  cursor.style.width = "20px";
  cursor.style.height = "20px";
  cursor.style.backgroundColor = "rgba(79, 70, 229, 0.3)";
});

// Animate skill bars when in viewport
const skillBars = document.querySelectorAll(".skill-progress");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const targetWidth = bar.getAttribute("data-width");
    bar.style.width = targetWidth;
  });
};

// Trigger skill bar animation when skills section is in view
const skillsSection = document.getElementById("skills");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(animateSkillBars, 300);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(skillsSection);

// Animated background bubbles
const animatedBg = document.querySelector(".animated-bg");
const bubbleCount = 20;

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement("span");
  const size = Math.random() * 60 + 10;
  const left = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 10;

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}%`;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.animationDelay = `${delay}s`;

  animatedBg.appendChild(bubble);
}

// GSAP Animations
// gsap.from(".hero-text", {
//   duration: 1,
//   y: 50,
//   opacity: 0,
//   stagger: 0.2,
//   ease: "power3.out",
// });

// const texts = ["Software Engineering Undergraduate", "Web Developer", "Problem Solver"];
const texts = [
  "Software Engineering Undergraduate",
  "Full-Stack Developer",
  "Tech Problem Solver",
  "Web Developer",
];
let count = 0;
let index = 0;
let isDeleting = false;
let currentText = "";
let displayText = "";

function type() {
  currentText = texts[count];

  if (isDeleting) {
    displayText = currentText.slice(0, --index);
  } else {
    displayText = currentText.slice(0, ++index);
  }

  document.getElementById("typing-text").textContent = displayText;

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && displayText === currentText) {
    speed = 2000; // pause before deleting
    isDeleting = true;
  } else if (isDeleting && displayText === "") {
    isDeleting = false;
    count = (count + 1) % texts.length;
    speed = 500; // pause before typing next
  }

  setTimeout(type, speed);
}

window.onload = () => {
  setTimeout(type, 1000);
};

document.addEventListener("DOMContentLoaded", function () {
  fetch("project-details.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#project-container");
      container.innerHTML = ""; // Clear any default content
      data.projects.forEach((project) => {
        const tagSpans = project.technologies_used.tech_stack
          .map(
            (tag) =>
              `<span class="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded">${tag}</span>`
          )
          .join("");

        const card = `
              <div class="project-card bg-white rounded-xl overflow-hidden shadow-md" data-aos="fade-up" data-aos-delay="100">
                <div class="h-48 bg-gray-200 relative overflow-hidden img-hover-zoom">
                  <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                  <div class="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded">${project.client.type}</div>
                </div>
                <div class="p-6">
                  <h3 class="font-bold text-xl mb-2 font-playfair">${project.title}</h3>
                  <p class="text-gray-600 mb-4">${project.short_description}</p>
                  <div class="flex flex-wrap gap-2 mb-4">${tagSpans}</div>
                  <a href="project-details.html?id=${project.id}" class="text-indigo-600 hover:text-indigo-700 flex items-center text-sm font-medium group">
                    View Details
                    <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>`;
        container.insertAdjacentHTML("beforeend", card);
      });
    })
    .catch((error) => console.error("Error loading projects:", error));
});

function downloadPdf() {
  var link = document.createElement("a");
  link.href = "../resources/cv/Kovidha Subasinghe Resume.pdf";
  link.download;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
