/**
 * Drop-in loader for the interactive map.
 *
 *   <script src="https://your-host.example.com/embed.js"></script>
 *
 * Renders a responsive iframe in place of the script tag and hands the host
 * page's typography to the map. Options, all optional, as data attributes:
 *
 *   data-src           map page URL           (default: index.html next to this file)
 *   data-title         iframe title           (default: "Interactive map")
 *   data-background    frame background       (default: #f4f2ee)
 *   data-fonts         "off" to keep the map's own fonts
 *   data-font-body     override the body font family
 *   data-font-heading  override the heading font family
 *   data-font-css      extra font stylesheet URLs, comma separated
 *   data-aspect        wide-screen ratio      (default: 1476 / 794)
 *   data-aspect-md     <= 900px ratio         (default: 3 / 2)
 *   data-aspect-sm     <= 600px ratio         (default: 1 / 1)
 *   data-min-height    <= 600px min height    (default: 400px)
 */
(function () {
  var script = document.currentScript;
  if (!script) return;

  var options = script.dataset;

  // Providers whose stylesheets carry only @font-face rules, so forwarding them
  // into the frame cannot disturb the map's own layout.
  var FONT_PROVIDERS = /^(fonts\.googleapis\.com|use\.typekit\.net|fonts\.bunny\.net|fonts\.cdnfonts\.com|api\.fontshare\.com)$/;

  function familyOf(element, fallback) {
    if (!element) return fallback;
    var family = getComputedStyle(element).fontFamily;
    return family || fallback;
  }

  function headingFamily() {
    var heading = document.querySelector("h1, h2, h3");
    if (heading) return familyOf(heading, "");
    if (!document.body) return "";

    // No heading on the page yet, so measure what one would inherit.
    var probe = document.createElement("h2");
    probe.style.cssText = "position:absolute;left:-9999px;height:0;overflow:hidden";
    document.body.appendChild(probe);
    var family = familyOf(probe, "");
    probe.remove();
    return family;
  }

  function fontStylesheets() {
    var sheets = [];

    (options.fontCss || "").split(",").forEach(function (href) {
      href = href.trim();
      if (href.slice(0, 8) === "https://") sheets.push(href);
    });

    document.querySelectorAll('link[rel="stylesheet"][href]').forEach(function (link) {
      var url;
      try {
        url = new URL(link.href, location.href);
      } catch (error) {
        return;
      }
      if (url.protocol === "https:" && FONT_PROVIDERS.test(url.hostname)) sheets.push(url.href);
    });

    return sheets.slice(0, 4);
  }

  var mapUrl = new URL(options.src || "index.html", script.src);

  if (options.fonts !== "off") {
    var body = options.fontBody || familyOf(document.body, "");
    var heading = options.fontHeading || headingFamily() || body;

    if (body) mapUrl.searchParams.set("font-body", body);
    if (heading) mapUrl.searchParams.set("font-heading", heading);
    fontStylesheets().forEach(function (href) {
      mapUrl.searchParams.append("font-css", href);
    });
  }

  if (!document.getElementById("laga-map-embed-styles")) {
    var styles = document.createElement("style");
    styles.id = "laga-map-embed-styles";
    styles.textContent = [
      ".laga-map-embed{width:100%;aspect-ratio:var(--laga-aspect,1476/794);",
      "background:var(--laga-background,#f4f2ee);}",
      ".laga-map-embed>iframe{display:block;width:100%;height:100%;border:0;}",
      "@media(max-width:900px){.laga-map-embed{aspect-ratio:var(--laga-aspect-md,3/2);}}",
      "@media(max-width:600px){.laga-map-embed{aspect-ratio:var(--laga-aspect-sm,1/1);",
      "min-height:var(--laga-min-height,400px);}}",
    ].join("");
    document.head.appendChild(styles);
  }

  var wrapper = document.createElement("div");
  wrapper.className = "laga-map-embed";

  [
    ["--laga-aspect", options.aspect],
    ["--laga-aspect-md", options.aspectMd],
    ["--laga-aspect-sm", options.aspectSm],
    ["--laga-min-height", options.minHeight],
    ["--laga-background", options.background],
  ].forEach(function (pair) {
    if (pair[1]) wrapper.style.setProperty(pair[0], pair[1]);
  });

  var frame = document.createElement("iframe");
  frame.src = mapUrl.href;
  frame.title = options.title || "Interactive map";
  frame.loading = "lazy";
  frame.setAttribute("allowfullscreen", "");

  wrapper.appendChild(frame);
  script.parentNode.insertBefore(wrapper, script);
})();
