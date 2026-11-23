(function () {
  var root = document.documentElement;

  // Theme toggle: black and green by default; remembers a switch to light.
  var themeBtn = document.querySelector('.theme-btn');
  function currentTheme() { return root.dataset.theme === 'light' ? 'light' : 'dark'; }
  function labelTheme() {
    themeBtn.setAttribute('aria-label', 'Switch to ' + (currentTheme() === 'dark' ? 'light' : 'dark') + ' theme');
  }
  if (themeBtn) {
    labelTheme();
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      if (next === 'light') root.dataset.theme = 'light'; else delete root.dataset.theme;
      try { localStorage.setItem('theme', next); } catch (e) {}
      labelTheme();
    });
  }

  // Mobile menu.
  var menuBtn = document.querySelector('.menu-btn');
  var links = document.getElementById('nav-links');
  function closeMenu() { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      menuBtn.setAttribute('aria-expanded', String(links.classList.toggle('open')));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { closeMenu(); menuBtn.focus(); }
    });
  }

  // Missing images fall back to a placeholder (drop files into assets/img to fill them).
  document.querySelectorAll('.thumb img, .profile img, .shot img').forEach(function (img) {
    function empty() { img.parentElement.classList.add('empty'); }
    if (img.complete && img.naturalWidth === 0) empty();
    img.addEventListener('error', empty);
  });

  // ABS / details toggles.
  document.querySelectorAll('[data-toggle]').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  });

  // Type-to-filter on list pages.
  var filter = document.querySelector('.filter');
  if (filter) {
    var entries = Array.prototype.slice.call(document.querySelectorAll('.entry'));
    var none = document.querySelector('.no-match');
    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase();
      var shown = 0;
      entries.forEach(function (el) {
        var hit = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
        el.hidden = !hit;
        if (hit) shown++;
      });
      if (none) none.hidden = shown !== 0;
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
