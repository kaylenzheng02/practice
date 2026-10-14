(function () {
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function currentFile() {
    var p = window.location.pathname.replace(/\\/g, "/");
    var parts = p.split("/").filter(Boolean);
    var last = (parts[parts.length - 1] || "").toLowerCase();
    if (!last) return "index.html";
    return last;
  }

  var here = currentFile();

  document.querySelectorAll(".top-nav a[href]").forEach(function (a) {
    var href = (a.getAttribute("href") || "").trim();
    if (!href || href === "#") return;
    var target = href.split("/").pop().split("?")[0].toLowerCase() || "index.html";
    if (target === here) {
      a.classList.add("top-nav__link--current");
      a.setAttribute("aria-current", "page");
    }
  });

  var tilt = document.querySelector("[data-showcase-tilt]");
  if (
    tilt &&
    window.matchMedia &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    var max = 8;
    var stage = tilt.closest(".showcase__stage") || tilt;

    function setTilt(x, y) {
      tilt.style.setProperty("--tilt-x", x.toFixed(2) + "deg");
      tilt.style.setProperty("--tilt-y", y.toFixed(2) + "deg");
    }

    stage.addEventListener("pointermove", function (e) {
      var rect = stage.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt(-py * max * 2, px * max * 2);
    });

    stage.addEventListener("pointerleave", function () {
      setTilt(0, 0);
    });
  }
})();
