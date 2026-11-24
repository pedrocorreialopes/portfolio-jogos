/* ============================================================
   main.js — Interações da landing page
   Sem dependências externas. Tudo defensivo: se um elemento
   não existir na página, o módulo correspondente não faz nada.
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------------------------------------------------
     1. Barra de progresso de leitura + header condensado
  --------------------------------------------------------- */
  function initScrollUI() {
    const bar = $('.scroll-progress');
    const header = $('.site-header');
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (bar) bar.style.width = pct.toFixed(2) + '%';
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ---------------------------------------------------------
     2. Revelação de elementos na rolagem
  --------------------------------------------------------- */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;

    /* Sem animação: nada é escondido. Progressive enhancement puro. */
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.remove('reveal-pending'));
      return;
    }

    const reveal = el => el.classList.add('is-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    items.forEach((el, i) => {
      if (!el.style.getPropertyValue('--delay')) {
        el.style.setProperty('--delay', (i % 6) * 70 + 'ms');
      }
      el.classList.add('reveal-pending');
      observer.observe(el);
    });

    /* Rede de segurança: conteúdo já visível nunca fica invisível,
       mesmo se o observer não disparar (aba em background, etc.). */
    const sweep = () => {
      items.forEach(el => {
        if (!el.classList.contains('reveal-pending') || el.classList.contains('is-in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.15 && r.bottom > -120) reveal(el);
      });
    };

    window.addEventListener('load', () => window.setTimeout(sweep, 100), { once: true });
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep, { passive: true });
    document.addEventListener('visibilitychange', sweep);
    window.setTimeout(sweep, 900);
    window.setTimeout(sweep, 2200);

    /* Último recurso: se algo ainda estiver pendente após o carregamento
       completo, libera tudo — prioriza conteúdo visível sobre animação. */
    window.addEventListener('load', () => {
      window.setTimeout(() => {
        $$('.reveal-pending:not(.is-in)').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 2.5) el.classList.add('is-in');
        });
      }, 3000);
    }, { once: true });
  }

  /* ---------------------------------------------------------
     3. Navegação: mobile drawer + seção ativa
  --------------------------------------------------------- */
  function initNav() {
    const toggle = $('.nav-toggle');
    const drawer = $('.mobile-nav');
    const closeBtn = $('.mobile-nav__close');

    const close = () => {
      if (!drawer) return;
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus({ preventScroll: true });
      }
      document.body.style.overflow = '';
    };

    if (toggle && drawer) {
      toggle.addEventListener('click', () => {
        const open = drawer.classList.toggle('is-open');
        drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
          const first = drawer.querySelector('a');
          if (first) first.focus({ preventScroll: true });
        }
      });
      drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    }
    if (closeBtn) closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) close();
    });

    /* destaque da seção atual */
    const links = $$('[data-nav-link]');
    const sections = links
      .map(l => {
        const id = l.getAttribute('href');
        return id && id.startsWith('#') ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        links.forEach(l => {
          const on = l.getAttribute('href') === id;
          l.classList.toggle('is-active', on);
          if (on) l.setAttribute('aria-current', 'true');
          else l.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => spy.observe(s));
  }

  /* ---------------------------------------------------------
     4. Canvas do hero: rede de partículas (decorativo)
  --------------------------------------------------------- */
  function initHeroCanvas() {
    const canvas = $('#hero-canvas');
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [];
    let raf = null;
    let visible = true;

    const PALETTE = [
      'rgba(34, 211, 238,',
      'rgba(61, 123, 255,',
      'rgba(139, 92, 246,'
    ];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = w < 640 ? 34 : w < 1024 ? 56 : 78;
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.7 + 0.7,
        c: PALETTE[Math.floor(Math.random() * PALETTE.length)]
      }));
    }

    function draw() {
      if (!visible) { raf = null; return; }
      ctx.clearRect(0, 0, w, h);

      const maxDist = w < 640 ? 104 : 138;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxDist * maxDist) continue;
          const dist = Math.sqrt(d2);
          const alpha = (1 - dist / maxDist) * 0.3;
          ctx.strokeStyle = 'rgba(105, 160, 255,' + alpha.toFixed(3) + ')';
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }

        ctx.fillStyle = n.c + '0.75)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(draw);
    }

    resize();
    draw();

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        resize();
      }, 180);
    }, { passive: true });

    /* pausa quando sai da viewport ou aba fica oculta */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        entries.forEach(e => {
          visible = e.isIntersecting;
          if (visible && raf === null) raf = window.requestAnimationFrame(draw);
        });
      }, { threshold: 0 }).observe(canvas);
    }
    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden;
      if (visible && raf === null) raf = window.requestAnimationFrame(draw);
    });
  }

  /* ---------------------------------------------------------
     5. Cards com brilho que segue o cursor
  --------------------------------------------------------- */
  function initCardSpotlight() {
    if (reduceMotion || window.matchMedia('(hover: none)').matches) return;
    $$('.card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    });
  }

  /* ---------------------------------------------------------
     6. Catálogo de projetos: filtros + cards + modal
  --------------------------------------------------------- */
  function initProjects() {
    const grid = $('#projects-grid');
    if (!grid || !Array.isArray(window.PROJECTS)) return;

    const allProjects = window.SITE_PROJECT
      ? [window.SITE_PROJECT].concat(window.PROJECTS)
      : window.PROJECTS.slice();

    const filterBar = $('#projects-filters');
    const countEl = $('#projects-count');
    const emptyEl = $('#projects-empty');
    const searchInput = $('#projects-search');
    const groups = window.PROJECT_GROUPS || [];

    let activeGroup = 'todos';
    let query = '';

    /* -- filtros -- */
    if (filterBar) {
      filterBar.innerHTML = groups.map(g => {
        const total = g.id === 'todos'
          ? allProjects.length
          : allProjects.filter(p => (p.groups || []).includes(g.id)).length;
        return '<button type="button" class="filter" data-group="' + g.id +
          '" aria-pressed="' + (g.id === 'todos') + '">' + g.label +
          '<span class="filter__count">' + total + '</span></button>';
      }).join('');

      filterBar.addEventListener('click', e => {
        const btn = e.target.closest('.filter');
        if (!btn) return;
        activeGroup = btn.dataset.group;
        $$('.filter', filterBar).forEach(b => {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        render();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        query = searchInput.value.trim().toLowerCase();
        render();
      });
    }

    /* -- montagem do card -- */
    function cardHTML(p, index) {
      const tags = (p.groups || []).slice(0, 1).map(g => {
        const found = groups.find(x => x.id === g);
        return found ? found.label : '';
      }).filter(Boolean);

      const primary = p.currentPage
        ? '<a class="btn btn--ghost btn--sm" href="#inicio">Você está aqui</a>'
        : '<a class="btn btn--ghost btn--sm" href="' + p.url +
          '" target="_blank" rel="noopener noreferrer">Acessar<i class="fa-solid fa-arrow-up-right-from-square"></i></a>';

      return '' +
        '<article class="pcard" data-reveal>' +
          '<div class="pcard__cover ' + (p.palette || 'cat-classicos') + '">' +
            '<span class="pcard__tag">' + (tags[0] || p.cat) + '</span>' +
            '<i class="pcard__glyph ' + (p.glyph || 'fa-solid fa-star') + '" aria-hidden="true"></i>' +
          '</div>' +
          '<div class="pcard__body">' +
            '<h3>' + p.name + '</h3>' +
            '<p>' + p.desc + '</p>' +
            '<div class="pcard__actions">' +
              '<button type="button" class="btn btn--primary btn--sm" data-project-open="' + p.id + '">' +
                'Conhecer<i class="fa-solid fa-arrow-right"></i></button>' +
              primary +
            '</div>' +
          '</div>' +
        '</article>';
    }

    function currentList() {
      return allProjects.filter(p => {
        const inGroup = activeGroup === 'todos' || (p.groups || []).includes(activeGroup);
        if (!inGroup) return false;
        if (!query) return true;
        const hay = (p.name + ' ' + p.desc + ' ' + (p.long || '') + ' ' + p.cat + ' ' +
          (p.highlights || []).join(' ')).toLowerCase();
        return hay.indexOf(query) !== -1;
      });
    }

    function render() {
      const list = currentList();
      grid.innerHTML = list.map(cardHTML).join('');

      if (emptyEl) emptyEl.hidden = list.length > 0;
      if (countEl) {
        countEl.textContent = list.length + (list.length === 1
          ? ' projeto exibido' : ' projetos exibidos') +
          (activeGroup === 'todos' ? ' de ' + allProjects.length : '');
      }

      // cards entram com leve animação de revelação
      if (!reduceMotion) {
        requestAnimationFrame(() => {
          $$('.pcard', grid).forEach((el, i) => {
            el.style.transitionDelay = Math.min(i, 9) * 32 + 'ms';
            el.classList.add('is-in');
          });
        });
      } else {
        $$('.pcard', grid).forEach(el => el.classList.add('is-in'));
      }
    }

    /* -- modal de detalhes -- */
    const modal = $('#project-modal');
    let lastFocused = null;

    function openModal(p) {
      if (!modal) return;
      lastFocused = document.activeElement;

      const setText = (sel, value) => {
        const el = $(sel, modal);
        if (el) el.textContent = value;
      };

      const cover = $('.modal__cover', modal);
      if (cover) cover.className = 'modal__cover ' + (p.palette || 'cat-classicos');

      const glyph = $('.modal__cover i', modal);
      if (glyph) glyph.className = p.glyph || 'fa-solid fa-star';

      setText('#modal-title', p.name);
      setText('#modal-cat', p.cat);
      setText('#modal-desc', p.long || p.desc);

      const facts = $('#modal-facts', modal);
      if (facts) {
        const rows = [
          ['Categoria', p.cat],
          ['Destaques', (p.highlights || []).join(' · ')],
          ['Acesso', p.currentPage ? 'Esta própria página' : (p.url || '—')]
        ].filter(r => r[1]);
        facts.innerHTML = rows.map(r =>
          '<div class="modal__fact"><strong>' + r[0] + '</strong><span>' + r[1] + '</span></div>'
        ).join('');
      }

      const actions = $('#modal-actions', modal);
      if (actions) {
        actions.innerHTML = p.currentPage
          ? '<a class="btn btn--ghost btn--sm" href="#inicio">Ir ao topo</a>'
          : '<a class="btn btn--primary btn--sm" href="' + p.url +
            '" target="_blank" rel="noopener noreferrer">Acessar aplicação' +
            '<i class="fa-solid fa-arrow-up-right-from-square"></i></a>' +
            '<a class="btn btn--ghost btn--sm" href="jogos.html">Ver catálogo completo</a>';
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('has-modal');

      const closeBtn = $('.modal__close', modal);
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('has-modal');
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus({ preventScroll: true });
      }
    }

    grid.addEventListener('click', e => {
      const opener = e.target.closest('[data-project-open]');
      if (!opener) return;
      const p = allProjects.find(x => x.id === opener.dataset.projectOpen);
      if (p) openModal(p);
    });

    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
      });
      const closeBtn = $('.modal__close', modal);
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
      });
    }

    render();
  }

  /* ---------------------------------------------------------
     7. Formulário de contato
     Validação local + envio via WhatsApp (sem backend).
     Nenhum envio é simulado como se tivesse sido entregue
     por e-mail: a mensagem é aberta no app do usuário.
  --------------------------------------------------------- */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    const status = $('#form-status');
    const WA_NUMBER = '5585989002536';

    const showStatus = (msg, isError) => {
      if (!status) return;
      status.textContent = msg;
      status.classList.add('is-visible');
      status.classList.toggle('is-error', !!isError);
    };

    const setError = (field, msg) => {
      const wrap = field.closest('.field');
      if (!wrap) return;
      wrap.classList.toggle('has-error', !!msg);
      const err = $('.field__error', wrap);
      if (err) err.textContent = msg || '';
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };

    const validators = {
      nome: v => v.trim().length >= 2 ? '' : 'Informe seu nome (mínimo 2 caracteres).',
      email: v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) ? '' : 'Informe um e-mail válido.',
      assunto: v => v.trim() ? '' : 'Selecione um assunto.',
      mensagem: v => v.trim().length >= 10 ? '' : 'Escreva ao menos 10 caracteres.'
    };

    const fields = Array.from(form.querySelectorAll('input, select, textarea'))
      .filter(el => validators[el.name]);

    fields.forEach(el => {
      el.addEventListener('blur', () => {
        if (el.value.trim()) setError(el, validators[el.name](el.value));
      });
      el.addEventListener('input', () => {
        if (el.closest('.field') && el.closest('.field').classList.contains('has-error')) {
          setError(el, validators[el.name](el.value));
        }
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      let firstInvalid = null;
      fields.forEach(el => {
        const msg = validators[el.name](el.value);
        setError(el, msg);
        if (msg && !firstInvalid) firstInvalid = el;
      });

      if (firstInvalid) {
        showStatus('Revise os campos destacados para continuar.', true);
        firstInvalid.focus({ preventScroll: false });
        return;
      }

      const data = new FormData(form);
      const nome = String(data.get('nome') || '').trim();
      const email = String(data.get('email') || '').trim();
      const assunto = String(data.get('assunto') || '').trim();
      const mensagem = String(data.get('mensagem') || '').trim();

      const texto = [
        'Olá, Pedro! Meu nome é ' + nome + '.',
        '',
        'Assunto: ' + assunto,
        '',
        mensagem,
        '',
        'Contato: ' + email
      ].join('\n');

      const waURL = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(texto);
      window.open(waURL, '_blank', 'noopener,noreferrer');

      showStatus('Sua mensagem foi preparada e aberta no WhatsApp. Conclua o envio por lá — se a janela não abriu, fale direto pelo número (85) 98900-2536.', false);

      const nomeField = form.querySelector('[name="nome"]');
      if (nomeField) nomeField.focus({ preventScroll: true });
    });
  }

  /* ---------------------------------------------------------
     8. Ano automático no rodapé
  --------------------------------------------------------- */
  function initYear() {
    $$('[data-year]').forEach(el => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------------------------------------------------------
     9. Cópia de e-mail (microinteração com fallback)
  --------------------------------------------------------- */
  function initCopyEmail() {
    $$('[data-copy-email]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const email = btn.dataset.copyEmail;
        const original = btn.getAttribute('aria-label') || '';
        try {
          await navigator.clipboard.writeText(email);
          btn.setAttribute('aria-label', 'E-mail copiado!');
          btn.classList.add('is-copied');
          window.setTimeout(() => {
            btn.setAttribute('aria-label', original);
            btn.classList.remove('is-copied');
          }, 2000);
        } catch (err) {
          window.location.href = 'mailto:' + email;
        }
      });
    });
  }

  /* --------------------------------------------------------- */
  function boot() {
    document.documentElement.classList.add('js');
    initScrollUI();
    initReveal();
    initNav();
    initHeroCanvas();
    initCardSpotlight();
    initProjects();
    initContactForm();
    initYear();
    initCopyEmail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
