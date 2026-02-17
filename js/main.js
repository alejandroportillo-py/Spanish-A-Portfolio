// ==================== SEARCH DATABASE ====================
const searchDatabase = [
    {
        title: "Cien Años de Soledad",
        category: "Obras Literarias",
        snippet: "Análisis completo de la obra maestra de Gabriel García Márquez. Explora el realismo mágico, la familia Buendía y los temas de soledad.",
        section: "literaria-1",
        keywords: ["garcía márquez", "realismo mágico", "buendía", "macondo", "soledad", "novela"]
    },
    {
        title: "La Casa de Bernarda Alba",
        category: "Obras Literarias",
        snippet: "Estudio profundo del drama de Federico García Lorca. Represión, libertad y la condición femenina en la España rural.",
        section: "literaria-2",
        keywords: ["lorca", "teatro", "bernarda", "represión", "mujeres", "españa"]
    },
    {
        title: "Recursos del IB",
        category: "Teoría",
        snippet: "Guías oficiales del programa de Lengua y Literatura del Bachillerato Internacional.",
        section: "recursos",
        keywords: ["ib", "bachillerato", "guías", "criterios"]
    },
    {
        title: "Teoría Literaria",
        category: "Teoría",
        snippet: "Conceptos fundamentales para el análisis literario: narrador, personajes, tiempo, espacio.",
        section: "apuntes",
        keywords: ["teoría", "análisis", "narrador", "personajes"]
    },
    {
        title: "Artículo NYT",
        category: "Obras No Literarias",
        snippet: "Análisis de artículo periodístico del New York Times.",
        section: "no-literaria-1",
        keywords: ["periodismo", "artículo", "opinión"]
    },
    {
        title: "Ensayo de Octavio Paz",
        category: "Obras No Literarias",
        snippet: "Estudio del ensayo filosófico-literario de Paz.",
        section: "no-literaria-2",
        keywords: ["paz", "ensayo", "filosofía"]
    },
    {
        title: "Trabajos en Clase",
        category: "Trabajos",
        snippet: "Colección de ensayos y análisis realizados durante el curso.",
        section: "trabajos-clase",
        keywords: ["ensayos", "análisis", "clase"]
    },
    {
        title: "Extended Essay",
        category: "Trabajos",
        snippet: "Monografía de investigación en profundidad.",
        section: "extended-essay",
        keywords: ["monografía", "extended", "investigación"]
    },
    {
        title: "Exposiciones Orales",
        category: "Evaluaciones",
        snippet: "Presentaciones orales individuales.",
        section: "exposiciones",
        keywords: ["oral", "presentación", "exposición"]
    }
];

// ==================== DOM ELEMENTS ====================
const mainSearchInput = document.getElementById('mainSearchInput');
const mainSearchBtn = document.getElementById('mainSearchBtn');
const searchResultsSection = document.getElementById('searchResults');
const resultsGrid = document.getElementById('resultsGrid');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const hero = document.getElementById('hero');
const catalogSection = document.getElementById('catalogSection');
const contentSections = document.querySelectorAll('.content-section');
const menuLinks = document.querySelectorAll('.menu-link');
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// ==================== SEARCH FUNCTIONALITY ====================
function performSearch(query) {
    if (!query || query.trim() === '') return;
    
    const searchTerm = query.toLowerCase().trim();
    const results = searchDatabase.filter(item => {
        return item.title.toLowerCase().includes(searchTerm) ||
               item.snippet.toLowerCase().includes(searchTerm) ||
               item.category.toLowerCase().includes(searchTerm) ||
               item.keywords.some(keyword => keyword.includes(searchTerm));
    });
    
    displaySearchResults(results, searchTerm);
}

function displaySearchResults(results, searchTerm) {
    // Hide other sections
    hero.style.display = 'none';
    catalogSection.style.display = 'none';
    contentSections.forEach(section => section.classList.remove('active'));
    
    // Show search results
    searchResultsSection.classList.add('active');
    
    if (results.length === 0) {
        resultsGrid.innerHTML = '';
        noResults.style.display = 'block';
        resultsCount.textContent = 'No se encontraron resultados';
        return;
    }
    
    noResults.style.display = 'none';
    resultsCount.textContent = `${results.length} resultado${results.length > 1 ? 's' : ''} para "${searchTerm}"`;
    
    resultsGrid.innerHTML = results.map(result => {
        const highlightedSnippet = highlightText(result.snippet, searchTerm);
        const highlightedTitle = highlightText(result.title, searchTerm);
        
        return `
            <div class="search-result-card" data-section="${result.section}">
                <div class="search-result-category">${result.category}</div>
                <div class="search-result-content">
                    <h3 class="search-result-title">${highlightedTitle}</h3>
                    <p class="search-result-snippet">${highlightedSnippet}</p>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    document.querySelectorAll('.search-result-card').forEach(card => {
        card.addEventListener('click', function() {
            showSection(this.getAttribute('data-section'));
        });
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function highlightText(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="search-result-highlight">$1</span>');
}

// Search event listeners
mainSearchBtn.addEventListener('click', () => performSearch(mainSearchInput.value));
mainSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch(mainSearchInput.value);
});

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
    catalogSection.style.display = 'none';
    searchResultsSection.classList.remove('active');
    contentSections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==================== EXPLORE BUTTON ====================
document.getElementById('explore-btn').addEventListener('click', function(e) {
    e.preventDefault();
    hero.style.display = 'none';
    catalogSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

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

// ==================== HEADER NAVIGATION ====================
document.querySelectorAll('.header-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        
        if (sectionId === 'home') {
            hero.style.display = 'flex';
            catalogSection.style.display = 'none';
            searchResultsSection.classList.remove('active');
            contentSections.forEach(section => section.classList.remove('active'));
            menuLinks.forEach(l => l.classList.remove('active'));
        } else if (sectionId) {
            showSection(sectionId);
        }
    });
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
});