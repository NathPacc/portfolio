// Carousel 3D functionality
let currentIndex = 0;
const cards = document.querySelectorAll(".project-card");
const totalCards = cards.length;
const angleStep = 360 / totalCards;
const radius = 500;

function positionCards() {
  cards.forEach((card, index) => {
    const angleOffset = (index - currentIndex) * angleStep;
    const angle = (angleOffset * Math.PI) / 180;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    // Scale based on z position
    const scale = ((z + radius) / (radius * 2)) * 0.6 + 0.4;
    const opacity = ((z + radius) / (radius * 2)) * 0.7 + 0.3;

    // Transform: position in 3D space, then rotate card to face center, then scale
    card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angleOffset}deg) scale(${scale})`;
    card.style.opacity = opacity;
    card.style.zIndex = Math.floor(z);

    // Add active class to front card
    if (index === currentIndex) {
      card.classList.add("active-card");
    } else {
      card.classList.remove("active-card");
    }
  });
}

function rotateCarousel(direction) {
  currentIndex = (currentIndex - direction + totalCards) % totalCards;
  positionCards();
}

// Initialize carousel
positionCards();

// Carousel controls
document.querySelector(".carousel-btn.next").addEventListener("click", () => {
  rotateCarousel(-1);
});

document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
  rotateCarousel(1);
});

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");

    // Hide all project details
    document.querySelectorAll(".project-detail").forEach((detail) => {
      detail.classList.remove("active");
    });

    // Show main content
    document.getElementById("main-content").style.display = "block";

    // Scroll to target
    document.querySelector(targetId).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Project detail buttons click
document.querySelectorAll(".btn-details").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = btn.closest(".project-card");
    const projectId = card.getAttribute("data-project");
    showProjectDetail(projectId);
  });
});

// Project card click to show detail
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project");
    showProjectDetail(projectId);
  });
});

function showProjectDetail(projectId) {
  // Hide main content
  document.getElementById("main-content").style.display = "none";

  // Hide all project details
  document.querySelectorAll(".project-detail").forEach((detail) => {
    detail.classList.remove("active");
  });

  // Show selected project detail
  document.getElementById(`project-${projectId}`).classList.add("active");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Back button in project details
document.querySelectorAll(".back-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // Hide all project details
    document.querySelectorAll(".project-detail").forEach((detail) => {
      detail.classList.remove("active");
    });

    // Show main content
    document.getElementById("main-content").style.display = "block";

    // Scroll to projects section
    document.querySelector("#projects").scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".about-content, .skill-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
  observer.observe(el);
});

// Add staggered animation to skill items
document.querySelectorAll(".skill-item").forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Add keyboard navigation for carousel
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    rotateCarousel(1);
  } else if (e.key === "ArrowRight") {
    rotateCarousel(-1);
  }
});
