// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', navbarScrollEffect);
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Animate skill bars
    animateSkillBars();
    
    // Intersection Observer for animations
    setupScrollAnimations();
    
    // Form submission
    setupFormSubmission();
    
    // Portfolio filter (opsional)
    setupPortfolioFilter();
});

// Navbar scroll effect
function navbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Smooth scrolling untuk navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu jika aktif
                document.querySelector('.hamburger').classList.remove('active');
                document.querySelector('.nav-menu').classList.remove('active');
            }
        });
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu saat klik link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Scroll animations dengan Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe semua elemen dengan class animate-on-scroll
    document.querySelectorAll('.animate-on-scroll, .portfolio-item, .skill-category, .about-stats, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Form submission
function setupFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulasi loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Simulasi API call
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Show success message
            showNotification('Pesan berhasil dikirim! Saya akan balas secepatnya.', 'success');
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Hapus notification lama
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        ${message}
        <button class="close-btn">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove setelah 4 detik
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
    
    // Close on click
    notification.querySelector('.close-btn').addEventListener('click', () => {
        notification.remove();
    });
}

// Portfolio filter (opsional - bisa dikembangkan)
function setupPortfolioFilter() {
    // Tambahkan class filter-btn ke tombol filter jika ada
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 100);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// Active navbar link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Tambahkan event listener untuk active nav link
window.addEventListener('scroll', updateActiveNavLink);

// Typing effect untuk hero title (opsional)
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }
}

// Panggil typing effect setelah load
window.addEventListener('load', () => {
    setTimeout(typeWriterEffect, 500);
});

// Parallax effect untuk hero background (opsional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Preloader (opsional - tambahkan div preloader di HTML)
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

window.addEventListener('load', hidePreloader);

// Export functions untuk debugging
window.BlackboxPortfolio = {
    animateSkillBars,
    setupSmoothScrolling,
    setupMobileMenu
};