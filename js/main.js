/* ============================================================
   SAAR SHARIR PORTFOLIO — Main JavaScript
   ============================================================ */

'use strict';

/* ── Theme ── */
const ThemeManager = (() => {
  const key = 'ss-theme';
  const btn = document.getElementById('btn-theme');
  const root = document.documentElement;

  function get() {
    return localStorage.getItem(key) ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function set(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(key, theme);
    if (btn) btn.textContent = theme === 'dark' ? '☀' : '☾';
  }

  function toggle() {
    set(get() === 'dark' ? 'light' : 'dark');
  }

  function init() {
    set(get());
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init };
})();

/* ── Navigation ── */
const NavManager = (() => {
  const nav = document.querySelector('.nav');
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  const links = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');

  function updateActive() {
    const sections = document.querySelectorAll('[data-section]');
    let currentSection = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 100) currentSection = sec.dataset.section;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentSection}`);
    });
  }

  function init() {
    // Close mobile menu on link click
    document.querySelectorAll('.nav-mobile-menu a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu && mobileMenu.classList.remove('open');
      });
    });

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  return { init };
})();

/* ── Scroll Reveal ── */
const RevealManager = (() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  function init() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  return { init };
})();

/* ── Skill Bar Animations ── */
const SkillBars = (() => {
  let animated = false;

  function animate() {
    if (animated) return;
    const fills = document.querySelectorAll('.skill-bar-fill');
    if (!fills.length) return;
    const firstFill = fills[0];
    const rect = firstFill.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      animated = true;
      fills.forEach(fill => {
        fill.style.width = fill.dataset.level + '%';
      });
    }
  }

  function init() {
    window.addEventListener('scroll', animate, { passive: true });
    animate();
  }

  return { init };
})();

/* ── Projects ── */
const ProjectsManager = (() => {
  let allProjects = [];
  let currentTab = 'tools';
  let currentFilter = 'all';

  const icons = {
    'Python': '🐍', 'SQL': '🗃', 'Power BI': '📊', 'GIS': '🗺',
    'ML': '🤖', 'Agriculture': '🌱', 'Data Engineering': '⚙',
    'BI': '📈', 'Research': '📄', 'IoT': '📡', 'Remote Sensing': '🛰',
  };

  function getIcon(tags) {
    for (const tag of (tags || [])) {
      if (icons[tag]) return icons[tag];
    }
    return '📂';
  }

  async function loadProjects() {
    try {
      const res = await fetch('./data/projects.json');
      const data = await res.json();
      allProjects = [...data.tools, ...data.research];
      renderFilters();
      renderProjects();
    } catch (e) {
      console.warn('Projects load failed:', e);
    }
  }

  function getAllTags() {
    const tags = new Set();
    allProjects.forEach(p => (p.tags || []).forEach(t => tags.add(t)));
    return [...tags].sort();
  }

  function renderFilters() {
    const filterGroup = document.getElementById('filter-group');
    if (!filterGroup) return;
    filterGroup.innerHTML = `<button class="tag active" data-filter="all">All</button>`;
    getAllTags().forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag';
      btn.dataset.filter = tag;
      btn.textContent = tag;
      btn.addEventListener('click', () => setFilter(tag));
      filterGroup.appendChild(btn);
    });
    filterGroup.querySelector('[data-filter="all"]')
      .addEventListener('click', () => setFilter('all'));
  }

  function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('#filter-group .tag').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    renderProjects();
  }

  function setTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    renderProjects();
  }

  function filterProjects() {
    return allProjects.filter(p => {
      const tabMatch = currentTab === 'tools'
        ? p.category === 'Tool'
        : p.category === 'Research Paper';
      const filterMatch = currentFilter === 'all' ||
        (p.tags || []).includes(currentFilter);
      return tabMatch && filterMatch;
    });
  }

  function createCard(project) {
    const card = document.createElement('div');
    card.className = 'card card-accent project-card reveal';
    card.innerHTML = `
      <div class="project-card-top">
        <div class="project-icon">${getIcon(project.tags)}</div>
        <span class="project-category-badge">${project.category}</span>
      </div>
      <div class="project-title">${project.project_title}</div>
      <p class="project-desc">${project.short_description}</p>
      <div class="tag-group" style="margin-bottom:1rem">
        ${(project.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="project-links">
        ${project.links?.github ? `<a class="project-link" href="${project.links.github}" target="_blank" rel="noopener">↗ GitHub</a>` : ''}
        ${project.links?.paper ? `<a class="project-link" href="${project.links.paper}" target="_blank" rel="noopener">↗ Paper</a>` : ''}
        ${project.links?.demo ? `<a class="project-link" href="${project.links.demo}" target="_blank" rel="noopener">↗ Demo</a>` : ''}
        <button class="project-link" onclick="event.stopPropagation(); ProjectsManager.openModal('${project.id}')">→ Details</button>
      </div>
    `;
    card.addEventListener('click', () => openModal(project.id));
    return card;
  }

  function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    const filtered = filterProjects();
    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.innerHTML = `<p style="color:var(--text-3); font-family:var(--font-mono); font-size:0.85rem; grid-column:1/-1; padding:2rem 0">No projects found for this filter.</p>`;
      return;
    }
    filtered.forEach((p, i) => {
      const card = createCard(p);
      card.classList.add(`reveal-delay-${(i % 3) + 1}`);
      grid.appendChild(card);
    });
    RevealManager.init();
  }

  function openModal(id) {
    const project = allProjects.find(p => p.id === id);
    if (!project) return;

    Analytics.trackProject(project.project_title);

    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="modal-header">
        <div>
          <div class="project-category-badge" style="margin-bottom:0.6rem">${project.category}</div>
          <h3 style="font-family:var(--font-display);font-size:1.6rem;font-weight:400;line-height:1.2;color:var(--text)">${project.project_title}</h3>
        </div>
        <button class="modal-close" id="modal-close-btn">✕</button>
      </div>

      <div class="tag-group" style="margin-bottom:1.75rem">
        ${(project.technologies_used || []).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Overview</div>
        <p>${project.short_description}</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Problem</div>
        <p>${project.problem_description}</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Approach</div>
        <p>${project.solution_approach}</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Results & Impact</div>
        <p>${project.results_or_impact}</p>
      </div>

      ${(project.links?.github || project.links?.paper || project.links?.demo) ? `
      <div class="modal-section" style="border:none;padding:0;margin:0">
        <div class="modal-section-label">Links</div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:0.5rem">
          ${project.links?.github ? `<a class="btn btn-outline" href="${project.links.github}" target="_blank">↗ GitHub</a>` : ''}
          ${project.links?.paper ? `<a class="btn btn-outline" href="${project.links.paper}" target="_blank">↗ Read Paper</a>` : ''}
          ${project.links?.demo ? `<a class="btn btn-primary" href="${project.links.demo}" target="_blank">→ Live Demo</a>` : ''}
        </div>
      </div>` : ''}
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  }

  function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function init() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => setTab(btn.dataset.tab));
    });

    // Modal overlay click to close
    const overlay = document.getElementById('project-modal');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    loadProjects();
  }

  // Expose openModal globally for inline handlers
  return { init, openModal };
})();
window.ProjectsManager = ProjectsManager;

/* ── Featured Projects (Homepage) ── */
const FeaturedProjects = (() => {
  async function init() {
    const container = document.getElementById('featured-projects');
    if (!container) return;
    try {
      const res = await fetch('./data/projects.json');
      const data = await res.json();
      const featured = [...data.tools, ...data.research].filter(p => p.featured).slice(0, 3);
      featured.forEach(p => {
        const card = document.createElement('a');
        card.href = './pages/projects.html';
        card.className = 'card card-accent featured-proj-card reveal';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.textDecoration = 'none';
        card.style.cursor = 'pointer';
        const icons = { 'Python':'🐍','GIS':'🗺','Power BI':'📊','ML':'🤖','Agriculture':'🌱','BI':'📈','Research':'📄' };
        const icon = (p.tags||[]).map(t=>icons[t]).find(Boolean) || '📂';
        card.innerHTML = `
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1rem">
            <div class="project-icon">${icon}</div>
            <span class="project-category-badge">${p.category}</span>
          </div>
          <div class="project-title" style="font-family:var(--font-display);font-size:1.15rem;color:var(--text);margin-bottom:0.5rem">${p.project_title}</div>
          <p style="font-size:0.88rem;color:var(--text-2);flex:1;line-height:1.6">${p.short_description}</p>
          <div class="tag-group" style="margin-top:1rem">
            ${(p.tags||[]).slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}
          </div>
        `;
        container.appendChild(card);
      });
      RevealManager.init();
    } catch(e) {
      console.warn('Featured projects load failed:', e);
    }
  }
  return { init };
})();

/* ── Contact Form ── */
const ContactForm = (() => {
  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      // Simulate send (replace with actual endpoint / Formspree / EmailJS)
      setTimeout(() => {
        if (status) {
          status.className = 'form-status success';
          status.textContent = '✓ Message sent. I\'ll be in touch shortly.';
        }
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
      }, 1200);
    });
  }
  return { init };
})();

/* ── Simple Analytics ── */
const Analytics = (() => {
  const SESSION_KEY = 'ss-session';

  function getSessionId() {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = 'ss_' + Date.now().toString(36) + Math.random().toString(36).slice(2);
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  }

  function getDeviceType() {
    return window.innerWidth <= 768 ? 'mobile' : 'desktop';
  }

  function log(event, extra = {}) {
    const entry = {
      event,
      page_url: window.location.pathname,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct',
      device_type: getDeviceType(),
      session_id: getSessionId(),
      ...extra,
    };

    // Store in localStorage with max 500 entries
    try {
      const key = 'ss-analytics-log';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(entry);
      if (existing.length > 500) existing.splice(0, existing.length - 500);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) {}

    // If Plausible/Umami is integrated, fire their event too
    if (window.plausible) window.plausible(event, { props: extra });
    if (window.umami) window.umami.track(event, extra);
  }

  function trackPageView() {
    log('pageview');
  }

  function trackProject(name) {
    log('project_view', { project_name: name });
  }

  function init() {
    trackPageView();
  }

  return { init, trackProject };
})();

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavManager.init();
  RevealManager.init();
  SkillBars.init();
  ContactForm.init();
  Analytics.init();

  // Page-specific inits
  if (document.getElementById('projects-grid')) ProjectsManager.init();
  if (document.getElementById('featured-projects')) FeaturedProjects.init();
});
