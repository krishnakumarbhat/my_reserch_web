/* ═══════════════════════════════════════════
   KRISHNAKUMAR B — Portfolio JavaScript
   Lightweight, no-dependency animations
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    // ── Typing Effect ─────────────────────
    const titles = [
        'Machine Learning Scientist',
        'Systems Engineer',
        'Core ML Researcher',
        'HPC & Embedded Developer',
        'Georgia Tech OMSCS',
    ];

    const heroTitle = document.getElementById('heroTitle');
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 60;

    function typeWriter() {
        const current = titles[titleIndex];

        if (isDeleting) {
            heroTitle.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;
        } else {
            heroTitle.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 70;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 400;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();

    // ── Scroll Reveal (IntersectionObserver) ──
    const revealElements = document.querySelectorAll('.anim-reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ── Navbar Scroll Effect ──────────────
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            navbar.classList.add('nav--scrolled');
        } else {
            navbar.classList.remove('nav--scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ── Mobile Navigation ─────────────────
    const hamburger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navLinks.classList.toggle('is-open');
        document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close nav on link click
    navLinks.querySelectorAll('.nav__link').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            navLinks.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    });

    // ── Cursor Glow (desktop only) ────────
    const cursorGlow = document.getElementById('cursorGlow');

    if (window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.transform = `translate(${glowX - 300}px, ${glowY - 300}px)`;
            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    } else {
        cursorGlow.style.display = 'none';
    }

    // ── Particles Generator ───────────────
    const particleContainer = document.getElementById('heroParticles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.setProperty('--duration', `${6 + Math.random() * 8}s`);
        particle.style.setProperty('--delay', `${Math.random() * 6}s`);
        particle.style.width = `${2 + Math.random() * 3}px`;
        particle.style.height = particle.style.width;

        const colors = ['#6366f1', '#8b5cf6', '#06d6a0', '#818cf8'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particleContainer.appendChild(particle);
    }

    // ── Counter Animation ─────────────────
    const statNumbers = document.querySelectorAll('.hero__stat-number');

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));

    function animateCounter(el, target) {
        let current = 0;
        const duration = 1500;
        const start = performance.now();

        function step(timestamp) {
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
            current = Math.round(eased * target);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    // ── Smooth anchor scrolling ───────────
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Active nav link highlight ─────────
    const sections = document.querySelectorAll('.section, .hero');
    const navLinksList = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinksList.forEach((link) => {
                        link.style.color = '';
                        if (link.getAttribute('href') === `#${id}`) {
                            link.style.color = 'var(--accent-secondary)';
                        }
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
})();
