// Prestige University - Custom JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================
    // Navbar Scroll Effect
    // ===============================
    const navbar = document.getElementById('navbar');
    
    // Reading progress bar
    const readingProgress = document.getElementById('readingProgress');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Update reading progress
        if (readingProgress) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            readingProgress.style.width = progress + '%';
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

    // Floating CTA show/hide
    const floatingCta = document.getElementById('floatingCta');
    window.addEventListener('scroll', function() {
        if (floatingCta) {
            if (window.scrollY > 400) {
                floatingCta.classList.add('show');
            } else {
                floatingCta.classList.remove('show');
            }
        }
    });

    // ===============================
    // Smooth Scrolling for Navigation Links
    // ===============================
    const NAVBAR_HEIGHT = 80;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===============================
    // Contact Form Submission with Inline Validation
    // ===============================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Real-time validation
        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) validateField(this);
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let valid = true;
            this.querySelectorAll('.form-control').forEach(input => {
                if (!validateField(input)) valid = false;
            });
            if (!valid) return;
            
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]')?.value;
            
            // Show inline success message
            const successMsg = document.createElement('div');
            successMsg.className = 'alert alert-success mt-3';
            successMsg.innerHTML = `<i class="fas fa-check-circle me-2"></i>Thank you${name ? ' ' + name : ''}! Your message has been sent successfully.`;
            this.appendChild(successMsg);
            setTimeout(() => successMsg.remove(), 5000);
            
            this.reset();
            this.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
        });
    }

    function validateField(input) {
        const value = input.value.trim();
        let valid = true;
        let message = '';

        if (input.hasAttribute('required') && !value) {
            valid = false;
            message = 'This field is required.';
        } else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            valid = false;
            message = 'Please enter a valid email address.';
        }

        input.classList.toggle('is-valid', valid && !!value);
        input.classList.toggle('is-invalid', !valid);

        let feedback = input.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            input.parentNode.insertBefore(feedback, input.nextSibling);
        }
        feedback.textContent = message;
        return valid;
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
    // Scroll Reveal Animations
    // ===============================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

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
    // Cookie Consent Banner
    // ===============================
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');

    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        setTimeout(() => cookieBanner.classList.add('show'), 1500);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
        });
    }

    if (cookieDecline) {
        cookieDecline.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
        });
    }

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
    // Close Mobile Menu on Nav Link Click
    // ===============================
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
        document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                    if (navbarToggler) navbarToggler.classList.remove('active');
                }
            });
        });
    }

    // ===============================
    // Dark Mode Toggle
    // ===============================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

    // Restore preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeIcon) { darkModeIcon.classList.replace('fa-moon', 'fa-sun'); }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            if (darkModeIcon) {
                darkModeIcon.classList.toggle('fa-moon', !isDark);
                darkModeIcon.classList.toggle('fa-sun', isDark);
            }
        });
    }

    // ===============================
    // Window Load Animation + Preloader
    // ===============================
    window.addEventListener('load', function() {
        // Add loaded class to body for any load animations
        document.body.classList.add('loaded');
        // Hide preloader
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 600);
        }
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
