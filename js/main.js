/* ============================================
   ENGAGEMENT INVITATION — Premium JavaScript
   GSAP-powered animations + interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initWatercolorBg();
    initEnvelope();
    initPetals();
    initSparkles();
    initCountdown();
    initScrollReveal();
    initActions();
    initMusic();
});

/* ============ WATERCOLOR BACKGROUND ============ */

function initWatercolorBg() {
    const canvas = document.getElementById('watercolor-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }

    function draw() {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Soft watercolor blobs
        const blobs = [
            { x: 0.08, y: 0.10, r: 0.22, color: 'rgba(240,160,184,0.12)' },
            { x: 0.90, y: 0.08, r: 0.20, color: 'rgba(212,160,208,0.10)' },
            { x: 0.05, y: 0.55, r: 0.18, color: 'rgba(232,213,240,0.10)' },
            { x: 0.92, y: 0.50, r: 0.16, color: 'rgba(240,160,184,0.08)' },
            { x: 0.10, y: 0.88, r: 0.20, color: 'rgba(212,160,208,0.10)' },
            { x: 0.88, y: 0.85, r: 0.18, color: 'rgba(240,160,184,0.10)' },
            { x: 0.50, y: 0.50, r: 0.30, color: 'rgba(201,169,110,0.03)' },
            { x: 0.30, y: 0.30, r: 0.15, color: 'rgba(242,198,208,0.08)' },
            { x: 0.70, y: 0.70, r: 0.15, color: 'rgba(232,213,240,0.08)' },
            { x: 0.15, y: 0.35, r: 0.12, color: 'rgba(240,180,196,0.07)' },
            { x: 0.85, y: 0.30, r: 0.14, color: 'rgba(220,170,220,0.07)' },
            { x: 0.20, y: 0.70, r: 0.13, color: 'rgba(240,180,196,0.06)' },
            { x: 0.80, y: 0.65, r: 0.12, color: 'rgba(220,170,220,0.06)' },
        ];

        blobs.forEach(blob => {
            const gradient = ctx.createRadialGradient(
                blob.x * w, blob.y * h, 0,
                blob.x * w, blob.y * h, blob.r * Math.max(w, h)
            );
            gradient.addColorStop(0, blob.color);
            gradient.addColorStop(0.6, blob.color.replace(/[\d.]+\)$/, '0.02)'));
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);
        });
    }

    resize();
    window.addEventListener('resize', resize);
}

/* ============ ENVELOPE OPENING ============ */

function initEnvelope() {
    const envelopeScreen = document.getElementById('envelope-screen');
    const invitation = document.getElementById('invitation');

    envelopeScreen.addEventListener('click', () => {
        // GSAP-powered envelope exit
        gsap.to(envelopeScreen, {
            opacity: 0,
            scale: 1.4,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                envelopeScreen.style.display = 'none';
                invitation.classList.add('visible');
                animateHero();
            }
        });
    });
}

/* ============ HERO ANIMATIONS (GSAP) ============ */

function animateHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate names sequentially
    tl.to('.name.groom', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3
    })
    .to('.ampersand', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.5')
    .to('.name.bride', {
        opacity: 1,
        y: 0,
        duration: 1.2
    }, '-=0.4');

    // Animate detail cards with stagger
    gsap.to('.detail-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 2,
        ease: 'power2.out'
    });
}

/* ============ FLOATING PETALS ============ */

function initPetals() {
    const container = document.getElementById('petals');
    const petalSymbols = ['🌸', '✿', '❀', '🩷', '💮', '🪷'];
    const petalCount = 12;

    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => createPetal(container, petalSymbols), i * 800);
    }

    // Continuously add petals
    setInterval(() => {
        if (container.children.length < 18) {
            createPetal(container, petalSymbols);
        }
    }, 2500);
}

function createPetal(container, symbols) {
    const petal = document.createElement('span');
    petal.classList.add('petal');
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size = Math.random() * 14 + 12;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    petal.style.cssText = `
        left: ${left}%;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(petal);

    // Auto-remove after animation
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, (duration + delay) * 1000);
}

/* ============ SPARKLE PARTICLES ============ */

function initSparkles() {
    const container = document.getElementById('sparkles');
    const sparkleCount = 20;

    for (let i = 0; i < sparkleCount; i++) {
        createSparkle(container, i);
    }
}

function createSparkle(container, index) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    const left = Math.random() * 100;
    const size = Math.random() * 3 + 2;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 15;

    sparkle.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(sparkle);
}

/* ============ COUNTDOWN TIMER ============ */

function initCountdown() {
    const engagementDate = new Date('2026-08-30T10:30:00+05:30').getTime();
    let prevSeconds = -1;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = engagementDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '🎉';
            document.getElementById('hours').textContent = '🎉';
            document.getElementById('minutes').textContent = '🎉';
            document.getElementById('seconds').textContent = '🎉';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateDigit('days', days);
        updateDigit('hours', hours);
        updateDigit('minutes', minutes);
        updateDigit('seconds', seconds);

        // Tick animation on seconds
        if (seconds !== prevSeconds) {
            const secEl = document.getElementById('seconds');
            secEl.classList.remove('tick');
            void secEl.offsetWidth; // Force reflow
            secEl.classList.add('tick');
            prevSeconds = seconds;
        }
    }

    function updateDigit(id, value) {
        const el = document.getElementById(id);
        const newVal = String(value).padStart(2, '0');
        if (el.textContent !== newVal) {
            el.textContent = newVal;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ============ SCROLL REVEAL ============ */

function initScrollReveal() {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal sections on scroll
    const sections = document.querySelectorAll(
        '.countdown-section, .quote-section, .venue-section, .actions-section, .footer'
    );

    sections.forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Parallax for ornament dividers
    gsap.utils.toArray('.ornament-divider').forEach(divider => {
        gsap.fromTo(divider,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: divider,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

/* ============ ACTION BUTTONS ============ */

function initActions() {
    // Add to Calendar
    document.getElementById('btn-calendar').addEventListener('click', () => {
        const event = {
            title: 'Engagement - Shankar Prasad & Hari Priya',
            start: '20260830T050000Z', // 10:30 AM IST = 5:00 AM UTC
            end: '20260830T083000Z',   // ~2:00 PM IST
            location: 'RP Lakshmi Hotels - Thanya',
            description: 'Engagement Ceremony of Shankar Prasad K & Hari Priya V'
        };

        const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`;

        window.open(googleCalUrl, '_blank');
    });

    // Share via WhatsApp
    document.getElementById('btn-share').addEventListener('click', () => {
        const message = `💍✨ *You're Invited!* ✨💍\n\nWith immense joy, we invite you to the\n*Engagement Ceremony* of\n\n✨ *Shankar Prasad K*\n& *Hari Priya V* ✨\n\n📅 *30th August 2026* (Saturday)\n🕥 *10:30 AM* Onwards\n📍 *RP Lakshmi Hotels — Thanya*\n\n🗺️ Directions: https://share.google/y2Ez72gkfUQZj2yTq\n\nYour gracious presence will make our day truly special! 🙏✨`;

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Button hover ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.fromTo(btn, 
                { boxShadow: btn.style.boxShadow },
                { scale: 1.03, duration: 0.3, ease: 'power2.out' }
            );
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });
}

/* ============ MUSIC TOGGLE ============ */

function initMusic() {
    const toggle = document.getElementById('music-toggle');
    let audio = null;
    let isPlaying = false;

    toggle.addEventListener('click', () => {
        if (!audio) {
            audio = new Audio('music.mp3');
            audio.loop = true;
            audio.volume = 0.4;
        }

        if (isPlaying) {
            audio.pause();
            toggle.classList.remove('playing');
            toggle.textContent = '🎵';
        } else {
            audio.play().catch(() => {
                console.log('Add a music.mp3 file to enable background music');
            });
            toggle.classList.add('playing');
            toggle.textContent = '🔊';
        }
        isPlaying = !isPlaying;
    });
}
