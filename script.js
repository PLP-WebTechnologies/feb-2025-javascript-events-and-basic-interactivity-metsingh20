// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initEventHandlers();
    initTabs();
    initGallery();
    initAccordion();
    initColorChanger();
    initFormValidation();
});

/*
 * SECTION 1: EVENT HANDLING DEMO
 */

function initEventHandlers() {
    // 1. Button Click Event
    const powerBtn = document.getElementById('power-btn');
    const controlStatus = document.querySelector('.control-status');
    
    powerBtn.addEventListener('click', function() {
        // Toggle power state
        if (this.textContent === 'Power On') {
            this.textContent = 'Power Off';
            this.classList.add('powered');
            controlStatus.textContent = 'Online';
            controlStatus.classList.add('online');
        } else {
            this.textContent = 'Power On';
            this.classList.remove('powered');
            controlStatus.textContent = 'Offline';
            controlStatus.classList.remove('online');
        }
    });
    
    // 2. Hover Effect
    const hoverArea = document.getElementById('hover-area');
    
    hoverArea.addEventListener('mouseenter', function() {
        this.textContent = 'Scanning...';
        this.classList.add('scanning');
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        this.textContent = 'Hover to scan';
        this.classList.remove('scanning');
    });
    
    // 3. Keypress Detection
    const commandInput = document.getElementById('command-input');
    const keyFeedback = document.getElementById('key-feedback');
    
    commandInput.addEventListener('keydown', function(event) {
        keyFeedback.textContent = `Key pressed: ${event.key} (code: ${event.keyCode})`;
        
        // Easter egg: If user types "launch", show a special effect
        if (commandInput.value.toLowerCase() + event.key.toLowerCase() === 'launch') {
            keyFeedback.textContent = '🚀 LAUNCH SEQUENCE INITIATED 🚀';
            keyFeedback.style.color = '#ff3366';
            
            // Reset after 2 seconds
            setTimeout(() => {
                keyFeedback.textContent = 'Launch codes accepted';
                keyFeedback.style.color = '#00ffcc';
            }, 2000);
        }
    });
    
    // 4. BONUS: Secret Double-click Action
    const secretPanel = document.getElementById('secret-panel');
    
    secretPanel.addEventListener('dblclick', function() {
        this.textContent = '🚨 EMERGENCY PROTOCOLS ACTIVATED 🚨';
        this.classList.add('emergency');
        
        // Reset after 3 seconds
        setTimeout(() => {
            this.textContent = 'Double-click for emergency protocols';
            this.classList.remove('emergency');
        }, 3000);
    });
}

/*
 * SECTION 2: INTERACTIVE ELEMENTS
 */

// Tab Functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab and its content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Image Gallery/Slideshow
function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const planetCaption = document.getElementById('current-planet');
    
    // Planet names to display
    const planetNames = ['Mars', 'Jupiter', 'Saturn', 'Neptune'];
    let currentIndex = 0;
    
    // Initially hide all images except the first one
    galleryImages.forEach((img, index) => {
        if (index !== 0) {
            img.style.display = 'none';
        }
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        // Hide current image
        galleryImages[currentIndex].style.display = 'none';
        
        // Update index
        currentIndex = (currentIndex + 1) % galleryImages.length;
        
        // Show new image
        galleryImages[currentIndex].style.display = 'block';
        
        // Update caption
        planetCaption.textContent = planetNames[currentIndex];
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        // Hide current image
        galleryImages[currentIndex].style.display = 'none';
        
        // Update index (with wrap-around)
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        
        // Show new image
        galleryImages[currentIndex].style.display = 'block';
        
        // Update caption
        planetCaption.textContent = planetNames[currentIndex];
    });
}

// Accordion Functionality
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on header
            this.classList.toggle('active');
            
            // Get the content associated with this header
            const content = this.nextElementSibling;
            
            // Toggle active class on content
            content.classList.toggle('active');
        });
    });
}

// Color Changing Box
function initColorChanger() {
    const galaxyBox = document.getElementById('galaxy-box');
    const changeBtn = document.getElementById('change-galaxy');
    
    // Galaxy names and colors
    const galaxies = [
        { name: 'Milky Way Galaxy', color: 'linear-gradient(45deg, #3a3a6a, #7a7ac8)' },
        { name: 'Andromeda Galaxy', color: 'linear-gradient(45deg, #6a3a3a, #c87a7a)' },
        { name: 'Triangulum Galaxy', color: 'linear-gradient(45deg, #3a6a3a, #7ac87a)' },
        { name: 'Whirlpool Galaxy', color: 'linear-gradient(45deg, #3a6a6a, #7ac8c8)' }
    ];
    
    let currentGalaxy = 0;
    
    changeBtn.addEventListener('click', function() {
        // Move to next galaxy
        currentGalaxy = (currentGalaxy + 1) % galaxies.length;
        
        // Apply new galaxy style
        galaxyBox.textContent = galaxies[currentGalaxy].name;
        galaxyBox.style.backgroundImage = galaxies[currentGalaxy].color;
        
        // Add animation
        galaxyBox.classList.add('pulsing');
        setTimeout(() => {
            galaxyBox.classList.remove('pulsing');
        }, 500);
    });
}

/*
 * SECTION 3: FORM VALIDATION
 */

function initFormValidation() {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const formResponse = document.getElementById('form-response');
    
    // Name field validation
    nameInput.addEventListener('blur', function() {
        validateName();
    });
    
    // Email field validation
    emailInput.addEventListener('blur', function() {
        validateEmail();
    });
    
    // Password field validation with real-time feedback
    passwordInput.addEventListener('input', function() {
        validatePassword();
    });
    
    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        // If all validations pass, show success message
        if (isNameValid && isEmailValid && isPasswordValid) {
            form.style.display = 'none';
            formResponse.classList.remove('hidden');
        }
    });
    
    // Name validation function
    function validateName() {
        const nameValidation = document.getElementById('name-validation');
        
        if (nameInput.value.trim() === '') {
            nameValidation.textContent = 'Name is required';
            nameValidation.className = 'validation-message';
            return false;
        } else if (nameInput.value.trim().length < 2) {
            nameValidation.textContent = 'Name must be at least 2 characters';
            nameValidation.className = 'validation-message';
            return false;
        } else {
            nameValidation.textContent = 'Valid name';
            nameValidation.className = 'validation-message valid';
            return true;
        }
    }
    
    // Email validation function
    function validateEmail() {
        const emailValidation = document.getElementById('email-validation');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailValidation.textContent = 'Email is required';
            emailValidation.className = 'validation-message';
            return false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailValidation.textContent = 'Please enter a valid email address';
            emailValidation.className = 'validation-message';
            return false;
        } else {
            emailValidation.textContent = 'Valid email';
            emailValidation.className = 'validation-message valid';
            return true;
        }
    }
    
    // Password validation function
    function validatePassword() {
        const passwordValidation = document.getElementById('password-validation');
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        if (passwordInput.value === '') {
            passwordValidation.textContent = 'Password is required';
            passwordValidation.className = 'validation-message';
            strengthBar.className = 'strength-bar';
            strengthText.textContent = 'Password Strength: Not entered';
            return false;
        } else if (passwordInput.value.length < 8) {
            passwordValidation.textContent = 'Password must be at least 8 characters';
            passwordValidation.className = 'validation-message';
            strengthBar.className = 'strength-bar weak';
            strengthText.textContent = 'Password Strength: Weak';
            return false;
        } else {
            // Check for complexity (uppercase, lowercase, number, special char)
            let complexity = 0;
            if (/[A-Z]/.test(passwordInput.value)) complexity++;
            if (/[a-z]/.test(passwordInput.value)) complexity++;
            if (/[0-9]/.test(passwordInput.value)) complexity++;
            if (/[^A-Za-z0-9]/.test(passwordInput.value)) complexity++;
            
            if (complexity <= 2) {
                passwordValidation.textContent = 'Add uppercase, lowercase, numbers, or symbols';
                passwordValidation.className = 'validation-message';
                strengthBar.className = 'strength-bar weak';
                strengthText.textContent = 'Password Strength: Weak';
                return false;
            } else if (complexity === 3) {
                passwordValidation.textContent = 'Good password';
                passwordValidation.className = 'validation-message valid';
                strengthBar.className = 'strength-bar medium';
                strengthText.textContent = 'Password Strength: Medium';
                return true;
            } else {
                passwordValidation.textContent = 'Great password!';
                passwordValidation.className = 'validation-message valid';
                strengthBar.className = 'strength-bar strong';
                strengthText.textContent = 'Password Strength: Strong';
                return true;
            }
        }
    }
}