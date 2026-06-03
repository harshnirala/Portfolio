/* ==========================================================================
   SYSTEM PRELOADER & INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const progress = document.getElementById("preloader-progress");
    const statusText = preloader.querySelector(".loading-status");
    
    let loadValue = 0;
    const progressInterval = setInterval(() => {
        loadValue += Math.floor(Math.random() * 15) + 5;
        if (loadValue >= 100) {
            loadValue = 100;
            clearInterval(progressInterval);
            
            // Trigger Fadeout
            setTimeout(() => {
                preloader.classList.add("fade-out");
                // Initialize animations and canvas
                initCanvas();
                initTypewriter();
                initScrollReveal();
            }, 400);
        }
        progress.style.width = loadValue + "%";
        if (loadValue > 80) {
            statusText.innerText = "Connecting UI Modules...";
        } else if (loadValue > 40) {
            statusText.innerText = "Loading Neural Networks...";
        }
    }, 80);
});


/* ==========================================================================
   DYNAMIC BACKGROUND CANVAS (INTERACTIVE NEBULA DUST)
   ========================================================================== */
let canvas, ctx;
let particles = [];
const particleCount = 75;
const mouse = { x: null, y: null, radius: 150 };

function initCanvas() {
    canvas = document.getElementById("bg-canvas");
    ctx = canvas.getContext("2d");
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Track mouse coordinates
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // Clear mouse tracking on leave
    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Generate particles
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2.5 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        
        // Curated colors matching the theme: purple (HSL 275) or cyan (HSL 185)
        const isCyan = Math.random() > 0.5;
        const hue = isCyan ? 185 : 275;
        const alpha = Math.random() * 0.5 + 0.15;
        
        particles.push({
            x, y, radius, vx, vy, hue, alpha, baseAlpha: alpha
        });
    }
    
    animateCanvas();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        
        // Rebound boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
        
        // Mouse interaction (repel effect)
        if (mouse.x !== null && mouse.y !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                p.x += Math.cos(angle) * force * 1.5;
                p.y += Math.sin(angle) * force * 1.5;
                p.alpha = Math.min(1.0, p.baseAlpha + force * 0.5);
            } else {
                p.alpha = p.baseAlpha;
            }
        }
        
        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${p.alpha})`;
        ctx.shadowBlur = p.radius * 2.5;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 65%, ${p.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
    }
    
    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 120) {
                const alpha = (1 - dist / 120) * 0.08;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateCanvas);
}


/* ==========================================================================
   ROLE TYPEWRITER EFFECT
   ========================================================================== */
const roles = [
    "Full Stack Developer",
    "Computer Science Student",
    "AI Solution Builder",
    "Backend Architect",
    "Chief Problem Solver"
];
let currentRoleIndex = 0;
let currentText = "";
let isDeleting = false;
let typeSpeed = 100;

function initTypewriter() {
    const target = document.getElementById("typed-role");
    if (!target) return;
    
    const fullRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        currentText = fullRole.substring(0, currentText.length - 1);
        typeSpeed = 40;
    } else {
        currentText = fullRole.substring(0, currentText.length + 1);
        typeSpeed = 100;
    }
    
    target.innerText = currentText;
    
    if (!isDeleting && currentText === fullRole) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of text
    } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typeSpeed = 400; // Pause before writing next
    }
    
    setTimeout(initTypewriter, typeSpeed);
}


/* ==========================================================================
   SCROLL REVEAL & NAVIGATION HIGHLIGHTS
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
            }
        });
    }, { threshold: 0.12 });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Highlight nav link on scroll
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentSectionId = sec.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}


/* ==========================================================================
   MOBILE NAVIGATION DRAWER
   ========================================================================== */
const menuToggleBtn = document.getElementById("menu-toggle-btn");
const navMenu = document.getElementById("nav-menu");
const navLinksList = document.querySelectorAll(".nav-link");

menuToggleBtn.addEventListener("click", () => {
    menuToggleBtn.classList.toggle("open");
    navMenu.classList.toggle("open");
});

navLinksList.forEach(link => {
    link.addEventListener("click", () => {
        menuToggleBtn.classList.remove("open");
        navMenu.classList.remove("open");
    });
});


/* ==========================================================================
   PROJECT DETAILS MODALS DATABASE & HANDLERS
   ========================================================================== */
const projectsData = {
    "1": {
        name: "TestIQ",
        desc: "TestIQ is an automated command-line RAG (Retrieval-Augmented Generation) pipeline built to index, analyze, and generate comprehensive unit tests for local codebases without manual developer input.",
        features: [
            "Leverages LangChain and ChromaDB vector store to ingest codebase layouts and index documentation contexts.",
            "Incorporates Tree-sitter for detailed Abstract Syntax Tree (AST) parsing of source code scopes.",
            "Orchestrates a self-correcting Ollama feedback loop running LLMs locally to check compilations and errors.",
            "Ensures structural verification yielding 60 passing tests across 4 build phases."
        ],
        tech: ["LangChain", "ChromaDB", "Ollama", "Tree-sitter", "Python"],
        github: "https://github.com/harshnirala/testiq",
        demo: ""
    },
    "2": {
        name: "VidyaMarg",
        desc: "VidyaMarg is a highly interactive full-stack learning path engine that transforms simple learning goals into robust, graphical roadmaps styled as structured Directed Acyclic Graphs (DAGs).",
        features: [
            "Deploys LLaMA 3.1 70B via Groq API for rapid, specialized roadmap output structural parsing.",
            "Generates layout graphs in NetworkX algorithm structures to align modules sequentially.",
            "Displays interactive, zoomable learning path nodes through React Flow front-end graphs.",
            "Saves user progress, path tokens, and user credentials on a Supabase backend server."
        ],
        tech: ["Next.js", "FastAPI", "Groq", "NetworkX", "Supabase", "React Flow"],
        github: "https://github.com/harshnirala/vidyamarg",
        demo: "https://vidya-marg.vercel.app/"
    },
    "3": {
        name: "Curely",
        desc: "Curely is a real-time conversational voice AI assistant tailored to support patients with primary clinical inquiries, triage notes, and general health question answering.",
        features: [
            "Implements direct voice call channels using VAPI speech infrastructure pipelines.",
            "Converts patient voice files instantaneously using Whisper audio transcriptions.",
            "Feeds transcripts into Google Gemini APIs to output reliable, structured medical answers.",
            "Optimizes inference expenses to just $0.08/minute by using target OpenRouter request routers."
        ],
        tech: ["VAPI", "OpenAI Whisper", "Gemini", "OpenRouter", "React"],
        github: "https://github.com/harshnirala/curely",
        demo: "https://curely.vercel.app/"
    },
    "4": {
        name: "Orphia",
        desc: "Orphia is a fully responsive AI-powered audio generation website that generates custom music clips matching natural language style prompts.",
        features: [
            "Leverages PyTorch deep learning models (RNN/LSTM architectures) for raw audio wave synthesis.",
            "Provides a modern dashboard interface built in Next.js and TypeScript.",
            "Allows setting tracks parameters, genre tags, and track lengths prior to synthesis.",
            "Fully deployed and optimized to generate music instantly."
        ],
        tech: ["PyTorch", "RNN/LSTM", "Next.js", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/harshnirala/Orphia-AI-Music-Generator",
        demo: "https://orphia.vercel.app/"
    },
    "5": {
        name: "CppTestGenAI",
        desc: "CppTestGenAI is a compilation-free static analysis tool that scans C++ files and predicts logical test cases, potential boundaries, and unit coverage parameters.",
        features: [
            "Scans raw C++ sources using Python files scanners without needing makefiles or compilation.",
            "Feeds structural contexts to CodeLlama 7B parameters running locally under Ollama.",
            "Predicts corner cases, inputs, and validation assertions mapped per method.",
            "Outputs persistent, cached file analysis logs in Markdown, YAML, and terminal tables."
        ],
        tech: ["Python", "Ollama", "CodeLlama", "YAML", "Static Analysis"],
        github: "https://github.com/harshnirala/CppTestGenAI",
        demo: ""
    },
    "6": {
        name: "Ideascribe",
        desc: "Ideascribe is a premium, collaborative note-taking and documentation platform engineered for development teams to brainstorm, draft, and track documents in real time.",
        features: [
            "Integrates the rich-text BlockNote block editor interface for nesting markdown components.",
            "Uses Convex database live state bindings for instant document synchronization.",
            "Handles developer profile credentials and login pipelines safely using Clerk.",
            "Saves image assets and attachment streams onto Edge Store asset containers."
        ],
        tech: ["Next.js", "Convex", "Clerk", "BlockNote", "Edge Store"],
        github: "https://github.com/harshnirala/ideascribe",
        demo: "https://ideascribe.vercel.app/"
    }
};

const modalOverlay = document.getElementById("project-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const detailBtns = document.querySelectorAll(".btn-card-details");

// Elements in Modal to populate
const modalProjName = document.getElementById("modal-project-name");
const modalProjDesc = document.getElementById("modal-project-desc");
const modalFeaturesList = document.getElementById("modal-features-list");
const modalProjTech = document.getElementById("modal-project-tech");
const modalGithubLink = document.getElementById("modal-github-link");
const modalDemoLink = document.getElementById("modal-demo-link");

detailBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const projId = btn.getAttribute("data-project-id");
        const data = projectsData[projId];
        if (!data) return;
        
        // Populate modal data
        modalProjName.innerText = data.name;
        modalProjDesc.innerText = data.desc;
        
        // Render features
        modalFeaturesList.innerHTML = "";
        data.features.forEach(f => {
            const li = document.createElement("li");
            li.innerText = f;
            modalFeaturesList.appendChild(li);
        });
        
        // Render tech tags
        modalProjTech.innerHTML = "";
        data.tech.forEach(t => {
            const span = document.createElement("span");
            span.innerText = t;
            modalProjTech.appendChild(span);
        });
        
        // Render links
        modalGithubLink.href = data.github;
        
        if (data.demo) {
            modalDemoLink.href = data.demo;
            modalDemoLink.style.display = "inline-flex";
        } else {
            modalDemoLink.style.display = "none";
        }
        
        // Open modal
        modalOverlay.classList.add("open");
        modalOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // lock page scroll
    });
});

function closeModal() {
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // unlock scroll
}

modalCloseBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal on Escape key press
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
        closeModal();
    }
});


/* ==========================================================================
   CONTACT FORM DISPATCHER
   ========================================================================== */
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");
const submitBtn = document.getElementById("btn-submit");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Visual loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    
    // Grab input values
    const name = document.getElementById("input-name").value.trim();
    const email = document.getElementById("input-email").value.trim();
    
    // Simulate API call dispatch
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // Show success state
        formFeedback.className = "form-feedback-message success";
        formFeedback.innerText = `Thank you, ${name}! Your message has been sent successfully. Harsh will get back to you shortly at ${email}.`;
        
        // Reset form inputs
        contactForm.reset();
        
        // Fade out message after 6 seconds
        setTimeout(() => {
            formFeedback.style.display = "none";
        }, 6000);
        
    }, 1500);
});
