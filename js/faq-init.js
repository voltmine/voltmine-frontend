// FAQ Initialization - Ensures FAQ dropdowns work
// This runs after page load to guarantee FAQ elements exist

function initializeFAQ() {
    console.log('🔧 Initializing FAQ dropdowns...');

    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length === 0) {
        console.warn('⚠️ No FAQ questions found on page');
        return;
    }

    console.log(`✅ Found ${faqQuestions.length} FAQ questions`);

    faqQuestions.forEach((question, index) => {
        // Remove any existing listeners
        const newQuestion = question.cloneNode(true);
        question.parentNode.replaceChild(newQuestion, question);

        // Add click listener
        newQuestion.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            console.log(`Clicked FAQ #${index + 1}, currently ${isActive ? 'active' : 'inactive'}`);

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle this item
            if (!isActive) {
                faqItem.classList.add('active');
                console.log(`✅ Opened FAQ #${index + 1}`);
            } else {
                console.log(`❌ Closed FAQ #${index + 1}`);
            }
        });
    });

    console.log('✅ FAQ initialization complete');
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFAQ);
} else {
    // DOM already loaded
    initializeFAQ();
}

// Also run after a delay to catch any late-loading content
setTimeout(initializeFAQ, 3000);
