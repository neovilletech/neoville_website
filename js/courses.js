// Courses Page Functionality
function initCoursesPage() {
    initAudienceSelector();
    initCourseInteractions();
    initAnimations();
}

// Audience Selector
function initAudienceSelector() {
    const audienceTabs = document.querySelectorAll('.selector-tab');
    const courseSections = document.querySelectorAll('.courses-section');
    
    audienceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetAudience = this.getAttribute('data-audience');
            
            // Remove active class from all tabs and sections
            audienceTabs.forEach(t => t.classList.remove('active'));
            courseSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to current tab and section
            this.classList.add('active');
            document.querySelector(`.${targetAudience}-courses`).classList.add('active');
            
            // Update URL hash
            window.location.hash = targetAudience;
        });
    });
    
    // Check URL hash on load
    if (window.location.hash) {
        const targetAudience = window.location.hash.substring(1);
        const targetTab = document.querySelector(`[data-audience="${targetAudience}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
}

// Course Interactions
function initCourseInteractions() {
    // Add hover effects to course cards
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Course Actions
function enrollCourse(courseName, audience) {
    showNotification(`Starting enrollment process for ${courseName}...`, 'info');
    
    // Simulate enrollment process
    setTimeout(() => {
        // Redirect to contact page with course pre-selected
        const courseParam = encodeURIComponent(courseName);
        window.location.href = `contact.html?course=${courseParam}&audience=${audience}`;
    }, 1500);
}

function viewCourseDetails(courseId) {
    showNotification(`Loading course details...`, 'info');
    
    // In a real implementation, this would show a modal or navigate to course details page
    setTimeout(() => {
        showNotification(`Course details page would open here`, 'info');
    }, 1000);
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animation for course cards
                if (entry.target.classList.contains('course-card')) {
                    const cards = Array.from(document.querySelectorAll('.course-card'));
                    const index = cards.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe course cards and benefit items
    const animateElements = document.querySelectorAll('.course-card, .benefit-item, .stat-card, .feature-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
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
    initCoursesPage();
});