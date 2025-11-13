// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with slide-up class
    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(element => {
        observer.observe(element);
    });

    // BMI Calculator
    const bmiForm = document.getElementById('bmi-form');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMI();
        });

        const resetButton = document.getElementById('reset-button');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                bmiForm.reset();
                document.getElementById('bmi-result').style.display = 'none';
            });
        }
    }

    // Appointment Form
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateAppointmentForm()) {
                submitAppointmentForm();
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }

    // Set minimum date for appointment booking (today)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// BMI Calculator Function
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    // Validate inputs
    if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
        alert('Please enter valid weight and height values.');
        return;
    }

    // Convert height from cm to meters
    const heightM = heightCm / 100;

    // Calculate BMI
    const bmi = weight / (heightM * heightM);
    const bmiRounded = bmi.toFixed(1);

    // Determine category and message
    let category = '';
    let message = '';
    let categoryClass = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        message = 'You may need to gain weight. Consider consulting with our healthcare professionals for personalized advice.';
        categoryClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal';
        message = 'You have a healthy weight. Keep up the good work with a balanced diet and regular exercise!';
        categoryClass = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        message = 'You may benefit from weight management. Our team can help you develop a healthy eating and exercise plan.';
        categoryClass = 'overweight';
    } else {
        category = 'Obese';
        message = 'Your health may be at risk. We recommend scheduling a consultation with our healthcare professionals.';
        categoryClass = 'obese';
    }

    // Display results
    document.getElementById('bmi-number').textContent = bmiRounded;
    document.getElementById('bmi-category').textContent = `Category: ${category}`;
    document.getElementById('bmi-message').textContent = message;
    
    const resultDiv = document.getElementById('bmi-result');
    resultDiv.style.display = 'block';
    resultDiv.className = `bmi-result ${categoryClass}`;

    // Smooth scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Validate Appointment Form
function validateAppointmentForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (name === '' || email === '' || phone === '' || date === '' || time === '') {
        alert('Please fill in all required fields.');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }

    // Validate date is not in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert('Please select a future date.');
        return false;
    }

    return true;
}

// Submit Appointment Form
function submitAppointmentForm() {
    // In a real application, this would send data to a server
    // For this demo, we'll just show a success message
    
    const form = document.getElementById('appointment-form');
    const successMessage = document.getElementById('appointment-success');

    form.style.display = 'none';
    successMessage.style.display = 'block';

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Reset form after 5 seconds and hide success message
    setTimeout(function() {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
    }, 5000);
}

// Validate Contact Form
function validateContactForm() {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('contact-message').value.trim();

    if (name === '' || email === '' || subject === '' || message === '') {
        alert('Please fill in all required fields.');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

// Submit Contact Form
function submitContactForm() {
    // In a real application, this would send data to a server
    // For this demo, we'll just show a success message
    
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success');

    form.style.display = 'none';
    successMessage.style.display = 'block';

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Reset form after 5 seconds and hide success message
    setTimeout(function() {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
    }, 5000);
}

// Smooth scrolling for anchor links
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
