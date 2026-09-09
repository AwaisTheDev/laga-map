const MAP_SRC = "wisonwold.svg";
const VIEWBOX = { width: 1476, height: 794 };

// `marker` is only needed where a group is missing or its bounding box centre
// lands outside the shape it labels (long clipped paths, L-shaped plots).
// Optional `image` paths sit under /images/ and show as the slider thumbnail.
const PLACES = [
  {
    id: 1,
    name: "Gym",
    type: "Wellness",
    description: "A light-filled training space designed for strength, mobility and everyday performance.",
    image: "images/01-gym.jpg",
  },
  {
    id: 2,
    name: "Padel Cafe",
    type: "Food & drink",
    description: "Fresh coffee, cold drinks and relaxed bites overlooking the energy of the padel courts.",
    image: "images/02-padel-cafe.jpg",
    marker: [507, 93],
  },
  {
    id: 3,
    name: "Padel Courts",
    type: "Activities",
    description: "Five covered international-standard courts for coaching, tournaments, social play and every level of player.",
    image: "images/03-padel-courts.jpg",
  },
  {
    id: 4,
    name: "Security Post",
    type: "Services",
    description: "A discreet, professionally managed entrance providing controlled access and around-the-clock site security.",
    image: "images/04-security-post.jpg",
  },
  {
    id: 5,
    name: "Fire Pit",
    type: "Lounge",
    description: "A relaxed gathering place to thaw out after an ice bath.",
    image: "images/05-fire-pit.jpg",
    // Sit just off the top-right of the pit so the fire stays visible.
    marker: [358, 216],
  },
  {
    id: 6,
    name: "Club Pool",
    type: "Pool",
    description: "A tropical social pool where guests can swim, unwind and spend the day together.",
    image: "images/06-club-pool.jpg",
  },
  {
    id: 7,
    name: "Wellness",
    type: "Wellness",
    description: "A restorative space featuring saunas, ice baths and dedicated areas for recovery and relaxation.",
    image: "images/07-wellness.jpg",
  },
  {
    id: 8,
    name: "Bar",
    type: "Food & drink",
    description: "An open-air bar for relaxed drinks, golden-hour gatherings and Lombok’s spectacular sunsets.",
    image: "images/08-bar.jpg",
  },
  {
    id: 9,
    name: "Restaurant",
    type: "Food & drink",
    description: "Fresh, nourishing food served in a relaxed tropical setting overlooking the pool and gardens.",
    image: "images/09-restaurant.jpg",
  },
  {
    id: 10,
    name: "Parking",
    type: "Arrival",
    description: "Convenient, landscaped parking positioned close to the club entrance and main facilities.",
    image: "images/10-parking.jpg",
  },
  {
    id: 11,
    name: "Kid Play",
    type: "Activities",
    description: "A safe space designed with natural materials for Laga’s youngest guests.",
    image: "images/11-kid-play.jpg",
  },
  {
    id: 12,
    name: "Resort Reception",
    type: "Arrival",
    description: "The welcoming arrival point for residents and guests, offering assistance throughout their stay.",
    image: "images/12-resort-reception.jpg",
  },
  {
    id: 13,
    name: "Villa Aruna",
    type: "Villa",
    description: "Spacious two-bedroom pool villas created for relaxed family living, longer stays and effortless entertaining.",
    image: "images/13-villa-aruna.jpg",
  },
  {
    id: 14,
    name: "Wooden Walkway",
    type: "Path",
    description: "A landscaped timber boardwalk connecting the residences and resort facilities directly to the beach.",
    image: "images/14-wooden-walkway.jpg",
  },
  {
    id: 15,
    name: "Villa Laga",
    type: "Villa",
    description: "A collection of beautifully designed one-bedroom hotel suites within the heart of the Laga destination.",
    image: "images/15-villa-laga.jpg",
  },
  {
    id: 16,
    name: "Villa Muara",
    type: "Villa",
    description: "Private one-bedroom beachfront pool villas designed for couples, retreats and relaxed tropical living.",
    image: "images/16-villa-muara.jpg",
  },
  {
    id: 17,
    name: "Beach Front Pool",
    type: "Pool",
    description: "A peaceful pool overlooking the coastline, reserved for guests staying within the beachfront residences and using the beach shack.",
    image: "images/17-beachfront-pool.jpg",
  },
  {
    id: 18,
    name: "The Beach Shack",
    type: "Food & drink",
    description: "A casual beachside spot for refreshments, laid-back afternoons and barefoot gatherings by the ocean.",
    image: "images/18-beach-shack.jpg",
  },
  {
    id: 19,
    name: "The Beach",
    type: "Beach",
    description: "Direct access to Kuta Bay for morning walks, swimming, sunset views and days beside the sea.",
    image: "images/19-the-beach.jpg",
  },
  {
    id: 20,
    name: "The Groove Groin",
    type: "Landmark",
    description: "A distinctive coastal viewpoint where the river, beach and ocean landscape come together.",
    image: "images/20-groove-groin.jpg",
  },
];

const FILTER_MARKUP = `
  <filter id="place-hover" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="0" result="gray" />
    <feComponentTransfer in="gray" result="tint">
      <feFuncR type="table" tableValues="0.35 0.98" />
      <feFuncG type="table" tableValues="0.09 0.82" />
      <feFuncB type="table" tableValues="0.08 0.79" />
    </feComponentTransfer>
    <feComponentTransfer in="tint" result="softTint">
      <feFuncA type="linear" slope="0.4" />
    </feComponentTransfer>
    <feMerge>
      <feMergeNode in="SourceGraphic" />
      <feMergeNode in="softTint" />
    </feMerge>
  </filter>
  <filter id="place-active" x="-18%" y="-18%" width="136%" height="136%" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="0" result="gray" />
    <feComponentTransfer in="gray" result="tint">
      <feFuncR type="table" tableValues="0.3 0.98" />
      <feFuncG type="table" tableValues="0.05 0.74" />
      <feFuncB type="table" tableValues="0.04 0.7" />
    </feComponentTransfer>
    <feComponentTransfer in="tint" result="softTint">
      <feFuncA type="linear" slope="0.68" />
    </feComponentTransfer>
    <feMerge result="tinted">
      <feMergeNode in="SourceGraphic" />
      <feMergeNode in="softTint" />
    </feMerge>
    <feDropShadow dx="0" dy="0" stdDeviation="3.5" flood-color="#7d1c18" flood-opacity="0.85" />
  </filter>
`;

const markerLayer = document.querySelector("#marker-layer");
const mapArt = document.querySelector("#map-art");
const mapPanel = document.querySelector("#map-section");
const mapStage = document.querySelector(".map-stage");
const hoverLabel = document.querySelector("#hover-label");
const viewport = document.querySelector("#map-viewport");
const canvas = document.querySelector("#map-canvas");
const sliderTrack = document.querySelector("#slider-track");
const sliderPrev = document.querySelector("#slider-prev");
const sliderNext = document.querySelector("#slider-next");

const groups = new Map();
const markers = new Map();
const cards = new Map();

// Maps every point of the artwork to the place that owns it, so hit-testing
// never depends on which decorative path happens to be painted on top.
let hitGrid = null;
let svgRoot = null;

let activeId = null;
let hoverId = null;
let zoom = 1;
let panX = 0;
let panY = 0;
let drag = null;

function placeById(id) {
  return PLACES.find((place) => place.id === id);
}

function padNumber(id) {
  return String(id).padStart(2, "0");
}

async function loadMap() {
  const response = await fetch(MAP_SRC);
  if (!response.ok) throw new Error(`Unable to load ${MAP_SRC}`);
  mapArt.innerHTML = await response.text();

  const svg = mapArt.querySelector("svg");
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("aria-hidden", "true");

  const defs = svg.querySelector("defs") ?? svg.appendChild(document.createElementNS(svg.namespaceURI, "defs"));
  defs.insertAdjacentHTML("beforeend", FILTER_MARKUP);

  svgRoot = svg;
  tagPlaceGroups(svg);
}

// Each group is rasterised on its own so antialiased edges can be thresholded
// away instead of blending into a neighbouring place's id.
function buildHitMap() {
  const { width, height } = VIEWBOX;
  const grid = new Uint8Array(width * height);

  const surface = document.createElement("canvas");
  surface.width = width;
  surface.height = height;

  const ctx = surface.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;

  const ordered = [...groups]
    .map(([id, group]) => ({ id, group, box: group.getBBox() }))
    .sort((a, b) => b.box.width * b.box.height - a.box.width * a.box.height);

  // Largest first, so compact places keep their pixels where footprints overlap.
  ordered.forEach(({ id, group, box }) => {
    const x = Math.max(0, Math.floor(box.x - 2));
    const y = Math.max(0, Math.floor(box.y - 2));
    const w = Math.min(width - x, Math.ceil(box.width + 4));
    const h = Math.min(height - y, Math.ceil(box.height + 4));
    if (w <= 0 || h <= 0) return;

    ctx.clearRect(x, y, w, h);
    group.querySelectorAll("path, ellipse, circle, rect").forEach((element) => {
      const shape = outlineOf(element);
      if (!shape) return;
      ctx.fill(shape);
      ctx.stroke(shape);
    });

    const { data } = ctx.getImageData(x, y, w, h);
    for (let row = 0; row < h; row++) {
      const gridRow = (y + row) * width + x;
      for (let column = 0; column < w; column++) {
        if (data[(row * w + column) * 4 + 3] > 128) grid[gridRow + column] = id;
      }
    }
  });

  hitGrid = grid;
}

// The artwork is drawn almost entirely with <path>, but a few shapes such as
// the fire pit's scorched ground are primitives.
function outlineOf(element) {
  const value = (name) => Number(element.getAttribute(name)) || 0;
  const shape = new Path2D();

  switch (element.localName) {
    case "path": {
      const definition = element.getAttribute("d");
      return definition ? new Path2D(definition) : null;
    }
    case "ellipse":
      shape.ellipse(value("cx"), value("cy"), value("rx"), value("ry"), 0, 0, Math.PI * 2);
      return shape;
    case "circle":
      shape.arc(value("cx"), value("cy"), value("r"), 0, Math.PI * 2);
      return shape;
    case "rect":
      shape.rect(value("x"), value("y"), value("width"), value("height"));
      return shape;
    default:
      return null;
  }
}

function sampleHitMap(x, y) {
  if (x < 0 || y < 0 || x >= VIEWBOX.width || y >= VIEWBOX.height) return 0;
  return hitGrid[y * VIEWBOX.width + x];
}

function placeAtPoint(clientX, clientY) {
  if (!hitGrid || !svgRoot) return null;

  const screenToSvg = svgRoot.getScreenCTM();
  if (!screenToSvg) return null;

  const point = new DOMPoint(clientX, clientY).matrixTransform(screenToSvg.inverse());
  const x = Math.round(point.x);
  const y = Math.round(point.y);

  const direct = sampleHitMap(x, y);
  if (direct) return direct;

  // Sparse artwork such as parking bays or walkway planks leaves gaps between
  // painted pixels, so accept the nearest place within a few screen pixels.
  const scale = Math.abs(screenToSvg.a) || 1;
  const tolerance = Math.min(14, Math.max(2, Math.round(7 / scale)));

  for (let radius = 1; radius <= tolerance; radius++) {
    for (let offset = -radius; offset <= radius; offset++) {
      const candidate =
        sampleHitMap(x + offset, y - radius) ||
        sampleHitMap(x + offset, y + radius) ||
        sampleHitMap(x - radius, y + offset) ||
        sampleHitMap(x + radius, y + offset);
      if (candidate) return candidate;
    }
  }

  return null;
}

// Artwork groups are named "<number>. <label>", e.g. `1. Gym`. Illustrator
// exports escape those names, so `1. Gym` arrives as `_x31_._Gym`.
function decodeGroupId(id) {
  return id.replace(/_x([0-9a-f]{2,6})_/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
}

function tagPlaceGroups(svg) {
  svg.querySelectorAll("g[id]").forEach((group) => {
    const match = /^(\d+)\.[\s_]/.exec(decodeGroupId(group.id));
    if (!match) return;

    const id = Number(match[1]);
    if (!placeById(id) || groups.has(id)) return;

    group.classList.add("place");
    group.dataset.locationId = String(id);
    groups.set(id, group);
  });
}

function buildMarkers() {
  PLACES.forEach((place) => {
    const point = markerPoint(place);
    if (!point) return;

    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "map-marker";
    marker.dataset.locationId = String(place.id);
    marker.style.left = `${(point[0] / VIEWBOX.width) * 100}%`;
    marker.style.top = `${(point[1] / VIEWBOX.height) * 100}%`;
    marker.textContent = String(place.id);
    marker.setAttribute("aria-label", `Select ${place.name}`);
    markerLayer.append(marker);
    markers.set(place.id, marker);
  });
}

function markerPoint(place) {
  if (place.marker) return place.marker;

  const group = groups.get(place.id);
  if (!group) return null;

  try {
    const box = group.getBBox();
    return [box.x + box.width / 2, box.y + box.height / 2];
  } catch {
    return null;
  }
}

function renderSlider() {
  sliderTrack.replaceChildren();
  cards.clear();

  PLACES.forEach((place) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "slider-card";
    button.dataset.locationId = String(place.id);
    button.setAttribute("aria-label", `${padNumber(place.id)} ${place.name}`);

    const thumb = document.createElement("div");
    thumb.className = "slider-thumb";

    if (place.image) {
      const image = document.createElement("img");
      image.src = place.image;
      image.alt = "";
      image.loading = "lazy";
      thumb.append(image);
    } else {
      const fallback = document.createElement("span");
      fallback.className = "slider-thumb-fallback";
      fallback.textContent = padNumber(place.id);
      thumb.append(fallback);
    }

    const body = document.createElement("div");
    body.className = "slider-body";

    const titleRow = document.createElement("div");
    titleRow.className = "slider-title-row";

    const number = document.createElement("span");
    number.className = "slider-number";
    number.textContent = padNumber(place.id);

    const name = document.createElement("span");
    name.className = "slider-name";
    name.textContent = place.name;

    const description = document.createElement("p");
    description.className = "slider-description";
    description.textContent = place.description;

    titleRow.append(number, name);
    body.append(titleRow, description);
    button.append(thumb, body);
    sliderTrack.append(button);
    cards.set(place.id, button);
  });

  updateSliderNav();
}

function setHover(id, event) {
  if (hoverId !== id) {
    if (hoverId !== null) groups.get(hoverId)?.classList.remove("is-hovered");
    hoverId = id;
    if (id !== null) {
      groups.get(id)?.classList.add("is-hovered");
      hoverLabel.textContent = placeById(id).name;
    }
  }

  const showLabel = id !== null && id !== activeId;
  hoverLabel.classList.toggle("is-visible", showLabel);
  if (showLabel) positionHoverLabel(id, event);
}

function positionHoverLabel(id, event) {
  const panel = mapStage.getBoundingClientRect();
  const label = hoverLabel.getBoundingClientRect();

  let centerX;
  let top;

  if (event) {
    centerX = event.clientX;
    top = event.clientY - 16;
  } else {
    const source = markers.get(id) ?? groups.get(id);
    if (!source) return;
    const rect = source.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    top = rect.top - 12;
  }

  const x = clamp(centerX - panel.left, label.width / 2 + 8, panel.width - label.width / 2 - 8);
  const y = clamp(top - panel.top, label.height + 8, panel.height - 8);

  hoverLabel.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
}

function selectPlace(id, { scroll = true } = {}) {
  const place = placeById(id);
  if (!place) return;

  activeId = id;

  groups.forEach((group, groupId) => group.classList.toggle("is-active", groupId === id));
  markers.forEach((marker, markerId) => marker.classList.toggle("is-active", markerId === id));
  cards.forEach((card, cardId) => card.classList.toggle("is-active", cardId === id));

  if (scroll) scrollCardIntoView(id);
  setHover(hoverId);
}

function clearSelection() {
  activeId = null;
  groups.forEach((group) => group.classList.remove("is-active"));
  markers.forEach((marker) => marker.classList.remove("is-active"));
  cards.forEach((card) => card.classList.remove("is-active"));
  setHover(hoverId);
}

function scrollCardIntoView(id) {
  const card = cards.get(id);
  if (!card) return;

  const trackRect = sliderTrack.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const left = sliderTrack.scrollLeft + (cardRect.left - trackRect.left) - (trackRect.width - cardRect.width) / 2;
  sliderTrack.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
}

function updateSliderNav() {
  const max = sliderTrack.scrollWidth - sliderTrack.clientWidth;
  sliderPrev.disabled = sliderTrack.scrollLeft <= 4;
  sliderNext.disabled = sliderTrack.scrollLeft >= max - 4;
}

function scrollSlider(direction) {
  const amount = Math.max(220, sliderTrack.clientWidth * 0.7);
  sliderTrack.scrollBy({ left: direction * amount, behavior: "smooth" });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

// Fits the artwork inside the stage, but never below a legible width on
// narrow screens, where the map stays pannable instead.
function fitCanvas() {
  const { width, height } = viewport.getBoundingClientRect();
  const ratio = VIEWBOX.width / VIEWBOX.height;
  // Below this width the artwork is too dense to read, so it overflows and
  // stays pannable instead of shrinking further.
  const floor = width < 560 ? 820 : 0;
  const canvasWidth = Math.max(Math.min(width, height * ratio), floor);

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasWidth / ratio}px`;
}

function updateTransform() {
  fitCanvas();
  viewport.classList.toggle("is-zoomed", zoom > 1);
  canvas.style.transform = `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${zoom})`;
  if (hoverId !== null) positionHoverLabel(hoverId);
}

function setZoom(next) {
  zoom = clamp(next, 0.75, 3);
  if (zoom <= 1) {
    panX *= 0.7;
    panY *= 0.7;
  }
  updateTransform();
}

function locationIdFrom(target) {
  const owner = target.closest?.("[data-location-id]");
  return owner ? Number(owner.dataset.locationId) : null;
}

// Markers and slider cards carry their own id; anywhere else on the map is
// resolved through the hit map rather than the topmost painted element.
function mapIdFromEvent(event) {
  const marker = event.target.closest?.(".map-marker");
  if (marker) return Number(marker.dataset.locationId);
  return placeAtPoint(event.clientX, event.clientY);
}

function wireEvents() {
  sliderTrack.addEventListener("click", (event) => {
    const id = locationIdFrom(event.target);
    if (id !== null) selectPlace(id);
  });

  sliderTrack.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    setHover(locationIdFrom(event.target));
  });

  sliderTrack.addEventListener("pointerleave", () => setHover(null));
  sliderTrack.addEventListener("scroll", updateSliderNav, { passive: true });
  sliderPrev.addEventListener("click", () => scrollSlider(-1));
  sliderNext.addEventListener("click", () => scrollSlider(1));

  let hoverFrame = null;
  viewport.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || drag?.moved || hoverFrame) return;
    hoverFrame = requestAnimationFrame(() => {
      hoverFrame = null;
      const id = mapIdFromEvent(event);
      viewport.classList.toggle("is-pointing", id !== null);
      setHover(id, event);
    });
  });

  viewport.addEventListener("pointerleave", () => {
    viewport.classList.remove("is-pointing");
    setHover(null);
  });

  viewport.addEventListener("click", (event) => {
    if (drag?.moved) return;
    const id = mapIdFromEvent(event);
    if (id === null) clearSelection();
    else selectPlace(id);
  });

  viewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      setZoom(zoom + (event.deltaY < 0 ? 0.14 : -0.14));
    },
    { passive: false },
  );

  viewport.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, panX, panY, moved: false };
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 4) return;

    drag.moved = true;
    viewport.classList.add("is-dragging");
    setHover(null);
    panX = drag.panX + dx;
    panY = drag.panY + dy;
    updateTransform();
  });

  const endDrag = (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    viewport.classList.remove("is-dragging");
    // Cleared after the click event so a drag never opens a selection.
    window.setTimeout(() => {
      drag = null;
    }, 0);
  };

  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);

  document.querySelector("#zoom-in").addEventListener("click", () => setZoom(zoom + 0.25));
  document.querySelector("#zoom-out").addEventListener("click", () => setZoom(zoom - 0.25));
  // Observing the section rather than the window also catches an iframe or a
  // fluid layout resizing the map while the window itself stays put.
  new ResizeObserver(() => {
    updateTransform();
    updateSliderNav();
  }).observe(mapPanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") clearSelection();
  });
}

async function start() {
  renderSlider();
  wireEvents();
  updateTransform();

  try {
    await loadMap();
    buildMarkers();
    buildHitMap();
    updateTransform();
    selectPlace(PLACES[0].id, { scroll: false });
  } catch (error) {
    mapArt.innerHTML = `<p class="load-error">The map artwork could not be loaded. Serve this folder over HTTP and reload.</p>`;
    console.error(error);
  }
}

start();
