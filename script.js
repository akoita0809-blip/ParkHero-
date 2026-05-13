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
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                    document.querySelectorAll('.spot.selected').forEach(el => el.classList.remove('selected'));
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
                    document.querySelectorAll('.spot.selected').forEach(el => {
                        el.classList.remove('selected', 'available');
                        el.classList.add('taken');
                    });
                }, 2500);
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
                setTimeout(() => { formSuccess.style.display = 'none'; }, 4000);
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

    // ========== NAVBAR SHADOW ==========
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50
                ? '0 4px 12px rgba(0,0,0,0.15)'
                : '0 2px 8px rgba(0,0,0,0.1)';
        }
    });

    // ========== ACTIVE NAV HIGHLIGHT ==========
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

// ========== DESTINATION SEARCH ==========
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('destination-input');
    const searchBtn = document.getElementById('search-btn');
    const suggestionsBox = document.getElementById('search-suggestions');
    const resultsPanel = document.getElementById('search-results');

    if (!input) return;

    const popularDestinations = [
        'Times Square, New York',
        'JFK Airport, New York',
        'Central Park, New York',
        'Madison Square Garden, New York',
        'Empire State Building, New York',
        'Yankee Stadium, New York',
        'Grand Central Terminal, New York',
        'Brooklyn Bridge, New York',
        'Citi Field, New York',
        'Newark Airport, New Jersey',
        'Penn Station, New York',
        'Union Square, New York',
        'Rockefeller Center, New York',
        'LaGuardia Airport, New York',
        'Barclays Center, Brooklyn',
        'World Trade Center, New York',
        'High Line, New York',
        'Javits Center, New York',
        'Bryant Park, New York',
    ];

    function generateLots(destination) {
        const lotNames = [
            'QuickPark Garage', 'City Center Parking', 'Express Lot',
            'Central Parking', 'ParkSmart Facility', 'Metro Park',
            'Urban Garage', 'Spot & Go', 'EasyPark',
        ];
        const count = Math.floor(Math.random() * 3) + 4;
        const lots = [];
        for (let i = 0; i < count; i++) {
            lots.push({
                name: lotNames[i % lotNames.length],
                distance: (Math.random() * 0.8 + 0.1).toFixed(1),
                price: (Math.random() * 8 + 2).toFixed(2),
                available: Math.floor(Math.random() * 40) + 3,
            });
        }
        lots.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        return lots;
    }

    function showResults(destination) {
        if (!destination.trim()) return;
        const lots = generateLots(destination);
        resultsPanel.style.display = 'block';
        resultsPanel.innerHTML = `
            <h3>🅿 Parking near <em>${destination}</em></h3>
            ${lots.map((lot, i) => `
                <div class="result-card" id="lot-${i}" onclick="selectLot(${i}, '${lot.name}', '${lot.price}')">
                    <div>
                        <div class="lot-name">${lot.name}</div>
                        <div class="lot-distance">📍 ${lot.distance} mi away</div>
                    </div>
                    <div>
                        <div class="lot-price">$${lot.price}/hr</div>
                        <div class="lot-avail">${lot.available} spots open</div>
                    </div>
                </div>
            `).join('')}
            <div id="lot-reserve-msg" style="display:none; text-align:center; margin-top:14px; color:#28a745; font-weight:bold;"></div>
            <button class="btn-primary result-reserve-btn" id="lot-reserve-btn" style="display:none;" onclick="reserveLot()">Reserve Selected Spot</button>
        `;
        resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    window.selectLot = function (i, name, price) {
        document.querySelectorAll('.result-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('lot-' + i).classList.add('selected');
        const btn = document.getElementById('lot-reserve-btn');
        btn.style.display = 'block';
        btn.dataset.lot = name;
        btn.dataset.price = price;
    };

    window.reserveLot = function () {
        const btn = document.getElementById('lot-reserve-btn');
        const msg = document.getElementById('lot-reserve-msg');
        btn.disabled = true;
        btn.textContent = 'Reserving...';
        setTimeout(() => {
            btn.style.display = 'none';
            msg.style.display = 'block';
            msg.textContent = `✅ Reserved at ${btn.dataset.lot} — $${btn.dataset.price}/hr. Check your email for confirmation!`;
        }, 1000);
    };

    input.addEventListener('input', function () {
        const val = this.value.toLowerCase().trim();
        suggestionsBox.innerHTML = '';
        if (!val) return;
        popularDestinations.filter(d => d.toLowerCase().includes(val)).slice(0, 5).forEach(dest => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `<span>📍</span> ${dest}`;
            item.addEventListener('click', function () {
                input.value = dest;
                suggestionsBox.innerHTML = '';
                showResults(dest);
            });
            suggestionsBox.appendChild(item);
        });
    });

    searchBtn.addEventListener('click', function () {
        suggestionsBox.innerHTML = '';
        showResults(input.value || 'your destination');
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            suggestionsBox.innerHTML = '';
            showResults(input.value || 'your destination');
        }
    });

    document.addEventListener('click', function (e) {
        if (!input.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.innerHTML = '';
        }
    });
});
 // ========== AUTH NAV ==========
(function() {
    const user = sessionStorage.getItem('parkhero_user');
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;

    const loginLink = navMenu.querySelector('a[href="login.html"]');
    if (!loginLink) return;

    if (user) {
        const parsed = JSON.parse(user);
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('parkhero_user');
            window.location.href = 'index.html';
        });
    }
})();