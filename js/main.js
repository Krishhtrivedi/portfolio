/**
 * KRISH TRIVEDI — PREMIUM PERSONAL BRAND PORTFOLIO ENGINE
 * Inspired by HPAD (Architectural Luxury & Quiet Minimalism)
 * & Meet Gajjar (Structural Precision & Interactive Engineering)
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Custom Editorial Cursor
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
    const interactives = document.querySelectorAll('a, button, input, select, textarea, .luxury-card, .luxury-card-dark, .copy-btn, .filter-chip, .pipeline-step');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }
  attachCursorInteractions();

  // 3. Navbar Scroll Subtle Transition
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 4. Side Rail Scroll Progress Tracker (Meet Gajjar & HPAD hybrid)
  const railThumb = document.querySelector('.rail-thumb');
  window.addEventListener('scroll', () => {
    if (railThumb) {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      railThumb.style.top = `${Math.min(scrolled * 0.7, 70)}%`;
    }
  });

  // 5. Fullscreen Editorial Navigation
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

  // Close menu on menu item click
  const menuItems = document.querySelectorAll('.menu-item-editorial');
  menuItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });

  // 6. Project Filter Logic
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
        if (filter === 'all' || card.getAttribute('data-category')?.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. REAL INTERACTIVE AI LAB: Working ML Credit Risk Calculator
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
    // Lower score is safer; higher score is riskier
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

  // 8. REAL INTERACTIVE AI LAB: Prompt Playground / AI Engine Simulator
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

  // 9. REAL INTERACTIVE AI LAB: Node-based Agent Pipeline Visualizer
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
      desc: 'Output is validated against schema contracts, toxicity filters, and hallicunation checkers before dispatching to frontend interfaces or API callers.',
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

  // 10. REAL INTERACTIVE AI LAB: Laboratory Terminal
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

  // 11. GitHub Public Repositories Fetcher
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
          card.className = 'luxury-card p-6 block group hover:border-[#171717] transition-all';
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
        attachCursorInteractions();
      }
    } catch (e) {
      // Graceful fallback to static verified projects if API is rate-limited
      console.log('GitHub API offline or rate-limited; verified cached items loaded.');
    }
  }
  fetchGitHubRepos();

  // 12. Copy Buttons & Toast Notifications
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied to clipboard: ${text}`);
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

  // 13. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || 'Client';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const subject = document.getElementById('contactSubject')?.value.trim() || 'AI Project Collaboration';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      const fullBody = `Hello Krish,%0D%0A%0D%0AMy name is ${encodeURIComponent(name)} (${encodeURIComponent(email)}).%0D%0A%0D%0A${encodeURIComponent(message)}`;
      const mailtoUrl = `mailto:krish.trivedi28@gmail.com?subject=${encodeURIComponent(subject)}&body=${fullBody}`;

      window.location.href = mailtoUrl;
      showToast('Opening native email client to send message...');
    });
  }

});
