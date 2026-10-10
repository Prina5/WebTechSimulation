/* ==========================================================
   ZONES - pressure calculator
   Lesson hooks: forms, input events, validation, math
   ========================================================== */

const form = document.querySelector('#pressure-form');
const input = document.querySelector('#pressure-depth');
const output = document.querySelector('#pressure-output');
const errorEl = document.querySelector('#pressure-error');

// Pressure rises by about 1 atmosphere every 10 m, on top of 1 atm of air
const pressureAt = (depth) => 1 + depth / 10;

function calculate() {
  const raw = input.value.trim();

  if (raw === '') {
    errorEl.textContent = '';
    output.textContent = 'Enter a depth to see the pressure.';
    return;
  }

  const depth = Number(raw);
  if (Number.isNaN(depth) || depth < 0 || depth > MAX_DEPTH) {
    errorEl.textContent = `Enter a depth between 0 and ${fmt(MAX_DEPTH)} metres.`;
    output.textContent = '';
    return;
  }

  errorEl.textContent = '';
  const atm = pressureAt(depth);
  const zone = zoneAtDepth(depth);
  output.textContent = `About ${fmt(Math.round(atm))} atmospheres (${zone.name})`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  calculate();
});
input.addEventListener('input', calculate);
calculate();
