// Sets the reader's theme before the page paints, from what they last chose
// (Reef's ThemeInit, upstream a92d845, MIT). Loaded as a classic script from
// the head, so it runs before the body renders.
(function () {
  var dark = false;
  try {
    dark = localStorage.getItem('reef-theme') === 'dark';
  } catch (error) {
    // Storage unavailable: light, as on a first visit.
  }
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
})();
