// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Expand/collapse service details
document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', function() {
        const serviceContent = this.closest('.service-content');
        const details = serviceContent.querySelector('.service-details');
        
        if (details.classList.contains('expanded')) {
            details.classList.remove('expanded');
            this.textContent = 'Dowiedz się więcej';
        } else {
            details.classList.add('expanded');
            this.textContent = 'Zwiń';
        }
    });
});

// Form submission
document.getElementById('consultationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.consent) {
        alert('Proszę wyrazić zgodę na przetwarzanie danych osobowych.');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('.cta-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Wysyłanie...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Dziękujemy! Skontaktujemy się z Tobą w ciągu 24 godzin.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service items
document.querySelectorAll('.service-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add mobile menu button if screen is small
function checkScreenSize() {
    const navContainer = document.querySelector('.nav-container');
    const existingButton = navContainer.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768 && !existingButton) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #2563eb;
            cursor: pointer;
        `;
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        navContainer.appendChild(mobileMenuBtn);
    } else if (window.innerWidth > 768 && existingButton) {
        existingButton.remove();
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();
