// Contact Page Functionality
function initContactPage() {
    initFormTabs();
    initFormValidation();
    initFAQAccordion();
    initContactMethods();
}

// Form Tabs System
function initFormTabs() {
    const formTabs = document.querySelectorAll('.form-tab');
    const formPanes = document.querySelectorAll('.form-pane');
    
    formTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetForm = this.getAttribute('data-form');
            
            // Remove active class from all tabs and panes
            formTabs.forEach(t => t.classList.remove('active'));
            formPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to current tab and pane
            this.classList.add('active');
            document.getElementById(`${targetForm}Form`).classList.add('active');
        });
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

function validateForm() {
    const activePane = document.querySelector('.form-pane.active');
    const inputs = activePane.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.parentNode.querySelector('.error-message');
    
    // Clear previous error
    clearError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    errorElement.textContent = message;
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    errorElement.textContent = '';
}

// Form Submission
function submitForm() {
    const submitBtn = document.querySelector('.form-submit .btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

// FAQ Accordion
function initFAQAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        
        button.addEventListener('click', function() {
            // Close all other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherButton = otherItem.querySelector('.accordion-button');
                    const otherCollapse = otherItem.querySelector('.accordion-collapse');
                    
                    otherButton.classList.add('collapsed');
                    otherCollapse.classList.remove('show');
                }
            });
        });
    });
}

// Contact Methods Interaction
function initContactMethods() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.querySelector('span').textContent;
            
            switch(methodType) {
                case 'Email Us':
                    window.location.href = 'mailto:info@neovilletech.com';
                    break;
                case 'Call Now':
                    window.location.href = 'tel:+15551234567';
                    break;
                case 'Book Meeting':
                    showNotification('Redirecting to meeting scheduler...', 'info');
                    // In real implementation, this would open a calendar booking system
                    setTimeout(() => {
                        showNotification('Meeting scheduler would open here', 'info');
                    }, 1000);
                    break;
            }
        });
    });
}

// Map Functions
function openMap() {
    const address = encodeURIComponent('98, main road, sittalampattu, Thirukkanur, Tamil Nadu 605501');
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    
    showNotification('Opening Google Maps...', 'info');
    setTimeout(() => {
        window.open(mapUrl, '_blank');
    }, 500);
}

function downloadBrochure() {
    showNotification('Downloading brochure...', 'info');
    
    // Simulate download
    setTimeout(() => {
        showNotification('Brochure downloaded successfully!', 'success');
        
        // In real implementation, this would trigger actual file download
        const link = document.createElement('a');
        link.href = 'assets/Neoville_Broucher.pdf';
        link.download = 'Neoville-Tech-Brochure.pdf';
        link.click();
    }, 1500);
}

// Notification System (reuse from previous implementation)
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
    initContactPage();
    
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const animateElements = document.querySelectorAll('.method-card, .form-container, .accordion-item, .location-info, .map-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});