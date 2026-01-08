document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Carousel Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    if (slides.length > 0) {
        // Auto play
        let autoPlay = setInterval(nextSlide, slideInterval);

        // Manual controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(autoPlay);
                nextSlide();
                autoPlay = setInterval(nextSlide, slideInterval);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(autoPlay);
                prevSlide();
                autoPlay = setInterval(nextSlide, slideInterval);
            });
        }
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .service-card, .theme-card, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add class for animation when in view
    // Removed inline style injection as it is now in CSS

    // Loading Overlay
    window.addEventListener('load', () => {
        const loader = document.getElementById('loading-overlay');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500); // Slight delay to show animation
        }
    });

    // Modal Logic
    const modal = document.getElementById('theme-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');
    const themeCards = document.querySelectorAll('.theme-card');

    if (modal && closeModal) {
        themeCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').innerText;
                modalTitle.innerText = title;
                modalDesc.innerText = `Detalhes e fotos exclusivas do tema ${title}. Entre em contato para saber mais!`;

                // In a real app, you would load specific images here.
                // For now, we'll just show the modal.

                modal.classList.add('show');
                modal.style.display = 'flex';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    }
});
