// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navRight = document.querySelector('.nav-right');
const mobileNavLinks = document.querySelectorAll('.nav-right ul li a');

// Toggle menu when clicking the menu button
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    navRight.classList.toggle('active');
    document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navRight.classList.contains('active') && 
        !navRight.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navRight.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navRight.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Language Switcher
const langButtons = document.querySelectorAll('.lang-btn');
const langElements = {
    en: document.querySelectorAll('.lang-en'),
    sv: document.querySelectorAll('.lang-sv')
};

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        
        // Update active state
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show/hide language elements
        Object.keys(langElements).forEach(key => {
            langElements[key].forEach(el => {
                el.style.display = key === lang ? 'block' : 'none';
            });
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    observer.observe(card);
});

// Update active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Social icon hover effects
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(element);
    });
};

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
}); 