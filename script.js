// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===== Sticky Navbar =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Hero Slider =====
const slides = document.querySelectorAll('.hero-slide');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
const sliderDotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let slideInterval;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dot');

function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Auto slide
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

if (prevSlideBtn && nextSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });

    nextSlideBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });

    // Start auto slideshow
    startSlideshow();

    // Pause on hover
    document.querySelector('.hero').addEventListener('mouseenter', stopSlideshow);
    document.querySelector('.hero').addEventListener('mouseleave', startSlideshow);
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== AOS-like Scroll Animations =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeElements = document.querySelectorAll('[data-aos]');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Handle different animation types
            const animationType = entry.target.getAttribute('data-aos');
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                if (animationType === 'fade-up') {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else if (animationType === 'fade-right') {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                } else if (animationType === 'fade-left') {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            }, delay);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    const animationType = element.getAttribute('data-aos');
    
    // Set initial state
    element.style.opacity = '0';
    if (animationType === 'fade-up') {
        element.style.transform = 'translateY(50px)';
    } else if (animationType === 'fade-right') {
        element.style.transform = 'translateX(-50px)';
    } else if (animationType === 'fade-left') {
        element.style.transform = 'translateX(50px)';
    }
    
    fadeObserver.observe(element);
});

// ===== Stats Counter Animation =====
const statsSection = document.querySelector('.stats');
let hasCounted = false;

const countUp = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                countUp(stat, target, 2500);
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== Gallery Modal =====
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const galleryItems = document.querySelectorAll('.gallery-item img');

let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.parentElement.addEventListener('click', () => {
        modal.classList.add('show');
        modalImage.src = item.src;
        currentImageIndex = index;
        document.body.style.overflow = 'hidden';
    });
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

if (modalPrev && modalNext) {
    modalPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        modalImage.src = galleryItems[currentImageIndex].src;
    });

    modalNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        modalImage.src = galleryItems[currentImageIndex].src;
    });
}

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (modal && modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft' && modalPrev) {
            modalPrev.click();
        } else if (e.key === 'ArrowRight' && modalNext) {
            modalNext.click();
        }
    }
});

// ===== Virtual Tour with Pannellum =====
let currentSceneIndex = 0;
const scenes = [
    {
        title: 'Glavni ulaz',
        image: 'slike/stari grad.webp'
    },
    {
        title: 'Unutrašnjost sale',
        image: 'slike/unnamed.webp'
    },
    {
        title: 'Prostor za proslave',
        image: 'slike/unnamed (1).webp'
    }
];

let viewer;

// Initialize Pannellum viewer
if (document.getElementById('panorama') && typeof pannellum !== 'undefined') {
    viewer = pannellum.viewer('panorama', {
        type: 'equirectangular',
        panorama: scenes[0].image,
        autoLoad: true,
        autoRotate: -2,
        compass: true,
        showZoomCtrl: true,
        mouseZoom: true,
        showFullscreenCtrl: true,
        hfov: 110,
        minHfov: 50,
        maxHfov: 120,
        friction: 0.15
    });

    // Update scene title
    const sceneTitle = document.getElementById('sceneTitle');
    if (sceneTitle) {
        sceneTitle.textContent = scenes[currentSceneIndex].title;
    }

    // Previous scene button
    const prevSceneBtn = document.getElementById('prevScene');
    if (prevSceneBtn) {
        prevSceneBtn.addEventListener('click', () => {
            currentSceneIndex = (currentSceneIndex - 1 + scenes.length) % scenes.length;
            viewer.destroy();
            viewer = pannellum.viewer('panorama', {
                type: 'equirectangular',
                panorama: scenes[currentSceneIndex].image,
                autoLoad: true,
                autoRotate: -2,
                compass: true,
                showZoomCtrl: true,
                mouseZoom: true,
                showFullscreenCtrl: true,
                hfov: 110,
                minHfov: 50,
                maxHfov: 120
            });
            if (sceneTitle) {
                sceneTitle.textContent = scenes[currentSceneIndex].title;
            }
        });
    }

    // Next scene button
    const nextSceneBtn = document.getElementById('nextScene');
    if (nextSceneBtn) {
        nextSceneBtn.addEventListener('click', () => {
            currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
            viewer.destroy();
            viewer = pannellum.viewer('panorama', {
                type: 'equirectangular',
                panorama: scenes[currentSceneIndex].image,
                autoLoad: true,
                autoRotate: -2,
                compass: true,
                showZoomCtrl: true,
                mouseZoom: true,
                showFullscreenCtrl: true,
                hfov: 110,
                minHfov: 50,
                maxHfov: 120
            });
            if (sceneTitle) {
                sceneTitle.textContent = scenes[currentSceneIndex].title;
            }
        });
    }
}

// ===== Detect Selected Hall =====
(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const hallParam = urlParams.get('hall');
    const storedHall = localStorage.getItem('selectedHall');
    const selectedHall = hallParam || storedHall;
    
    const currentHallElement = document.getElementById('currentHall');
    
    if (currentHallElement && selectedHall) {
        const hallNames = {
            'velika': 'Velika sala',
            'srednja': 'Srednja sala',
            'mala': 'Mala sala'
        };
        
        currentHallElement.textContent = hallNames[selectedHall] || 'Izabrana sala';
        
        // Update localStorage
        if (hallParam) {
            localStorage.setItem('selectedHall', hallParam);
        }
        
        // Pre-fill form
        const hallSelect = document.getElementById('hallType');
        if (hallSelect && selectedHall) {
            hallSelect.value = selectedHall;
        }
    }
})();

// ===== Menu Tabs =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuContents = document.querySelectorAll('.menu-content');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetMenu = tab.getAttribute('data-menu');
        
        // Remove active class from all tabs and contents
        menuTabs.forEach(t => t.classList.remove('active'));
        menuContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const targetContent = document.getElementById(`menu-${targetMenu}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ===== Calendar and Booking System =====
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

// Mock data for booked dates (in real app, this would come from a database)
const bookedDates = [
    '2026-01-15',
    '2026-01-22',
    '2026-01-29',
    '2026-02-14',
    '2026-02-20',
    '2026-03-08',
    '2026-03-15'
];

const monthNames = [
    'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
];

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateDisplay(date) {
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}. ${month} ${year}`;
}

function isDateBooked(dateString) {
    return bookedDates.includes(dateString);
}

function isDatePast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}

function generateCalendar(year, month) {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    
    if (!calendarDays || !currentMonthElement) return;
    
    calendarDays.innerHTML = '';
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
    const lastDateOfMonth = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();
    
    let availableCount = 0;
    
    // Previous month days
    for (let i = firstDayOfWeek - 1; i > 0; i--) {
        const day = document.createElement('div');
        day.classList.add('calendar-day', 'other-month');
        day.textContent = prevLastDate - i + 1;
        calendarDays.appendChild(day);
    }
    
    // Current month days
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = i;
        
        const dateObj = new Date(year, month, i);
        const dateString = formatDate(dateObj);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Check if today
        if (dateString === formatDate(today)) {
            day.classList.add('today');
        }
        
        // Check if past
        if (isDatePast(dateObj)) {
            day.classList.add('past');
        }
        // Check if booked
        else if (isDateBooked(dateString)) {
            day.classList.add('booked');
        }
        // Available
        else {
            day.classList.add('available');
            availableCount++;
            day.addEventListener('click', () => selectDate(dateObj));
        }
        
        // Check if selected
        if (selectedDate && dateString === formatDate(selectedDate)) {
            day.classList.add('selected');
        }
        
        calendarDays.appendChild(day);
    }
    
    // Next month days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day', 'other-month');
        day.textContent = i;
        calendarDays.appendChild(day);
    }
    
    // Update available dates count
    const availableDatesCount = document.getElementById('availableDatesCount');
    if (availableDatesCount) {
        availableDatesCount.textContent = availableCount;
    }
}

function selectDate(date) {
    selectedDate = date;
    selectedTime = null;
    
    // Regenerate calendar to update selected state
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    
    // Show booking details
    const selectedDateInfo = document.getElementById('selectedDateInfo');
    const bookingDetails = document.getElementById('bookingDetails');
    const selectedDateDisplay = document.getElementById('selectedDateDisplay');
    
    if (selectedDateInfo) selectedDateInfo.style.display = 'none';
    if (bookingDetails) bookingDetails.style.display = 'block';
    if (selectedDateDisplay) selectedDateDisplay.textContent = formatDateDisplay(date);
    
    // Reset time slot selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Scroll to booking details
    bookingDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Calendar navigation
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
}

// Time slot selection
document.addEventListener('click', (e) => {
    if (e.target.closest('.time-slot')) {
        const timeSlot = e.target.closest('.time-slot');
        selectedTime = timeSlot.dataset.time;
        
        // Remove selected from all slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
        
        // Add selected to clicked slot
        timeSlot.classList.add('selected');
    }
});

// Proceed to booking button
const proceedToBookingBtn = document.getElementById('proceedToBooking');

if (proceedToBookingBtn) {
    proceedToBookingBtn.addEventListener('click', () => {
        if (!selectedDate || !selectedTime) {
            alert('Molimo izaberite datum i vreme!');
            return;
        }
        
        // Fill the contact form with selected data
        const selectedDateField = document.getElementById('selectedDateField');
        const selectedTimeField = document.getElementById('selectedTimeField');
        
        if (selectedDateField) {
            selectedDateField.value = formatDateDisplay(selectedDate);
        }
        if (selectedTimeField) {
            selectedTimeField.value = selectedTime;
        }
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Highlight the form briefly
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.style.transform = 'scale(1.02)';
            contactForm.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                contactForm.style.transform = 'scale(1)';
            }, 500);
        }
    });
}

// Initialize calendar on page load
if (document.getElementById('calendarDays')) {
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form data:', data);
        
        // Show success message with animation
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Uspešno poslato!</span> <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
            
            // Reset calendar selection
            selectedDate = null;
            selectedTime = null;
            const selectedDateInfo = document.getElementById('selectedDateInfo');
            const bookingDetails = document.getElementById('bookingDetails');
            if (selectedDateInfo) selectedDateInfo.style.display = 'block';
            if (bookingDetails) bookingDetails.style.display = 'none';
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        }, 3000);
    });
}

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Parallax Effect for Hero =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-slider');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===== Card Hover Effects =====
const cards = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .stat-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===== Date picker minimum date (today) =====
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===== Animated Elements on Scroll =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-header, .service-card, .feature-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for animated elements
document.querySelectorAll('.section-header, .service-card, .feature-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run on page load

// ===== Smooth Scroll Reveal =====
const revealElements = document.querySelectorAll('.about-text, .about-image, .intro-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(element);
});

// ===== Cursor Trail Effect (Optional - Premium Feel) =====
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        cursorTrail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// ===== Performance Optimization =====
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Recalculate any necessary dimensions
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

// ===== Easter Egg: Confetti on Logo Click =====
let clickCount = 0;
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            console.log('🎉 Stari Grad Event Hall - Premium prezentacija! 🎉');
            clickCount = 0;
        }
    });
}

// ===== Console Welcome Message =====
console.log('%c🏛️ Stari Grad Event Hall', 'font-size: 20px; font-weight: bold; color: #c9a961;');
console.log('%cGde tradicija susreće eleganciju', 'font-size: 14px; color: #666; font-style: italic;');
console.log('%cWebsite loaded successfully! ✨', 'font-size: 12px; color: #27ae60;');

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body after a short delay
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 500);
    
    // Trigger initial animations
    animateOnScroll();
    setActiveNav();
});
