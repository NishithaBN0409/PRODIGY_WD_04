document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Get navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight - 20, // Add some extra padding
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar shrink/background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) { // Adjust threshold as needed
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Dynamic current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Intersection Observer for Animations ---
    // This makes animations trigger when elements enter the viewport

    const sections = document.querySelectorAll('.section-block');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Handle fade-in-up elements in hero (these are already animated on load)
                if (target.id === 'hero-section') {
                    target.querySelectorAll('.fade-in-up').forEach((el, index) => {
                        el.style.animationDelay = `${index * 0.2}s`;
                        el.style.animationPlayState = 'running';
                    });
                }

                // Handle general section animations (animate all direct children or specific classes)
                // Using .querySelectorAll so we can apply different animations
                target.querySelectorAll('.animate-zoom-in, .animate-fade-in-left, .animate-fade-in-right').forEach(el => {
                    el.style.animationPlayState = 'running';
                    el.style.opacity = '1'; // Ensure they are visible after animation
                });

                // Staggered animation for list items/grid items
                const staggeredElements = target.querySelectorAll('.animate-stagger-in > *');
                if (staggeredElements.length > 0) {
                    staggeredElements.forEach((el, index) => {
                        el.style.animation = `fadeInUp 0.6s ease-out forwards ${index * 0.1}s`;
                    });
                }
                observer.unobserve(target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initial animation for hero section elements on page load
    document.querySelectorAll('.hero-section .fade-in-up').forEach(el => {
        el.style.animationPlayState = 'running';
    });

    // Certificate View Handling (Placeholder for modal or new tab)
    document.querySelectorAll('.view-certificate').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const certName = this.dataset.certificateName;
            alert(`You clicked to view certificate for: ${certName}. In a real application, a modal would open or the certificate PDF/image would load.`);
            // Implement modal logic or navigate to actual certificate PDF/image here
            // Example: window.open(`certificates/${certName.replace(/\s/g, '-')}.pdf`, '_blank');
        });
    });

    // Project Link Placeholders
    document.querySelectorAll('.btn-project, .btn-publication').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert(`This is a placeholder link for the project/publication. In a real portfolio, it would link to a live demo, GitHub repo, or publication document.`);
            }
        });
    });
});