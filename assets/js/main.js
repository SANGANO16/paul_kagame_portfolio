/* Paul Kagame Website - Global Scripts */

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        const theme = body.getAttribute('data-theme');
        if (theme === 'light') {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Scroll to Top
    const scrollTop = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTop.style.display = 'flex';
        } else {
            scrollTop.style.display = 'none';
        }
    });

    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Dynamic Greeting
    const greetingElement = document.getElementById('dynamic-greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = 'Welcome';
        if (hour < 12) greeting = 'Good Morning, Welcome!';
        else if (hour < 18) greeting = 'Good Afternoon, Welcome!';
        else greeting = 'Good Evening, Welcome!';
        greetingElement.innerText = greeting;
    }

    // Active Link Highlight
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (currentPath.includes(itemPath) && itemPath !== 'index.html') {
            item.classList.add('active');
        } else if (currentPath.endsWith('/') && itemPath === 'index.html') {
            item.classList.add('active');
        }
    });

    // Global Visitor Tracking
    trackGlobalVisitor();
});

// Global Visitor Tracking System
function trackGlobalVisitor() {
    // Generate or retrieve visitor ID
    let visitorId = localStorage.getItem('pk_visitor_id');
    if (!visitorId) {
        visitorId = 'PK_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('pk_visitor_id', visitorId);
    }

    // Track session start time
    if (!sessionStorage.getItem('session_start')) {
        sessionStorage.setItem('session_start', Date.now());
    }

    // Track total visits
    let totalVisits = parseInt(localStorage.getItem('pk_total_visits') || '0');
    
    // Check if this is a new session (more than 30 minutes since last visit)
    const lastVisit = localStorage.getItem('pk_last_visit');
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;
    
    if (!lastVisit || (now - parseInt(lastVisit)) > thirtyMinutes) {
        totalVisits++;
        localStorage.setItem('pk_total_visits', totalVisits);
    }
    
    localStorage.setItem('pk_last_visit', now);

    // Track unique pages visited
    let pagesVisited = JSON.parse(localStorage.getItem('pk_pages_visited') || '[]');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (!pagesVisited.includes(currentPage)) {
        pagesVisited.push(currentPage);
        localStorage.setItem('pk_pages_visited', JSON.stringify(pagesVisited));
    }

    // Track page views for this session
    let sessionPageViews = parseInt(sessionStorage.getItem('pk_session_page_views') || '0');
    sessionPageViews++;
    sessionStorage.setItem('pk_session_page_views', sessionPageViews);

    // Store visit history
    let visitHistory = JSON.parse(localStorage.getItem('pk_visit_history') || '[]');
    visitHistory.push({
        page: currentPage,
        timestamp: now,
        visitorId: visitorId
    });
    // Keep only last 100 visits
    if (visitHistory.length > 100) {
        visitHistory = visitHistory.slice(-100);
    }
    localStorage.setItem('pk_visit_history', JSON.stringify(visitHistory));

    // Log visitor stats (for debugging)
    console.log('Visitor Stats:', {
        visitorId: visitorId,
        totalVisits: totalVisits,
        pagesVisited: pagesVisited.length,
        sessionPageViews: sessionPageViews,
        currentPage: currentPage
    });
}

// Get visitor statistics
function getVisitorStats() {
    return {
        visitorId: localStorage.getItem('pk_visitor_id'),
        totalVisits: parseInt(localStorage.getItem('pk_total_visits') || '0'),
        pagesVisited: JSON.parse(localStorage.getItem('pk_pages_visited') || '[]'),
        lastVisit: localStorage.getItem('pk_last_visit'),
        visitHistory: JSON.parse(localStorage.getItem('pk_visit_history') || '[]')
    };
}

// Clear visitor data (for testing)
function clearVisitorData() {
    localStorage.removeItem('pk_visitor_id');
    localStorage.removeItem('pk_total_visits');
    localStorage.removeItem('pk_pages_visited');
    localStorage.removeItem('pk_last_visit');
    localStorage.removeItem('pk_visit_history');
    sessionStorage.clear();
    console.log('Visitor data cleared');
}

// Export functions for use in other scripts
window.trackGlobalVisitor = trackGlobalVisitor;
window.getVisitorStats = getVisitorStats;
window.clearVisitorData = clearVisitorData;
