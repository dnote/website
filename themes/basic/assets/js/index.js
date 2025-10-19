/* eslint no-var: 0 */
/* eslint quotes: 0 */
/* eslint vars-on-top: 0 */
/* eslint no-inner-declarations: 0 */

// header transparency
var mainHeaderEl = document.getElementById('main-header');

function setHeaderTransparency() {
  if (document.location.pathname !== '/') {
    return
  }

  const top  = window.pageYOffset || document.documentElement.scrollTop;

  if (top > 0) {
    mainHeaderEl.classList.remove('header-transparent')
  } else {
    mainHeaderEl.classList.add('header-transparent')
  }
}

window.addEventListener('scroll', function(e) {
  setHeaderTransparency();
})

// menu toggle
var mobileMenuEl = document.getElementById('mobile-menu');
var mobileMenuToggleEl = document.getElementById('mobile-menu-toggle');
var mobileMenuBodyEl = document.getElementById('mobile-menu-body');

function closeMenu() {
  mobileMenuEl.classList.remove('is-open');
  setHeaderTransparency()
}


mobileMenuToggleEl.addEventListener('click', function(e) {
  if (mobileMenuEl.classList.contains('is-open')) {
    closeMenu();
  } else {
    mobileMenuEl.classList.add('is-open');
    mainHeaderEl.classList.remove('header-transparent')
  }

  e.stopPropagation();
});

document.body.addEventListener('click', function(e) {
  if (mobileMenuEl.classList.contains('is-open')) {
    var targetEl = e.target;

    if (mobileMenuBodyEl.contains(targetEl)) {
      return;
    }

    closeMenu();
  }
})

// TOC active state tracking
function initTOC() {
  var toc = document.querySelector('.toc-nav');
  if (!toc) {
    return;
  }

  var headings = document.querySelectorAll('.docs-content article h2[id], .docs-content article h3[id]');
  var tocLinks = document.querySelectorAll('.toc-nav a');

  if (headings.length === 0 || tocLinks.length === 0) {
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      var id = entry.target.getAttribute('id');
      var tocLink = document.querySelector('.toc-nav a[href="#' + id + '"]');

      if (tocLink) {
        if (entry.isIntersecting) {
          // Remove active from all links
          tocLinks.forEach(function(link) {
            link.classList.remove('active');
          });
          // Add active to current link
          tocLink.classList.add('active');
        }
      }
    });
  }, {
    rootMargin: '-80px 0px -80% 0px',
    threshold: 0
  });

  headings.forEach(function(heading) {
    observer.observe(heading);
  });
}

// Initialize TOC when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTOC);
} else {
  initTOC();
}
