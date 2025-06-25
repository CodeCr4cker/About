//loader 
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
  });

// read more mobile-friendly 
    const openBtn = document.getElementById('openPopup');
const closeBtn = document.getElementById('closePopup');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');

openBtn.addEventListener('click', () => {
  popup.classList.add('show');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden'; // 🚫 disables scroll
});

const closePopup = () => {
  popup.classList.remove('show');
  overlay.classList.remove('show');
  document.body.style.overflow = 'auto'; // ✅ re-enables scroll
};

closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);


// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.onclick = () => {
  if (document.body.getAttribute('data-theme') === 'dark') {
    document.body.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
};

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

// Testimonials carousel
const testimonials = document.querySelectorAll('.testimonial');
let activeTestimonial = 0;
function showTestimonial(idx) {
  testimonials.forEach((el, i) => el.classList.toggle('active', i === idx));
}
document.querySelector('.testimonials-carousel .next').onclick = () => {
  activeTestimonial = (activeTestimonial + 1) % testimonials.length;
  showTestimonial(activeTestimonial);
};
document.querySelector('.testimonials-carousel .prev').onclick = () => {
  activeTestimonial = (activeTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(activeTestimonial);
};
showTestimonial(activeTestimonial);

// Contact form validation & success message
document.getElementById('contact-form').onsubmit = function(e) {
  e.preventDefault();
  // Here, add your AJAX/formspree/emailjs integration if needed
  document.getElementById('contact-success').style.display = 'block';
  this.reset();
  setTimeout(() => {
    document.getElementById('contact-success').style.display = 'none';
  }, 5000);
};

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
