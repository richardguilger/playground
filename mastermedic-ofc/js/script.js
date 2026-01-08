// ========================================
// MASTERMEDIC BH - VANILLA JAVASCRIPT
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // 1. MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function () {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('active');
            const icon = mobileMenuIcon.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && !mobileMenuIcon.contains(event.target)) {
            nav.classList.remove('active');
            const icon = mobileMenuIcon.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // ========================================
    // 2. HERO CAROUSEL (AUTO-ROTATE)
    // ========================================
    const heroCarousel = document.getElementById('hero-carousel');
    if (heroCarousel) {
        const heroSlides = heroCarousel.querySelectorAll('.carousel-slide');
        let currentHeroSlide = 0;

        function showHeroSlide(index) {
            heroSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextHeroSlide() {
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            showHeroSlide(currentHeroSlide);
        }

        // Auto-rotate every 5 seconds
        setInterval(nextHeroSlide, 5000);
    }

    // ========================================
    // 3. PRODUCT CAROUSELS (MANUAL NAVIGATION)
    // ========================================
    const carouselStates = {
        eletroterapia: 0,
        cinta: 0,
        botas: 0
    };

    window.nextSlide = function (carouselId) {
        const carousel = document.getElementById('carousel-' + carouselId);
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const currentIndex = carouselStates[carouselId];

        slides[currentIndex].classList.remove('active');
        carouselStates[carouselId] = (currentIndex + 1) % slides.length;
        slides[carouselStates[carouselId]].classList.add('active');
    };

    window.prevSlide = function (carouselId) {
        const carousel = document.getElementById('carousel-' + carouselId);
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const currentIndex = carouselStates[carouselId];

        slides[currentIndex].classList.remove('active');
        carouselStates[carouselId] = (currentIndex - 1 + slides.length) % slides.length;
        slides[carouselStates[carouselId]].classList.add('active');
    };

    // ========================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ignore if it's just "#" or empty
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ========================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // ========================================
    // 6. HEADER SCROLL EFFECT
    // ========================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========================================
    // 7. PRELOAD IMAGES FOR BETTER PERFORMANCE
    // ========================================
    const imagesToPreload = [
        'images/hero_slide_1.png',
        'images/hero_slide_2.png',
        'images/hero_slide_3.png',
        'images/eletroterapia_1.jpg',
        'images/eletroterapia_2.png',
        'images/cinta_massageadora_new_1.png',
        'images/cinta_massageadora_2.png',
        'images/botas_compressao.png',
        'images/botas_compressao_2.png',
        'images/telemedicina_2.png'
    ];

    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // ========================================
    // 8. TELEMEDICINE MODAL & SUPABASE
    // ========================================
    const modal = document.getElementById('telemetry-modal');
    const openBtn = document.getElementById('open-telemetry-modal');
    const closeBtn = document.getElementById('close-telemetry-modal');
    const formView = document.getElementById('modal-form-view');
    const successView = document.getElementById('modal-success-view');
    const form = document.getElementById('telemetry-registration-form');
    const closeSuccessBtn = document.getElementById('close-success-btn');

    // CONFIGURAÇÃO SUPABASE - Verifique estes dados no seu dashboard (Settings > API)
    const SUPABASE_URL = 'https://xdjpwwfimxlbrazuvkqr.supabase.co'.trim();
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkanB3d2ZpbXhsYnJhenV2a3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyNDMyMzIsImV4cCI6MjA4MTgxOTIzMn0.R-Q20Hlh6RSdfPCA1c6K-iFz0CEQmBNFDTuSm11FhQk'.trim();

    let supabase = null;
    try {
        if (window.supabase) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('✅ Supabase Client inicializado para:', SUPABASE_URL);
        } else {
            console.error('❌ Biblioteca Supabase não encontrada no window.');
        }
    } catch (e) {
        console.error('❌ Erro na inicialização do Supabase:', e);
    }

    const toggleModal = (show) => {
        if (!modal) return;
        modal.style.display = show ? 'flex' : 'none';
        if (show) {
            document.body.style.overflow = 'hidden';
            formView.style.display = 'block';
            successView.style.display = 'none';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    if (openBtn) openBtn.addEventListener('click', () => toggleModal(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleModal(false));
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', () => toggleModal(false));

    window.addEventListener('click', (e) => {
        if (e.target === modal) toggleModal(false);
    });

    if (form) {
        // Input Masking logic (CPF/RG) remains the same
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
                else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
                else if (v.length > 3) v = v.replace(/(\d{3})(\d{3})/, "$1.$2");
                e.target.value = v;
            });
        }

        const rgInput = document.getElementById('rg');
        if (rgInput) {
            rgInput.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, "").slice(0, 9);
                if (v.length > 8) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
                else if (v.length > 5) v = v.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3");
                else if (v.length > 2) v = v.replace(/(\d{2})(\d{3})/, "$1.$2");
                e.target.value = v;
            });
        }

        const phoneMask = (e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            if (v.length > 10) {
                // (11) 91234-5678
                v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
            } else if (v.length > 6) {
                // (11) 91234-56
                v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
            } else if (v.length > 2) {
                // (11) 9
                v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
            } else {
                if (v.length > 0) v = v.replace(/^(\d*)/, "($1");
            }
            e.target.value = v;
        };

        const whatsappInput = document.getElementById('whatsapp');
        if (whatsappInput) whatsappInput.addEventListener('input', phoneMask);

        const contactSecInput = document.getElementById('contato_secundario');
        if (contactSecInput) contactSecInput.addEventListener('input', phoneMask);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'ENVIANDO...';

            const formData = new FormData(form);
            const dataToInsert = {
                nome_completo: formData.get('nome'),
                rg: formData.get('rg'),
                cpf: formData.get('cpf'),
                email: formData.get('email'),
                whatsapp: formData.get('whatsapp'),
                contato_secundario: formData.get('contato_secundario') || null,
                representante: document.getElementById('representante').value // Força pegar o valor direto do elemento
            };

            console.log('📦 ENVIANDO DADOS:', dataToInsert); // Debug Log

            try {
                // DETECTA AMBIENTE AUTOMATICAMENTE
                // Se for localhost/127.0.0.1 -> Tenta usar Proxy (para evitar erros de DNS local)
                // Se for produção (dominio.com) -> Chama Supabase Direto
                const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

                if (isLocalhost) {
                    console.log('🔧 DEV MODE: Tentando envio via Proxy Local...');
                    const response = await fetch('/api/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(dataToInsert)
                    });

                    const result = await response.json();
                    if (!response.ok) throw new Error(result.error || 'Erro no Proxy Local');

                } else {
                    console.log('🚀 PROD MODE: Enviando direto para Supabase...');
                    const response = await fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
                        method: 'POST',
                        headers: {
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`,
                            'Content-Type': 'application/json',
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify(dataToInsert)
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('Erro Supabase:', errorText);
                        throw new Error(`Erro API: ${response.status}`);
                    }
                }

                console.log('✅ Sucesso no envio!');
                formView.style.display = 'none';
                successView.style.display = 'block';
                form.reset();
            } catch (err) {
                console.error('❌ Erro de envio:', err);

                // Fallback inteligente: Se falhar no proxy local, tenta direto (e vice-versa é menos provavel)
                const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                if (isLocalhost && err.message.includes('Proxy')) {
                    alert('Erro no servidor local. Verifique se "node server.js" está rodando.');
                } else {
                    alert('Erro ao enviar formulário. Verifique sua conexão.');
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'ENVIAR REGISTRO';
            }
        });
    }

    // ========================================
    // 9. LOG INITIALIZATION
    // ========================================
    console.log('🏥 Mastermedic BH - Site carregado com sucesso!');
    console.log('✅ Todas as funcionalidades JavaScript ativas');
});
