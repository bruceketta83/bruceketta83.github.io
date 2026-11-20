/* ==========================================================================
   MOTORE DI GIOCO
   ========================================================================== */
const $ = (id) => document.getElementById(id);
const reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

const SAVE_KEY = 'esponentia_save_v2';
const OLD_SAVE_KEY = 'esponentia_save_v1';
const MAX_HEARTS = 3;
const HINT_COST = 20;

const DEFAULT_STATE = {
  version: 2,
  currentArea: 0,
  unlockedArea: 0,
  aura: 100,
  unlockedRules: [],
  crystals: [],
  items: [],
  completedAreas: [],
  gameWon: false,
  stars: {},
  stats: {}
};

function clone(obj) {
  return typeof structuredClone === 'function' ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
}

let gameStarted = false;
let state = loadState();
let duel = null;
let busy = false;
let ariaX = 0;
let typer = null;

/* --------------------------------------------------------------------------
   SALVATAGGIO (con migrazione dal salvataggio v1)
   -------------------------------------------------------------------------- */
function loadState() {
  const s = clone(DEFAULT_STATE);
  try {
    const raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem(OLD_SAVE_KEY);
    if (raw) {
      Object.assign(s, JSON.parse(raw));
      s.version = 2;
      s.stars = s.stars || {};
      s.stats = s.stats || {};
      $('btn-reset-save').style.display = 'inline-block';
    }
  } catch (e) {}
  return s;
}

function saveState() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) {}
}

function resetSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(OLD_SAVE_KEY);
  } catch (e) {}
  state = clone(DEFAULT_STATE);
  location.reload();
}

function startGame() {
  gameStarted = true;
  playSound('success');
  $('title-screen').style.display = 'none';
  renderArea(state.currentArea, false);
}

/* --------------------------------------------------------------------------
   UTILITÀ GRAFICHE
   -------------------------------------------------------------------------- */
function updateHUD() {
  $('hud-aura').textContent = state.aura;
  $('hud-crystals').textContent = `${state.crystals.length}/5`;
  $('inv-count').textContent = state.items.length + state.crystals.length;
}

function popBadge(id) {
  const el = $(id).closest('.hud-badge');
  restartAnim(el, 'pop');
}

function restartAnim(el, cls) {
  if (!el || reducedMotion) return;
  el.classList.remove(cls);
  void el.getBoundingClientRect();
  el.classList.add(cls);
  el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
}

function fadeTransition(cb) {
  if (reducedMotion) { cb(); return; }
  const f = $('fade');
  f.classList.add('on');
  setTimeout(() => {
    cb();
    requestAnimationFrame(() => f.classList.remove('on'));
  }, 320);
}

/* Converte coordinate SVG in pixel relativi a un contenitore. */
function svgToLocal(x, y, container) {
  const svg = $('scene-svg');
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  const p = pt.matrixTransform(ctm);
  const r = container.getBoundingClientRect();
  return { x: p.x - r.left, y: p.y - r.top };
}

function burst(svgX, svgY, emojis, count = 10) {
  if (reducedMotion) return;
  const container = $('scene-container');
  const o = svgToLocal(svgX, svgY, container);
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = pick(emojis);
    container.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 50;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist - 20;
    const anim = p.animate([
      { transform: `translate(${o.x}px, ${o.y}px) translate(-50%, -50%) scale(0.5)`, opacity: 1 },
      { transform: `translate(${o.x + dx}px, ${o.y + dy}px) translate(-50%, -50%) scale(1.2)`, opacity: 0 }
    ], { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' });
    anim.onfinish = () => p.remove();
  }
}

function flyCrystal(icon, svgX, svgY, done) {
  const app = $('app');
  const from = svgToLocal(svgX, svgY, app);
  const target = $('hud-crystals').getBoundingClientRect();
  const appR = app.getBoundingClientRect();
  const to = { x: target.left - appR.left + target.width / 2, y: target.top - appR.top + target.height / 2 };
  if (reducedMotion) { done && done(); return; }
  const el = document.createElement('div');
  el.className = 'flying-crystal';
  el.textContent = icon;
  app.appendChild(el);
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - 40;
  const anim = el.animate([
    { transform: `translate(${from.x}px, ${from.y}px) translate(-50%, -50%) scale(0.6)`, opacity: 0 },
    { transform: `translate(${from.x}px, ${from.y - 20}px) translate(-50%, -50%) scale(2.2)`, opacity: 1, offset: 0.3 },
    { transform: `translate(${midX}px, ${midY}px) translate(-50%, -50%) scale(1.6)`, opacity: 1, offset: 0.65 },
    { transform: `translate(${to.x}px, ${to.y}px) translate(-50%, -50%) scale(0.6)`, opacity: 0.9 }
  ], { duration: 1300, easing: 'ease-in-out' });
  anim.onfinish = () => { el.remove(); done && done(); };
}

/* --------------------------------------------------------------------------
   DIALOGHI CON EFFETTO MACCHINA DA SCRIVERE
   -------------------------------------------------------------------------- */
function typeText(el, html, done) {
  el.innerHTML = html;
  if (reducedMotion) { done(); return; }

  const nodes = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const chars = [];
  nodes.forEach(n => {
    const frag = document.createDocumentFragment();
    for (const ch of n.textContent) {
      const s = document.createElement('span');
      s.className = 'tw-h';
      s.textContent = ch;
      frag.appendChild(s);
      chars.push(s);
    }
    n.parentNode.replaceChild(frag, n);
  });
  el.querySelectorAll('.math-expr').forEach(b => b.classList.add('tw-box'));

  let i = 0;
  let finished = false;
  const iv = setInterval(() => {
    for (let k = 0; k < 2 && i < chars.length; k++, i++) {
      chars[i].classList.remove('tw-h');
      const box = chars[i].closest('.tw-box');
      if (box) box.classList.remove('tw-box');
    }
    if (i >= chars.length) finish();
  }, 22);

  function finish() {
    if (finished) return;
    finished = true;
    clearInterval(iv);
    el.querySelectorAll('.tw-h').forEach(s => s.classList.remove('tw-h'));
    el.querySelectorAll('.tw-box').forEach(b => b.classList.remove('tw-box'));
    typer = null;
    done();
  }
  typer = { finish };
}

function skipTyping() {
  if (typer) typer.finish();
}

/* avatar: chiave di CHARS (ritratto SVG) oppure emoji.
   speaker: 'aria' | 'mentor' | 'guardian' per animare la bocca nella scena. */
function setDialogue(name, role, avatar, html, speaker) {
  if (typer) typer.finish();
  $('dialogue-area').scrollTop = 0;
  $('speaker-name').textContent = name;
  $('speaker-role').textContent = role;
  const av = $('speaker-avatar');
  if (CHARS[avatar]) av.innerHTML = portraitSVG(avatar);
  else av.textContent = avatar;

  const choices = $('choices-container');
  choices.classList.add('pending');
  const talkers = [av];
  if (speaker) {
    const s = document.querySelector(`#char-${speaker} .char`);
    if (s) talkers.push(s);
  }
  talkers.forEach(t => t.classList.add('talking'));
  typeText($('dialogue-text'), html, () => {
    talkers.forEach(t => t.classList.remove('talking'));
    choices.classList.remove('pending');
  });
}

function clearChoices() {
  const c = $('choices-container');
  c.innerHTML = '';
  return c;
}

function addChoice(html, onClick, cls = '') {
  const b = document.createElement('button');
  b.className = `choice-btn ${cls}`;
  b.innerHTML = html;
  b.onclick = onClick;
  $('choices-container').appendChild(b);
  return b;
}

function setFeedback(html) { $('feedback-slot').innerHTML = html; }

function scrollDialogueToEnd() {
  const d = $('dialogue-area');
  requestAnimationFrame(() => d.scrollTo({ top: d.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' }));
}

function mentorAvatar(area) {
  const c = area.layout.mentor;
  return c && c.draw ? c.draw : area.mentor.avatar;
}
function guardianAvatar(area) {
  const c = area.layout.guardian;
  return c && c.draw ? c.draw : area.guardian.avatar;
}

/* --------------------------------------------------------------------------
   SCENA: COSTRUZIONE, ETICHETTE, CAMMINATA DI ARIA
   -------------------------------------------------------------------------- */
function charBounds(area, role) {
  const L = area.layout;
  const c = L[role];
  if (c.draw) return { top: L.groundY - CHARS[c.draw].h, bottom: L.groundY };
  return { top: c.top, bottom: c.bottom };
}

function labelsHTML(area) {
  let html = '';
  ['mentor', 'guardian'].forEach(role => {
    const c = area.layout[role];
    if (!c) return;
    const b = charBounds(area, role);
    const w = Math.round([...c.label].length * 5.2 + 14);
    const isNew = role === 'mentor'
      ? area.ruleId && !state.unlockedRules.includes(area.ruleId)
      : (!area.ruleId || state.unlockedRules.includes(area.ruleId)) && !state.completedAreas.includes(area.id);
    const color = role === 'mentor' ? '#10b981' : '#ec4899';
    // Margine di 44: con preserveAspectRatio=slice i bordi della scena possono essere tagliati sui telefoni stretti.
    const x = Math.min(Math.max(c.x, w / 2 + 44), 356 - w / 2);
    html += `
      <rect class="hit" data-role="${role}" x="${c.x - 22}" y="${b.top}" width="44" height="${b.bottom - b.top}" fill="transparent"/>
      <g id="label-${role}" class="label" data-role="${role}" transform="translate(${x} ${b.top - 9})">
        <g class="label-bob">
          <rect x="${-w / 2}" y="-9" width="${w}" height="15" rx="7.5" fill="rgba(15,23,42,0.9)" stroke="${color}" stroke-width="1.3"/>
          <text x="0" y="1.8" font-size="8.5" fill="#fff" text-anchor="middle" font-weight="700" font-family="-apple-system, Segoe UI, Roboto, sans-serif">${c.label}</text>
          ${isNew ? `<g transform="translate(${w / 2 - 1} -8)"><circle class="alert-dot" r="5" fill="#f59e0b"/><text x="0" y="3" font-size="8" text-anchor="middle" font-weight="900" fill="#0f172a">!</text></g>` : ''}
        </g>
      </g>`;
  });
  return html;
}

function refreshLabels(area) {
  const layer = $('layer-ui');
  if (layer) layer.innerHTML = labelsHTML(area);
}

function buildScene(area) {
  const L = area.layout;
  const ariaY = L.ariaY || L.groundY;
  const sc = area.scene ? SCENES[area.scene] : null;
  ariaX = L.ariaStart;

  let chars = '';
  ['mentor', 'guardian'].forEach(role => {
    const c = L[role];
    if (!c || !c.draw) return;
    chars += `<g id="char-${role}" transform="translate(${c.x} ${L.groundY})"><g transform="scale(${c.face || 1} 1)">${CHARS[c.draw].draw()}</g></g>`;
  });
  chars += `<g id="char-aria" style="transform: translate(${ariaX}px, ${ariaY}px)"><g id="aria-flip">${CHARS.aria.draw()}</g></g>`;

  $('scene-svg').innerHTML = `
    <g id="layer-bg">${sc ? sc.bg() : area.svgBg}</g>
    <g id="layer-chars">${chars}</g>
    <g id="layer-fg">${sc && sc.fg ? sc.fg() : ''}</g>
    <g id="layer-ui">${labelsHTML(area)}</g>`;
}

function faceAria(dir) {
  const f = $('aria-flip');
  if (f) f.setAttribute('transform', `scale(${dir} 1)`);
}

function walkTo(x, cb) {
  const area = AREAS[state.currentArea];
  const y = area.layout.ariaY || area.layout.groundY;
  const el = $('char-aria');
  const dist = Math.abs(x - ariaX);
  if (!el || dist < 3) { cb && cb(); return; }
  busy = true;
  faceAria(x > ariaX ? 1 : -1);
  const dur = reducedMotion ? 0 : Math.max(0.25, dist / 115);
  el.classList.add('walking');
  el.style.transition = `transform ${dur}s linear`;
  el.style.transform = `translate(${x}px, ${y}px)`;
  ariaX = x;
  setTimeout(() => {
    el.classList.remove('walking');
    busy = false;
    cb && cb();
  }, dur * 1000);
}

function onSceneClick(e) {
  if (busy || !gameStarted) return;
  const area = AREAS[state.currentArea];
  const target = e.target.closest('[data-role]');
  if (target) {
    if (duel) return;
    interact(area, target.dataset.role);
    return;
  }
  if (duel) return;
  const svg = $('scene-svg');
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return;
  const p = pt.matrixTransform(ctm.inverse());
  walkTo(Math.min(385, Math.max(15, p.x)));
}

function interact(area, role) {
  const c = area.layout[role];
  if (!c) return;
  playSound('blip');
  walkTo(c.stand, () => {
    faceAria(c.x > ariaX ? 1 : -1);
    if (role === 'mentor') startMentorDialogue(area);
    else startGuardianChallenge(area);
  });
}

/* --------------------------------------------------------------------------
   AREE
   -------------------------------------------------------------------------- */
function renderArea(areaIndex, withFade = true) {
  if (withFade) fadeTransition(() => buildArea(areaIndex));
  else buildArea(areaIndex);
}

function buildArea(areaIndex) {
  state.currentArea = areaIndex;
  duel = null;
  busy = false;
  saveState();
  updateHUD();
  hideDuelPanel();

  const area = AREAS[areaIndex];
  $('location-banner').textContent = area.name;
  setFeedback('');
  buildScene(area);
  if (gameStarted) Music.play(area.music);

  if (state.gameWon && areaIndex === AREAS.length - 1) {
    lightTheLighthouse();
    showVictoryScreen();
    return;
  }
  showAreaMenu(area, area.intro);
}

function showAreaMenu(area, text) {
  setDialogue('Aria', 'Esploratrice', 'aria', text, 'aria');
  clearChoices();

  if (area.mentor) {
    addChoice(`<span>💬 Parla con ${area.mentor.name} (Teoria)</span><span>→</span>`,
      () => interact(area, 'mentor'));
  }

  const isDone = state.completedAreas.includes(area.id);
  addChoice(`<span>⚔️ ${isDone ? 'Rigioca la sfida con' : 'Affronta'} ${area.guardian.name}</span><span>→</span>`,
    () => interact(area, 'guardian'));

  if (isDone && area.id < AREAS.length - 1) {
    addChoice(`🚀 Vai a: ${AREAS[area.id + 1].name}`,
      () => { playSound('success'); renderArea(area.id + 1); }, 'primary-action');
  }
}

/* --------------------------------------------------------------------------
   DIALOGO MENTORE
   -------------------------------------------------------------------------- */
function startMentorDialogue(area) {
  duel = null;
  hideDuelPanel();
  setFeedback('');
  const m = area.mentor;
  let step = 0;

  if (area.ruleId && !state.unlockedRules.includes(area.ruleId)) {
    state.unlockedRules.push(area.ruleId);
    saveState();
    $('notebook-dot').style.display = 'block';
  }

  function showStep() {
    setDialogue(m.name, m.role, mentorAvatar(area), m.lines[step], 'mentor');
    clearChoices();
    if (step < m.lines.length - 1) {
      addChoice('Continua →', () => { playSound('blip'); step++; showStep(); }, 'primary-action');
    } else {
      refreshLabels(area);
      addChoice('<span>📖 Apri il Taccuino per fissare la regola</span><span>→</span>',
        () => openModal('notebook'));
      addChoice(`⚔️ Vai alla sfida di ${area.guardian.name}`,
        () => interact(area, 'guardian'), 'primary-action');
    }
  }
  showStep();
}

/* --------------------------------------------------------------------------
   DUELLO CON IL GUARDIANO
   -------------------------------------------------------------------------- */
function startGuardianChallenge(area) {
  const g = area.guardian;
  setFeedback('');

  if (area.ruleId && !state.unlockedRules.includes(area.ruleId)) {
    setDialogue(g.name, g.role, guardianAvatar(area), g.blockMsg, 'guardian');
    clearChoices();
    addChoice(`<span>💬 Vai da ${area.mentor.name}</span><span>→</span>`,
      () => interact(area, 'mentor'), 'primary-action');
    return;
  }

  const replay = state.completedAreas.includes(area.id);
  duel = {
    areaId: area.id,
    max: area.maxHp,
    hp: area.maxHp,
    hearts: MAX_HEARTS,
    errors: 0,
    streak: 0,
    // Prima partita: domande d'autore in ordine. Rigiocata: solo esercizi nuovi.
    authored: replay ? [] : [...g.questions],
    q: null,
    answered: false,
    first: true
  };
  showDuelPanel(area);
  nextQuestion();
}

function authoredToQuestion(q, area) {
  return {
    ruleId: q.rule || area.ruleId,
    prompt: q.prompt,
    steps: q.steps,
    options: q.options.map(o => ({ text: o.text, correct: !!o.correct, msg: o.msg }))
  };
}

function nextQuestion() {
  const area = AREAS[duel.areaId];
  duel.q = duel.authored.length ? authoredToQuestion(duel.authored.shift(), area) : generateQuestion(area);
  duel.answered = false;
  setFeedback('');
  renderQuestion();
}

function renderQuestion() {
  const area = AREAS[duel.areaId];
  const g = area.guardian;
  const q = duel.q;
  const intro = duel.first ? `<p class="g-intro">"${g.intro}"</p>` : '';
  duel.first = false;

  setDialogue(g.name, `${g.role} • Colpo ${duel.max - duel.hp + 1} di ${duel.max}`,
    guardianAvatar(area), `${intro}<div>${q.prompt}</div>`, 'guardian');

  const choices = clearChoices();
  const grid = document.createElement('div');
  grid.className = 'choices-grid';
  shuffle(q.options).forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn math-choice';
    btn.innerHTML = formatMathString(opt.text);
    btn._opt = opt;
    btn.onclick = () => handleAnswer(opt, btn);
    grid.appendChild(btn);
  });
  choices.appendChild(grid);

  if (state.aura >= HINT_COST && q.options.filter(o => !o.correct).length > 1) {
    const hint = addChoice(`💡 Aiutino: togli una risposta sbagliata (−${HINT_COST} Aura)`, () => useHint(hint), 'hint-btn');
  }
}

function formatMathString(str) {
  const map = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
  return str.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, match => `<sup>${match.split('').map(c => map[c] || c).join('')}</sup>`);
}

function useHint(hintBtn) {
  if (!duel || duel.answered || state.aura < HINT_COST) return;
  const wrongBtns = [...document.querySelectorAll('.choices-grid .math-choice')]
    .filter(b => !b._opt.correct && !b.disabled);
  if (wrongBtns.length <= 1) return;
  const b = pick(wrongBtns);
  b.disabled = true;
  b.classList.add('eliminated');
  state.aura -= HINT_COST;
  saveState();
  updateHUD();
  popBadge('hud-aura');
  playSound('blip');
  hintBtn.remove();
}

function recordStat(ruleId, ok) {
  if (!ruleId) return;
  const s = state.stats[ruleId] || { ok: 0, ko: 0 };
  if (ok) s.ok++; else s.ko++;
  state.stats[ruleId] = s;
}

function guardianTarget() {
  return document.querySelector('#char-guardian .char') || $('label-guardian');
}

function guardianCenter(area) {
  const c = area.layout.guardian;
  const b = charBounds(area, 'guardian');
  return { x: c.x, y: (b.top + b.bottom) / 2 };
}

function handleAnswer(opt, btn) {
  if (!duel || duel.answered) return;
  duel.answered = true;
  const token = duel;
  const area = AREAS[duel.areaId];
  const q = duel.q;

  document.querySelectorAll('.choices-grid .math-choice').forEach(b => {
    b.disabled = true;
    if (b._opt.correct) b.classList.add('right');
  });
  const hint = document.querySelector('.hint-btn');
  if (hint) hint.remove();
  recordStat(q.ruleId, opt.correct);

  if (!opt.correct) {
    btn.classList.add('wrong');
    playSound('error');
    restartAnim($('app'), 'shake');
    state.aura = Math.max(0, state.aura - 10);
    duel.hearts--;
    duel.errors++;
    duel.streak = 0;
    saveState();
    updateHUD();
    updateDuelPanel();
    setFeedback(`
      <div class="feedback-banner feedback-error">
        ❌ <b>${opt.msg}</b> <span style="opacity:0.8;">(−10 Aura, −1 ❤️)</span>
        <div class="solution">✔️ ${q.steps}</div>
      </div>`);
    if (duel.hearts <= 0) {
      addChoice('Continua →', () => duelLost(area), 'primary-action');
    } else {
      addChoice('Prossima domanda →', () => { playSound('blip'); nextQuestion(); }, 'primary-action');
    }
    scrollDialogueToEnd();
    return;
  }

  // Risposta giusta: colpo al guardiano
  btn.classList.add('right');
  playSound('hit');
  duel.streak++;
  duel.hp--;
  const bonus = 10 * (duel.streak - 1);
  state.aura += 50 + bonus;
  saveState();
  updateHUD();
  popBadge('hud-aura');
  updateDuelPanel();
  restartAnim(guardianTarget(), 'hit');
  const gc = guardianCenter(area);
  burst(gc.x, gc.y, ['✨', '⭐', '💥', '💫'], 12);

  const slay = pick(['Slay!', 'Che aura!', 'Iconica!', 'Boom!', 'Mother!', 'Zero sbatti!']);
  setFeedback(`
    <div class="feedback-banner feedback-success">
      ✅ <b>${slay} +${50 + bonus} Aura</b>${duel.streak > 1 ? ` &nbsp;🔥 Combo x${duel.streak}` : ''}
      <div class="solution">${q.steps}</div>
    </div>`);
  scrollDialogueToEnd();

  setTimeout(() => {
    if (duel !== token) return;
    if (duel.hp <= 0) winDuel(area);
    else nextQuestion();
  }, 1700);
}

function starsHTML(n) { return '⭐'.repeat(n) + '☆'.repeat(3 - n); }

function winDuel(area) {
  const stars = duel.errors === 0 ? 3 : duel.errors === 1 ? 2 : 1;
  const prev = state.stars[area.id] || 0;
  if (stars > prev) state.stars[area.id] = stars;
  duel = null;
  hideDuelPanel();
  const gt = guardianTarget();
  if (gt && !reducedMotion) gt.classList.add('defeated');

  const isFirstTime = !state.completedAreas.includes(area.id);
  if (isFirstTime) {
    state.completedAreas.push(area.id);
    if (area.crystal) state.crystals.push(area.crystal);
    if (area.item) state.items.push(area.item);
    if (area.id + 1 < AREAS.length) state.unlockedArea = Math.max(state.unlockedArea, area.id + 1);
    if (area.id === AREAS.length - 1) state.gameWon = true;
  }
  saveState();

  const gc = guardianCenter(area);
  if (isFirstTime && area.crystal) {
    playSound('crystal');
    flyCrystal(area.crystal.icon, gc.x, gc.y, () => { updateHUD(); popBadge('hud-crystals'); });
  } else {
    playSound('success');
    updateHUD();
  }
  burst(gc.x, gc.y, ['🎉', '✨', '⭐'], 16);

  const record = prev > 0 && stars > prev ? ' &nbsp;🏅 Nuovo record!' : '';
  setFeedback(`
    <div class="feedback-banner feedback-success">
      🎉 <b>SFIDA SUPERATA!</b> &nbsp;${starsHTML(stars)}${record}
    </div>`);
  setDialogue(area.guardian.name, area.guardian.role, guardianAvatar(area), area.guardian.winMsg, 'guardian');
  refreshLabels(area);
  clearChoices();

  if (area.id < AREAS.length - 1) {
    addChoice(`🚀 Prosegui verso: ${AREAS[area.id + 1].name}`,
      () => { playSound('blip'); renderArea(area.id + 1); }, 'primary-action');
  } else {
    addChoice('🏆 Accendi il Faro!', () => { lightTheLighthouse(); showVictoryScreen(); }, 'primary-action');
  }
  if (stars < 3) {
    addChoice('<span>⭐ Rigioca per fare 3 stelle</span><span>→</span>',
      () => startGuardianChallenge(area));
  }
}

function duelLost(area) {
  duel = null;
  hideDuelPanel();
  playSound('defeat');
  const g = area.guardian;
  setFeedback(`
    <div class="feedback-banner feedback-info">
      💔 Hai finito i cuori. Niente panico: ripassa la regola e riprova. Ogni duello ha esercizi nuovi!
    </div>`);
  setDialogue(g.name, g.role, guardianAvatar(area), g.loseMsg, 'guardian');
  clearChoices();
  addChoice('🔁 Riprova il duello', () => { playSound('blip'); startGuardianChallenge(area); }, 'primary-action');
  addChoice('<span>📖 Ripassa sul Taccuino</span><span>→</span>', () => openModal('notebook'));
  if (area.mentor) {
    addChoice(`<span>💬 Chiedi aiuto a ${area.mentor.name}</span><span>→</span>`, () => interact(area, 'mentor'));
  }
}

/* --------------------------------------------------------------------------
   PANNELLO DEL DUELLO
   -------------------------------------------------------------------------- */
function showDuelPanel(area) {
  $('location-banner').style.display = 'none';
  $('app').classList.add('in-duel');
  $('duel-foe').textContent = area.layout.guardian.label;
  $('duel-panel').classList.add('open');
  updateDuelPanel();
}

function hideDuelPanel() {
  $('duel-panel').classList.remove('open');
  $('app').classList.remove('in-duel');
  $('location-banner').style.display = '';
}

function updateDuelPanel() {
  if (!duel) return;
  $('duel-hp-fill').style.width = `${(duel.hp / duel.max) * 100}%`;
  $('duel-hearts').textContent = '❤️'.repeat(Math.max(0, duel.hearts)) + '🖤'.repeat(MAX_HEARTS - Math.max(0, duel.hearts));
  $('duel-combo').textContent = duel.streak > 1 ? `🔥 x${duel.streak}` : '';
}

/* --------------------------------------------------------------------------
   VITTORIA FINALE E RESOCONTO
   -------------------------------------------------------------------------- */
function lightTheLighthouse() {
  const fg = $('layer-fg');
  if (fg && !$('faro-glow')) {
    fg.insertAdjacentHTML('beforeend',
      '<circle id="faro-glow" class="faro-on" cx="200" cy="45" r="55" fill="#fde047" opacity="0.6"/>');
  }
}

function reportHTML() {
  const rows = RULES_DATA.map(r => {
    const s = state.stats[r.id] || { ok: 0, ko: 0 };
    const tot = s.ok + s.ko;
    const pct = tot ? Math.round((s.ok / tot) * 100) : 0;
    return `<tr><td>${r.short}<div class="report-bar"><div style="width:${pct}%"></div></div></td>
      <td>${tot ? `${s.ok}/${tot} (${pct}%)` : '—'}</td></tr>`;
  }).join('');
  const totalStars = Object.values(state.stars).reduce((a, b) => a + b, 0);
  return `<table class="report">${rows}
    <tr><td>Stelle totali</td><td>${totalStars}/${AREAS.length * 3} ⭐</td></tr></table>`;
}

function showVictoryScreen() {
  playSound('victory');
  setFeedback('');
  setDialogue("Faro dell'Accademia", 'Missione Compiuta!', '🏆',
    `<b>HAI SALVATO L'ISOLA DI ESPO-NENTIA!</b><br><br>
    Tutti e 5 i Cristalli Esponenziali brillano di nuovo e la flotta dell'Accademia può salpare!<br>
    Punteggio finale: <b>${state.aura} Aura</b>.<br><br>
    <b>📊 Il tuo resoconto:</b>${reportHTML()}`, null);
  burst(200, 60, ['🎉', '✨', '⭐', '💎'], 24);
  clearChoices();
  addChoice('🗺️ Rigioca un’area dalla Mappa', () => openModal('map'));
  addChoice("🔄 Gioca di nuovo dall'inizio", () => resetSave(), 'primary-action');
}

/* --------------------------------------------------------------------------
   MODALI (TACCUINO, MAPPA, ZAINO)
   -------------------------------------------------------------------------- */
function openModal(type) {
  playSound('blip');
  if (type === 'notebook') {
    $('notebook-dot').style.display = 'none';
    renderNotebook();
  } else if (type === 'map') {
    renderMap();
  } else if (type === 'inventory') {
    renderInventory();
  }
  $(`modal-${type}`).classList.add('open');
}

function closeModal(type) {
  playSound('blip');
  $(`modal-${type}`).classList.remove('open');
}

function renderNotebook() {
  const container = $('notebook-content');
  container.innerHTML = `
    <p style="font-size:0.85rem; color:#78350f; margin-bottom:4px;">
      Consulta queste schede in qualsiasi momento durante le sfide. Le regole si sbloccano parlando con i Mentori dell'isola.
    </p>`;

  RULES_DATA.forEach(rule => {
    const unlocked = state.unlockedRules.includes(rule.id);
    const card = document.createElement('div');
    card.className = `rule-card ${unlocked ? '' : 'locked'}`;
    card.innerHTML = unlocked
      ? `<div class="rule-title"><span>${rule.title}</span><span>✅</span></div>
         <div class="rule-formula">${rule.formula}</div>
         <div class="rule-desc">${rule.desc}</div>
         <div class="rule-example">${rule.example}</div>`
      : `<div class="rule-title"><span>${rule.title}</span><span>🔒</span></div>
         <div class="rule-desc">Parla con il Mentore dell'area corrispondente per sbloccare questa regola.</div>`;
    container.appendChild(card);
  });
}

function renderMap() {
  const container = $('map-content');
  container.innerHTML = '';

  AREAS.forEach(area => {
    const isUnlocked = area.id <= state.unlockedArea;
    const isCompleted = state.completedAreas.includes(area.id);
    const isCurrent = area.id === state.currentArea;
    const stars = state.stars[area.id] || 0;

    const div = document.createElement('div');
    div.className = `map-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUnlocked ? '' : 'locked'}`;
    const statusIcon = isCompleted ? '✅' : isUnlocked ? '📍' : '🔒';

    div.innerHTML = `
      <div>
        <div style="font-weight:800; font-size:0.95rem;">${area.name}</div>
        <div style="font-size:0.78rem; color:#94a3b8; margin-top:2px;">
          ${isUnlocked ? (isCompleted ? 'Area completata' : 'Disponibile') : "Completa l'area precedente"}
        </div>
        ${isCompleted ? `<div class="map-stars">${starsHTML(stars)}</div>` : ''}
      </div>
      <div style="font-size:1.3rem;">${statusIcon}</div>`;

    if (isUnlocked) {
      div.onclick = () => {
        closeModal('map');
        renderArea(area.id);
      };
    }
    container.appendChild(div);
  });
}

function renderInventory() {
  const container = $('inventory-content');
  const allStuff = [...state.crystals, ...state.items];

  if (allStuff.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 10px; color:#94a3b8;">
        <div style="font-size:2.5rem; margin-bottom:8px;">🎒</div>
        Il tuo zaino è ancora vuoto.<br>Sconfiggi i Guardiani per raccogliere i 5 Cristalli e gli oggetti!
      </div>`;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'inv-grid';
  allStuff.forEach(obj => {
    const card = document.createElement('div');
    card.className = 'inv-card';
    card.innerHTML = `
      <div class="inv-icon">${obj.icon}</div>
      <div class="inv-name">${obj.name}</div>
      <div class="inv-desc">${obj.desc}</div>`;
    grid.appendChild(card);
  });
  container.innerHTML = '';
  container.appendChild(grid);
}

/* --------------------------------------------------------------------------
   AVVIO
   -------------------------------------------------------------------------- */
$('scene-svg').addEventListener('click', onSceneClick);
$('dialogue-text').addEventListener('click', skipTyping);
updateHUD();
