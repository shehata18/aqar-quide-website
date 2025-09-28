// Professional Animation System for AqarGuide Landing Page

// Animation Configuration
const ANIMATION_CONFIG = {
    duration: 600,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounceEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    staggerDelay: 100
};

// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Advanced Intersection Observer for scroll animations
class ScrollAnimationManager {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        // Create different observers for different animation types
        this.createObserver('reveal', {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.createObserver('reveal-scale', {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        });

        this.createObserver('reveal-left', {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        this.createObserver('reveal-right', {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        this.observeElements();
    }

    createObserver(className, options) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add stagger delay for multiple elements
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * ANIMATION_CONFIG.staggerDelay);

                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.observers.set(className, observer);
    }

    observeElements() {
        this.observers.forEach((observer, className) => {
            document.querySelectorAll(`.${className}`).forEach(element => {
                observer.observe(element);
            });
        });
    }
}

// Enhanced Mobile Menu with animations
class MobileMenuManager {
    constructor() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-links');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.menuBtn || !this.navLinks) return;

        this.menuBtn.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navLinks.contains(e.target) && !this.menuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu when clicking on nav links
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.isOpen = true;
        this.navLinks.classList.add('active');
        this.menuBtn.querySelector('i').classList.remove('fa-bars');
        this.menuBtn.querySelector('i').classList.add('fa-times');

        // Animate menu items
        this.navLinks.querySelectorAll('a').forEach((link, index) => {
            link.style.animation = `slideInFromRight 0.3s ease-out ${index * 0.1}s forwards`;
        });
    }

    closeMenu() {
        this.isOpen = false;
        this.navLinks.classList.remove('active');
        this.menuBtn.querySelector('i').classList.add('fa-bars');
        this.menuBtn.querySelector('i').classList.remove('fa-times');

        // Reset animations
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.style.animation = '';
        });
    }
}

// Advanced Navbar with scroll effects
class NavbarManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            this.lastScrollY = window.scrollY;
            this.requestTick();
        });
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.updateNavbar());
            this.ticking = true;
        }
    }

    updateNavbar() {
        const scrollY = this.lastScrollY;

        // Hide navbar when scrolling down
        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        this.ticking = false;
    }
}

// Basic Screenshot Image Loading
class ScreenshotSlider {
    constructor() {
        this.screenshots = document.querySelectorAll('.screenshot');
        this.init();
    }

    init() {
        this.setupImageLoading();
    }

    setupImageLoading() {
        this.screenshots.forEach(screenshot => {
            const img = screenshot.querySelector('img');
            if (img) {
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                }
            }
        });
    }
}

// Button Ripple Effect System
class RippleEffect {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.download-btn, .nav-cta, .social-links a').forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        // Ensure button has relative positioning
        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Smooth Scrolling Enhancement
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Preload critical images
        this.preloadImages();

        // Monitor performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
            });
        }
    }

    preloadImages() {
        const criticalImages = [
            'images/1.png',
            'images/2.png',
            'images/3.png',
            'images/4.png'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Loading Animation System
class LoadingManager {
    constructor() {
        this.init();
    }

    init() {
        // Create loading overlay
        this.createLoadingOverlay();

        // Hide loading when page is ready
        if (document.readyState === 'complete') {
            this.hideLoading();
        } else {
            window.addEventListener('load', () => this.hideLoading());
        }
    }

    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>جاري التحميل...</p>
            </div>
        `;

        // Add styles
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #2c3e50, #3498db);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;

        document.body.appendChild(overlay);
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }
    }
}

// Add CSS for loading spinner and ripple effect
const additionalCSS = `
    .loading-spinner {
        text-align: center;
        color: white;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .feature-card:nth-child(1) .reveal-scale { animation-delay: 0.1s; }
    .feature-card:nth-child(2) .reveal-scale { animation-delay: 0.2s; }
    .feature-card:nth-child(3) .reveal-scale { animation-delay: 0.3s; }
    .feature-card:nth-child(4) .reveal-scale { animation-delay: 0.4s; }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize all systems when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LoadingManager();
    new ScrollAnimationManager();
    new MobileMenuManager();
    new NavbarManager();
    new ScreenshotSlider();
    new RippleEffect();
    new SmoothScrollManager();
    new PerformanceMonitor();
});

// Initialize immediately available features
if (document.readyState !== 'loading') {
    new LoadingManager();
}