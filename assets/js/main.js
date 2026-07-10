/* ==========================================================================
   BestIPv4Proxies — vanilla JS (no dependencies)
   Handles: mobile nav, dropdowns, FAQ accordion, scroll reveal + score bars,
   back-to-top, and the dynamic footer year.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Dropdown menus (click on mobile, hover handled by CSS on desktop) ---- */
  var drops = document.querySelectorAll(".has-drop");
  drops.forEach(function (drop) {
    var toggle = drop.querySelector(".drop-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function (e) {
      // Only intercept as an accordion on narrow screens
      if (window.matchMedia("(max-width: 940px)").matches) {
        e.preventDefault();
        var isOpen = drop.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
    });
  });

  /* ---- FAQ accordion ---- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : null;
    });
  });

  /* ---- Scroll reveal + animated score bars ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Sticky header shadow on scroll (template "background-header" effect) ---- */
  var siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    var onHeaderScroll = function () {
      if (window.pageYOffset > 10) { siteHeader.classList.add("scrolled"); }
      else { siteHeader.classList.remove("scrolled"); }
    };
    window.addEventListener("scroll", onHeaderScroll, { passive: true });
    onHeaderScroll();
  }

  /* ---- Back to top ---- */
  var toTop = document.getElementById("to-top");
  if (toTop) {
    var onScroll = function () {
      if (window.pageYOffset > 600) { toTop.classList.add("show"); }
      else { toTop.classList.remove("show"); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Dynamic footer year ---- */
  var yearEls = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });

  /* ---- Close mobile nav when a link is tapped ---- */
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
          if (navToggle) navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
})();
