// --- Configuration (Settings for Appearance, Movement, and Life Cycle) ---
const CONFIG = {
    // General Appearance & Movement
    particleCount: 50,
    particleSize: 0.2,
    particleColor: "#FFFFFF",
    backgroundColor: "#000000",
    baseOpacity: 1,
    glowIntensity: 10,
    movementSpeed: 1,

    // Mouse Interaction
    mouseInfluence: 50, // Distance (in pixels) for mouse influence
    mouseGravity: "attract",
    gravityStrength: 80,

    // Spawning & Life Decay (Temporary Particles)
    spawnRate: 1,
    maxParticles: 1500,
    particleLifetime: 80,

    // --- NEW: Pause setting ---
    mousePauseDelay: 100 // 0.1 seconds in milliseconds
};

let canvas;
let canvasRunning = false;

const setCanvas = () => {
    canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        return ctx;
    }
    return null;
}

setInterval(() => {
    if(!canvas) {
        setCanvas();
    } else if(!canvasRunning) {
        canvasRunning = true;
        runScript();
    }
}, 1000);

const runScript = () => {
    const ctx = canvas.getContext('2d');
    let mouse = { x: 0, y: 0 };
    let particles = [];
    let animationFrameId;

    // --- NEW: Variables for Mouse Tracking ---
    let mouseIsActive = true; // Tracks if mouse has moved recently
    let mouseStopTimer;       // Holds the setTimeout ID

    // Helper function to create a single particle object
    function createSingleParticle(x, y, isPermanent = false) {
        const { particleSize, movementSpeed, particleLifetime, baseOpacity } = CONFIG;

        // Permanent particles have an infinite life
        const lifeValue = isPermanent ? Infinity : particleLifetime;

        return {
            x: x === undefined ? Math.random() * canvas.width : x,
            y: y === undefined ? Math.random() * canvas.height : y,
            // Initial random velocity is small
            vx: (Math.random() - 0.5) * (movementSpeed * 0.5),
            vy: (Math.random() - 0.5) * (movementSpeed * 0.5),
            size: Math.random() * particleSize + 1,
            opacity: baseOpacity,
            baseOpacity: baseOpacity,
            mass: Math.random() * 0.5 + 0.5,
            glowMultiplier: 1,
            life: lifeValue,
            maxLife: particleLifetime,
            isPermanent: isPermanent
        };
    }

    // --- Particle Initialization ---
    function initializeParticles() {
        const { particleCount } = CONFIG;
        particles = Array.from({ length: particleCount }, () => createSingleParticle(undefined, undefined, true));
    }

    // --- Canvas and Window Setup ---
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (particles.length === 0) {
            initializeParticles();
        } else {
            particles.forEach(p => {
                if (p.x > canvas.width || p.y > canvas.height) {
                    p.x = Math.random() * canvas.width;
                    p.y = Math.random() * canvas.height;
                }
            });
        }
        document.body.style.backgroundColor = CONFIG.backgroundColor;
    }

    // --- MODIFIED: Mouse tracking handler ---
    function handleMouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // 1. Clear any pending timer (mouse has moved)
        clearTimeout(mouseStopTimer);

        // 2. Set activity to true (spawning resumes immediately)
        if (!mouseIsActive) {
            mouseIsActive = true;
        }

        // 3. Set a new timer to check if the mouse stops
        mouseStopTimer = setTimeout(() => {
            mouseIsActive = false; // Mouse has stopped for 0.1s, stop spawning
        }, CONFIG.mousePauseDelay);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // --- Animation Loop ---

    function updateParticles() {
        const {
            mouseInfluence, mouseGravity, gravityStrength, spawnRate, maxParticles,
            particleLifetime, baseOpacity
        } = CONFIG;

        // 1. Spawning Logic: Now requires mouseIsActive to be true
        if (mouseIsActive && mouseGravity === "attract" && particles.length < maxParticles && false) {
            for (let i = 0; i < spawnRate; i++) {
                const spawnX = mouse.x + (Math.random() - 0.5) * mouseInfluence * 0.2;
                const spawnY = mouse.y + (Math.random() - 0.5) * mouseInfluence * 0.2;

                particles.push(createSingleParticle(spawnX, spawnY, false));
            }
        }

        // 2. Update existing particles (Movement, Mouse Influence, and Life Decay)
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];

            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            let isInfluenced = false;

            if (distance < mouseInfluence && distance > 0) {
                isInfluenced = true;

                // Mouse Influence (Gravity/Repulsion)
                const force = (mouseInfluence - distance) / mouseInfluence;
                const normalizedDx = dx / distance;
                const normalizedDy = dy / distance;
                const gravityForce = force * (gravityStrength * 0.001);

                // Apply gravity
                if (mouseGravity === "attract") {
                    particle.vx += normalizedDx * gravityForce;
                    particle.vy += normalizedDy * gravityForce;
                } else if (mouseGravity === "repel") {
                    particle.vx -= normalizedDx * gravityForce;
                    particle.vy -= normalizedDy * gravityForce;
                }

                // Opacity increase on influence
                particle.opacity = Math.min(1, baseOpacity + force * 0.4);

                // Reset life for *temporary* particles in the influence zone
                if (!particle.isPermanent) {
                    particle.life = particleLifetime;
                }

            } else {
                // Not influenced by mouse: Fade and Decay Logic

                // 3. Life Decay and Fading (Only for temporary particles)
                if (!particle.isPermanent) {
                    particle.life -= 1;
                    const lifeRatio = Math.max(0, particle.life / particle.maxLife);
                    // Gradually decrease opacity to zero
                    particle.opacity = baseOpacity * lifeRatio;
                } else {
                    // Permanent particles reset to base opacity when not influenced
                    particle.opacity = particle.baseOpacity;
                }
            }

            // 4. Movement and Boundary Wrapping
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Add tiny random force for "floating" effect
            particle.vx += (Math.random() - 0.5) * 0.001;
            particle.vy += (Math.random() - 0.5) * 0.001;

            // Apply friction (damping)
            particle.vx *= 0.999;
            particle.vy *= 0.999;

            // Wrap around canvas edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            // 5. Remove "dead" temporary particles
            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.save();

            ctx.shadowColor = CONFIG.particleColor;
            ctx.shadowBlur = CONFIG.glowIntensity * particle.glowMultiplier;

            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = CONFIG.particleColor;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        animationFrameId = requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
}