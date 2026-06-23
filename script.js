// Day 1: Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Day 2: Search Functionality UI
const searchInput = document.getElementById('searchInput');
const serviceItems = document.querySelectorAll('.service-item');

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

// Day 2: Category Filtering UI
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button style
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
        
        // Reset search when filter changes
        if (searchInput) searchInput.value = '';
    });
});

// Home Page Search Functionality
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
        if (e.key === 'Enter') {
            homeSearchBtn.click();
        }
    });
}

// Popular tags clickable banao
const popularTags = document.querySelectorAll('.popular-tags a');
popularTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.preventDefault();
        const category = tag.dataset.category;
        window.location.href = `services.html?category=${category}`;
    });
});

// Service cards clickable banao
const homeServiceCards = document.querySelectorAll('.service-card');
homeServiceCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        window.location.href = `services.html?category=${category}`;
    });
});

// Auto search/filter on page load from URL - YE WALA CODE
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const categoryQuery = urlParams.get('category');
    
    const searchInput = document.getElementById('searchInput');
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Agar search query hai to auto search karo
    if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
        serviceItems.forEach(item => {
            const title = item.dataset.title.toLowerCase();
            if (title.includes(searchQuery.toLowerCase())) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Agar category query hai to auto filter karo
    if (categoryQuery) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === categoryQuery) {
                btn.classList.add('active');
            }
        });
        
        serviceItems.forEach(item => {
            if (item.dataset.category === categoryQuery) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
});
