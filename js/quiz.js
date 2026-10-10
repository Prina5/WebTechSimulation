/* ==========================================================
   QUIZ
   Lesson hooks: arrays of objects, state, loops, events,
   conditionals, localStorage
   ========================================================== */

const QUESTIONS = [
  { q: 'Pressure rises by about how much for every 10 metres of seawater?',
    options: ['0.1 atmosphere', '1 atmosphere', '10 atmospheres', '100 atmospheres'], answer: 1,
    why: 'Roughly one extra atmosphere every 10 metres, which is why the deepest trenches exceed 1,000 atmospheres.' },
  { q: 'Which zone is called the twilight zone?',
    options: ['0 to 200 m', '200 to 1,000 m', '1,000 to 4,000 m', '6,000 m and below'], answer: 1,
    why: 'Between 200 and 1,000 metres a faint glow of sunlight remains, but it is too dim for photosynthesis.' },
  { q: 'What makes an anglerfish lure glow?',
    options: ['Electricity', 'Sunlight stored in its skin', 'Bacteria living inside it', 'Burning gas'], answer: 2,
    why: 'Glowing bacteria live inside the lure and give off light that draws prey close.' },
  { q: 'Where is the deepest known point in the ocean?',
    options: ['Puerto Rico Trench', 'Challenger Deep, Mariana Trench', 'Java Trench', 'Mid-Atlantic Ridge'], answer: 1,
    why: 'Challenger Deep in the Mariana Trench is about 10,900 metres down.' },
  { q: 'Which animal has the largest eyes?',
    options: ['Blue whale', 'Barreleye', 'Giant squid', 'Sperm whale'], answer: 2,
    why: 'The giant squid has eyes about the size of a dinner plate, the largest known in any animal.' },
  { q: 'When do lanternfish rise toward the surface?',
    options: ['At night', 'At noon', 'Only in winter', 'Never'], answer: 0,
    why: 'They rise under cover of darkness to feed, then sink back down before dawn.' }
];

const BEST_KEY = 'fathom-quiz-best';

const area = document.querySelector('#quiz-area');
let index = 0;
let score = 0;

function getBest() {
  try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; }
}
function setBest(n) {
  try { localStorage.setItem(BEST_KEY, String(n)); } catch { /* storage unavailable */ }
}

function showQuestion() {
  const item = QUESTIONS[index];
  area.innerHTML = `
    <div class="progress" aria-hidden="true"><i style="width:${(index / QUESTIONS.length) * 100}%"></i></div>
    <p class="hint">Question ${index + 1} of ${QUESTIONS.length}</p>
    <h2 class="question" id="question-text"></h2>
    <div class="options" role="group" aria-labelledby="question-text"></div>
    <div class="feedback" aria-live="polite"></div>`;

  area.querySelector('#question-text').textContent = item.q;
  const optionBox = area.querySelector('.options');

  item.options.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.textContent = text;
    btn.addEventListener('click', () => choose(i));
    optionBox.append(btn);
  });
}

function choose(picked) {
  const item = QUESTIONS[index];
  const buttons = area.querySelectorAll('.option');
  const feedback = area.querySelector('.feedback');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === item.answer) btn.classList.add('correct');
    if (i === picked && picked !== item.answer) btn.classList.add('wrong');
  });

  const right = picked === item.answer;
  if (right) score++;
  feedback.textContent = `${right ? 'Correct.' : 'Not quite.'} ${item.why}`;

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'btn';
  next.style.marginTop = '1rem';
  next.textContent = index === QUESTIONS.length - 1 ? 'See your score' : 'Next question';
  next.addEventListener('click', () => {
    index++;
    index < QUESTIONS.length ? showQuestion() : showResult();
  });
  feedback.append(document.createElement('br'), next);
  next.focus();
}

function showResult() {
  const best = getBest();
  const isBest = score > best;
  if (isBest) setBest(score);

  let message;
  if (score === QUESTIONS.length) message = 'Perfect. You could captain a submersible.';
  else if (score >= 4) message = 'Strong dive. You know your way around the deep.';
  else if (score >= 2) message = 'Not bad. The field guide has what you need for a better run.';
  else message = 'You have only just left the surface. Try again after a look at the zones.';

  area.innerHTML = `
    <p class="hint">Your score</p>
    <p class="result-score">${score} / ${QUESTIONS.length}</p>
    <p></p>
    <p class="hint"></p>
    <div class="slider-actions">
      <button type="button" class="btn" id="retry">Try again</button>
      <a class="btn btn-ghost" href="creatures.html">Open the field guide</a>
    </div>`;
  const paras = area.querySelectorAll('p');
  paras[2].textContent = message;
  paras[3].textContent = isBest
    ? 'New best score on this device.'
    : `Best score on this device: ${best} / ${QUESTIONS.length}`;

  area.querySelector('#retry').addEventListener('click', () => {
    index = 0;
    score = 0;
    showQuestion();
  });
}

showQuestion();
