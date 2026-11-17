/**
 * KRISH TRIVEDI — PREMIUM AI DEVELOPER PORTFOLIO ENGINE
 * Neural Canvas, Custom Cursor, GitHub API, AI Lab Simulator, and Interactive Audio
 */

document.addEventListener('DOMContentLoaded', () => {

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ----------------------------------------------------
   * 1. Interactive Neural Network Particle Canvas
   * ---------------------------------------------------- */
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, maxDist: 140 };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.8 + 1;
        this.color = Math.random() > 0.4 ? '#00e5ff' : '#8b5cf6';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse repulsion/attraction
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.maxDist) {
            const force = (mouse.maxDist - dist) / mouse.maxDist;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 18000), 65);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting neural lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 110) * 0.22;
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ----------------------------------------------------
   * 2. Custom Follower Cursor (Meet Gajjar Style)
   * ---------------------------------------------------- */
  const cursorDot = document.createElement('div');
  const cursorRing = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  cursorRing.className = 'custom-cursor-ring';
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  function attachCursorInteractions() {
    const interactives = document.querySelectorAll('a, button, input, select, textarea, .card-architect, .filter-btn, .copy-btn');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        playAudioFeedback(440, 0.03, 'sine');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }
  attachCursorInteractions();

  /* ----------------------------------------------------
   * 3. Subtle Futuristic Audio Synthesizer (Web Audio API)
   * ---------------------------------------------------- */
  let audioCtx = null;
  let audioEnabled = localStorage.getItem('kt_audio') === 'true';

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  function updateAudioButton() {
    if (audioToggleBtn) {
      if (audioEnabled) {
        audioToggleBtn.classList.add('active');
        audioToggleBtn.innerHTML = '<i data-lucide="volume-2" class="w-3.5 h-3.5"></i><span>AUDIO: ON</span>';
      } else {
        audioToggleBtn.classList.remove('active');
        audioToggleBtn.innerHTML = '<i data-lucide="volume-x" class="w-3.5 h-3.5"></i><span>AUDIO: OFF</span>';
      }
      if (window.lucide) window.lucide.createIcons();
    }
  }
  updateAudioButton();

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      localStorage.setItem('kt_audio', audioEnabled ? 'true' : 'false');
      if (audioEnabled && !audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      updateAudioButton();
      playAudioFeedback(600, 0.05, 'triangle');
      showToast(audioEnabled ? 'Futuristic UI Audio Activated' : 'UI Audio Muted');
    });
  }

  function playAudioFeedback(freq = 520, duration = 0.04, type = 'sine') {
    if (!audioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  /* ----------------------------------------------------
   * 4. Theme Toggle (Dark / Light Mode)
   * ---------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;
  const savedTheme = localStorage.getItem('kt_theme') || 'dark';

  if (savedTheme === 'light') {
    htmlRoot.classList.remove('dark');
  } else {
    htmlRoot.classList.add('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlRoot.classList.contains('dark');
      if (isDark) {
        htmlRoot.classList.remove('dark');
        localStorage.setItem('kt_theme', 'light');
        showToast('Switched to Light Mode');
      } else {
        htmlRoot.classList.add('dark');
        localStorage.setItem('kt_theme', 'dark');
        showToast('Switched to Dark Mode');
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  /* ----------------------------------------------------
   * 5. Fullscreen Overlay Menu (Meet Gajjar Style)
   * ---------------------------------------------------- */
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const fullscreenMenu = document.getElementById('fullscreenMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');

  function openMenu() {
    if (fullscreenMenu) {
      fullscreenMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      playAudioFeedback(500, 0.06, 'sine');
    }
  }

  function closeMenu() {
    if (fullscreenMenu) {
      fullscreenMenu.classList.remove('open');
      document.body.style.overflow = 'auto';
      playAudioFeedback(350, 0.04, 'sine');
    }
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeResume();
    }
  });

  /* ----------------------------------------------------
   * 6. Interactive Project Category Filtering
   * ---------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      playAudioFeedback(650, 0.04, 'triangle');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || card.classList.contains(`cat-${filter}`)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ----------------------------------------------------
   * 7. AI Lab Interactive Terminal Simulator
   * ---------------------------------------------------- */
  const aiTerminalInput = document.getElementById('aiTerminalInput');
  const aiTerminalLog = document.getElementById('aiTerminalLog');
  const terminalRunBtn = document.getElementById('terminalRunBtn');
  const quickCommandChips = document.querySelectorAll('.cmd-chip');

  const simulatedResponses = {
    'kisanmitra --diagnose': `[KisanMitra SIH-2025 AI Engine]
Analyzing agricultural input...
✓ Image classification: Wheat leaf spot detected (Puccinia recondita)
✓ Severity: Early stage (18% foliage coverage)
✓ Recommended Action: Apply Propiconazole 25% EC @ 1ml/L water
✓ Voice prompt dispatched in Gujarati & Hindi.`,
    
    'hpad --status': `[HPAD Travel on Render]
Target: https://hpad-travel-jyxx.onrender.com/
GitHub: https://github.com/Krishhtrivedi/hpad-travel
✓ Status: 200 OK (LIVE ON RENDER)
✓ SSL Handshake: Active & Encrypted
✓ Endpoints: /employee/dashboard, /admin/trips, /superadmin/control
✓ Database: Synchronized (PostgreSQL / SQLite)`,
    
    'whiteswan --status': `[White Swan Holidays on Render]
Target: https://whiteswanholidays.onrender.com/
GitHub: https://github.com/Krishhtrivedi/whiteswanholidays
✓ Status: 200 OK (LIVE ON RENDER)
✓ SSL Handshake: Active & Encrypted (Cloudflare Edge)
✓ Runtime: Static Multi-Page Web App
✓ Deployment: Continuous Auto-Deploy from GitHub`,
    
    'ai-agent --run triage': `[AI Automation Pipeline]
Simulating client inquiry parsing...
Input: "Need automated document categorization and M365 Outlook mail flow rules"
✓ Extracted Intent: Business Process Automation + IT Infrastructure
✓ Suggested Engine: Python Flask + OpenAI Structured API
✓ Priority: HIGH · Direct dispatch to krish.trivedi28@gmail.com`,

    'help': `Available Commands in Krish Trivedi AI Lab:
  • kisanmitra --diagnose    : Test SIH 2025 crop pathology classifier
  • hpad --status            : Query live Render production deployment (HPAD Travel)
  • whiteswan --status       : Query live Render production deployment (White Swan Holidays)
  • ai-agent --run triage    : Run AI workflow automation triage
  • firewalls --check        : Verify perimeter defense & port rules
  • clear                    : Clear console log`
  };

  function executeTerminalCommand(cmdText) {
    if (!aiTerminalLog) return;
    const cleanCmd = cmdText.trim();
    if (!cleanCmd) return;

    // Log the user's command
    const cmdLine = document.createElement('div');
    cmdLine.className = 'text-cyan-400 font-mono mt-2';
    cmdLine.textContent = `krish@ai-lab:~$ ${cleanCmd}`;
    aiTerminalLog.appendChild(cmdLine);

    if (cleanCmd.toLowerCase() === 'clear') {
      aiTerminalLog.innerHTML = `<div class="text-[#79869c] font-mono">Krish Trivedi AI Lab Terminal v2.4 initialized. Type 'help' for instructions.</div>`;
      if (aiTerminalInput) aiTerminalInput.value = '';
      return;
    }

    let response = "Command not recognized. Type 'help' to view available AI laboratory tools.";
    for (const [key, val] of Object.entries(simulatedResponses)) {
      if (cleanCmd.toLowerCase().startsWith(key.toLowerCase())) {
        response = val;
        break;
      }
    }

    const respLine = document.createElement('pre');
    respLine.className = 'text-emerald-400 font-mono text-xs whitespace-pre-wrap mt-1 pb-2 border-b border-white/[0.05]';
    respLine.textContent = response;
    aiTerminalLog.appendChild(respLine);

    aiTerminalLog.scrollTop = aiTerminalLog.scrollHeight;
    if (aiTerminalInput) aiTerminalInput.value = '';
    playAudioFeedback(720, 0.05, 'triangle');
  }

  if (terminalRunBtn && aiTerminalInput) {
    terminalRunBtn.addEventListener('click', () => {
      executeTerminalCommand(aiTerminalInput.value);
    });
    aiTerminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeTerminalCommand(aiTerminalInput.value);
      }
    });
  }

  quickCommandChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        if (aiTerminalInput) aiTerminalInput.value = cmd;
        executeTerminalCommand(cmd);
      }
    });
  });

  /* ----------------------------------------------------
   * 8. GitHub API Integration Module
   * ---------------------------------------------------- */
  const githubContainer = document.getElementById('githubReposGrid');
  const GITHUB_USERNAME = window.KRISH_CONFIG?.githubUsername || 'Krishhtrivedi';

  async function fetchGitHubData() {
    if (!githubContainer) return;

    try {
      // Fetch public repos from GitHub
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
      if (!res.ok) throw new Error('API Rate limit or username not found');
      const repos = await res.json();

      if (Array.isArray(repos) && repos.length > 0) {
        githubContainer.innerHTML = '';
        repos.forEach((repo) => {
          const card = document.createElement('a');
          card.href = repo.html_url;
          card.target = '_blank';
          card.rel = 'noopener noreferrer';
          card.className = 'card-architect p-6 block group hover:border-[#00e5ff] transition-all';
          card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-mono text-[#00e5ff] flex items-center gap-1.5">
                <i data-lucide="git-branch" class="w-3.5 h-3.5"></i>
                <span>${repo.language || 'Python'}</span>
              </span>
              <span class="text-xs font-mono text-amber-400 flex items-center gap-1">
                <i data-lucide="star" class="w-3.5 h-3.5"></i>
                <span>${repo.stargazers_count}</span>
              </span>
            </div>
            <h4 class="text-lg font-display font-bold text-white group-hover:text-[#00e5ff] transition-colors mb-2">${repo.name}</h4>
            <p class="text-xs text-[#79869c] leading-relaxed mb-4 line-clamp-2">${repo.description || 'AI & systems engineering repository.'}</p>
            <div class="flex items-center justify-between text-[11px] font-mono text-[#445166] pt-3 border-t border-white/[0.06]">
              <span>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
              <span class="text-[#00e5ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          `;
          githubContainer.appendChild(card);
        });
        if (window.lucide) window.lucide.createIcons();
        attachCursorInteractions();
      }
    } catch (err) {
      // Graceful fallback to real verified projects if GitHub API hits rate limit or offline
      console.log('GitHub API offline or rate-limited; displaying cached projects.');
    }
  }
  fetchGitHubData();

  /* ----------------------------------------------------
   * 9. Resume Modal & Print Functionality
   * ---------------------------------------------------- */
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      playAudioFeedback(550, 0.05, 'sine');
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ----------------------------------------------------
   * 10. One-Click Copy & Contact Form Logic
   * ---------------------------------------------------- */
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: "${textToCopy}"`);
          playAudioFeedback(880, 0.06, 'sine');
        }).catch(() => {
          showToast('Failed to copy. Please copy manually.');
        });
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  const copyMessageBtn = document.getElementById('copyMessageBtn');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('messageSubject').value.trim();
      const body = document.getElementById('messageBody').value.trim();

      const fullBody = `Hello Krish,%0D%0A%0D%0AMy name is ${encodeURIComponent(name)} (${encodeURIComponent(email)}).%0D%0A%0D%0A${encodeURIComponent(body)}`;
      const mailtoUrl = `mailto:krish.trivedi28@gmail.com?subject=${encodeURIComponent(subject)}&body=${fullBody}`;

      window.location.href = mailtoUrl;

      if (formStatus) {
        formStatus.textContent = 'Launching email client... You can also use "Copy Message Details" below!';
        formStatus.classList.remove('hidden');
      }
      showToast('Opening native email client...');
      playAudioFeedback(750, 0.08, 'triangle');
    });
  }

  if (copyMessageBtn) {
    copyMessageBtn.addEventListener('click', () => {
      const name = document.getElementById('senderName')?.value.trim() || 'Collaborator';
      const email = document.getElementById('senderEmail')?.value.trim() || 'N/A';
      const subject = document.getElementById('messageSubject')?.value.trim() || 'AI Project Collaboration';
      const body = document.getElementById('messageBody')?.value.trim() || 'Project discussion details';

      const compiledText = `To: Krish Trivedi (krish.trivedi28@gmail.com)\nFrom: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${body}`;

      navigator.clipboard.writeText(compiledText).then(() => {
        showToast('Message details copied to clipboard!');
        playAudioFeedback(880, 0.06, 'sine');
      });
    });
  }

  /* ----------------------------------------------------
   * 11. Toast Box Helper
   * ---------------------------------------------------- */
  let toastTimeout;
  function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = msg;
    toast.classList.remove('hidden');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  }

  /* ----------------------------------------------------
   * 12. Vertical Side Rail Indicator Synchronization
   * ---------------------------------------------------- */
  const sideRailThumb = document.querySelector('.side-rail-thumb');
  window.addEventListener('scroll', () => {
    if (sideRailThumb) {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      sideRailThumb.style.top = `${Math.min(scrolled * 0.65, 65)}%`;
    }
  });

});
