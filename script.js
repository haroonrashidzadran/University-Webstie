// Prestige University - Custom JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================
    // Navbar Scroll Effect
    // ===============================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===============================
    // Scroll to Top Button
    // ===============================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===============================
    // Smooth Scrolling for Navigation Links
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===============================
    // Contact Form Submission
    // ===============================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]')?.value;
            
            // Show success message
            alert(`Thank you${name ? ' ' + name : ''}! Your message has been sent successfully. We will get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }

    // ===============================
    // Footer Newsletter Form
    // ===============================
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert(`Thank you for subscribing with email: ${email}!`);
                this.reset();
            }
        });
    }

    // ===============================
    // Counter Animation
    // ===============================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const isPercentage = target === 95;
            const increment = target / speed;

            const updateCount = () => {
                const current = +counter.innerText.replace(/,/g, '').replace(/[+%]/g, '');
                
                if (current < target) {
                    const newValue = Math.ceil(current + increment);
                    counter.innerText = newValue.toLocaleString() + (isPercentage ? '%' : '+');
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target.toLocaleString() + (isPercentage ? '%' : '+');
                }
            };

            updateCount();
        });
    }

    // ===============================
    // Intersection Observer for Animations
    // ===============================
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                    // Unobserve after animation triggered
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // ===============================
    // Navbar Active Link on Scroll
    // ===============================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set active link on page load
    updateActiveNavLink();

    // ===============================
    // Program Card Hover Effects
    // ===============================
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===============================
    // Admission Card Hover Effects
    // ===============================
    const admissionCards = document.querySelectorAll('.admission-card');
    
    admissionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===============================
    // Navbar Toggler Icon (Bootstrap 5)
    // ===============================
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    // ===============================
    // Window Load Animation
    // ===============================
    window.addEventListener('load', function() {
        // Add loaded class to body for any load animations
        document.body.classList.add('loaded');
    });

});

// ===============================
// Utility Functions
// ===============================

/**
 * Debounce function for scroll events
 */
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Throttle function for performance
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
