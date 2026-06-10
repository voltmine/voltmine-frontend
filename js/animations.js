// Smooth scroll animations and interactions

// Counter animation for hero stats
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toFixed(target % 1 === 0 ? 0 : 1);
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(target % 1 === 0 ? 0 : 1);
        }
    }, duration / steps);
}

// Initialize counters when visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// Scroll animations for flow steps
const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.flow-step').forEach(el => {
    flowObserver.observe(el);
});

// Pricing cards animation
const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.pricing-card').forEach(el => {
    pricingObserver.observe(el);
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar-modern');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Particles animation
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const delay = Math.random() * 15;

        particle.style.left = startX + '%';
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', () => {
    createParticles();
});

// Smooth scroll for anchor links
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

// Pricing card hover effect enhancement
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Bitcoin floating animation randomization
document.querySelectorAll('.bitcoin-float').forEach((bitcoin, index) => {
    const randomDuration = 15 + Math.random() * 10;
    const randomDelay = Math.random() * 5;
    bitcoin.style.animationDuration = randomDuration + 's';
    bitcoin.style.animationDelay = randomDelay + 's';
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bitcoin-float');

    parallaxElements.forEach((el, index) => {
        const speed = 0.1 + (index * 0.05);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading animation for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Copy to clipboard for crypto addresses (if needed later)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
    });
}

// Dynamic stats counter on scroll
const statsSection = document.querySelector('.hero-stats-animated');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('stats-animated')) {
                entry.target.classList.add('stats-animated');
                document.querySelectorAll('.stat-number[data-count]').forEach(animateCounter);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Add entrance animations to sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Easter egg: Konami code for special animation
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.classList.add('konami-active');
        setTimeout(() => {
            document.body.classList.remove('konami-active');
        }, 5000);
    }
});

console.log('%c⛏️ PRX Holdings - Cloud Mining Platform', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cBuilt with care 🚀', 'font-size: 14px; color: #64748b;');
