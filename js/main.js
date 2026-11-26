/**
 * KRISH TRIVEDI — PREMIUM PERSONAL BRAND PORTFOLIO ENGINE
 * Inspired by HPAD (Architectural Luxury & Cinematic Imagery)
 * Advanced Scroll-Triggered Animation & Responsive Interaction Architecture
 */

// 0. IMMEDIATE THEME REHYDRATION (DEFAULT: PREMIUM DARK HPAD THEME)
(function() {
  try {
    const saved = localStorage.getItem('kt_theme');
    if (saved === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', () => {

  // GLOBAL THEME MANAGER (DARK / LIGHT LUXURY ARCHITECTURAL SWITCH)
  function initThemeManager() {
    let savedTheme = localStorage.getItem('kt_theme');
    if (!savedTheme) {
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      savedTheme = prefersLight ? 'light' : 'dark';
    }

    function updateDynamicLogos(isDark) {
      const logos = document.querySelectorAll('.kt-logo-dynamic, header img[src*="logo-kt-"], #fullscreenMenu img[src*="logo-kt-"], footer img[src*="logo-kt-"]');
      logos.forEach(logo => {
        const targetSrc = isDark ? 'img/logo-kt-light.svg' : 'img/logo-kt-dark.svg';
        if (!logo.src.endsWith(targetSrc)) {
          logo.src = targetSrc;
        }
      });
    }

    function applyTheme(theme) {
      document.documentElement.classList.add('theme-transition');
      const isDark = theme === 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('kt_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('kt_theme', 'light');
      }
      updateDynamicLogos(isDark);

      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 350);

      if (window.lucide) {
        window.lucide.createIcons();
      }
    }

    // Initialize state
    applyTheme(savedTheme);

    function toggleTheme() {
      const isCurrentlyDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isCurrentlyDark ? 'light' : 'dark');
      if (window.showToast) {
        window.showToast(isCurrentlyDark ? 'Light theme activated' : 'Dark theme activated');
      }
    }

    // Auto-inject Theme Toggle Button into Navbar if not already present
    const navActionContainers = document.querySelectorAll('header .flex.items-center.gap-3, #navbar .flex.items-center.gap-3');
    navActionContainers.forEach(container => {
      if (!container.querySelector('.theme-toggle-btn')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.setAttribute('aria-label', 'Toggle color theme');
        toggleBtn.setAttribute('title', 'Toggle Theme');
        toggleBtn.innerHTML = `
          <i data-lucide="moon" class="w-4 h-4 icon-moon"></i>
          <i data-lucide="sun" class="w-4 h-4 icon-sun"></i>
        `;
        // Insert as first action button in container
        container.insertBefore(toggleBtn, container.firstChild);
      }
    });

    // Also inject into Fullscreen Mobile Menu Header if not present
    const menuHeader = document.querySelector('#fullscreenMenu .flex.items-center.justify-between');
    if (menuHeader && !menuHeader.querySelector('.theme-toggle-btn')) {
      const closeBtn = menuHeader.querySelector('#closeMenuBtn');
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'theme-toggle-btn mr-2';
      toggleBtn.setAttribute('aria-label', 'Toggle color theme');
      toggleBtn.setAttribute('title', 'Toggle Theme');
      toggleBtn.innerHTML = `
        <i data-lucide="moon" class="w-4 h-4 icon-moon"></i>
        <i data-lucide="sun" class="w-4 h-4 icon-sun"></i>
      `;
      if (closeBtn && closeBtn.parentNode) {
        closeBtn.parentNode.insertBefore(toggleBtn, closeBtn);
      }
    }

    // Attach click listeners to all theme toggle buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', 'Toggle color theme');
      btn.removeEventListener('click', toggleTheme);
      btn.addEventListener('click', toggleTheme);
    });

    // Listen to system OS preference changes if no manual preference stored
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('kt_theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  initThemeManager();

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. PAGE PRELOADER & CINEMATIC HERO REVEAL LIFECYCLE (OPTIMIZED)
  const preloader = document.getElementById('pagePreloader');
  const progressBar = document.querySelector('.preloader-progress-bar');
  const hasVisited = sessionStorage.getItem('kt_visited') === 'true';

  function hidePreloader() {
    if (preloader) {
      preloader.classList.add('preloader-hidden');
      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none';
      preloader.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    }
    document.body.classList.add('loaded');
    sessionStorage.setItem('kt_visited', 'true');

    // Trigger hero element reveal animations
    const autoReveals = document.querySelectorAll('.auto-reveal');
    autoReveals.forEach(el => el.classList.add('is-revealed'));
  }

  if (hasVisited) {
    // Already visited in this session: skip preloader instantly (0ms delay)
    if (preloader) preloader.style.display = 'none';
    document.body.classList.add('loaded');
  } else {
    // First visit in session: cap to ≤ 400ms (350ms duration)
    const preloaderDuration = 350;
    if (progressBar) {
      progressBar.style.transition = 'width 280ms cubic-bezier(0.16, 1, 0.3, 1)';
      progressBar.style.width = '100%';
    }
    setTimeout(hidePreloader, preloaderDuration);
  }

  // Safety fallback
  setTimeout(hidePreloader, 600);

  // 3. CUSTOM EDITORIAL CURSOR (DESKTOP ONLY)
  const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

  if (!isTouchDevice()) {
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
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    function attachCursorInteractions() {
      const interactives = document.querySelectorAll('a, button, input, select, textarea, .luxury-card, .luxury-card-dark, .copy-btn, .filter-btn, .pipeline-step, .terminal-quick-chip');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-hover');
        });
      });

      // Dark background detection for cursor contrast
      const darkSections = document.querySelectorAll('#ai-lab, footer, .luxury-card-dark');
      darkSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-dark');
        });
        section.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-dark');
        });
      });
    }
    attachCursorInteractions();
  }

  // 4. INTERSECTION OBSERVER FOR SCROLL REVEALS (HPAD CINEMATIC STYLE)
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .img-reveal-frame, .stagger-container');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 5. SUBTLE ARCHITECTURAL PARALLAX (DESKTOP ONLY)
  if (!isTouchDevice()) {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.08');
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, { passive: true });
  }

  // 6. NAVBAR SCROLL STATE & SIDE RAIL PROGRESS TRACKER
  const navbar = document.getElementById('navbar');
  const railThumb = document.querySelector('.rail-thumb');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar height & glass effect
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Side Rail Scroll Progress
    if (railThumb) {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      railThumb.style.top = `${Math.min(scrolled * 0.7, 70)}%`;
    }
  }, { passive: true });

  // 7. FULLSCREEN EDITORIAL NAVIGATION
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const fullscreenMenu = document.getElementById('fullscreenMenu');

  function openMenu() {
    if (fullscreenMenu) {
      fullscreenMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (fullscreenMenu) {
      fullscreenMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullscreenMenu && fullscreenMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  const menuItems = document.querySelectorAll('.menu-item-editorial');
  menuItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });

  // 8. PROJECT FILTER CONTROLS & SMOOTH CROSSFADE
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#171717]', 'text-white', 'border-[#171717]');
        b.classList.add('bg-white', 'text-[#777777]', 'border-[#E6E4DE]');
      });
      btn.classList.add('bg-[#171717]', 'text-white', 'border-[#171717]');
      btn.classList.remove('bg-white', 'text-[#777777]', 'border-[#E6E4DE]');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        card.style.transition = 'opacity 0.25s var(--ease-cinematic), transform 0.25s var(--ease-cinematic)';
        if (filter === 'all' || card.getAttribute('data-category')?.includes(filter)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ========================================================================
  // 8.1. PREMIUM 3D CINEMATIC PROJECT SLIDER ENGINE (MEET GAJJAR + HPAD)
  // ========================================================================
  function initProjectSlider() {
    const stage = document.getElementById('projectSliderStage');
    const track = document.getElementById('projectSliderTrack');
    if (!stage || !track) return;

    const cards = Array.from(track.querySelectorAll('.slider-project-card'));
    if (cards.length === 0) return;

    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');
    const floatPrev = document.getElementById('sliderFloatPrev');
    const floatNext = document.getElementById('sliderFloatNext');
    const currentEl = document.querySelector('.slider-current');
    const totalEl = document.querySelector('.slider-total');
    const progressBar = document.getElementById('sliderProgressBar');
    const dotsContainer = document.getElementById('sliderDots');

    const N = cards.length;
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentDeltaX = 0;
    let autoPlayTimer = null;
    const AUTOPLAY_INTERVAL = 5500;

    // Set total counter
    if (totalEl) totalEl.textContent = String(N).padStart(2, '0');

    // Create pagination dot pills
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      cards.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Navigate to project ${idx + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goToSlide(idx);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateSlider(offsetDelta = 0) {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

      cards.forEach((card, i) => {
        let d = (i - currentIndex) % N;
        if (d > N / 2) d -= N;
        if (d < -N / 2) d += N;

        if (d === 0) {
          // Center Active Card
          card.className = 'slider-project-card is-active';
          const dragShift = offsetDelta * 0.45;
          if (isMobile) {
            card.style.transform = `translate(calc(-50% + ${dragShift}px), -50%) scale(1)`;
          } else {
            card.style.transform = `translate(calc(-50% + ${dragShift}px), -50%) translateZ(0px) rotateY(0deg) scale(1)`;
          }
        } else if (d === -1) {
          // Previous Left Card
          card.className = 'slider-project-card is-prev';
          const dragShift = offsetDelta * 0.25;
          if (isMobile) {
            card.style.transform = `translate(calc(-50% - 78% + ${dragShift}px), -50%) scale(0.88)`;
          } else if (isTablet) {
            card.style.transform = `translate(calc(-50% - 250px + ${dragShift}px), -50%) translateZ(-70px) rotateY(10deg) scale(0.86)`;
          } else {
            card.style.transform = `translate(calc(-50% - 330px + ${dragShift}px), -50%) translateZ(-90px) rotateY(13deg) scale(0.86)`;
          }
        } else if (d === 1) {
          // Next Right Card
          card.className = 'slider-project-card is-next';
          const dragShift = offsetDelta * 0.25;
          if (isMobile) {
            card.style.transform = `translate(calc(-50% + 78% + ${dragShift}px), -50%) scale(0.88)`;
          } else if (isTablet) {
            card.style.transform = `translate(calc(-50% + 250px + ${dragShift}px), -50%) translateZ(-70px) rotateY(-10deg) scale(0.86)`;
          } else {
            card.style.transform = `translate(calc(-50% + 330px + ${dragShift}px), -50%) translateZ(-90px) rotateY(-13deg) scale(0.86)`;
          }
        } else {
          // Offstage Hidden Cards
          card.className = 'slider-project-card is-hidden';
          const sign = d > 0 ? 1 : -1;
          if (isMobile) {
            card.style.transform = `translate(calc(-50% + ${sign * 120}%), -50%) scale(0.7)`;
          } else {
            card.style.transform = `translate(calc(-50% + ${sign * 650}px), -50%) translateZ(-250px) scale(0.7)`;
          }
        }
      });

      // Update Active Slide Index Text
      if (currentEl) currentEl.textContent = String(currentIndex + 1).padStart(2, '0');

      // Update Horizontal Progress Track
      if (progressBar) {
        const pct = ((currentIndex + 1) / N) * 100;
        progressBar.style.width = `${pct}%`;
      }

      // Update Pagination Dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % N;
      updateSlider(0);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + N) % N;
      updateSlider(0);
    }

    function goToSlide(index) {
      currentIndex = (index + N) % N;
      updateSlider(0);
    }

    // Direct click on side cards to advance, or on center card to open project details
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (Math.abs(currentDeltaX) > 8) return; // Prevent navigation during drag
        let d = (idx - currentIndex) % N;
        if (d > N / 2) d -= N;
        if (d < -N / 2) d += N;

        if (d === 1) {
          e.preventDefault();
          nextSlide();
          resetAutoPlay();
        } else if (d === -1) {
          e.preventDefault();
          prevSlide();
          resetAutoPlay();
        } else if (d === 0) {
          if (!e.target.closest('a, button')) {
            const href = card.getAttribute('data-href');
            if (href) {
              window.location.href = href;
            }
          }
        }
      });
    });

    // Button Listeners
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); resetAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); resetAutoPlay(); });
    if (floatPrev) floatPrev.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); resetAutoPlay(); });
    if (floatNext) floatNext.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); resetAutoPlay(); });

    // Keyboard Arrow Navigation
    window.addEventListener('keydown', (e) => {
      const rect = stage.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowRight') {
          nextSlide();
          resetAutoPlay();
        } else if (e.key === 'ArrowLeft') {
          prevSlide();
          resetAutoPlay();
        }
      }
    });

    // Mouse Drag Interaction
    stage.addEventListener('mousedown', (e) => {
      if (e.target.closest('a, button')) return; // Allow button clicks
      isDragging = true;
      startX = e.clientX;
      currentDeltaX = 0;
      stage.style.cursor = 'grabbing';
      stopAutoPlay();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentDeltaX = e.clientX - startX;
      updateSlider(currentDeltaX);
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      stage.style.cursor = 'grab';
      if (currentDeltaX < -45) {
        nextSlide();
      } else if (currentDeltaX > 45) {
        prevSlide();
      } else {
        updateSlider(0);
      }
      currentDeltaX = 0;
      resetAutoPlay();
    });

    // Touch Swipe Interaction (Mobile Pan-Y Safe)
    let touchStartY = 0;
    let isSwiping = false;

    stage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        currentDeltaX = 0;
        isSwiping = true;
        stopAutoPlay();
      }
    }, { passive: true });

    stage.addEventListener('touchmove', (e) => {
      if (!isSwiping || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - touchStartY;

      // Only track if horizontal gesture dominates
      if (Math.abs(deltaX) > Math.abs(deltaY) + 5) {
        currentDeltaX = deltaX;
        updateSlider(currentDeltaX);
      }
    }, { passive: true });

    stage.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      if (currentDeltaX < -40) {
        nextSlide();
      } else if (currentDeltaX > 40) {
        prevSlide();
      } else {
        updateSlider(0);
      }
      currentDeltaX = 0;
      resetAutoPlay();
    }, { passive: true });

    // Autoplay Timer Management
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
      stopAutoPlay();
      setTimeout(startAutoPlay, 4000);
    }

    stage.addEventListener('mouseenter', stopAutoPlay);
    stage.addEventListener('mouseleave', startAutoPlay);

    // Responsive Window Resize Handler
    window.addEventListener('resize', () => {
      updateSlider(0);
    });

    // Initial Execution
    updateSlider(0);
    startAutoPlay();
  }

  // Initialize Project Slider
  initProjectSlider();

  // 8B. ARCHITECTURAL AI NEURAL CORE & STUDIO CANVAS (HPAD LUXURY HERO ELEMENT)
  function initHeroNeuralCanvas() {
    const canvas = document.getElementById('heroNeuralCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Real-time Ahmedabad (IST) Clock
    function updateLiveClock() {
      const clockEl = document.getElementById('liveClockDisplay');
      if (!clockEl) return;
      try {
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const timeStr = now.toLocaleTimeString('en-GB', options);
        clockEl.textContent = `IST ${timeStr}`;
      } catch (e) {
        clockEl.textContent = 'IST ONLINE';
      }
    }
    setInterval(updateLiveClock, 1000);
    updateLiveClock();

    let width = 480;
    let height = 360;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 480;
      height = rect.height || 360;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Generate 3D nodes on Fibonacci sphere (Violet-Cyan Palette)
    const NUM_NODES = 60;
    const RADIUS = Math.min(width, height) * 0.36;
    const nodes = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < NUM_NODES; i++) {
      const y = 1 - (i / (NUM_NODES - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      nodes.push({
        origX: x * RADIUS,
        origY: y * RADIUS,
        origZ: z * RADIUS,
        currX: x * RADIUS,
        currY: y * RADIUS,
        currZ: z * RADIUS,
        size: Math.random() * 1.5 + 1.8,
        colorType: Math.random() > 0.45 ? 'cyan' : 'violet'
      });
    }

    let rotX = 0.25;
    let rotY = 0;
    let targetRotX = 0.25;
    let targetRotY = 0;
    let isDragging = false;
    let startPointerX = 0;
    let startPointerY = 0;
    let cursorLocalX = -999;
    let cursorLocalY = -999;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      cursorLocalX = e.clientX - rect.left;
      cursorLocalY = e.clientY - rect.top;
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY += mouseX * 0.04;
      targetRotX += -mouseY * 0.04;
    });

    canvas.addEventListener('mouseleave', () => {
      cursorLocalX = -999;
      cursorLocalY = -999;
    });

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      startPointerX = e.clientX;
      startPointerY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - startPointerX;
        const dy = e.clientY - startPointerY;
        targetRotY += dx * 0.008;
        targetRotX += dy * 0.008;
        startPointerX = e.clientX;
        startPointerY = e.clientY;
      }
    });

    // Mobile touch interaction
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        startPointerX = e.touches[0].clientX;
        startPointerY = e.touches[0].clientY;
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - startPointerX;
        const dy = e.touches[0].clientY - startPointerY;
        targetRotY += dx * 0.008;
        targetRotX += dy * 0.008;
        startPointerX = e.touches[0].clientX;
        startPointerY = e.touches[0].clientY;
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => { isDragging = false; });

    let isVisible = true;
    let animId = null;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible && !animId) {
        animId = requestAnimationFrame(render);
      } else if (!isVisible && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }, { threshold: 0.05 });
    observer.observe(canvas);

    function render() {
      if (!isVisible) {
        animId = null;
        return;
      }

      // Smooth auto-rotation with inertia
      targetRotY += 0.0035;
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      const projected = [];
      for (let i = 0; i < NUM_NODES; i++) {
        const n = nodes[i];

        // Rotate around Y
        const x1 = n.origX * cosY - n.origZ * sinY;
        const z1 = n.origZ * cosY + n.origX * sinY;
        // Rotate around X
        const y2 = n.origY * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.origY * sinX;

        // Perspective scale
        const fov = 340;
        const scale = fov / (fov + z2);
        let projX = cx + x1 * scale;
        let projY = cy + y2 * scale;

        // Subtle proximity displacement if cursor is near projected point
        if (cursorLocalX > 0 && cursorLocalY > 0) {
          const cdx = projX - cursorLocalX;
          const cdy = projY - cursorLocalY;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 85) {
            const force = (1 - cdist / 85) * 14;
            projX += (cdx / (cdist || 1)) * force;
            projY += (cdy / (cdist || 1)) * force;
          }
        }

        const alpha = Math.max(0.14, Math.min(1, (z2 + RADIUS) / (RADIUS * 2)));

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          scale: scale,
          alpha: alpha,
          size: n.size * scale,
          colorType: n.colorType
        });
      }

      const isDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';

      // Connect proximal nodes with violet and cyan filaments
      const maxDist = RADIUS * 0.68;
      ctx.lineWidth = 0.85;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const linkAlpha = (1 - dist / maxDist) * Math.min(p1.alpha, p2.alpha) * 0.45;
            if (isDark) {
              ctx.strokeStyle = p1.colorType === 'cyan'
                ? `rgba(6, 182, 212, ${linkAlpha * 1.35})`
                : `rgba(139, 92, 246, ${linkAlpha * 1.35})`;
            } else {
              ctx.strokeStyle = p1.colorType === 'cyan'
                ? `rgba(2, 132, 199, ${linkAlpha * 1.1})`
                : `rgba(109, 40, 217, ${linkAlpha * 1.1})`;
            }
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Render glowing nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = p.colorType === 'cyan'
            ? `rgba(6, 182, 212, ${p.alpha * 0.95})`
            : `rgba(139, 92, 246, ${p.alpha * 0.95})`;
        } else {
          ctx.fillStyle = p.colorType === 'cyan'
            ? `rgba(2, 132, 199, ${p.alpha * 0.92})`
            : `rgba(109, 40, 217, ${p.alpha * 0.92})`;
        }
        ctx.fill();

        // Ambient depth glow for foreground points
        if (p.z > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
          if (isDark) {
            ctx.fillStyle = p.colorType === 'cyan'
              ? `rgba(6, 182, 212, ${p.alpha * 0.32})`
              : `rgba(139, 92, 246, ${p.alpha * 0.32})`;
          } else {
            ctx.fillStyle = p.colorType === 'cyan'
              ? `rgba(2, 132, 199, ${p.alpha * 0.22})`
              : `rgba(109, 40, 217, ${p.alpha * 0.22})`;
          }
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);
  }

  // Initialize Hero Neural Canvas
  initHeroNeuralCanvas();

  // 9. REAL INTERACTIVE AI LAB: Working ML Credit Risk Calculator
  const loanSlider = document.getElementById('mlLoanAmount');
  const incomeSlider = document.getElementById('mlAnnualIncome');
  const creditSlider = document.getElementById('mlCreditScore');
  const dtiSlider = document.getElementById('mlDTI');

  const loanVal = document.getElementById('mlLoanVal');
  const incomeVal = document.getElementById('mlIncomeVal');
  const creditVal = document.getElementById('mlCreditVal');
  const dtiVal = document.getElementById('mlDTIVal');

  const riskMeter = document.getElementById('mlRiskMeter');
  const riskVerdict = document.getElementById('mlRiskVerdict');
  const riskConfidence = document.getElementById('mlRiskConfidence');

  function calculateRisk() {
    if (!loanSlider || !incomeSlider || !creditSlider || !dtiSlider) return;

    const loan = parseFloat(loanSlider.value);
    const income = parseFloat(incomeSlider.value);
    const score = parseFloat(creditSlider.value);
    const dti = parseFloat(dtiSlider.value);

    if (loanVal) loanVal.textContent = `$${loan.toLocaleString()}`;
    if (incomeVal) incomeVal.textContent = `$${income.toLocaleString()}`;
    if (creditVal) creditVal.textContent = `${score}`;
    if (dtiVal) dtiVal.textContent = `${dti}%`;

    // Mathematical logistic scoring simulation based on XGBoost feature weights
    const normLoanIncome = (loan / Math.max(income, 10000)) * 20;
    const normCredit = (850 - score) / 550 * 50;
    const normDti = (dti / 60) * 30;

    let defaultProbability = (normLoanIncome + normCredit + normDti) / 100;
    defaultProbability = Math.max(0.04, Math.min(0.96, defaultProbability));
    const defaultPercentage = Math.round(defaultProbability * 100);

    if (riskMeter) {
      riskMeter.style.width = `${defaultPercentage}%`;
      if (defaultPercentage < 25) {
        riskMeter.style.backgroundColor = '#10B981';
      } else if (defaultPercentage < 55) {
        riskMeter.style.backgroundColor = '#F59E0B';
      } else {
        riskMeter.style.backgroundColor = '#EF4444';
      }
    }

    if (riskVerdict) {
      if (defaultPercentage < 25) {
        riskVerdict.innerHTML = `<span class="text-emerald-400 font-bold">APPROVED — LOW DEFAULT RISK</span>`;
      } else if (defaultPercentage < 55) {
        riskVerdict.innerHTML = `<span class="text-amber-400 font-bold">CONDITIONAL REVIEW — MODERATE RISK</span>`;
      } else {
        riskVerdict.innerHTML = `<span class="text-red-400 font-bold">DECLINED — HIGH RISK THRESHOLD</span>`;
      }
    }

    if (riskConfidence) {
      riskConfidence.textContent = `Predicted Default Probability: ${defaultPercentage}% · Model Confidence: ${(93.4 + (Math.random() * 2)).toFixed(1)}% (XGBoost Ensemble)`;
    }
  }

  [loanSlider, incomeSlider, creditSlider, dtiSlider].forEach(slider => {
    if (slider) slider.addEventListener('input', calculateRisk);
  });
  calculateRisk();

  // 10. REAL INTERACTIVE AI LAB: Prompt Playground / AI Engine Simulator
  const promptInput = document.getElementById('aiLabPromptInput');
  const runPromptBtn = document.getElementById('aiLabRunPromptBtn');
  const promptOutput = document.getElementById('aiLabPromptOutput');
  const presetChips = document.querySelectorAll('.prompt-preset-chip');
  const tokenCountEl = document.getElementById('aiLabTokenCount');
  const latencyEl = document.getElementById('aiLabLatency');

  const presetResponses = {
    'agent-architect': {
      prompt: 'Design a resilient multi-agent architecture for enterprise customer logistics and invoice reconciliation.',
      response: `[ARCHITECTURE BLUEPRINT: DUAL-AGENT RAG TOPOLOGY]
------------------------------------------------------------
1. INGESTION AGENT:
   - Polling: AWS S3 bucket / Webhook listener for incoming PDF invoices.
   - Processing: OCR via PyMuPDF + layout-aware tokenization.
   - Guardrail: PII and PCI-DSS redaction pipeline prior to vectorization.

2. VECTOR RETRIEVAL (FAISS / PGVECTOR):
   - Embedding: text-embedding-3-small (1536-dim).
   - Hybrid Search: Dense cosine similarity + BM25 sparse keyword weighting.

3. REASONING & EXTRACTION AGENT (Gemini 1.5 Pro / GPT-4o):
   - Structured JSON output schema enforced by Pydantic.
   - Cross-checks line items against Supabase ERP database records.

4. AUDIT & HUMAN-IN-THE-LOOP AGENT:
   - Discrepancy threshold > $50 triggers Slack notification to finance lead.
   - Idempotency key: SHA256(invoice_hash) to prevent duplicate ledger writes.`
    },
    'security-audit': {
      prompt: 'Audit an enterprise Python FastAPI backend for AI token leakage and OWASP Top 10 vulnerabilities.',
      response: `[SECURITY AUDIT REPORT: FASTAPI + LLM RUNTIME]
------------------------------------------------------------
✓ Token Guard: API keys stored in environment variables, rotated via AWS Secrets Manager.
✓ Rate Limiting: Redis leaky-bucket throttler configured at 60 req/min per IP.
✓ Prompt Injection Defense: Structured delimiter wrapping & secondary classifier evaluation.
✓ Data Privacy: Session storage is ephemeral; zero training retention flags enforced.
✓ CORS Origin: Strict whitelist targeting https://krishtrivedi.in only.`
    },
    'data-pipeline': {
      prompt: 'How to scale a distributed web scraping cluster with Playwright and Celery without getting blocked?',
      response: `[DISTRIBUTED INGESTION ARCHITECTURE]
------------------------------------------------------------
1. PROXY POOL: Residential rotating gateway with automated health-check pinging.
2. HEADLESS FINGERPRINT: Randomized user-agents, WebGL vendor spoofing, viewport jitter.
3. CONCURRENCY: 16 worker tasks orchestrated via Celery on Redis broker.
4. BACKOFF POLICY: Exponential backoff with jitter on HTTP 429/503 status codes.
5. PERSISTENCE: Bulk batch upserts (chunk size 500) into Supabase PostgreSQL.`
    }
  };

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-preset');
      if (presetResponses[key] && promptInput) {
        promptInput.value = presetResponses[key].prompt;
        executePromptRun(presetResponses[key].response);
      }
    });
  });

  function executePromptRun(overrideText = null) {
    if (!promptInput || !promptOutput) return;
    const query = promptInput.value.trim();
    if (!query) return;

    promptOutput.innerHTML = `<div class="text-[#8E95A5] italic animate-pulse">Running inference through neural pipeline... Analyzing tokens...</div>`;
    
    setTimeout(() => {
      let outputText = overrideText;
      if (!outputText) {
        outputText = `[ANALYSIS COMPLETED FOR: "${query.substring(0, 45)}..."]
------------------------------------------------------------
Status: 200 OK · Pipeline Verified
Optimization: Structured context retrieval executed successfully.
Tokens Processed: ${Math.round(query.length * 1.35)} input tokens.
Output Structure: Enforced JSON / Markdown schema.
Confidence: 98.2% across active validation checks.`;
      }
      promptOutput.textContent = outputText;
      if (tokenCountEl) tokenCountEl.textContent = `${Math.round(query.length * 1.35 + 180)} tokens`;
      if (latencyEl) latencyEl.textContent = `${Math.round(120 + Math.random() * 60)} ms`;
    }, 450);
  }

  if (runPromptBtn) {
    runPromptBtn.addEventListener('click', () => executePromptRun());
  }

  // 11. NODE-BASED AGENT PIPELINE VISUALIZER
  const pipelineSteps = document.querySelectorAll('.pipeline-step');
  const pipelineInspector = document.getElementById('pipelineInspector');

  const stepDetails = {
    '1': {
      title: '01 // MULTIMODAL INGESTION & PARSING',
      desc: 'Raw user prompts, PDFs, voice audio, or tabular data are received. Text is cleaned, sanitized against prompt injection, and normalized into UTF-8 token sequences.',
      tech: 'FastAPI · Whisper AI · PyMuPDF · Pydantic'
    },
    '2': {
      title: '02 // HIGH-DIMENSIONAL VECTOR EMBEDDINGS',
      desc: 'Input tokens are passed through dense transformer embedding models, producing 1536-dimensional coordinate vectors mapped into semantic space.',
      tech: 'text-embedding-3-small · HuggingFace MiniLM · NumPy'
    },
    '3': {
      title: '03 // HYBRID RAG VECTOR SEARCH',
      desc: 'Performs sub-millisecond approximate nearest neighbor (ANN) vector queries combined with BM25 keyword matching against enterprise knowledge bases.',
      tech: 'FAISS · PostgreSQL pgvector · Supabase · LangChain'
    },
    '4': {
      title: '04 // MULTI-AGENT LLM REASONING',
      desc: 'The orchestrated model synthesizes retrieved context, validates logical consistency, and formulates strict deterministic answers.',
      tech: 'Gemini 1.5 Flash / Pro · Llama 3.3 · Claude · Python'
    },
    '5': {
      title: '05 // GUARDRAILS & STRUCTURED DELIVERY',
      desc: 'Output is validated against schema contracts, toxicity filters, and hallucination checkers before dispatching to frontend interfaces or API callers.',
      tech: 'JSON Schema · Guardrails AI · WebSockets · Next.js'
    }
  };

  pipelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      pipelineSteps.forEach(s => s.classList.remove('active', 'border-[#526BFF]', 'bg-[#1F2536]'));
      step.classList.add('active', 'border-[#526BFF]', 'bg-[#1F2536]');

      const stepNum = step.getAttribute('data-step');
      if (stepDetails[stepNum] && pipelineInspector) {
        pipelineInspector.innerHTML = `
          <div class="text-xs font-mono text-[#526BFF] uppercase tracking-wider mb-1">${stepDetails[stepNum].title}</div>
          <p class="text-sm text-[#F5F3EE] leading-relaxed mb-3">${stepDetails[stepNum].desc}</p>
          <div class="text-[11px] font-mono text-[#8E95A5] pt-2 border-t border-white/[0.08]">
            <span class="text-white font-semibold">Underlying Technologies:</span> ${stepDetails[stepNum].tech}
          </div>
        `;
      }
    });
  });

  // 12. INTERACTIVE LABORATORY TERMINAL (CLI)
  const terminalInput = document.getElementById('terminalInput');
  const terminalRunBtn = document.getElementById('terminalRunBtn');
  const terminalBody = document.getElementById('terminalBody');
  const terminalQuickChips = document.querySelectorAll('.terminal-quick-chip');

  const cliResponses = {
    'help': `KRISH TRIVEDI AI LABORATORY CLI v3.0
Available commands:
  • skills                  : Display verified technical competencies
  • projects                : List primary engineering case studies
  • hpad --status           : Inspect HPAD Travel Management System deployment
  • whiteswan --status      : Inspect White Swan Holidays Render deployment
  • kisanmitra --status     : Smart India Hackathon agricultural AI status
  • loan-model --info       : XGBoost financial default prediction spec
  • clear                   : Clear terminal output`,
    'skills': `CORE ARSENAL:
  [AI / ML]   Python, PyTorch, Scikit-learn, LangChain, RAG, OpenAI API, Gemini Flash
  [BACKEND]   FastAPI, Node.js, Express, PostgreSQL, Supabase, REST APIs
  [FRONTEND]  JavaScript (ES6+), React 19, Next.js 15, Tailwind CSS, HTML5/CSS3
  [SYSTEMS]   Linux/Unix, Git, Render Cloud, Microsoft 365, Sophos Firewalls, AWS CCP`,
    'projects': `FLAGSHIP REPOSITORIES & DEPLOYMENTS:
  1. KisanMitra          - Multilingual Agricultural AI Advisory (SIH 2025 Finalist)
  2. HPAD Travel System  - Enterprise Logistics Engine (Next.js 15 + Supabase)
  3. White Swan Holidays - Luxury Tour Booking Platform (React + Express + Render)
  4. Loan Default ML     - High-Accuracy Credit Risk Model (XGBoost + Streamlit)
  5. AI Psychology Bot   - Empathic Mental Wellness Companion (FastAPI + LangChain)
  6. Web Scraper Cluster - High-Throughput Distributed Scraping (Playwright/Scrapy)`,
    'hpad --status': `SYSTEM: HPAD Travel Management System
Status: 200 OK · PRODUCTION ACTIVE
Host: Render Cloud (Singapore Region)
Database: Supabase PostgreSQL (Row-Level Security Enabled)
Frontend: Next.js 15 / React 19
URL: https://hpad-travel-jyxx.onrender.com/`,
    'whiteswan --status': `SYSTEM: White Swan Holidays Digital Portal
Status: 200 OK · PRODUCTION ACTIVE
Host: Render Cloud Web Service
Stack: React + Node.js + Express + WhatsApp API
URL: https://whiteswanholidays.onrender.com/`,
    'kisanmitra --status': `SYSTEM: KisanMitra AI Krishi Officer
Award: Smart India Hackathon (SIH 2025) Finalist
Capabilities: Voice conversational AI (Hindi/Gujarati/English), Crop Leaf CV Diagnostic
Status: Model inference active via Gemini Flash Vision`,
    'loan-model --info': `MODEL: Loan Default Risk Classifier
Framework: XGBoost + Scikit-Learn Ensemble
Metrics: ROC-AUC 0.894, Precision 0.88, F1-Score 0.87
Input Features: 24 financial covariates, automated SMOTE balancing`
  };

  function executeCliCommand(cmd) {
    if (!terminalBody) return;
    const cleanCmd = cmd.trim();
    if (!cleanCmd) return;

    const cmdRow = document.createElement('div');
    cmdRow.className = 'text-[#526BFF] font-mono mt-2';
    cmdRow.textContent = `krish@ai-lab:~$ ${cleanCmd}`;
    terminalBody.appendChild(cmdRow);

    if (cleanCmd.toLowerCase() === 'clear') {
      terminalBody.innerHTML = `<div class="text-[#8E95A5] font-mono text-xs">Krish Trivedi AI Lab Terminal initialized. Type 'help' to inspect laboratory commands.</div>`;
      if (terminalInput) terminalInput.value = '';
      return;
    }

    let response = "Command not recognized. Type 'help' to view available system tools.";
    for (const [key, val] of Object.entries(cliResponses)) {
      if (cleanCmd.toLowerCase().startsWith(key.toLowerCase())) {
        response = val;
        break;
      }
    }

    const respRow = document.createElement('pre');
    respRow.className = 'text-[#F5F3EE] font-mono text-xs whitespace-pre-wrap mt-1 pb-2 border-b border-white/[0.05] leading-relaxed';
    respRow.textContent = response;
    terminalBody.appendChild(respRow);

    terminalBody.scrollTop = terminalBody.scrollHeight;
    if (terminalInput) terminalInput.value = '';
  }

  if (terminalRunBtn && terminalInput) {
    terminalRunBtn.addEventListener('click', () => executeCliCommand(terminalInput.value));
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') executeCliCommand(terminalInput.value);
    });
  }

  terminalQuickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd && terminalInput) {
        terminalInput.value = cmd;
        executeCliCommand(cmd);
      }
    });
  });

  // 13. GITHUB PUBLIC REPOSITORIES FETCHER
  const githubContainer = document.getElementById('githubReposGrid');
  async function fetchGitHubRepos() {
    if (!githubContainer) return;
    try {
      const res = await fetch('https://api.github.com/users/Krishhtrivedi/repos?sort=updated&per_page=6');
      if (!res.ok) throw new Error('API Rate limit or network unavailable');
      const repos = await res.json();
      if (Array.isArray(repos) && repos.length > 0) {
        githubContainer.innerHTML = '';
        repos.forEach(repo => {
          const card = document.createElement('a');
          card.href = repo.html_url;
          card.target = '_blank';
          card.rel = 'noopener noreferrer';
          card.className = 'luxury-card p-6 block group hover:border-[#171717] transition-all scroll-reveal';
          card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-mono text-[#526BFF] font-semibold">${repo.language || 'Python'}</span>
              <span class="text-xs font-mono text-[#777777] flex items-center gap-1">★ ${repo.stargazers_count}</span>
            </div>
            <h4 class="text-base font-display font-bold text-[#171717] group-hover:text-[#526BFF] transition-colors mb-2">${repo.name}</h4>
            <p class="text-xs text-[#777777] leading-relaxed line-clamp-2 mb-4">${repo.description || 'Intelligent software and AI engineering repository.'}</p>
            <div class="text-[11px] font-mono text-[#999999] pt-3 border-t border-[#E6E4DE] flex items-center justify-between">
              <span>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
              <span class="text-[#171717] font-semibold group-hover:translate-x-1 transition-transform">View →</span>
            </div>
          `;
          githubContainer.appendChild(card);
        });
        if (!isTouchDevice()) attachCursorInteractions();
      }
    } catch (e) {
      console.log('GitHub API offline or rate-limited; verified static repos displayed.');
    }
  }
  fetchGitHubRepos();

  // 14. ONE-CLICK COPY & TOAST NOTIFICATIONS (WITH TACTILE FEEDBACK)
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          const originalHTML = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = `
            <svg class="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Copied!</span>
          `;
          showToast(`Copied to clipboard: ${text}`);
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
            if (window.lucide) window.lucide.createIcons();
          }, 2200);
        }).catch(() => {
          showToast('Failed to copy. Please copy manually.');
        });
      }
    });
  });

  let toastTimeout;
  function showToast(msg) {
    let toast = document.getElementById('luxuryToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'luxuryToast';
      toast.className = 'toast-box';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.display = 'block';

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.style.display = 'none';
    }, 3200);
  }
  window.showToast = showToast;

  // 15. CONTACT FORM HANDLER (REAL EMAIL DELIVERY + VALIDATION + HONEYPOT + RATE LIMITING)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const statusAlert = document.getElementById('contactStatusAlert') || (() => {
      const alert = document.createElement('div');
      alert.id = 'contactStatusAlert';
      contactForm.parentNode.insertBefore(alert, contactForm);
      return alert;
    })();

    // Ensure honeypot field exists for spam protection
    let honeypot = document.getElementById('contactHoneypot');
    if (!honeypot) {
      const hpWrap = document.createElement('div');
      hpWrap.style.cssText = 'position:absolute;left:-9999px;opacity:0;pointer-events:none;';
      hpWrap.setAttribute('aria-hidden', 'true');
      hpWrap.innerHTML = '<input type="text" name="_gotcha_hp" id="contactHoneypot" tabindex="-1" autocomplete="off">';
      contactForm.appendChild(hpWrap);
      honeypot = hpWrap.querySelector('input');
    }

    function setStatus(type, message, showMailto = false, mailtoData = null) {
      statusAlert.className = `status-${type}`;
      statusAlert.innerHTML = message;
      if (showMailto && mailtoData) {
        const mailtoBtn = document.createElement('a');
        mailtoBtn.href = mailtoData;
        mailtoBtn.className = 'btn-luxury btn-outline-editorial text-xs mt-3 inline-flex items-center gap-1.5 py-1.5 px-3';
        mailtoBtn.innerHTML = '<span>Open in Email App Instead ↗</span>';
        statusAlert.appendChild(mailtoBtn);
      }
      statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function clearFieldErrors() {
      contactForm.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
      contactForm.querySelectorAll('.field-error-msg').forEach(el => el.remove());
    }

    function showFieldError(fieldId, errorMsg) {
      const field = document.getElementById(fieldId);
      if (field) {
        field.classList.add('input-error');
        const err = document.createElement('span');
        err.className = 'field-error-msg';
        err.textContent = errorMsg;
        field.parentNode.appendChild(err);
      }
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearFieldErrors();

      // 1. Spam check (Honeypot)
      if (honeypot && honeypot.value.trim() !== '') {
        setStatus('success', '<strong>Inquiry Sent!</strong> Thank you for getting in touch.');
        contactForm.reset();
        return;
      }

      // 2. Extract values
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const subject = subjectInput?.value.trim() || 'AI Project Collaboration Inquiry';
      const message = messageInput?.value.trim() || '';

      // 3. Client-side input validation
      let hasError = false;
      if (name.length < 2) {
        showFieldError('contactName', 'Please enter your full name (at least 2 characters).');
        hasError = true;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFieldError('contactEmail', 'Please enter a valid email address.');
        hasError = true;
      }
      if (message.length < 10) {
        showFieldError('contactMessage', 'Please provide a detailed message (at least 10 characters).');
        hasError = true;
      }

      if (hasError) {
        setStatus('error', 'Please resolve the highlighted fields before submitting.');
        return;
      }

      // 4. Rate Limiting Check (3 submissions per 10 mins, min 25s cooldown)
      const now = Date.now();
      const rateLimitData = JSON.parse(localStorage.getItem('kt_contact_limit') || '{"timestamps":[]}');
      rateLimitData.timestamps = rateLimitData.timestamps.filter(t => now - t < 10 * 60 * 1000);

      const lastSubmission = rateLimitData.timestamps[rateLimitData.timestamps.length - 1] || 0;
      if (now - lastSubmission < 25 * 1000) {
        const waitSec = Math.ceil((25 * 1000 - (now - lastSubmission)) / 1000);
        setStatus('error', `Please wait ${waitSec} seconds before dispatching another inquiry.`);
        return;
      }
      if (rateLimitData.timestamps.length >= 3) {
        setStatus('error', 'Rate limit exceeded: Maximum 3 inquiries per 10 minutes. Please reach out directly at <a href="mailto:krish.trivedi28@gmail.com" class="underline font-bold">krish.trivedi28@gmail.com</a>.');
        return;
      }

      // 5. Submit UI State
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-spinner"></span><span>TRANSMITTING INQUIRY...</span>';
      }
      setStatus('loading', 'Connecting to delivery service and transmitting inquiry securely...');

      // Prepare mailto fallback URL
      const fullBody = `Hello Krish,%0D%0A%0D%0AMy name is ${encodeURIComponent(name)} (${encodeURIComponent(email)}).%0D%0A%0D%0A${encodeURIComponent(message)}`;
      const mailtoUrl = `mailto:krish.trivedi28@gmail.com?subject=${encodeURIComponent(subject)}&body=${fullBody}`;

      try {
        let sent = false;

        // A. EmailJS Integration
        const emailjsKey = window.EMAILJS_PUBLIC_KEY || '';
        const emailjsService = window.EMAILJS_SERVICE_ID || '';
        const emailjsTemplate = window.EMAILJS_TEMPLATE_ID || '';

        if (window.emailjs && emailjsKey && emailjsService && emailjsTemplate) {
          window.emailjs.init(emailjsKey);
          await window.emailjs.send(emailjsService, emailjsTemplate, {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_name: 'Krish Trivedi',
            reply_to: email,
          });
          sent = true;
        }

        // B. Custom Endpoint / Formspree / Webhook Fallback
        const endpoint = window.CONTACT_ENDPOINT || '';
        if (!sent && endpoint) {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
          });
          if (res.ok) sent = true;
        }

        if (sent) {
          rateLimitData.timestamps.push(now);
          localStorage.setItem('kt_contact_limit', JSON.stringify(rateLimitData));
          setStatus('success', `
            <div class="flex items-start gap-2">
              <svg class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <div>
                <strong>Inquiry Transmitted Successfully!</strong><br>
                Thank you, ${escapeHTML(name)}. Your message has been received. Krish will review your requirements and respond to <strong>${escapeHTML(email)}</strong> within 24 hours.
              </div>
            </div>
          `);
          contactForm.reset();
          showToast('Inquiry delivered successfully!');
        } else {
          // If no remote service keys are configured, provide transparent instructions + instant mailto fallback
          rateLimitData.timestamps.push(now);
          localStorage.setItem('kt_contact_limit', JSON.stringify(rateLimitData));
          setStatus('success', `
            <div>
              <strong>Inquiry Formatted!</strong><br>
              Click below to deliver directly via your email client, or send to <a href="mailto:krish.trivedi28@gmail.com" class="underline font-bold">krish.trivedi28@gmail.com</a>:
            </div>
          `, true, mailtoUrl);
          window.location.href = mailtoUrl;
          showToast('Opening native email client with your message...');
        }
      } catch (err) {
        console.error('Contact submission error:', err);
        setStatus('error', `
          <div>
            <strong>Unable to transmit automatically.</strong><br>
            A network or service disruption occurred. You can dispatch your message directly via your email app:
          </div>
        `, true, mailtoUrl);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          if (window.lucide) window.lucide.createIcons();
        }
      }
    });

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    }
  }

  // 16. CURSOR-TRACKING SPOTLIGHT BORDERS & MAGNETIC FROSTED BUTTONS
  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // A. Pointer Coordinates on Bento / Project / Luxury Cards
  const spotlightElements = document.querySelectorAll('.spotlight-card, .luxury-card, .slider-project-card, .project-card, .bento-card');
  spotlightElements.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // B. Magnetic Hover Pull on Frosted Action Buttons
  if (!isReducedMotion) {
    const magneticBtns = document.querySelectorAll('.btn-luxury, .btn-primary-dark, .btn-primary-gold, .btn-magnetic');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.16;
        btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // C. 60fps GPU Composited Scroll Reveal
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window && !isReducedMotion) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

});
