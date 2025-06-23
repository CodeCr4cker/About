// ==== Firebase Config ====
// Replace with your Firebase config!
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5B4QX1tUIw0lSYsjy-HW7pvHOe4nMmL4",
  authDomain: "website-1f91d.firebaseapp.com",
  projectId: "website-1f91d",
  storageBucket: "website-1f91d.firebasestorage.app",
  messagingSenderId: "176653839690",
  appId: "1:176653839690:web:55bec54b6f2d3895c9e5b3",
  measurementId: "G-F5TKYBL0R2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// ==== Admin Auth Logic ====
const adminModal = document.getElementById('admin-modal');
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminLogoutBtn = document.getElementById('admin-logout-btn');
const loginModal = document.getElementById('login-modal');
const closeAdmin = document.getElementById('close-admin');
const closeLogin = document.getElementById('close-login');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Show/hide login modal
adminLoginBtn.onclick = function() {
  loginModal.style.display = 'flex';
  loginError.style.display = 'none';
  loginForm.reset();
};
closeLogin.onclick = function() {
  loginModal.style.display = 'none';
};
window.onclick = function(event) {
  if (event.target === loginModal) loginModal.style.display = 'none';
  if (event.target === adminModal) adminModal.style.display = 'none';
};

// Handle login form
loginForm.onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  loginError.style.display = 'none';
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      loginModal.style.display = 'none';
      showAdminDashboard();
    })
    .catch(err => {
      loginError.textContent = "Invalid credentials! " + (err.code || "");
      loginError.style.display = 'block';
    });
};

// Show/hide admin dashboard if authenticated
function showAdminDashboard() {
  adminModal.style.display = 'flex';
  animateAdminCounters();
}
closeAdmin.onclick = function() {
  adminModal.style.display = 'none';
};
adminLogoutBtn.onclick = function() {
  auth.signOut().then(() => {
    adminModal.style.display = 'none';
    adminLoginBtn.style.display = 'block';
  });
};

// Show/hide buttons and modals based on auth state
auth.onAuthStateChanged(user => {
  if (user) {
    adminLoginBtn.style.display = 'none';
  } else {
    adminLoginBtn.style.display = 'block';
    adminModal.style.display = 'none';
  }
});

// Animate admin counters (dummy, replace with real data if you wish)
function animateAdminCounters() {
  function animateAdminCounter(id, end) {
    let cur = 0, step = Math.ceil(end / 40);
    function count() {
      cur += step;
      if (cur > end) cur = end;
      document.getElementById(id).textContent = cur;
      if (cur < end) requestAnimationFrame(count);
    }
    count();
  }
  animateAdminCounter('admin-projects', 12);
  animateAdminCounter('admin-blogs', 5);
  animateAdminCounter('admin-messages', 18);
}

// --- Everything below here is your animated features, navbar, loader, etc. ---

// Loader logic
  window.onload = function () {
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('app').classList.remove('hidden');
    }, 3000); // 3 seconds
  };

// Custom Cursor
//const cursor = document.getElementById('custom-cursor');
//document.addEventListener('mousemove', e => {
//  cursor.style.left = e.clientX + 'px';
 // cursor.style.top = e.clientY + 'px';
//});
//document.querySelectorAll('a,button,.primary-btn').forEach(el => {
//  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
 // el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
//});

// Particles.js config
particlesJS('particles-js', {
  particles: {
    number: { value: 45, density: { enable: true, value_area: 900 } },
    color: { value: "#ff0000" },
    shape: { type: "circle" },
    opacity: { value: 0.21, random: true },
    size: { value: 8, random: true },
    move: { enable: true, speed: 2.2, direction: "none", out_mode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: false } },
    modes: { repulse: { distance: 90, duration: 0.7 } }
  },
  retina_detect: true
});

// Dark/Light Mode Auto-detect
const themeToggle = document.getElementById('theme-toggle');
window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('theme')) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      swapFavicon('dark');
    }
  }
});
themeToggle.onclick = () => {
  if (document.body.getAttribute('data-theme') === 'dark') {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    swapFavicon('light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    swapFavicon('dark');
  }
};
// Favicon swap for theme
function swapFavicon(theme) {
  const favicon = document.getElementById('dynamic-favicon');
  if (theme === 'dark') {
    favicon.href = 'favicon-dark.ico';
  } else {
    favicon.href = 'favicon.ico';
  }
}

// Hamburger menu for mobile
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('header .navbar');
menuBtn.onclick = () => {
  navbar.classList.toggle('active');
  menuBtn.classList.toggle('fa-xmark');
  menuBtn.classList.toggle('fa-bars');
};
// Close navbar on link click (mobile)
document.querySelectorAll('header .navbar a').forEach(link => {
  link.onclick = () => {
    navbar.classList.remove('active');
    menuBtn.classList.remove('fa-xmark');
    menuBtn.classList.add('fa-bars');
  };
});

// Back to top button show/hide
const backToTop = document.getElementById('back-to-top');
window.onscroll = () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
};

// Typing effect
const typingTarget = document.getElementById('typing');
const typingTexts = [
  "I'm Divyanshu Pandey",
  'Web Developer',
  'Student & Coder',
  'HTML & CSS Enthusiast'
];
let tIdx = 0, lIdx = 0, isDeleting = false;
function type() {
  let text = typingTexts[tIdx];
  typingTarget.textContent = isDeleting ? text.substring(0, lIdx--) : text.substring(0, lIdx++);
  if (!isDeleting && lIdx === text.length + 1) setTimeout(() => isDeleting = true, 1000);
  else if (isDeleting && lIdx === 0) { tIdx = (tIdx + 1) % typingTexts.length; isDeleting = false; }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// Animated Skills Progress Bars
let skillsAnimated = false;
function animateSkills() {
  document.querySelectorAll('.progress').forEach(bar => {
    let val = bar.getAttribute('data-value') || bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.transition = "width 1.3s";
      bar.style.width = val;
    }, 220);
  });
}
window.addEventListener('scroll', () => {
  if (skillsAnimated) return;
  let skills = document.getElementById('skills');
  let rect = skills.getBoundingClientRect();
  if (rect.top < window.innerHeight - 120) {
    animateSkills();
    skillsAnimated = true;
  }
});

// Project Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    let filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      let tags = card.getAttribute('data-tags').split(' ');
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  };
});

// Animated Counters
let countersAnimated = false;
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    let end = parseInt(counter.getAttribute('data-to'));
    let cur = 0, step = Math.ceil(end / 40);
    function count() {
      cur += step;
      if (cur > end) cur = end;
      counter.textContent = cur;
      if (cur < end) requestAnimationFrame(count);
    }
    count();
  });
}
window.addEventListener('scroll', () => {
  if (countersAnimated) return;
  let stats = document.getElementById('stats');
  let rect = stats.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    animateCounters();
    countersAnimated = true;
  }
});

// Timeline Animation
function showTimelineItems() {
  document.querySelectorAll('.timeline-item').forEach((item, idx) => {
    let rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) item.classList.add('visible');
  });
}
window.addEventListener('scroll', showTimelineItems);
showTimelineItems();

// Timeline Dots (Click to scroll)
document.querySelectorAll('.timeline-dot').forEach(dot => {
  dot.onclick = function() {
    let idx = dot.getAttribute('data-index');
    let item = document.querySelector(`.timeline-item[data-index="${idx}"]`);
    if (item) item.scrollIntoView({ behavior: "smooth", block: "center" });
    document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  };
});

// Testimonials carousel with auto-play
const testimonials = document.querySelectorAll('.testimonial');
let activeTestimonial = 0, testimonialInterval;
function showTestimonial(idx) {
  testimonials.forEach((el, i) => el.classList.toggle('active', i === idx));
}
function nextTestimonial() {
  activeTestimonial = (activeTestimonial + 1) % testimonials.length;
  showTestimonial(activeTestimonial);
}
function prevTestimonial() {
  activeTestimonial = (activeTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(activeTestimonial);
}
document.querySelector('.testimonials-carousel .next').onclick = () => {
  nextTestimonial();
  resetTestimonialAutoplay();
};
document.querySelector('.testimonials-carousel .prev').onclick = () => {
  prevTestimonial();
  resetTestimonialAutoplay();
};
function startTestimonialAutoplay() {
  testimonialInterval = setInterval(nextTestimonial, 5000);
}
function resetTestimonialAutoplay() {
  clearInterval(testimonialInterval);
  startTestimonialAutoplay();
}
showTestimonial(activeTestimonial);
startTestimonialAutoplay();

// Blog Modal
const modal = document.getElementById('blog-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.onclick = function() {
    modal.style.display = 'flex';
    modalTitle.textContent = btn.getAttribute('data-title');
    modalContent.textContent = btn.getAttribute('data-content');
  };
});
document.querySelector('.close-modal').onclick = function() {
  modal.style.display = 'none';
};
window.onclick = function(event) {
  if (event.target === modal) modal.style.display = 'none';
};

// Contact form validation & success message
document.getElementById('contact-form').onsubmit = function(e) {
  e.preventDefault();
  document.getElementById('contact-success').style.display = 'block';
  this.reset();
  setTimeout(() => {
    document.getElementById('contact-success').style.display = 'none';
  }, 5000);
};

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
