document.addEventListener('DOMContentLoaded', function () {

    // ========== HAMBURGER MENU ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }


    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ========== PARKING SPOTS DEMO ==========
    const spotsContainer = document.getElementById('spots');
    const spotInfoBox = document.getElementById('spot-info');
    const selectedSpotDisplay = document.getElementById('selected-spot');
    const spotPriceDisplay = document.getElementById('spot-price');
    const reserveBtn = document.querySelector('.spot-reserve-btn');

    if (spotsContainer) {
        const spots = [];
        for (let i = 1; i <= 16; i++) {
            const isAvailable = Math.random() > 0.3;
            const price = (Math.floor(Math.random() * 5) + 2).toFixed(2);
            spots.push({ id: 'A' + i, available: isAvailable, price: price });
        }

        spots.forEach(function (spot) {
            const spotEl = document.createElement('div');
            spotEl.className = 'spot ' + (spot.available ? 'available' : 'taken');
            spotEl.textContent = spot.id;

            if (spot.available) {
                spotEl.addEventListener('click', function () {
                    document.querySelectorAll('.spot.selected').forEach(function (el) {
                        el.classList.remove('selected');
                    });
                    spotEl.classList.add('selected');
                    selectedSpotDisplay.textContent = spot.id;
                    spotPriceDisplay.textContent = spot.price;
                    spotInfoBox.style.display = 'block';
                    spotInfoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                });
            }

            spotsContainer.appendChild(spotEl);
        });
    }

    // Reserve button
    if (reserveBtn) {
        reserveBtn.addEventListener('click', function () {
            const selectedSpot = selectedSpotDisplay.textContent;
            if (selectedSpot) {
                reserveBtn.textContent = '✅ Reserved! Redirecting to payment...';
                reserveBtn.disabled = true;
                reserveBtn.style.background = '#28a745';
                setTimeout(function () {
                    reserveBtn.textContent = 'Reserve Now';
                    reserveBtn.disabled = false;
                    reserveBtn.style.background = '';
                    spotInfoBox.style.display = 'none';
                    document.querySelectorAll('.spot.selected').forEach(function (el) {
                        el.classList.remove('selected', 'available');
                        el.classList.add('taken');
                    });
                }, 2500);
            }
        });
    }


    // ========== LOGIN FORM ==========
    const loginForm = document.getElementById('login-form');
    const loginSuccess = document.getElementById('login-success');
    const loginError = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Demo login - accepts any email with password longer than 5 chars
            if (email && password.length >= 6) {
                loginSuccess.style.display = 'block';
                loginError.style.display = 'none';
                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                loginError.style.display = 'block';
                loginSuccess.style.display = 'none';
            }
        });
    }


    // ========== DOWNLOAD BUTTONS ==========
    document.querySelectorAll('.download-buttons .btn-primary').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const original = btn.textContent;
            btn.textContent = 'Redirecting...';
            btn.disabled = true;
            setTimeout(function () {
                btn.textContent = original;
                btn.disabled = false;
            }, 2000);
        });
    });


    // ========== PRICING BUTTONS ==========
    const subscribeBtn = document.querySelector('.pricing-card.featured .btn-primary');
if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function () {
        window.location.href = 'login.html';
    });
}

document.querySelectorAll('.pricing-card .btn-secondary').forEach(function (btn) {
    btn.addEventListener('click', function () {
        window.location.href = 'login.html';
    });
});


    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            setTimeout(function () {
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                formSuccess.style.display = 'block';
                setTimeout(function () {
                    formSuccess.style.display = 'none';
                }, 4000);
            }, 1000);
        });
    }


    // ========== SCROLL ANIMATIONS ==========
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.feature-card, .step, .benefit-card, .pricing-card').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });


    // ========== NAVBAR SHADOW ON SCROLL ==========
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50
                ? '0 4px 12px rgba(0,0,0,0.15)'
                : '0 2px 8px rgba(0,0,0,0.1)';
        }
    });


    // ========== HIGHLIGHT CURRENT NAV SECTION ==========
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        let currentSection = '';

        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.style.color = '';
            link.style.fontWeight = '';
            if (link.getAttribute('href') === '#' + currentSection) {
                link.style.color = '#007bff';
                link.style.fontWeight = 'bold';
            }
        });
    });

});

console.log('ParkHero loaded ✅');