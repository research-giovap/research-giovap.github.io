let currentLang = 'en';

// RUNS ON EVERY PAGE LOAD: Check localStorage for user preferences
document.addEventListener('DOMContentLoaded', () => {
    // 1. Restore Language
    const savedLang = localStorage.getItem('site-lang') || 'en';
    document.body.classList.remove('en', 'it');
    document.body.classList.add(savedLang);
    currentLang = savedLang;

    // 2. Restore Theme
    const savedTheme = localStorage.getItem('site-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('moon-icon').style.display = savedTheme === 'light' ? 'block' : 'none';
    document.getElementById('sun-icon').style.display = savedTheme === 'dark' ? 'block' : 'none';

    // 3. Set Year & Trigger Animations
    document.getElementById('year').textContent = new Date().getFullYear();
    triggerReveal();
});

// Language Toggle Logic
function toggleLanguage() {
    const body = document.body;
    if (currentLang === 'en') {
        body.classList.remove('en'); body.classList.add('it');
        currentLang = 'it';
    } else {
        body.classList.remove('it'); body.classList.add('en');
        currentLang = 'en';
    }
    // Save to localStorage so it stays when user clicks another page
    localStorage.setItem('site-lang', currentLang);
}

// Dark Mode Logic
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    document.getElementById('moon-icon').style.display = newTheme === 'light' ? 'block' : 'none';
    document.getElementById('sun-icon').style.display = newTheme === 'dark' ? 'block' : 'none';
    
    // Save to localStorage
    localStorage.setItem('site-theme', newTheme);
}

// Email Dropdown logic
function toggleEmailMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('email-menu');
    if(menu) menu.classList.toggle('show');
}

window.addEventListener('click', function(e) {
    const menu = document.getElementById('email-menu');
    if (menu && menu.classList.contains('show')) {
        menu.classList.remove('show');
    }
});

// Reveal Animations on Scroll
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

function triggerReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('active');
        observer.observe(el);
    });
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) el.classList.add('active');
        });
    }, 50);
}