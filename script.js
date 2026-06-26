// Day 1: Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Day 2: Home Page Search + Category Redirect
document.addEventListener('DOMContentLoaded', () => {
    const homeSearchBtn = document.getElementById('homeSearchBtn');
    const homeSearchInput = document.getElementById('homeSearchInput');

    if (homeSearchBtn && homeSearchInput) {
        homeSearchBtn.addEventListener('click', () => {
            const query = homeSearchInput.value.trim();
            if (query) {
                window.location.href = `services.html?search=${encodeURIComponent(query)}`;
            } else {
                window.location.href = 'services.html';
            }
        });

        homeSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') homeSearchBtn.click();
        });
    }

    // Popular tags clickable
    const popularTags = document.querySelectorAll('.popular-tags a');
    popularTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const category = tag.dataset.category;
            window.location.href = `services.html?category=${category}`;
        });
    });

    // Service cards clickable
    const homeServiceCards = document.querySelectorAll('.service-card');
    homeServiceCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            window.location.href = `services.html?category=${category}`;
        });
    });

    // Day 2: Services Page Search + Filter Logic
    const searchInput = document.getElementById('searchInput');
    const serviceItems = document.querySelectorAll('.service-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            serviceItems.forEach(item => {
                const title = item.dataset.title.toLowerCase();
                const category = item.dataset.category.toLowerCase();
                if (title.includes(searchTerm) || category.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            serviceItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            if (searchInput) searchInput.value = '';
        });
    });

    // Auto search/filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const categoryQuery = urlParams.get('category');
    
    if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
        searchInput.dispatchEvent(new Event('input'));
    }
    
    if (categoryQuery) {
        const targetBtn = document.querySelector(`.filter-btn[data-category="${categoryQuery}"]`);
        if (targetBtn) targetBtn.click();
    }
});
// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Name validation
            const name = document.getElementById('name').value.trim();
            if (name === '') {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            } else {
                document.getElementById('nameError').textContent = '';
            }
            
            // Email validation
            const email = document.getElementById('email').value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!emailPattern.test(email)) {
                document.getElementById('emailError').textContent = 'Invalid email format';
                isValid = false;
            } else {
                document.getElementById('emailError').textContent = '';
            }
            
            // Subject validation
            const subject = document.getElementById('subject').value.trim();
            if (subject === '') {
                document.getElementById('subjectError').textContent = 'Subject is required';
                isValid = false;
            } else {
                document.getElementById('subjectError').textContent = '';
            }
            
            // Message validation
            const message = document.getElementById('message').value.trim();
            if (message === '') {
                document.getElementById('messageError').textContent = 'Message is required';
                isValid = false;
            } else {
                document.getElementById('messageError').textContent = '';
            }
            
            if (isValid) {
                alert('Message sent successfully! We will contact you soon.');
                contactForm.reset();
            }
        });
    }
});
// Scroll Animation - Fade In on Scroll
document.addEventListener('DOMContentLoaded', function() {
    
    // Fade in animation for all sections
    const fadeElements = document.querySelectorAll('.service-item, .about-block, .team-member, .contact-form, .contact-info');
    
    // Add fade-in class to all elements
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Intersection Observer for scroll effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Sirf ek baar animate ho
            }
        });
    }, {
        threshold: 0.1 // 10% visible hote hi trigger
    });
    
    // Observe all fade elements
    fadeElements.forEach(el => {
        observer.observe(el);
    });

});
