// ==================== DOM ELEMENTS ====================
const menuLinks = document.querySelectorAll('.menu-link');
const contentSections = document.querySelectorAll('.content-section');
const hero = document.getElementById('hero');
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// ==================== MENU FUNCTIONALITY ====================
menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const toggleId = this.getAttribute('data-toggle');
        const sectionId = this.getAttribute('data-section');
        
        // Toggle submenu
        if (toggleId) {
            e.preventDefault();
            const submenu = document.getElementById(toggleId);
            if (submenu) {
                submenu.classList.toggle('open');
                this.classList.toggle('expanded');
            }
        }
        
        // Show section
        if (sectionId) {
            e.preventDefault();
            showSection(sectionId);
            
            // Update active state
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        }
    });
});

function showSection(sectionId) {
    hero.style.display = 'none';
    contentSections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==================== HAMBURGER MENU ====================
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    }
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
});