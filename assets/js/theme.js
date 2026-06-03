(function () {
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('saashup-theme', theme);

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      var isDark = theme === 'dark';
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      button.querySelector('[data-theme-icon]').textContent = isDark ? '☀' : '☾';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(currentTheme);

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        var nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    });
  });
})();
