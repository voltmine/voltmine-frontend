// ============================================
// CENTERED LOGO ANIMATION SCRIPT
// Handles logo intro and navbar appearance
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar-modern');
    const logoIntro = document.querySelector('.logo-intro');

    // Only run if logo intro exists (homepage only)
    if (logoIntro && navbar) {
        // Hide logo intro and show navbar after 2 seconds
        setTimeout(() => {
            logoIntro.classList.add('hidden');
            navbar.classList.add('show');
        }, 2000);
    } else if (navbar) {
        // On other pages, show navbar immediately
        navbar.classList.add('show');
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
