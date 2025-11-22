feather.replace(); // to replace all data-feather with icons

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
for(let i = 0; i < mobileMenuLinks.length; i++) {
  mobileMenuLinks[i].addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
}

const toTopButton = document.getElementById('to-top-button');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    toTopButton.classList.remove('hidden');
  } 
  else {
    toTopButton.classList.add('hidden');
  }
});
toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if(targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const animatedItems = document.querySelectorAll('.animated-item');
const observer = new IntersectionObserver((entries) => { // defining observer
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });
animatedItems.forEach(item => { observer.observe(item); });

const typewriterElement = document.getElementById('typewriter');
const phrases = ["Ritik Raj.", "a Web Developer.", "a Problem Solver.", "a Tech Enthusiast.", "a Learner."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typewriterElement) return;
  const currentPhrase = phrases[phraseIndex];
  const currentText = isDeleting ? currentPhrase.substring(0, charIndex - 1) : currentPhrase.substring(0, charIndex + 1);
  
  typewriterElement.textContent = currentText;

  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => isDeleting = true, 2000);
  } 
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  
  charIndex += isDeleting ? -1 : 1;
  const typingSpeed = isDeleting ? 100 : 150;
  setTimeout(typeEffect, typingSpeed);
}

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
      formStatus.className = "mt-6 text-center text-lg text-green-400";
      form.reset();
    } 
    else {
      formStatus.textContent = "Oops! There was a problem submitting your form.";
      formStatus.className = "mt-6 text-center text-lg text-red-400";
    }
  }).catch(error => {
    formStatus.textContent = "Oops! There was a network error. Please try again.";
    formStatus.className = "mt-6 text-center text-lg text-red-400";
  });
}

form.addEventListener("submit", handleSubmit);

// Particles.js Config
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#22d3ee"
    },
    "shape": {
      "type": "circle",
    },
    "opacity": {
      "value": 0.3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#0ea5e9",
      "opacity": 0.2,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    },
     "modes": {
        "grab": {
            "distance": 140,
            "line_linked": {
                "opacity": 0.5
            }
        }
    }
  },
  "retina_detect": true
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#home .animated-item').forEach(item => {
    item.classList.add('is-visible');
  });
  setTimeout(typeEffect, 500);
});