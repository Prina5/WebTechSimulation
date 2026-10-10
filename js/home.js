/* ==========================================================
   HOME - the depth instrument
   Lesson hooks: events, functions, math, loops, DOM updates,
   requestAnimationFrame
   ========================================================== */

const slider = document.querySelector('#depth-slider');
const hero = document.querySelector('#hero');
const valueEl = document.querySelector('#depth-value');
const zoneNameEl = document.querySelector('#zone-name');
const zoneNoteEl = document.querySelector('#zone-note');
const meetList = document.querySelector('#meet-list');
const strip = document.querySelector('#zone-strip');
const diveBtn = document.querySelector('#dive-btn');

/* ----- colour blending between zones ----- */
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function seaColor(depth) {
  // stops: each zone's colour at the top of that zone, plus the very bottom
  const stops = ZONES.map((z) => ({ d: z.top, c: hexToRgb(z.color) }));
  stops.push({ d: MAX_DEPTH, c: hexToRgb(ZONES[ZONES.length - 1].color) });

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (depth >= a.d && depth <= b.d) {
      const t = (depth - a.d) / (b.d - a.d);
      const rgb = a.c.map((v, k) => Math.round(v + (b.c[k] - v) * t));
      return `rgb(${rgb.join(',')})`;
    }
  }
  return ZONES[0].color;
}

/* ----- the zone strip under the slider ----- */
function buildStrip() {
  ZONES.forEach((z) => {
    const span = document.createElement('span');
    const start = sliderFromDepth(z.top) / 10;
    const end = sliderFromDepth(Math.min(z.bottom, MAX_DEPTH)) / 10;
    span.style.flexBasis = `${end - start}%`;
    span.style.background = z.accent;
    span.textContent = z.short;
    strip.append(span);
  });
  const marker = document.createElement('div');
  marker.className = 'strip-marker';
  marker.id = 'strip-marker';
  strip.append(marker);
}

/* ----- creatures at this depth ----- */
function renderMeet(depth) {
  meetList.replaceChildren();
  const here = CREATURES.filter((c) => depth >= c.min && depth <= c.max);

  if (here.length === 0) {
    const p = document.createElement('p');
    p.className = 'meet-empty';
    p.textContent = 'No animals in the field guide are recorded at this depth. Try going deeper or shallower.';
    meetList.append(p);
    return;
  }

  here.slice(0, 5).forEach((c) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `creatures.html#${c.id}`;
    a.textContent = c.name;
    li.append(a);
    meetList.append(li);
  });

  if (here.length > 5) {
    const li = document.createElement('li');
    li.textContent = `and ${here.length - 5} more in the field guide`;
    meetList.append(li);
  }
}

/* ----- update everything for the current slider value ----- */
function update() {
  const v = Number(slider.value);
  const depth = depthFromSlider(v);
  const zone = zoneAtDepth(depth);

  hero.style.setProperty('--sea', seaColor(depth));
  valueEl.textContent = fmt(depth);
  zoneNameEl.textContent = zone.name;
  zoneNoteEl.textContent = zone.note;
  slider.setAttribute('aria-valuetext', `${fmt(depth)} metres, ${zone.name}`);
  document.querySelector('#strip-marker').style.left = `${v / 10}%`;
  renderMeet(depth);
}

/* ----- automatic dive ----- */
let diving = null;

function stopDive() {
  cancelAnimationFrame(diving);
  diving = null;
  diveBtn.textContent = 'Dive automatically';
}

function startDive() {
  if (Number(slider.value) >= 1000) slider.value = 0;
  diveBtn.textContent = 'Pause';
  const startValue = Number(slider.value);
  const duration = 14000 * ((1000 - startValue) / 1000);
  const startTime = performance.now();

  function frame(now) {
    const t = Math.min((now - startTime) / duration, 1);
    slider.value = startValue + (1000 - startValue) * t;
    update();
    if (t < 1) {
      diving = requestAnimationFrame(frame);
    } else {
      stopDive();
    }
  }
  diving = requestAnimationFrame(frame);
}

buildStrip();
slider.addEventListener('input', () => {
  if (diving) stopDive();
  update();
});
diveBtn.addEventListener('click', () => (diving ? stopDive() : startDive()));

// People who prefer reduced motion get the slider only
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  diveBtn.hidden = true;
}

update();
