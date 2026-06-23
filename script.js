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
