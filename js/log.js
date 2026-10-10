/* ==========================================================
   DIVE LOG
   Lesson hooks: forms, validation, localStorage, JSON,
   creating elements, array methods (reduce, filter)
   ========================================================== */

const STORAGE_KEY = 'fathom-dive-log';

const logForm = document.querySelector('#log-form');
const diverInput = document.querySelector('#diver');
const depthInput = document.querySelector('#depth');
const creatureSelect = document.querySelector('#creature');
const noteInput = document.querySelector('#note');
const dateInput = document.querySelector('#date');
const formNote = document.querySelector('#form-note');
const tableBody = document.querySelector('#log-body');
const emptyMsg = document.querySelector('#log-empty');
const tableWrap = document.querySelector('#log-table-wrap');
const clearBtn = document.querySelector('#clear-log');

let entries = load();

/* ----- storage ----- */
function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    formNote.textContent = 'Your browser blocked saving, so this log will reset when you leave the page.';
  }
}

/* ----- form setup ----- */
function buildSelect() {
  const none = new Option('Something else', '');
  creatureSelect.add(none);
  CREATURES.forEach((c) => creatureSelect.add(new Option(c.name, c.id)));
}

function setError(id, message) {
  document.querySelector(`#${id}-error`).textContent = message;
}

function validate() {
  let ok = true;
  setError('diver', '');
  setError('depth', '');

  if (diverInput.value.trim() === '') {
    setError('diver', 'Enter your name or a dive team name.');
    ok = false;
  }

  const depth = Number(depthInput.value);
  if (depthInput.value === '' || Number.isNaN(depth) || depth < 0 || depth > MAX_DEPTH) {
    setError('depth', `Enter a depth between 0 and ${fmt(MAX_DEPTH)} metres.`);
    ok = false;
  }
  return ok;
}

/* ----- rendering ----- */
function renderStats() {
  const deepest = entries.reduce((max, e) => Math.max(max, e.depth), 0);
  document.querySelector('#stat-count').textContent = entries.length;
  document.querySelector('#stat-deepest').textContent = fmt(deepest);
}

function renderTable() {
  tableBody.replaceChildren();
  emptyMsg.hidden = entries.length > 0;
  tableWrap.hidden = entries.length === 0;
  clearBtn.hidden = entries.length === 0;

  entries.forEach((entry) => {
    const tr = document.createElement('tr');
    const creature = CREATURES.find((c) => c.id === entry.creatureId);

    const cells = [
      entry.date,
      entry.diver,
      `${fmt(entry.depth)} m`,
      creature ? creature.name : 'Something else',
      entry.note || ''
    ];
    cells.forEach((text) => {
      const td = document.createElement('td');
      td.textContent = text;
      tr.append(td);
    });

    const actionTd = document.createElement('td');
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'btn btn-ghost btn-small';
    del.textContent = 'Delete';
    del.setAttribute('aria-label', `Delete entry from ${entry.date} by ${entry.diver}`);
    del.addEventListener('click', () => removeEntry(entry.id));
    actionTd.append(del);
    tr.append(actionTd);

    tableBody.append(tr);
  });

  renderStats();
}

function removeEntry(id) {
  entries = entries.filter((e) => e.id !== id);
  save();
  renderTable();
}

/* ----- events ----- */
logForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = '';
  if (!validate()) return;

  const depth = Number(depthInput.value);
  const creature = CREATURES.find((c) => c.id === creatureSelect.value);

  entries.unshift({
    id: Date.now(),
    diver: diverInput.value.trim(),
    depth,
    creatureId: creatureSelect.value,
    note: noteInput.value.trim(),
    date: dateInput.value
  });
  save();
  renderTable();

  if (creature && (depth < creature.min || depth > creature.max)) {
    formNote.textContent =
      `Logged. Note: ${creature.name} is usually found between ${fmt(creature.min)} and ${fmt(creature.max)} m.`;
  } else {
    formNote.textContent = 'Dive logged.';
  }

  diverInput.focus();
  depthInput.value = '';
  noteInput.value = '';
  creatureSelect.value = '';
});

clearBtn.addEventListener('click', () => {
  if (confirm('Delete every entry in your dive log?')) {
    entries = [];
    save();
    renderTable();
    formNote.textContent = 'Log cleared.';
  }
});

/* ----- start ----- */
dateInput.value = new Date().toISOString().slice(0, 10);
buildSelect();
renderTable();
