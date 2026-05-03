// ---------- PARKING SPOTS DEMO ------------
document.addEventListener('DOMContentLoaded', function() {
    const spotsContainer = document.getElementById('spots');
    const spotInfo = document.getElementById('spot-info');
    const selectedSpotDisplay = document.getElementById('selected-spot');
    const spotPriceDisplay = document.getElementById('spot-price');

    // Generate 16 parking spots (4x4 grid)
    const spots = [];
    for (let i = 1; i <= 16; i++) {
        const isAvailable = Math.random() > 0.3; // 70% available
        const price = (Math.floor(Math.random() * 5) + 2).toFixed(2); // $2-7 per hour
        spots.push({
            id: `A${i}`,
            available: isAvailable,
            price: price
        });
    }

    // Render spots
    spots.forEach(spot => {
        const spotElement = document.createElement('div');
        spotElement.className = `spot ${spot.available ? 'available' : 'taken'}`;
        spotElement.textContent = spot.id;
        spotElement.dataset.id = spot.id;
        spotElement.dataset.price = spot.price;

        if (spot.available) {
            spotElement.addEventListener('click', function() {
                // Remove previous selection
                document.querySelectorAll('.spot.selected').forEach(el => {
                    el.classList.remove('selected');
                });

                // Add selection to clicked spot
                spotElement.classList.add('selected');

                // Update info display
                selectedSpotDisplay.textContent = spot.id;
                spotPriceDisplay.textContent = spot.price;
                spotInfo.style.display = 'block';

                // Smooth scroll to info
                spotInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        }

        spotsContainer.appendChild(spotElement);
    });
});

// ========== SMOOTH SCROLLING FOR NAVIGATION LINKS ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========== FORM SUBMISSION ========== 
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ========== BUTTON CLICK HANDLERS ========== 
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        
        if (buttonText.includes('Download') || buttonText.includes('App Store') || buttonText.includes('Google Play')) {
            alert('Redirecting to app store...');
        } else if (buttonText.includes('Reserve')) {
            const selectedSpot = document.getElementById('selected-spot').textContent;
            if (selectedSpot) {
                alert(`You selected parking spot ${selectedSpot}. Proceeding to payment...`);
            } else {
                alert('Please select a parking spot first!');
            }
        } else if (buttonText.includes('Subscribe')) {
            alert('Opening premium subscription page...');
        } else if (buttonText.includes('Partner')) {
            alert('Contact form submitted. We will reach out soon!');
        }
    });
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards, benefit cards, and pricing cards
document.querySelectorAll('.feature-card, .step, .benefit-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== MOBILE MENU (if you add hamburger menu) ========== 
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
}

// ========== HEADER ACTIVE STATE ========== 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }
});

// ========== HIGHLIGHT CURRENT SECTION IN NAV ========== 
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '#222';
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = '#007bff';
            link.style.fontWeight = 'bold';
        }
    });
});

console.log('ParkHero website loaded successfully!');



