/* ============================================
   ENGAGEMENT INVITATION — Premium JavaScript
   GSAP-powered animations + interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initWatercolorBg();
    initEnvelopeParticles();
    initEnvelope();
    initPetals();
    initButterflies();
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

/* ============ ENVELOPE PARTICLES ============ */

function initEnvelopeParticles() {
    const container = document.getElementById('env-particles');
    if (!container) return;

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.classList.add('env-particle');
        const left = Math.random() * 100;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 8;
        particle.style.cssText = `
            left: ${left}%;
            bottom: -10px;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        container.appendChild(particle);
    }
}

/* ============ ENVELOPE OPENING ============ */

function initEnvelope() {
    const envelopeScreen = document.getElementById('envelope-screen');
    const invitation = document.getElementById('invitation');

    envelopeScreen.addEventListener('click', () => {
        // Scroll to top immediately so invitation is visible
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';

        // GSAP-powered multi-step envelope opening
        const tl = gsap.timeline();

        // Step 1: Seal pops away
        tl.to('.envelope-seal', {
            scale: 1.5,
            opacity: 0,
            duration: 0.4,
            ease: 'back.in(2)'
        })
        // Step 2: Flap opens with 3D rotation
        .to('.envelope-flap', {
            rotateX: 180,
            duration: 0.8,
            ease: 'power2.inOut'
        })
        // Step 3: Letter rises up from envelope
        .to('.envelope-letter', {
            y: -120,
            scale: 1.05,
            duration: 0.7,
            ease: 'power2.out'
        }, '-=0.3')
        // Step 4: Ring sparkle
        .to('.envelope-ring', {
            scale: 1.3,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        }, '-=0.5')
        // Step 5: Entire screen fades with golden glow
        .to('.envelope-wrapper', {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        })
        .to(envelopeScreen, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                envelopeScreen.style.display = 'none';
                document.body.style.overflow = '';
                window.scrollTo(0, 0);
                invitation.classList.add('visible');
                animateHero();
            }
        }, '-=0.3');
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
    .to('.amp-sprig', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.3')
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
    const petalSymbols = ['🌸', '✿', '❀', '🩷', '💮'];
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

/* ============ FLYING BUTTERFLIES (realistic, 3D flap) ============ */

// pal = { fore, foreEdge, hind, hindEdge, body, accent }
function butterflySVG(pal, uid) {
    const g = (s) => `bf${uid}-${s}`;
    // One wing half is drawn, then mirrored via CSS/scaleX for the other side.
    const wingHalf = (side) => `
        <g class="bf-wing bf-wing-${side}">
            <!-- forewing -->
            <path d="M50 40
                     C34 12 14 4 5 12
                     C-3 20 6 34 22 40
                     C33 44 44 44 50 42 Z"
                  fill="url(#${g('fore')})" stroke="${pal.foreEdge}" stroke-width="1.4"/>
            <!-- hindwing -->
            <path d="M50 44
                     C40 50 24 58 16 54
                     C6 49 10 38 24 40
                     C34 41 45 42 50 43 Z"
                  fill="url(#${g('hind')})" stroke="${pal.hindEdge}" stroke-width="1.4"/>
            <!-- forewing dark tip band -->
            <path d="M22 12 C14 8 8 11 5 16 C10 15 16 16 22 20 Z"
                  fill="${pal.foreEdge}" opacity="0.55"/>
            <!-- veins -->
            <g stroke="${pal.body}" stroke-width="0.7" fill="none" opacity="0.45" stroke-linecap="round">
                <path d="M50 41 C38 34 26 26 12 16"/>
                <path d="M50 41 C36 33 24 30 10 24"/>
                <path d="M50 42 C38 41 26 42 16 46"/>
                <path d="M50 43 C40 46 30 50 22 51"/>
            </g>
            <!-- pearl spots -->
            <circle cx="14" cy="15" r="2.4" fill="rgba(255,255,255,0.75)"/>
            <circle cx="10" cy="21" r="1.6" fill="rgba(255,255,255,0.6)"/>
            <circle cx="20" cy="49" r="1.8" fill="rgba(255,255,255,0.55)"/>
            <!-- soft top-light highlight for 3D sheen -->
            <path d="M40 38 C30 26 20 20 12 18 C22 24 32 30 40 40 Z"
                  fill="rgba(255,255,255,0.35)"/>
        </g>`;

    return `
    <svg class="bf-svg" viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="${g('fore')}" cx="30%" cy="35%" r="80%">
                <stop offset="0%" stop-color="${pal.foreLight || '#ffffff'}"/>
                <stop offset="45%" stop-color="${pal.fore}"/>
                <stop offset="100%" stop-color="${pal.foreEdge}"/>
            </radialGradient>
            <radialGradient id="${g('hind')}" cx="40%" cy="45%" r="85%">
                <stop offset="0%" stop-color="${pal.hindLight || '#ffffff'}"/>
                <stop offset="50%" stop-color="${pal.hind}"/>
                <stop offset="100%" stop-color="${pal.hindEdge}"/>
            </radialGradient>
            <linearGradient id="${g('body')}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${pal.accent}"/>
                <stop offset="50%" stop-color="${pal.body}"/>
                <stop offset="100%" stop-color="${pal.bodyDark || pal.body}"/>
            </linearGradient>
        </defs>

        <!-- wings (right side is the mirrored group) -->
        <g class="bf-wing-pair-left">${wingHalf('left')}</g>
        <g class="bf-wing-pair-right" transform="translate(100,0) scale(-1,1)">${wingHalf('right')}</g>

        <!-- antennae -->
        <g stroke="${pal.body}" stroke-width="1.1" fill="none" stroke-linecap="round">
            <path d="M50 28 C46 14 42 9 38 6"/>
            <path d="M50 28 C54 14 58 9 62 6"/>
        </g>
        <circle cx="38" cy="6" r="1.6" fill="${pal.body}"/>
        <circle cx="62" cy="6" r="1.6" fill="${pal.body}"/>

        <!-- body: head, thorax, segmented abdomen -->
        <circle cx="50" cy="28" r="3.6" fill="url(#${g('body')})"/>
        <ellipse cx="50" cy="44" rx="3.4" ry="16" fill="url(#${g('body')})"/>
        <g stroke="${pal.bodyDark || pal.accent}" stroke-width="0.6" opacity="0.5">
            <line x1="47" y1="40" x2="53" y2="40"/>
            <line x1="47" y1="46" x2="53" y2="46"/>
            <line x1="47.5" y1="52" x2="52.5" y2="52"/>
        </g>
        <ellipse cx="48.5" cy="40" rx="1" ry="9" fill="rgba(255,255,255,0.3)"/>
    </svg>`;
}

function initButterflies() {
    const container = document.getElementById('butterflies');
    if (!container) return;

    // Realistic pastel palettes with light cores + darker edges for depth
    const palettes = [
        { foreLight:'#ffe3ef', fore:'#f4a8c4', foreEdge:'#c26f92', hindLight:'#ffeef5', hind:'#f8cfe0', hindEdge:'#d98cae', body:'#7a4a5e', bodyDark:'#4f2f3d', accent:'#9a6076' }, // blush pink
        { foreLight:'#f1e6ff', fore:'#c9a8ec', foreEdge:'#8f6fbf', hindLight:'#f6eeff', hind:'#e2d0f7', hindEdge:'#a488c8', body:'#5a4574', bodyDark:'#3a2b4d', accent:'#725c8f' }, // lavender
        { foreLight:'#fff3d6', fore:'#f4cf88', foreEdge:'#c99a4e', hindLight:'#fff8e6', hind:'#fbe6bf', hindEdge:'#d8b673', body:'#7a5f2e', bodyDark:'#4f3d1a', accent:'#9a7a3e' }, // amber gold
        { foreLight:'#e2fff2', fore:'#a5e0c8', foreEdge:'#5fae90', hindLight:'#effef8', hind:'#cfefe2', hindEdge:'#7fbea3', body:'#2e5f49', bodyDark:'#1a3d2c', accent:'#3e7a5e' }, // mint
        { foreLight:'#e6f0ff', fore:'#a8c4f0', foreEdge:'#6f8fc4', hindLight:'#f0f6ff', hind:'#d0e0fa', hindEdge:'#88a4d0', body:'#2e4574', bodyDark:'#1a2b4d', accent:'#3e5c8f' }, // powder blue
        { foreLight:'#ffe6e0', fore:'#f4a898', foreEdge:'#c2705e', hindLight:'#fff0ec', hind:'#f8cfc4', hindEdge:'#d98c78', body:'#7a3f2e', bodyDark:'#4f271a', accent:'#9a5640' }, // coral peach
    ];

    const count = 7;
    for (let i = 0; i < count; i++) {
        createButterfly(container, palettes, i);
    }
}

let __bfUid = 0;
function createButterfly(container, palettes, index) {
    const wrap = document.createElement('div');
    wrap.classList.add('butterfly');

    const pal = palettes[Math.floor(Math.random() * palettes.length)];
    wrap.innerHTML = butterflySVG(pal, ++__bfUid);

    const size = Math.random() * 20 + 28;       // 28–48px
    const startTop = Math.random() * 80 + 5;     // 5–85% vertical
    const duration = Math.random() * 14 + 18;    // 18–32s to cross
    const delay = Math.random() * 14;
    const flapDur = (Math.random() * 0.14 + 0.16).toFixed(2); // 0.16–0.30s
    const dir = Math.random() > 0.5 ? 1 : -1;
    // 3D viewing angle: pitch it toward the viewer (side/low angle) + a little yaw
    const tilt = Math.round(Math.random() * 16 + 50);  // 50–66deg pitch
    const yaw = Math.round(Math.random() * 32 - 16);   // -16 to +16deg yaw

    wrap.style.cssText = `
        width: ${size}px;
        height: ${size * 0.9}px;
        top: ${startTop}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --flap-dur: ${flapDur}s;
        --bf-tilt: ${tilt}deg;
        --bf-yaw: ${yaw}deg;
    `;
    wrap.classList.add(dir === 1 ? 'bf-fly-right' : 'bf-fly-left');

    container.appendChild(wrap);
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
        '.countdown-section, .quote-section, .venue-section, .actions-section, .rsvp-section, .footer'
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
        const message = `💍✨ *You're Invited!* ✨💍\n\nWith immense joy, we invite you to the\n*Engagement Ceremony* of\n\n✨ *Shankar Prasad K*\n& *Hari Priya V* ✨\n\n📅 *30th August 2026* (Sunday)\n🕥 *10:30 AM* Onwards\n📍 *RP Lakshmi Hotels — Thanya*\n\n🗺️ Directions: https://share.google/y2Ez72gkfUQZj2yTq\n\nYour gracious presence will make our day truly special! 🙏✨`;

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
