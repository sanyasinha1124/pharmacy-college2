// Mobile Menu Toggle
function showMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.style.right = "0";
}

function hideMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.style.right = "-200px";
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto slide change every 5 seconds
setInterval(nextSlide, 5000);

// Initialize first slide
showSlide(0);

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
});

// Program Tabs
function openProgram(programId) {
    // Hide all program contents
    const programContents = document.querySelectorAll(".program-content");
    programContents.forEach(content => content.classList.remove("active"));
    
    // Remove active class from all buttons
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => btn.classList.remove("active"));
    
    // Show selected program content
    document.getElementById(programId).classList.add("active");
    
    // Add active class to clicked button
    event.currentTarget.classList.add("active");
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".testimonials .dot");

function showTestimonial(n) {
    testimonials.forEach(testimonial => testimonial.classList.remove("active"));
    testimonialDots.forEach(dot => dot.classList.remove("active"));
    
    currentTestimonial = (n + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add("active");
    testimonialDots[currentTestimonial].classList.add("active");
}

function nextTestimonial() {
    showTestimonial(currentTestimonial + 1);
}

// Auto testimonial change every 7 seconds
setInterval(nextTestimonial, 7000);

// Initialize first testimonial
showTestimonial(0);

// Dot click handlers for testimonials
testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => showTestimonial(index));
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll(".number");
    const speed = 200; // Lower number = faster animation
    
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-count");
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target + "+";
        }
    });
}

// Run counter animation when stats section is in view
const statsSection = document.querySelector(".about-section");
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(statsSection);

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        lightbox.classList.add("active");
        const img = document.createElement("img");
        img.src = item.querySelector("img").src;
        
        // Clear lightbox before adding new content
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }
        
        lightbox.appendChild(img);
    });
});

lightbox.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove("active");
});

// Video Overlay Click Handler
const videoOverlay = document.querySelector(".image-overlay");
if (videoOverlay) {
    videoOverlay.addEventListener("click", () => {
        // This would open a modal with the video in a real implementation
        window.location.href = "virtual-tour.html";
    });
}

// Form Validation for Newsletter
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector("input[type='email']");
        
        if (emailInput.value && isValidEmail(emailInput.value)) {
            // In a real implementation, you would send this to your server
            alert("Thank you for subscribing to our newsletter!");
            emailInput.value = "";
        } else {
            alert("Please enter a valid email address.");
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Responsive Adjustments
function handleResponsive() {
    const navLinks = document.getElementById("navLinks");
    if (window.innerWidth <= 768) {
        // Mobile view
        navLinks.style.position = "fixed";
        navLinks.style.top = "0";
        navLinks.style.right = "-200px";
        navLinks.style.width = "200px";
        navLinks.style.height = "100vh";
        navLinks.style.backgroundColor = "var(--white)";
        navLinks.style.paddingTop = "80px";
        navLinks.style.transition = "var(--transition)";
        
        document.querySelector(".fas.fa-bars").style.display = "block";
        document.querySelector(".fas.fa-times").style.display = "block";
    } else {
        // Desktop view
        navLinks.style.position = "relative";
        navLinks.style.right = "0";
        navLinks.style.width = "auto";
        navLinks.style.height = "auto";
        navLinks.style.backgroundColor = "transparent";
        navLinks.style.paddingTop = "0";
        
        document.querySelector(".fas.fa-bars").style.display = "none";
        document.querySelector(".fas.fa-times").style.display = "none";
    }
}

// Initialize responsive adjustments
window.addEventListener("load", handleResponsive);
window.addEventListener("resize", handleResponsive);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                hideMenu();
            }
        }
    });
});

// Faculty Card Hover Effect
const facultyCards = document.querySelectorAll(".faculty-card");
facultyCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.querySelector(".social-links").style.opacity = "1";
    });
    
    card.addEventListener("mouseleave", () => {
        card.querySelector(".social-links").style.opacity = "0";
    });
});

// Initialize faculty card social links
document.querySelectorAll(".faculty-card .social-links").forEach(links => {
    links.style.opacity = "0";
    links.style.transition = "opacity 0.3s ease";
});

// Research Card Animation
const researchCards = document.querySelectorAll(".research-card");
researchCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.querySelector(".read-more i").style.transform = "translateX(5px)";
    });
    
    card.addEventListener("mouseleave", () => {
        card.querySelector(".read-more i").style.transform = "translateX(0)";
    });
});

// Add animation to quick link boxes on scroll
const quickLinkBoxes = document.querySelectorAll(".quick-link-box");
const quickLinksObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

quickLinkBoxes.forEach(box => {
    box.style.opacity = "0";
    box.style.transform = "translateY(20px)";
    box.style.transition = "all 0.5s ease";
    quickLinksObserver.observe(box);
});

// Add animation to program tabs on scroll
const programTabs = document.querySelector(".programs-tabs");
const programsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

programTabs.style.opacity = "0";
programTabs.style.transform = "translateY(20px)";
programTabs.style.transition = "all 0.5s ease";
programsObserver.observe(programTabs);

// Add animation to section headers on scroll
const sectionHeaders = document.querySelectorAll(".section-header");
const headersObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.5 });

sectionHeaders.forEach(header => {
    header.style.opacity = "0";
    header.style.transform = "translateY(20px)";
    header.style.transition = "all 0.5s ease";
    headersObserver.observe(header);
});