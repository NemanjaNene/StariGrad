// ===== Track Hall Selection =====
document.querySelectorAll('.select-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const hallCard = btn.closest('.hall-choice-card');
        const hallType = hallCard.getAttribute('data-hall');
        
        // Store selection in localStorage
        localStorage.setItem('selectedHall', hallType);
        
        // Add loading animation
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Učitavanje...';
        btn.style.pointerEvents = 'none';
        
        console.log(`Selected hall: ${hallType}`);
    });
});

// ===== Card Animations on Hover =====
document.querySelectorAll('.hall-choice-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===== Smooth Scroll for Footer Links =====
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

// ===== Add Parallax Effect to Background =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.landing-background');
    if (background) {
        background.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== Animate Cards on Scroll =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ===== Console Welcome =====
console.log('%c🏛️ Stari Grad Event Hall - Landing Page', 'font-size: 18px; font-weight: bold; color: #c9a961;');
console.log('%cIzaberite savršenu salu za Vaš događaj', 'font-size: 12px; color: #666;');
