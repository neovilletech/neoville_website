// Solutions Page Functionality
function initSolutionsPage() {
    initSolutionInteractions();
    initProcessAnimation();
    initCaseStudies();
}

// Solution Interactions
function initSolutionInteractions() {
    // Add hover effects to solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Solution preview interactions
    const solutionPreviews = document.querySelectorAll('.solution-preview');
    
    solutionPreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            const solutionType = this.querySelector('span').textContent;
            scrollToSolution(solutionType);
        });
    });
}

function scrollToSolution(solutionType) {
    const solutionsSection = document.getElementById('solutions');
    solutionsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Highlight relevant solution card
    setTimeout(() => {
        showNotification(`Viewing ${solutionType} solutions`, 'info');
    }, 500);
}

// Process Animation
function initProcessAnimation() {
    const processSteps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Stagger animation
                const index = Array.from(processSteps).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = 'all 0.6s ease';
        observer.observe(step);
    });
}

// Case Studies
function initCaseStudies() {
    const caseStudies = document.querySelectorAll('.case-study');
    
    caseStudies.forEach(study => {
        study.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Loading detailed case study: ${title}`, 'info');
        });
    });
}

// Action Functions
function requestQuote(serviceType) {
    showNotification(`Preparing quote for ${serviceType}...`, 'info');
    
    setTimeout(() => {
        // Redirect to contact page with service pre-selected
        const serviceParam = encodeURIComponent(serviceType);
        window.location.href = `contact.html?service=${serviceParam}&type=quote`;
    }, 1000);
}

function requestConsultation() {
    showNotification('Redirecting to consultation booking...', 'info');
    
    setTimeout(() => {
        window.location.href = 'contact.html?type=consultation';
    }, 1000);
}

function viewPortfolio(category) {
    showNotification(`Loading ${category} portfolio...`, 'info');
    
    // In real implementation, this would show a modal or navigate to portfolio page
    setTimeout(() => {
        showNotification('Portfolio page would open here', 'info');
    }, 1000);
}

function downloadBrochure() {
    showNotification('Downloading solutions brochure...', 'info');
    
    // Simulate download
    setTimeout(() => {
        showNotification('Brochure downloaded successfully!', 'success');
        
        // In real implementation:
        // const link = document.createElement('a');
        // link.href = 'assets/brochure/solutions-brochure.pdf';
        // link.download = 'Neoville-Tech-Solutions-Brochure.pdf';
        // link.click();
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSolutionsPage();
    
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const animateElements = document.querySelectorAll('.solution-card, .case-study, .cta-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});