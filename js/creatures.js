/* ==========================================================
   FIELD GUIDE
   Lesson hooks: arrays, filter(), template building, events,
   the <dialog> element, URL hash
   ========================================================== */

const grid = document.querySelector('#creature-grid');
const chipBox = document.querySelector('#chips');
const searchInput = document.querySelector('#search');
const countEl = document.querySelector('#count');
const dialog = document.querySelector('#detail');

const state = { zone: 'all', query: '' };

// Depth bars use a square-root scale so shallow animals stay visible
const barPos = (d) => Math.sqrt(d / MAX_DEPTH) * 100;

function buildChips() {
  const options = [{ id: 'all', name: 'All zones' }, ...ZONES];
  options.forEach((z) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip';
    btn.dataset.zone = z.id;
    btn.textContent = z.id === 'all' ? z.name : z.short;
    btn.setAttribute('aria-pressed', String(z.id === state.zone));
    chipBox.append(btn);
  });
}

function makeCard(c) {
  const zone = zoneById(c.zone);
  const card = document.createElement('article');
  card.className = 'creature';
  card.id = c.id;
  card.style.setProperty('--zone', zone.accent);

  const left = barPos(c.min);
  const width = barPos(c.max) - left;

  card.innerHTML = `
    <h3></h3>
    <p class="latin"></p>
    <div class="depth-bar" aria-hidden="true"><i style="left:${left}%;width:${width}%"></i></div>
    <p class="depth-text"></p>
    <button type="button" class="btn btn-ghost">More about this animal</button>`;

  // textContent keeps the data safe from stray HTML
  card.querySelector('h3').textContent = c.name;
  card.querySelector('.latin').textContent = c.latin;
  card.querySelector('.depth-text').textContent =
    `${zone.name}, ${fmt(c.min)}–${fmt(c.max)} m`;
  card.querySelector('button').addEventListener('click', () => openDetail(c));
  return card;
}

function render() {
  const q = state.query.trim().toLowerCase();
  const list = CREATURES.filter((c) => {
    const inZone = state.zone === 'all' || c.zone === state.zone;
    const matches = c.name.toLowerCase().includes(q) || c.latin.toLowerCase().includes(q);
    return inZone && matches;
  });

  grid.replaceChildren();
  countEl.textContent = `Showing ${list.length} of ${CREATURES.length} animals`;

  if (list.length === 0) {
    const box = document.createElement('div');
    box.className = 'empty';
    box.innerHTML = '<p>Nothing matches that search.</p>';
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'btn';
    reset.textContent = 'Clear filters';
    reset.addEventListener('click', () => {
      state.zone = 'all';
      state.query = '';
      searchInput.value = '';
      syncChips();
      render();
    });
    box.append(reset);
    grid.append(box);
    return;
  }

  list.forEach((c) => grid.append(makeCard(c)));
}

function syncChips() {
  chipBox.querySelectorAll('.chip').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.zone === state.zone));
  });
}

function openDetail(c) {
  const zone = zoneById(c.zone);
  dialog.querySelector('#detail-name').textContent = c.name;
  dialog.querySelector('#detail-latin').textContent = c.latin;
  dialog.querySelector('#detail-zone').textContent = zone.name;
  dialog.querySelector('#detail-depth').textContent = `${fmt(c.min)} to ${fmt(c.max)} metres`;
  dialog.querySelector('#detail-size').textContent = c.size;
  dialog.querySelector('#detail-fact').textContent = c.fact;
  dialog.showModal();
}

chipBox.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  state.zone = chip.dataset.zone;
  syncChips();
  render();
});

searchInput.addEventListener('input', () => {
  state.query = searchInput.value;
  render();
});

dialog.querySelector('#detail-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close(); // click on the backdrop
});

buildChips();
render();

// Arriving from the home page with #some-animal opens that animal
const wanted = CREATURES.find((c) => c.id === location.hash.slice(1));
if (wanted) {
  document.getElementById(wanted.id).scrollIntoView();
  openDetail(wanted);
}
