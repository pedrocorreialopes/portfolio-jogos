/* ============================================================
   catalog.js — Catálogo completo de jogos (jogos.html)
   Usa a mesma fonte de dados de index.html (js/projects.js),
   preservando todos os endereços do arquivo original jogos.html.
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function boot() {
    const grid = $('#catalog-grid');
    if (!grid || !Array.isArray(window.PROJECTS)) return;

    const projects = window.PROJECTS.slice();
    const groups = (window.PROJECT_GROUPS || []).filter(g => g.id !== 'todos');
    const filterBar = $('#catalog-filters');
    const countEl = $('#catalog-count');
    const emptyEl = $('#catalog-empty');
    const searchInput = $('#catalog-search');
    const modal = $('#project-modal');

    let activeGroup = 'todos';
    let query = '';
    let lastFocused = null;

    /* ---------- filtros ---------- */
    if (filterBar) {
      const todosCount = projects.length;
      filterBar.innerHTML =
        '<button type="button" class="filter" data-group="todos" aria-pressed="true">Todos' +
          '<span class="filter__count">' + todosCount + '</span></button>' +
        groups.map(g => {
          const total = projects.filter(p => (p.groups || []).includes(g.id)).length;
          if (!total) return '';
          return '<button type="button" class="filter" data-group="' + g.id +
            '" aria-pressed="false">' + g.label +
            '<span class="filter__count">' + total + '</span></button>';
        }).join('');

      filterBar.addEventListener('click', e => {
        const btn = e.target.closest('.filter');
        if (!btn) return;
        activeGroup = btn.dataset.group;
        $$('.filter', filterBar).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
        render();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        query = searchInput.value.trim().toLowerCase();
        render();
      });
    }

    /* ---------- cards ---------- */
    function labelFor(p) {
      const g = (p.groups || [])[0];
      const found = groups.find(x => x.id === g);
      return found ? found.label : p.cat;
    }

    function cardHTML(p) {
      return '' +
        '<article class="pcard" data-reveal>' +
          '<div class="pcard__cover ' + (p.palette || 'cat-classicos') + '">' +
            '<span class="pcard__tag">' + labelFor(p) + '</span>' +
            '<i class="pcard__glyph ' + (p.glyph || 'fa-solid fa-star') + '" aria-hidden="true"></i>' +
          '</div>' +
          '<div class="pcard__body">' +
            '<h3>' + p.name + '</h3>' +
            '<p>' + p.desc + '</p>' +
            '<div class="pcard__actions">' +
              '<a class="btn btn--primary btn--sm" href="' + p.url +
                '" target="_blank" rel="noopener noreferrer">Jogar' +
                '<i class="fa-solid fa-arrow-up-right-from-square"></i></a>' +
              '<button type="button" class="btn-link" data-project-open="' + p.id + '">' +
                'Detalhes<i class="fa-solid fa-arrow-right"></i></button>' +
            '</div>' +
          '</div>' +
        '</article>';
    }

    function currentList() {
      return projects.filter(p => {
        if (activeGroup !== 'todos' && !(p.groups || []).includes(activeGroup)) return false;
        if (!query) return true;
        const hay = (p.name + ' ' + p.desc + ' ' + p.cat + ' ' + (p.highlights || []).join(' ')).toLowerCase();
        return hay.indexOf(query) !== -1;
      });
    }

    function render() {
      const list = currentList();
      grid.innerHTML = list.map(cardHTML).join('');

      if (emptyEl) emptyEl.hidden = list.length > 0;
      if (countEl) {
        countEl.textContent = list.length + (list.length === 1 ? ' jogo' : ' jogos') +
          (activeGroup === 'todos' && !query ? ' publicados' : ' encontrados');
      }

      if (!reduceMotion) {
        requestAnimationFrame(() => {
          $$('.pcard', grid).forEach((el, i) => {
            el.style.transitionDelay = Math.min(i, 9) * 30 + 'ms';
            el.classList.add('is-in');
          });
        });
      } else {
        $$('.pcard', grid).forEach(el => el.classList.add('is-in'));
      }
    }

    /* ---------- modal ---------- */
    function openModal(p) {
      if (!modal) return;
      lastFocused = document.activeElement;

      const setText = (sel, v) => { const el = $(sel, modal); if (el) el.textContent = v; };

      const cover = $('.modal__cover', modal);
      if (cover) cover.className = 'modal__cover ' + (p.palette || 'cat-classicos');
      const glyph = $('.modal__cover i', modal);
      if (glyph) glyph.className = p.glyph || 'fa-solid fa-star';

      setText('#modal-title', p.name);
      setText('#modal-cat', p.cat);
      setText('#modal-desc', p.long || p.desc);

      const facts = $('#modal-facts', modal);
      if (facts) {
        facts.innerHTML = [
          ['Categoria', p.cat],
          ['Destaques', (p.highlights || []).join(' · ')],
          ['Endereço', p.url]
        ].filter(r => r[1]).map(r =>
          '<div class="modal__fact"><strong>' + r[0] + '</strong><span>' + r[1] + '</span></div>'
        ).join('');
      }

      const actions = $('#modal-actions', modal);
      if (actions) {
        actions.innerHTML =
          '<a class="btn btn--primary btn--sm" href="' + p.url +
            '" target="_blank" rel="noopener noreferrer">Abrir aplicação' +
            '<i class="fa-solid fa-arrow-up-right-from-square"></i></a>' +
          '<a class="btn btn--ghost btn--sm" href="index.html#projetos">Ver no portfólio</a>';
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
      const p = projects.find(x => x.id === opener.dataset.projectOpen);
      if (p) openModal(p);
    });

    if (modal) {
      modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
      const closeBtn = $('.modal__close', modal);
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
      });
    }

    /* ---------- contadores do topo ---------- */
    const totalEl = $('#stat-total');
    if (totalEl) totalEl.textContent = String(projects.length);
    const catEl = $('#stat-categories');
    if (catEl) {
      const used = new Set();
      projects.forEach(p => (p.groups || []).forEach(g => used.add(g)));
      catEl.textContent = String(used.size);
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
