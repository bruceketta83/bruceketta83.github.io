/* ==========================================================================
   SCENE SVG ANIMATE (viewBox 400 x 220, titolo 400 x 800)
   ========================================================================== */

/* Onda ripetuta con periodo 40 (si sposta di 40 unità in loop). */
function wavePath(y, amp) {
  let d = `M-40 ${y}`;
  for (let x = -40; x < 440; x += 40) d += ` q10 ${-amp} 20 0 t20 0`;
  return d;
}

/* ==========================================================================
   SCENA 1: IL MOLO DELLE BASI UGUALI
   ========================================================================== */
/* Contorno delle scene: marrone scuro per il legno, blu notte per il resto. */
const WOOD_INK = '#2a1a12';
function wink(w = 0.8) { return `stroke="${WOOD_INK}" stroke-width="${w}" stroke-linejoin="round"`; }

/* Cassa di legno con angolari e scritta (stile mock-up). */


const SCENES = {};

/* Campo di stelle deterministico (stessa posizione a ogni apertura). */
function starField(n, seed, w, h, maxR = 1.3) {
  let s = seed;
  const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  let out = '';
  for (let i = 0; i < n; i++) {
    out += `<circle class="twinkle" cx="${(r() * w).toFixed(1)}" cy="${(r() * h).toFixed(1)}" r="${(0.35 + r() * maxR).toFixed(2)}" fill="#fff" style="animation-delay:-${(r() * 3).toFixed(2)}s"/>`;
  }
  return out;
}

/* Lanterna appesa che oscilla. Il gancio è in (x, y). */
function hangingLantern(x, y, len, gradId) {
  return `
  <g transform="translate(${x} ${y})">
    <g class="swing" style="animation-delay:-${(x % 7) / 2}s">
      <line x1="0" y1="0" x2="0" y2="${len}" stroke="#1c1008" stroke-width="1"/>
      <circle class="flicker" cx="0" cy="${len + 7}" r="20" fill="url(#${gradId})"/>
      <path d="M-4 ${len} L4 ${len} L5 ${len + 3} L-5 ${len + 3} Z" fill="#292524"/>
      <rect class="flicker" x="-4" y="${len + 3}" width="8" height="9" rx="1.5" fill="#fbbf24"/>
      <path d="M-4 ${len + 3} L-4 ${len + 12} M0 ${len + 3} L0 ${len + 12} M4 ${len + 3} L4 ${len + 12}" stroke="#292524" stroke-width="0.7"/>
      <rect x="-5" y="${len + 12}" width="10" height="2" fill="#292524"/>
    </g>
  </g>`;
}


/* ==========================================================================
   SCHERMATA INIZIALE (viewBox 400 x 800, verticale)
   ========================================================================== */
const TITLE_CRYSTALS = ['#f59e0b', '#06b6d4', '#a855f7', '#10b981', '#ef4444'];

SCENES.title = {
  svg() {
    const crystals = TITLE_CRYSTALS.map((c, i) => {
      const a = Math.PI * (1.12 + i * 0.19);
      const x = 205 + Math.cos(a) * 78;
      const y = 340 + Math.sin(a) * 42;
      return `
      <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
        <g class="crystal-float" style="animation-delay:-${i * 0.6}s">
          <circle r="13" fill="${c}" opacity="0.25" class="crystal-glow"/>
          <polygon points="0,-10 6,-2 0,10 -6,-2" fill="${c}" stroke="#fff" stroke-width="0.8" stroke-opacity="0.7"/>
          <polygon points="0,-10 6,-2 0,-1" fill="#fff" opacity="0.4"/>
        </g>
      </g>`;
    }).join('');
    const waves = [512, 532, 560, 598, 650, 715].map((y, i) =>
      `<g class="wave" style="animation-duration:${6 + i * 1.5}s${i % 2 ? ';animation-direction:reverse' : ''}">
        <path d="${wavePath(y, 1.5 + i * 0.5)}" stroke="#93c5fd" stroke-opacity="${0.35 - i * 0.04}" fill="none" stroke-width="${1 + i * 0.2}"/>
      </g>`).join('');
    const reflection = [508, 516, 526, 538, 552, 568].map((y, i) =>
      `<ellipse class="shimmer" cx="318" cy="${y}" rx="${16 - i * 2}" ry="1.4" fill="#fef3c7" style="animation-delay:-${i * 0.4}s"/>`).join('');
    const sparks = [[150, 300], [260, 296], [120, 350], [290, 352], [205, 262]].map(([x, y], i) =>
      `<g transform="translate(${x} ${y})"><path class="spark-pop" d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill="#fef9c3" style="animation-delay:-${i * 0.5}s"/></g>`).join('');

    return `
    <defs>
      <linearGradient id="ti-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#050816"/>
        <stop offset="0.45" stop-color="#1e1b4b"/>
        <stop offset="0.75" stop-color="#5b21b6"/>
        <stop offset="0.92" stop-color="#be185d"/>
        <stop offset="1" stop-color="#f59e0b"/>
      </linearGradient>
      <linearGradient id="ti-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1e3a8a"/>
        <stop offset="1" stop-color="#020617"/>
      </linearGradient>
      <radialGradient id="ti-moon">
        <stop offset="0" stop-color="#fef3c7" stop-opacity="0.5"/>
        <stop offset="1" stop-color="#fef3c7" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="ti-lamp">
        <stop offset="0" stop-color="#fde68a" stop-opacity="0.9"/>
        <stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="400" height="502" fill="url(#ti-sky)"/>
    ${starField(90, 7, 400, 420, 1.2)}
    <line class="shoot" x1="330" y1="90" x2="352" y2="78" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>

    <circle cx="318" cy="205" r="70" fill="url(#ti-moon)"/>
    <circle cx="318" cy="205" r="30" fill="#fef3c7"/>
    <circle cx="308" cy="196" r="5" fill="#fde68a"/>
    <circle cx="327" cy="214" r="3.5" fill="#fde68a"/>
    <circle cx="322" cy="194" r="2" fill="#fde68a"/>

    <g class="drift" style="animation-duration:110s;animation-delay:-30s">
      <g fill="#c4b5fd" opacity="0.25"><ellipse cx="0" cy="250" rx="50" ry="9"/><ellipse cx="20" cy="242" rx="28" ry="9"/></g>
    </g>
    <g class="drift" style="animation-duration:140s;animation-delay:-100s">
      <g fill="#f0abfc" opacity="0.18"><ellipse cx="0" cy="410" rx="60" ry="7"/><ellipse cx="-18" cy="404" rx="30" ry="7"/></g>
    </g>

    <!-- Isola e Faro -->
    <path d="M60 504 Q115 470 160 462 Q190 448 225 456 Q285 468 345 504 Z" fill="#1e1b4b"/>
    <path d="M118 470 Q122 452 120 440 M120 440 Q110 436 104 442 M120 440 Q128 432 136 436 M120 440 Q116 430 112 428" stroke="#1e1b4b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M300 482 Q302 466 299 456 M299 456 Q290 452 285 458 M299 456 Q306 449 314 452" stroke="#1e1b4b" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <polygon points="193,462 217,462 212,352 198,352" fill="#e2e8f0"/>
    <polygon points="195.4,440 214.6,440 213.8,422 196.2,422" fill="#dc2626"/>
    <polygon points="197,400 213,400 212.4,382 197.6,382" fill="#dc2626"/>
    <polygon points="198,362 212,362 212,352 198,352" fill="#dc2626"/>
    <rect x="192" y="346" width="26" height="6" rx="1" fill="#334155"/>
    <rect x="196" y="328" width="18" height="18" fill="#0f172a"/>
    <rect class="faro-blink" x="198" y="330" width="14" height="14" fill="#fde68a"/>
    <circle class="faro-blink" cx="205" cy="337" r="32" fill="url(#ti-lamp)"/>
    <polygon points="193,328 217,328 205,314" fill="#334155"/>
    <circle cx="205" cy="312" r="2" fill="#334155"/>
    <polygon class="faro-blink" points="205,337 400,300 400,372" fill="#fde68a" opacity="0.12"/>
    <polygon class="faro-blink" points="205,337 0,300 0,372" fill="#fde68a" opacity="0.12" style="animation-delay:-1.7s"/>

    ${crystals}
    ${sparks}

    <!-- Mare -->
    <rect y="500" width="400" height="300" fill="url(#ti-sea)"/>
    ${reflection}
    ${waves}

    <!-- Nave che attraversa l'orizzonte -->
    <g class="sail">
      <g transform="translate(0 503)">
        <g class="bob">
          <path d="M-26 -8 L26 -8 L19 0 L-19 0 Z" fill="#0f0a1e"/>
          <line x1="0" y1="-8" x2="0" y2="-44" stroke="#0f0a1e" stroke-width="2"/>
          <path d="M2 -42 Q17 -28 2 -12 Z" fill="#1e1b4b"/>
          <path d="M-2 -38 Q-13 -26 -2 -14 Z" fill="#1e1b4b"/>
          <path d="M0 -44 L9 -41 L0 -38 Z" fill="#dc2626"/>
        </g>
      </g>
    </g>

    <!-- Aria sullo scoglio -->
    <path d="M-10 800 L-10 532 Q25 500 70 506 Q118 510 150 548 Q170 600 160 800 Z" fill="#0b0716"/>
    <path d="M10 530 Q45 508 80 512 Q60 518 30 540 Z" fill="#1e1b4b" opacity="0.7"/>
    <g transform="translate(78 512) scale(1.9)">
      ${drawAria()}
    </g>
    `;
  }
};

/* Ingranaggio con n denti (centro in 0,0). */
function gearPath(r, teeth) {
  const depth = r * 0.2;
  const n = teeth * 2;
  let d = '';
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2;
    const a1 = ((i + 1) / n) * Math.PI * 2;
    const rr = i % 2 ? r - depth : r;
    d += `${i ? 'L' : 'M'}${(rr * Math.cos(a0)).toFixed(1)} ${(rr * Math.sin(a0)).toFixed(1)} L${(rr * Math.cos(a1)).toFixed(1)} ${(rr * Math.sin(a1)).toFixed(1)} `;
  }
  return d + 'Z';
}

function gearSVG(x, y, r, teeth, color, dur, reverse) {
  return `
  <g transform="translate(${x} ${y})">
    <g class="spin" style="animation-duration:${dur}s${reverse ? ';animation-direction:reverse' : ''}">
      <path d="${gearPath(r, teeth)}" fill="${color}"/>
      <circle r="${(r * 0.55).toFixed(1)}" fill="none" stroke="#0f172a" stroke-width="${(r * 0.12).toFixed(1)}" opacity="0.35"/>
      <circle r="${(r * 0.22).toFixed(1)}" fill="#0f172a"/>
    </g>
  </g>`;
}


/* Foglia grande stilizzata (tipo monstera). */
function bigLeaf(x, y, size, rot, color) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${size})">
    <path d="M0 0 Q-14 -10 -10 -28 Q0 -36 10 -28 Q14 -10 0 0 Z" fill="${color}"/>
    <path d="M0 0 L0 -30 M0 -8 L-8 -14 M0 -14 L8 -20 M0 -20 L-7 -26" stroke="#064e3b" stroke-width="0.9" opacity="0.6"/>
  </g>`;
}

/* Liana appesa che oscilla. */
function vine(x, len, delay) {
  let leaves = '';
  for (let y = 8; y < len; y += 9) {
    const side = (y / 9) % 2 ? -1 : 1;
    leaves += `<ellipse cx="${side * 3}" cy="${y}" rx="3" ry="1.6" fill="#22c55e" transform="rotate(${side * 30} ${side * 3} ${y})"/>`;
  }
  return `<g transform="translate(${x} 0)"><g class="swing" style="animation-duration:6s;animation-delay:-${delay}s">
    <path d="M0 0 Q3 ${len / 2} 0 ${len}" stroke="#15803d" stroke-width="1.2" fill="none"/>${leaves}
  </g></g>`;
}

function butterfly(color, dur, delay) {
  return `<g class="butterfly" style="animation-duration:${dur}s;animation-delay:-${delay}s">
    <g class="wings">
      <path d="M0 0 Q-5 -6 -6 -1 Q-5 3 0 0 Z" fill="${color}"/>
      <path d="M0 0 Q5 -6 6 -1 Q5 3 0 0 Z" fill="${color}"/>
    </g>
    <line x1="0" y1="-2" x2="0" y2="2" stroke="#1c1917" stroke-width="0.8"/>
  </g>`;
}

/* ==========================================================================
   SCENA 4: LA SERRA DEGLI ESPONENTI ZERO
   ========================================================================== */
SCENES.serra = {
  bg() {
    const mullions = [50, 100, 150, 200, 250, 300, 350].map(x =>
      `<line x1="${x}" y1="${(60 - 90 * (1 - Math.pow((x - 200) / 200, 2)) * 0.98).toFixed(1)}" x2="${x}" y2="178" stroke="#f1f5f9" stroke-width="2" opacity="0.65"/>`).join('');
    const tiles = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 20; c++) {
        if ((r + c) % 2) tiles.push(`<rect x="${c * 20}" y="${178 + r * 11}" width="20" height="11" fill="#9a3412" opacity="0.55"/>`);
      }
    }
    const pots = [[150, 6, '#16a34a'], [166, 5, '#22c55e'], [182, 6.5, '#15803d'], [212, 5, '#4ade80'], [226, 6, '#16a34a']].map(([x, r, c]) => `
      <path d="M${x - 5} 136 L${x + 5} 136 L${x + 4} 145 L${x - 4} 145 Z" fill="#c2410c"/>
      <circle cx="${x}" cy="${134 - r / 2}" r="${r}" fill="${c}"/>`).join('');
    const pollen = [[60, 0], [140, 1.2], [230, 2.4], [330, 0.7], [380, 3]].map(([x, d]) =>
      `<circle class="pollen" cx="${x}" cy="172" r="1.1" fill="#fef08a" style="animation-delay:-${d}s"/>`).join('');
    const crystalTaken = typeof state !== 'undefined' && state.completedAreas.includes(3);

    return `
    <defs>
      <linearGradient id="s-air" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ecfeff"/>
        <stop offset="0.45" stop-color="#99f6e4"/>
        <stop offset="1" stop-color="#047857"/>
      </linearGradient>
      <linearGradient id="s-ray" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="s-gem">
        <stop offset="0" stop-color="#6ee7b7" stop-opacity="0.9"/>
        <stop offset="1" stop-color="#6ee7b7" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="400" height="220" fill="url(#s-air)"/>

    <!-- Fogliame sullo sfondo -->
    <path d="M0 178 Q30 120 70 150 Q90 110 130 160 Q170 130 200 170 Q240 125 280 160 Q320 115 360 150 Q385 130 400 140 L400 178 Z" fill="#065f46" opacity="0.55"/>

    <!-- Struttura in vetro e ferro -->
    <path d="M-10 62 Q200 -32 410 62" stroke="#f8fafc" stroke-width="3" fill="none" opacity="0.8"/>
    <path d="M-10 92 Q200 4 410 92" stroke="#f8fafc" stroke-width="1.6" fill="none" opacity="0.5"/>
    ${mullions}
    <line x1="0" y1="118" x2="400" y2="118" stroke="#f1f5f9" stroke-width="1.6" opacity="0.5"/>
    <path d="M70 70 L86 50 M76 74 L94 52 M270 96 L288 74 M330 70 L344 52" stroke="#fff" stroke-width="1.4" opacity="0.5"/>

    <!-- Raggi di luce -->
    <polygon class="shimmer" points="40,0 90,0 190,178 120,178" fill="url(#s-ray)" style="animation-duration:5s"/>
    <polygon class="shimmer" points="230,0 262,0 330,178 284,178" fill="url(#s-ray)" style="animation-duration:6.5s;animation-delay:-2s"/>

    <!-- Liane appese -->
    ${vine(28, 64, 0)}${vine(122, 42, 1.5)}${vine(250, 54, 3)}${vine(372, 70, 4.2)}

    <!-- Vasi appesi -->
    <g transform="translate(176 0)">
      <g class="swing" style="animation-duration:5s">
        <path d="M0 0 L-6 26 M0 0 L6 26" stroke="#78350f" stroke-width="0.7"/>
        <path d="M-8 26 L8 26 L6 34 L-6 34 Z" fill="#c2410c"/>
        <path d="M-8 26 Q-14 34 -12 44 M-4 26 Q-6 36 -4 46 M4 26 Q8 36 6 44 M8 26 Q14 32 13 40" stroke="#16a34a" stroke-width="1.6" fill="none"/>
      </g>
    </g>

    <!-- Banco con piantine e annaffiatoio -->
    <rect x="138" y="145" width="100" height="5" rx="1" fill="#78350f"/>
    <rect x="142" y="150" width="4" height="28" fill="#5b3415"/>
    <rect x="230" y="150" width="4" height="28" fill="#5b3415"/>
    ${pots}
    <g transform="translate(198 145)">
      <path d="M-6 0 L6 0 L5 -10 L-5 -10 Z" fill="#64748b"/>
      <path d="M5 -8 L12 -14" stroke="#64748b" stroke-width="2"/>
      <path d="M-5 -9 Q-10 -9 -9 -3" stroke="#64748b" stroke-width="1.4" fill="none"/>
    </g>

    <!-- Cristallo Smeraldo dietro la pianta -->
    <g transform="translate(345 178)">
      <rect x="-9" y="-26" width="18" height="26" fill="#cbd5e1"/>
      <rect x="-12" y="-29" width="24" height="4" rx="1" fill="#e2e8f0"/>
      ${crystalTaken ? '' : `<g id="area-crystal">
      <circle class="crystal-glow" cx="0" cy="-40" r="14" fill="url(#s-gem)"/>
      <g class="crystal-float">
        <polygon points="0,-50 6,-41 0,-31 -6,-41" fill="#10b981" stroke="#ecfdf5" stroke-width="0.8"/>
        <polygon points="0,-50 6,-41 0,-40" fill="#fff" opacity="0.45"/>
      </g></g>`}
    </g>

    <!-- Foglie grandi ai lati -->
    ${bigLeaf(18, 182, 1.5, 18, '#15803d')}
    ${bigLeaf(44, 182, 1.1, -8, '#16a34a')}
    ${bigLeaf(388, 182, 1.6, -22, '#15803d')}

    <!-- Farfalle e polline -->
    ${butterfly('#f472b6', 16, 0)}
    ${butterfly('#facc15', 21, 7)}
    ${pollen}

    <!-- Pavimento in cotto -->
    <rect y="178" width="400" height="42" fill="#c2410c"/>
    ${tiles.join('')}
    <rect y="178" width="400" height="2" fill="#9a3412"/>
    <ellipse class="shimmer" cx="120" cy="204" rx="16" ry="2.4" fill="#bae6fd" opacity="0.5"/>
    `;
  }
};

/* ==========================================================================
   SCENA 5: L'OFFICINA STEAMPUNK
   ========================================================================== */
SCENES.officina = {
  bg() {
    const gateOpen = typeof state !== 'undefined' && state.completedAreas.includes(4);
    const bars = [];
    for (let x = 258; x <= 326; x += 8.5) bars.push(`<rect x="${x}" y="64" width="3" height="116" fill="#3f3f46"/>`);
    const seams = [80, 160, 240, 320].map(x =>
      `<line x1="${x}" y1="180" x2="${x}" y2="220" stroke="#18181b" stroke-width="1"/>`).join('');
    const rivets = [];
    for (let x = 10; x < 400; x += 40) rivets.push(`<circle cx="${x}" cy="186" r="1" fill="#71717a"/><circle cx="${x}" cy="214" r="1" fill="#71717a"/>`);
    const sparks = [[0, 0], [5, -4], [-4, -5], [3, 3]].map(([dx, dy], i) =>
      `<g transform="translate(${152 + dx} ${132 + dy})"><path class="spark-pop" d="M0 -3 L0.8 -0.8 L3 0 L0.8 0.8 L0 3 L-0.8 0.8 L-3 0 L-0.8 -0.8 Z" fill="#fde047" style="animation-duration:0.9s;animation-delay:-${i * 0.22}s"/></g>`).join('');

    return `
    <defs>
      <pattern id="w-brick" width="24" height="12" patternUnits="userSpaceOnUse">
        <rect width="24" height="12" fill="#3b2116"/>
        <rect x="0.6" y="0.6" width="22.8" height="5" rx="0.6" fill="#4a2a1b"/>
        <rect x="-11.4" y="6.6" width="22.8" height="5" rx="0.6" fill="#4a2a1b"/>
        <rect x="12.6" y="6.6" width="22.8" height="5" rx="0.6" fill="#4a2a1b"/>
      </pattern>
      <radialGradient id="w-forge" cx="0.5" cy="1" r="0.9">
        <stop offset="0" stop-color="#f97316" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#f97316" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="w-gate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1e1b4b"/>
        <stop offset="1" stop-color="#fbbf24" stop-opacity="0.75"/>
      </linearGradient>
      <radialGradient id="w-lamp">
        <stop offset="0" stop-color="#fde68a" stop-opacity="0.8"/>
        <stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="400" height="220" fill="url(#w-brick)"/>
    <rect width="400" height="220" fill="#000" opacity="0.25"/>
    <rect width="400" height="220" fill="url(#w-forge)" class="flicker"/>

    <!-- Ingranaggi sul muro -->
    ${gearSVG(52, 52, 30, 14, '#b45309', 16, false)}
    ${gearSVG(96, 26, 16, 9, '#d97706', 8.6, true)}
    ${gearSVG(368, 40, 26, 12, '#c2410c', 13, true)}
    ${gearSVG(334, 76, 12, 8, '#a16207', 6, false)}

    <!-- Tubi, valvola e manometro -->
    <rect x="0" y="96" width="232" height="7" fill="#78716c"/>
    <rect x="226" y="0" width="7" height="103" fill="#78716c"/>
    <rect x="70" y="94" width="6" height="11" rx="1" fill="#a8a29e"/>
    <rect x="148" y="94" width="6" height="11" rx="1" fill="#a8a29e"/>
    <rect x="224" y="40" width="11" height="6" rx="1" fill="#a8a29e"/>
    <circle class="steam" cx="151" cy="92" r="3.5" fill="#e5e7eb"/>
    <circle class="steam" cx="151" cy="92" r="3.5" fill="#e5e7eb" style="animation-delay:-0.9s"/>
    <circle class="steam" cx="151" cy="92" r="3.5" fill="#e5e7eb" style="animation-delay:-1.8s"/>
    <g transform="translate(229.5 66)">
      <g class="spin" style="animation-duration:20s">
        <circle r="8" fill="none" stroke="#dc2626" stroke-width="2"/>
        <path d="M-8 0 L8 0 M0 -8 L0 8" stroke="#dc2626" stroke-width="1.6"/>
      </g>
    </g>
    <g transform="translate(186 60)">
      <circle r="11" fill="#fef3c7" stroke="#78350f" stroke-width="2"/>
      <path d="M-7 4 A8 8 0 0 1 7 4" stroke="#dc2626" stroke-width="1.4" fill="none" opacity="0.6"/>
      <line class="needle" x1="0" y1="0" x2="5" y2="-6" stroke="#111" stroke-width="1.2" stroke-linecap="round"/>
      <circle r="1.4" fill="#111"/>
    </g>

    <!-- Pannello attrezzi -->
    <rect x="108" y="108" width="62" height="28" rx="2" fill="#5b3415"/>
    <path d="M116 112 L116 130 M114 113 L118 113" stroke="#94a3b8" stroke-width="2"/>
    <path d="M128 112 L128 128" stroke="#a16207" stroke-width="2"/><rect x="124" y="110" width="8" height="5" rx="1" fill="#64748b"/>
    <path d="M140 112 L146 130" stroke="#94a3b8" stroke-width="1.6"/><circle cx="139.5" cy="111" r="2.4" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
    <rect x="152" y="112" width="12" height="7" rx="1" fill="#dc2626"/>

    <!-- Banco di lavoro con morsa e scintille -->
    <rect x="28" y="140" width="146" height="6" rx="1" fill="#78350f"/>
    <rect x="34" y="146" width="5" height="34" fill="#5b3415"/>
    <rect x="163" y="146" width="5" height="34" fill="#5b3415"/>
    <rect x="144" y="132" width="16" height="8" rx="1" fill="#52525b"/>
    <rect x="148" y="126" width="8" height="7" fill="#71717a"/>
    ${sparks}
    <g transform="translate(50 140)">
      <circle cx="0" cy="-6" r="6" fill="#b45309"/>
      <circle cx="0" cy="-6" r="3" fill="#78350f"/>
      <rect x="10" y="-5" width="16" height="5" rx="1" fill="#475569"/>
    </g>

    <!-- Catena con gancio -->
    <g transform="translate(210 0)">
      <g class="swing" style="animation-duration:4.5s">
        <line x1="0" y1="0" x2="0" y2="40" stroke="#71717a" stroke-width="1.4" stroke-dasharray="3 1.5"/>
        <path d="M0 40 Q5 46 0 50 Q-4 50 -4 46" stroke="#a1a1aa" stroke-width="1.8" fill="none"/>
      </g>
    </g>

    <!-- Cancello verso il Faro -->
    <path d="M250 182 L250 76 Q292 36 334 76 L334 182 Z" fill="#57534e"/>
    <path d="M256 180 L256 78 Q292 46 328 78 L328 180 Z" fill="url(#w-gate)"/>
    <g transform="translate(292 70)">
      <rect x="-3" y="-12" width="6" height="16" fill="#1e1b4b"/>
      <circle class="faro-blink" cx="0" cy="-12" r="5" fill="#fde68a"/>
    </g>
    <g ${gateOpen ? 'transform="translate(0 -104)"' : ''}>
      ${bars.join('')}
      <rect x="254" y="118" width="76" height="4" fill="#27272a"/>
    </g>
    <path d="M250 76 Q292 36 334 76" stroke="#78716c" stroke-width="4" fill="none"/>

    <!-- Lampade a gabbia -->
    <circle class="flicker" cx="240" cy="84" r="14" fill="url(#w-lamp)"/>
    <rect class="flicker" x="236" y="79" width="8" height="10" rx="2" fill="#fbbf24"/>
    <path d="M236 79 L244 89 M244 79 L236 89" stroke="#3f3f46" stroke-width="0.7"/>
    <circle class="flicker" cx="344" cy="84" r="14" fill="url(#w-lamp)" style="animation-delay:-1.2s"/>
    <rect class="flicker" x="340" y="79" width="8" height="10" rx="2" fill="#fbbf24" style="animation-delay:-1.2s"/>
    <path d="M340 79 L348 89 M348 79 L340 89" stroke="#3f3f46" stroke-width="0.7"/>

    <!-- Pavimento in lamiera -->
    <rect y="180" width="400" height="40" fill="#3f3f46"/>
    <rect y="180" width="400" height="2" fill="#52525b"/>
    ${seams}
    ${rivets.join('')}
    <ellipse class="shimmer" cx="190" cy="204" rx="18" ry="3" fill="#a855f7" opacity="0.25"/>
    `;
  }
};

/* ==========================================================================
   SCENA 6: LA CIMA DEL FARO (DUELLO FINALE)
   La classe "lit" sullo svg accende il faro alla vittoria finale.
   ========================================================================== */
SCENES.faro = {
  bg() {
    const owned = typeof state !== 'undefined' ? state.crystals.map(c => c.id) : [];
    const slots = ['c1', 'c2', 'c3', 'c4', 'c5'].map((id, i) => {
      const x = 184 + i * 8;
      const color = TITLE_CRYSTALS[i];
      return owned.includes(id)
        ? `<circle class="crystal-glow" cx="${x}" cy="156" r="4.5" fill="${color}"/>
           <polygon points="${x},151.5 ${x + 2.6},155.5 ${x},159.5 ${x - 2.6},155.5" fill="${color}" stroke="#fff" stroke-width="0.5"/>`
        : `<circle cx="${x}" cy="155.5" r="2.4" fill="#0f172a" stroke="#475569" stroke-width="0.6"/>`;
    }).join('');
    const panes = [168, 184, 200, 216, 232].map(x =>
      `<line x1="${x}" y1="44" x2="${x}" y2="118" stroke="#334155" stroke-width="1.6"/>`).join('');
    const rings = [8, 13, 18, 23].map(r =>
      `<ellipse cx="200" cy="82" rx="${r * 0.75}" ry="${r}" fill="none" stroke="#fde68a" stroke-width="0.8" opacity="0.5"/>`).join('');
    const sparks = [[176, 66], [222, 70], [190, 104], [214, 98], [200, 56], [230, 88]].map(([x, y], i) =>
      `<g transform="translate(${x} ${y})"><path class="spark-pop" d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill="#c084fc" style="animation-duration:1.4s;animation-delay:-${i * 0.25}s"/></g>`).join('');
    const posts = [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${i * 56 + 6}" y="160" width="3" height="24" fill="#1e293b"/>`).join('');

    return `
    <defs>
      <linearGradient id="f-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#020617"/>
        <stop offset="0.7" stop-color="#1e1b4b"/>
        <stop offset="1" stop-color="#3b0764"/>
      </linearGradient>
      <radialGradient id="f-core">
        <stop offset="0" stop-color="#fef9c3" stop-opacity="1"/>
        <stop offset="0.4" stop-color="#fde047" stop-opacity="0.75"/>
        <stop offset="1" stop-color="#fde047" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="f-beam-l" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stop-color="#fef08a" stop-opacity="0.7"/>
        <stop offset="1" stop-color="#fef08a" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="f-beam" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fef08a" stop-opacity="0.7"/>
        <stop offset="1" stop-color="#fef08a" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <rect width="400" height="220" fill="url(#f-sky)"/>
    ${starField(35, 51, 400, 110, 0.8)}
    <rect class="lightning unlit-only" width="400" height="220" fill="#e9d5ff"/>

    <g class="drift" style="animation-duration:60s;animation-delay:-10s">
      <g fill="#312e81" opacity="0.8"><ellipse cx="0" cy="30" rx="50" ry="11"/><ellipse cx="24" cy="22" rx="30" ry="11"/></g>
    </g>
    <g class="drift" style="animation-duration:85s;animation-delay:-50s">
      <g fill="#3b0764" opacity="0.7"><ellipse cx="0" cy="58" rx="60" ry="10"/><ellipse cx="-20" cy="50" rx="30" ry="9"/></g>
    </g>

    <!-- Mare lontano, sotto il faro -->
    <rect y="150" width="400" height="40" fill="#0b1437"/>
    <g class="wave" style="animation-duration:9s"><path d="${wavePath(158, 1)}" stroke="#93c5fd" stroke-opacity="0.25" fill="none" stroke-width="0.8"/></g>
    <g class="wave" style="animation-duration:12s;animation-direction:reverse"><path d="${wavePath(168, 1.2)}" stroke="#93c5fd" stroke-opacity="0.2" fill="none" stroke-width="0.8"/></g>

    <!-- Raggi del faro acceso (solo alla vittoria) -->
    <g class="lit-only">
      <g class="beam-rot">
        <polygon points="200,82 420,40 420,124" fill="url(#f-beam)"/>
        <polygon points="200,82 -20,40 -20,124" fill="url(#f-beam-l)"/>
      </g>
    </g>

    <!-- Ringhiera della balconata (dietro) -->
    <rect y="158" width="400" height="3" fill="#334155"/>
    ${posts}

    <!-- Stanza della lanterna -->
    <rect x="148" y="118" width="104" height="66" fill="#e2e8f0"/>
    <rect x="148" y="136" width="104" height="12" fill="#dc2626"/>
    <rect x="148" y="166" width="104" height="10" fill="#dc2626"/>
    <rect x="156" y="40" width="88" height="80" fill="#0f172a" opacity="0.85"/>
    ${rings}
    <circle class="unlit-only" cx="200" cy="82" r="9" fill="#78350f"/>
    <circle class="unlit-only flicker" cx="200" cy="82" r="5" fill="#c084fc" opacity="0.6"/>
    <g class="lit-only">
      <circle class="faro-on" cx="200" cy="82" r="48" fill="url(#f-core)"/>
      <circle cx="200" cy="82" r="10" fill="#fefce8"/>
    </g>
    ${panes}
    <rect x="156" y="40" width="88" height="80" fill="none" stroke="#334155" stroke-width="2.4"/>
    <path d="M156 52 L176 44 M156 66 L190 50" stroke="#fff" stroke-width="1" opacity="0.18"/>
    <path d="M150 42 Q200 0 250 42 Z" fill="#b91c1c"/>
    <rect x="146" y="38" width="108" height="5" rx="1.5" fill="#7f1d1d"/>
    <circle cx="200" cy="12" r="4" fill="#7f1d1d"/>
    <line x1="200" y1="8" x2="200" y2="0" stroke="#7f1d1d" stroke-width="1.4"/>
    <g class="unlit-only">${sparks}</g>

    <!-- Piedistallo con i 5 cristalli -->
    <rect x="176" y="150" width="48" height="34" fill="#475569"/>
    <rect x="172" y="146" width="56" height="7" rx="2" fill="#64748b"/>
    <rect x="180" y="160" width="40" height="2" fill="#334155"/>
    ${slots}

    <!-- Pavimento della balconata -->
    <rect y="184" width="400" height="36" fill="#334155"/>
    <rect y="184" width="400" height="2" fill="#475569"/>
    <path d="M0 196 L400 196 M0 208 L400 208" stroke="#1e293b" stroke-width="0.8"/>
    `;
  },
  fg() {
    const posts = [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${i * 56 + 4}" y="198" width="4" height="22" fill="#0f172a"/>`).join('');
    return `
    <rect y="196" width="400" height="4" rx="1" fill="#0f172a"/>
    <rect y="208" width="400" height="2" fill="#0f172a"/>
    ${posts}`;
  }
};




/* ==========================================================================
   TORRE – STANZA: LA BIBLIOTECA
   ========================================================================== */
SCENES.biblioteca = {
  bg() {
    const colors = ['#b91c1c', '#1d4ed8', '#15803d', '#a16207', '#7c3aed', '#0e7490', '#be185d'];
    const shelf = (x0, x1, rows = 4) => {
      let out = '';
      for (let r = 0; r < rows; r++) {
        const y = 40 + r * 34;
        out += `<rect x="${x0}" y="${y + 28}" width="${x1 - x0}" height="4" fill="#451a03"/>`;
        for (let x = x0 + 3, i = 0; x < x1 - 6; x += 7, i++) {
          const h = 20 + ((x * 7 + r * 3) % 7);
          out += `<rect x="${x}" y="${y + 28 - h}" width="6" height="${h}" fill="${colors[(i + r * 2) % colors.length]}"/>`;
        }
      }
      return out;
    };
    return `
    <defs>
      <linearGradient id="bi-win" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#020617"/><stop offset="1" stop-color="#312e81"/>
      </linearGradient>
      <radialGradient id="bi-candle">
        <stop offset="0" stop-color="#fde68a" stop-opacity="0.7"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="#1e293b"/>
    <path d="M0 0 L400 0 L400 182 L0 182 Z" fill="#334155"/>
    <path d="M0 30 L400 30 M0 70 L400 70 M0 110 L400 110 M0 150 L400 150" stroke="#1e293b" stroke-width="1" opacity="0.7"/>

    <!-- Scaffali -->
    <rect x="44" y="34" width="96" height="148" fill="#5b3415"/>
    ${shelf(46, 138)}
    <rect x="286" y="34" width="70" height="78" fill="#5b3415"/>
    ${shelf(288, 354, 2)}

    <!-- Scala a pioli -->
    <path d="M130 182 L150 40 M146 182 L166 40" stroke="#a16207" stroke-width="2"/>
    <path d="M133 160 L149 160 M136 136 L152 136 M139 112 L155 112 M143 88 L159 88 M146 64 L162 64" stroke="#a16207" stroke-width="1.6"/>

    <!-- Finestra ad arco con le stelle -->
    <path d="M180 100 L180 50 Q200 26 220 50 L220 100 Z" fill="url(#bi-win)"/>
    <circle class="twinkle" cx="192" cy="60" r="1" fill="#fff"/><circle class="twinkle" cx="208" cy="70" r="1.2" fill="#fff" style="animation-delay:-1s"/>
    <circle class="twinkle" cx="200" cy="48" r="0.8" fill="#fff" style="animation-delay:-2s"/>
    <path d="M200 30 L200 100 M180 72 L220 72" stroke="#1e293b" stroke-width="2"/>
    <path d="M180 100 L180 50 Q200 26 220 50 L220 100 Z" fill="none" stroke="#64748b" stroke-width="3"/>

    <!-- Lavagna -->
    <rect x="226" y="44" width="56" height="40" rx="2" fill="#14532d" stroke="#78350f" stroke-width="3"/>
    <text x="254" y="62" font-size="10" fill="#f8fafc" text-anchor="middle" font-family="Courier New, monospace" font-weight="700">${(() => { const P = P_torre(); return `(${P.b}${toSup(P.m)})${toSup(P.n)} = ?`; })()}</text>
    <path d="M234 72 Q246 76 258 70 M260 74 L272 74" stroke="#f8fafc" stroke-width="0.8" opacity="0.6" fill="none"/>

    <!-- Scrivania con candela -->
    <rect x="172" y="140" width="64" height="5" rx="1" fill="#78350f"/>
    <rect x="178" y="145" width="4" height="37" fill="#451a03"/><rect x="226" y="145" width="4" height="37" fill="#451a03"/>
    <circle class="flicker" cx="224" cy="128" r="16" fill="url(#bi-candle)"/>
    <rect x="221" y="128" width="5" height="12" fill="#fef3c7"/>
    <ellipse class="flicker" cx="223.5" cy="125" rx="1.6" ry="2.8" fill="#fbbf24"/>

    <!-- Armadio con tastierino -->
    <rect x="300" y="112" width="52" height="70" rx="2" fill="#78350f" stroke="#451a03" stroke-width="2"/>
    <path d="M326 114 L326 180" stroke="#451a03" stroke-width="1.4"/>
    <circle cx="322" cy="148" r="1.4" fill="#fbbf24"/><circle cx="330" cy="148" r="1.4" fill="#fbbf24"/>

    <!-- Pavimento -->
    <rect y="182" width="400" height="38" fill="#475569"/>
    <path d="M0 194 L400 194 M0 208 L400 208" stroke="#334155" stroke-width="1"/>
    <rect x="10" y="98" width="30" height="84" fill="#1e293b"/>
    <path d="M10 98 Q25 86 40 98" fill="#1e293b"/>
    `;
  }
};

/* ==========================================================================
   SERRA – STANZA: IL VIVAIO (buio finché la Lente non lo illumina)
   ========================================================================== */
SCENES.vivaio = {
  bg() {
    const trays = [];
    [70, 120].forEach(y => {
      trays.push(`<rect x="50" y="${y}" width="110" height="5" fill="#78350f"/>`);
      for (let x = 56; x < 156; x += 12) trays.push(`<path d="M${x} ${y} Q${x + 3} ${y - 9} ${x + 6} ${y}" stroke="#22c55e" stroke-width="2" fill="none"/>`);
    });
    return `
    <rect width="400" height="220" fill="#14532d"/>
    <path d="M0 0 L400 0 L400 184 L0 184 Z" fill="#166534"/>
    <path d="M0 40 L400 40 M0 90 L400 90 M0 140 L400 140" stroke="#14532d" stroke-width="1.2"/>
    <!-- Lucernario -->
    <path d="M150 0 L188 34 M290 0 L252 34" stroke="#14532d" stroke-width="5"/>
    <rect x="184" y="30" width="72" height="34" rx="3" fill="#475569"/>
    <rect x="188" y="34" width="64" height="26" fill="#bae6fd"/>
    <path d="M220 34 L220 60 M188 47 L252 47" stroke="#475569" stroke-width="2.4"/>
    <path d="M192 38 L204 38 M232 51 L246 51" stroke="#fff" stroke-width="1.2" opacity="0.6"/>
    ${trays.join('')}
    <rect x="250" y="70" width="110" height="5" fill="#78350f"/>
    <g transform="translate(270 70)"><path d="M-6 0 L6 0 L5 -9 L-5 -9 Z" fill="#c2410c"/><circle cy="-13" r="6" fill="#15803d"/></g>
    <g transform="translate(300 70)"><path d="M-6 0 L6 0 L5 -9 L-5 -9 Z" fill="#c2410c"/><circle cy="-12" r="5" fill="#22c55e"/></g>
    <!-- Pavimento in mattoni -->
    <rect y="184" width="400" height="36" fill="#7c2d12"/>
    <path d="M0 196 L400 196 M0 208 L400 208" stroke="#431407" stroke-width="1"/>
    <!-- Porta verso il giardino -->
    <rect x="12" y="100" width="34" height="84" fill="#064e3b" stroke="#022c22" stroke-width="2"/>
    <rect x="16" y="106" width="26" height="30" fill="#a7f3d0" opacity="0.6"/>
    `;
  }
};

/* ==========================================================================
   OFFICINA – STANZA: IL MAGAZZINO RICAMBI
   ========================================================================== */
SCENES.magazzino = {
  bg() {
    const parts = [];
    [60, 104].forEach((y, r) => {
      parts.push(`<rect x="230" y="${y}" width="140" height="4" fill="#71717a"/>`);
      for (let x = 238; x < 362; x += 18) {
        parts.push((x + r) % 3
          ? `<rect x="${x}" y="${y - 12}" width="12" height="12" rx="1" fill="${r ? '#a16207' : '#64748b'}"/>`
          : `<circle cx="${x + 6}" cy="${y - 6}" r="6" fill="none" stroke="#d97706" stroke-width="2"/>`);
      }
    });
    return `
    <rect width="400" height="220" fill="url(#w-brick-m)"/>
    <defs>
      <pattern id="w-brick-m" width="24" height="12" patternUnits="userSpaceOnUse">
        <rect width="24" height="12" fill="#292524"/>
        <rect x="0.6" y="0.6" width="22.8" height="5" rx="0.6" fill="#3f3a36"/>
        <rect x="-11.4" y="6.6" width="22.8" height="5" rx="0.6" fill="#3f3a36"/>
        <rect x="12.6" y="6.6" width="22.8" height="5" rx="0.6" fill="#3f3a36"/>
      </pattern>
      <radialGradient id="mg-lamp">
        <stop offset="0" stop-color="#fde68a" stop-opacity="0.6"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#w-brick-m)"/>
    <circle class="flicker" cx="200" cy="40" r="60" fill="url(#mg-lamp)"/>
    <line x1="200" y1="0" x2="200" y2="26" stroke="#3f3f46" stroke-width="1.2"/>
    <path d="M190 26 L210 26 L206 34 L194 34 Z" fill="#3f3f46"/><circle class="flicker" cx="200" cy="35" r="3" fill="#fde68a"/>
    <!-- Scaffali con ricambi -->
    <rect x="232" y="60" width="4" height="122" fill="#52525b"/><rect x="366" y="60" width="4" height="122" fill="#52525b"/>
    ${parts.join('')}
    <rect x="230" y="148" width="140" height="4" fill="#71717a"/>
    <!-- Bilancia a potenze -->
    <g transform="translate(150 182)">
      <rect x="-3" y="-60" width="6" height="58" fill="#b45309"/>
      <rect x="-14" y="-4" width="28" height="4" rx="1" fill="#78350f"/>
      <rect x="-34" y="-62" width="68" height="3" rx="1" fill="#d97706"/>
      <path d="M-30 -60 L-38 -40 M-30 -60 L-22 -40 M30 -60 L22 -40 M30 -60 L38 -40" stroke="#a16207" stroke-width="0.8"/>
      <path d="M-40 -40 Q-30 -34 -20 -40 Z" fill="#fbbf24"/><path d="M20 -40 Q30 -34 40 -40 Z" fill="#fbbf24"/>
      <text x="-30" y="-44" font-size="7" fill="#fef3c7" text-anchor="middle" font-family="Courier New, monospace" font-weight="700">${(() => { const P = P_bilancia(); return `${P.a}${toSup(P.n)}·${P.b}${toSup(P.n)}`; })()}</text>
      <text x="30" y="-44" font-size="8" fill="#fef3c7" text-anchor="middle" font-family="Courier New, monospace" font-weight="700">?</text>
      <circle cy="-62" r="3" fill="#b45309"/>
    </g>
    <!-- Cassettiera -->
    <rect x="56" y="122" width="54" height="60" fill="#57534e" stroke="#292524" stroke-width="1.5"/>
    <path d="M56 142 L110 142 M56 162 L110 162" stroke="#292524" stroke-width="1.2"/>
    <rect x="78" y="130" width="10" height="3" rx="1" fill="#a8a29e"/><rect x="78" y="150" width="10" height="3" rx="1" fill="#a8a29e"/><rect x="78" y="170" width="10" height="3" rx="1" fill="#a8a29e"/>
    <!-- Porta verso l'officina -->
    <rect x="10" y="96" width="36" height="86" fill="#3f3f46" stroke="#18181b" stroke-width="2"/>
    <circle cx="40" cy="140" r="1.8" fill="#a8a29e"/>
    <!-- Pavimento -->
    <rect y="182" width="400" height="38" fill="#3f3f46"/>
    <path d="M0 192 L400 192" stroke="#27272a" stroke-width="1"/>
    `;
  }
};

/* ==========================================================================
   FARO – STANZA: LA SCALA A CHIOCCIOLA
   ========================================================================== */
SCENES.scala = {
  bg() {
    const steps = [];
    for (let i = 0; i < 9; i++) {
      const x = 120 + i * 26;
      const y = 176 - i * 17;
      steps.push(`<path d="M${x} ${y} L${x + 30} ${y} L${x + 30} ${y + 6} L${x} ${y + 6} Z" fill="#64748b" stroke="#334155" stroke-width="0.8"/>`);
    }
    return `
    <defs>
      <linearGradient id="sc-wall" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#1e293b"/><stop offset="0.5" stop-color="#334155"/><stop offset="1" stop-color="#1e293b"/>
      </linearGradient>
      <radialGradient id="sc-torch">
        <stop offset="0" stop-color="#fdba74" stop-opacity="0.7"/><stop offset="1" stop-color="#fdba74" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#sc-wall)"/>
    <path d="M0 40 Q200 30 400 40 M0 90 Q200 80 400 90 M0 140 Q200 130 400 140" stroke="#0f172a" stroke-width="1" fill="none" opacity="0.6"/>
    <!-- Finestra sulla tempesta -->
    <rect x="60" y="54" width="34" height="50" rx="16" fill="#1e1b4b"/>
    <rect class="lightning" x="60" y="54" width="34" height="50" rx="16" fill="#e9d5ff"/>
    <path d="M77 54 L77 104 M60 80 L94 80" stroke="#0f172a" stroke-width="2"/>
    <!-- Torce -->
    <circle class="flicker" cx="44" cy="120" r="18" fill="url(#sc-torch)"/>
    <rect x="42" y="120" width="4" height="12" fill="#78350f"/><ellipse class="flicker" cx="44" cy="116" rx="3" ry="5" fill="#fb923c"/>
    <circle class="flicker" cx="250" cy="60" r="18" fill="url(#sc-torch)" style="animation-delay:-1s"/>
    <rect x="248" y="60" width="4" height="12" fill="#78350f"/><ellipse class="flicker" cx="250" cy="56" rx="3" ry="5" fill="#fb923c" style="animation-delay:-1s"/>
    <!-- Colonna centrale e gradini -->
    <rect x="186" y="0" width="16" height="190" fill="#475569"/>
    ${steps.join('')}
    <!-- Botola verso la cima -->
    <rect x="300" y="14" width="56" height="12" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
    <path d="M308 14 L308 26 M348 14 L348 26" stroke="#451a03" stroke-width="1.2"/>
    <!-- Graffito -->
    <text x="120" y="70" font-size="12" fill="#a5b4fc" font-family="Courier New, monospace" font-weight="900" opacity="0.7" transform="rotate(-6 120 70)">2⁸=256!</text>
    <!-- Pavimento -->
    <rect y="186" width="400" height="34" fill="#334155"/>
    <path d="M0 198 L400 198 M0 210 L400 210" stroke="#1e293b" stroke-width="1"/>
    `;
  }
};

/* ==========================================================================
   PUNTO CENTRALE SUD: LA PIAZZA DEL MERCATO (banco di Zia Turbina)
   ========================================================================== */
SCENES.piazza = {
  bg() {
    const torreOpen = typeof state !== 'undefined' && state.unlockedArea >= 2;
    const houses = [[0, 70, 52, '#be185d'], [50, 84, 46, '#0e7490'], [330, 76, 44, '#a16207'], [372, 66, 40, '#7c3aed']].map(([x, y, w, c]) => `
      <rect x="${x}" y="${y}" width="${w}" height="${186 - y}" fill="${c}"/>
      <polygon points="${x - 4},${y} ${x + w + 4},${y} ${x + w / 2},${y - 18}" fill="#7f1d1d"/>
      <rect x="${x + 8}" y="${y + 14}" width="10" height="12" fill="#fde68a" opacity="0.8"/>
      <rect x="${x + w - 18}" y="${y + 14}" width="10" height="12" fill="#fde68a" opacity="0.6"/>`).join('');
    const flags = [];
    for (let i = 0; i < 14; i++) {
      const x = 20 + i * 27;
      const y = 30 + Math.sin(i / 2) * 4;
      flags.push(`<polygon points="${x},${y} ${x + 10},${y} ${x + 5},${y + 10}" fill="${['#ef4444', '#facc15', '#22d3ee', '#a855f7', '#22c55e'][i % 5]}"/>`);
    }
    const stones = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 15; c++) stones.push(`<ellipse cx="${c * 28 + (r % 2 ? 14 : 0)}" cy="${192 + r * 10}" rx="12" ry="4" fill="#57534e" opacity="${0.5 + (c % 3) * 0.15}"/>`);
    const goods = [['#ec4899', 82], ['#22d3ee', 96], ['#a3e635', 110], ['#f97316', 150], ['#a855f7', 164]].map(([c, x]) =>
      `<rect x="${x - 4}" y="138" width="8" height="10" rx="2" fill="${c}"/><rect x="${x - 1.5}" y="134" width="3" height="4" fill="${c}"/>`).join('');
    return `
    <defs>
      <linearGradient id="pz-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1e1b4b"/><stop offset="0.5" stop-color="#7c3aed"/><stop offset="1" stop-color="#fb923c"/>
      </linearGradient>
    </defs>
    <rect width="400" height="220" fill="url(#pz-sky)"/>
    <g class="drift" style="animation-duration:100s;animation-delay:-30s"><g fill="#fbcfe8" opacity="0.3"><ellipse cx="0" cy="50" rx="30" ry="6"/></g></g>

    <!-- Collina con la Torre in lontananza -->
    <path d="M220 130 Q280 60 360 120 L360 186 L220 186 Z" fill="#4c1d95" opacity="0.7"/>
    <rect x="292" y="62" width="10" height="30" fill="#312e81"/><path d="M289 64 Q297 52 305 64 Z" fill="#4338ca"/>

    ${houses}

    <!-- Cancello del sentiero per la Torre -->
    <rect x="280" y="112" width="6" height="74" fill="#57534e"/><rect x="318" y="112" width="6" height="74" fill="#57534e"/>
    <path d="M280 114 Q302 96 324 114" stroke="#57534e" stroke-width="6" fill="none"/>
    <rect x="288" y="96" width="28" height="9" rx="2" fill="#fef3c7"/>
    <text x="302" y="103" font-size="6" fill="#78350f" text-anchor="middle" font-weight="900">TORRE ⬆</text>
    ${torreOpen ? '' : '<path d="M287 120 L287 186 M295 118 L295 186 M303 117 L303 186 M311 118 L311 186 M318 120 L318 186" stroke="#292524" stroke-width="2"/><rect x="286" y="146" width="33" height="3" fill="#292524"/>'}

    <!-- Bandierine -->
    <path d="M0 28 Q100 40 200 30 T400 28" stroke="#1c1917" stroke-width="0.8" fill="none"/>
    <g class="flicker" style="animation-duration:6s">${flags.join('')}</g>

    <!-- Banco di Zia Turbina -->
    <rect x="66" y="96" width="4" height="56" fill="#78350f"/><rect x="176" y="96" width="4" height="56" fill="#78350f"/>
    <path d="M60 96 L186 96 L180 112 L66 112 Z" fill="#ef4444"/>
    <path d="M74 96 L82 112 M90 96 L98 112 M106 96 L114 112 M122 96 L130 112 M138 96 L146 112 M154 96 L162 112 M170 96 L176 108" stroke="#fef3c7" stroke-width="5"/>
    <path d="M66 112 Q72 118 78 112 Q84 118 90 112 Q96 118 102 112 Q108 118 114 112 Q120 118 126 112 Q132 118 138 112 Q144 118 150 112 Q156 118 162 112 Q168 118 174 112 Q177 116 180 112" fill="#ef4444"/>
    <rect x="62" y="148" width="122" height="38" rx="2" fill="#92400e"/>
    <rect x="62" y="146" width="122" height="5" rx="1.5" fill="#b45309"/>
    ${goods}
    <path d="M124 146 Q130 136 136 146 Z" fill="#facc15"/><rect x="122" y="144" width="16" height="2" fill="#facc15"/>
    <rect x="80" y="160" width="86" height="14" rx="2" fill="#fef3c7"/>
    <text x="123" y="170" font-size="6.5" fill="#b91c1c" text-anchor="middle" font-weight="900" font-family="Georgia, serif">COSE ESPONENZIALI!</text>

    <!-- Fontana -->
    <ellipse cx="226" cy="184" rx="30" ry="7" fill="#57534e"/>
    <ellipse cx="226" cy="181" rx="27" ry="5" fill="#38bdf8"/>
    <rect x="222" y="150" width="8" height="31" fill="#78716c"/>
    <ellipse cx="226" cy="150" rx="12" ry="3" fill="#a8a29e"/>
    <path class="shimmer" d="M226 148 Q214 140 206 178 M226 148 Q238 140 246 178" stroke="#bae6fd" stroke-width="2" fill="none" style="animation-duration:1.2s"/>
    <circle class="shimmer" cx="226" cy="144" r="3" fill="#bae6fd" style="animation-duration:0.9s"/>

    <!-- Piccioni -->
    <g transform="translate(262 186)"><g class="bob" style="animation-duration:1.4s"><ellipse rx="4" ry="2.6" fill="#94a3b8"/><circle cx="3.6" cy="-2" r="1.6" fill="#64748b"/><path d="M5 -2 L7 -1.6" stroke="#f59e0b" stroke-width="0.8"/></g></g>
    <g transform="translate(184 188)"><g class="bob" style="animation-duration:1.8s"><ellipse rx="4" ry="2.6" fill="#a8a29e"/><circle cx="-3.6" cy="-2" r="1.6" fill="#78716c"/><path d="M-5 -2 L-7 -1.6" stroke="#f59e0b" stroke-width="0.8"/></g></g>

    <!-- Pavimento -->
    <rect y="186" width="400" height="34" fill="#44403c"/>
    ${stones.join('')}
    `;
  }
};

/* ==========================================================================
   SFONDI A IMMAGINE (img/bg/*.webp, 16:9)
   L'immagine riempie la scena 400 x 220 e si taglia ai lati (slice).
   Sopra restano in SVG solo le animazioni: luci, stelle, onde.
   ========================================================================== */
function bgImage(name) {
  return `<image href="img/bg/${name}.webp" x="0" y="0" width="400" height="220" preserveAspectRatio="xMidYMid slice"/>`;
}

/* Alone di luce che tremola (lanterne, candele). */
function glowSVG(id, x, y, r, color = '#ffb347', delay = 0) {
  return `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="0.55"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>
    <circle class="flicker" cx="${x}" cy="${y}" r="${r}" fill="url(#${id})" style="animation-delay:-${delay}s"/>`;
}

/* Stelline che brillano sopra il cielo dipinto. */
function twinkleSVG(points) {
  return points.map(([x, y, r], i) =>
    `<circle class="twinkle" cx="${x}" cy="${y}" r="${r || 0.9}" fill="#fff" style="animation-delay:-${(i * 0.7) % 3}s"/>`).join('');
}

const IMAGE_SCENES = {
  /* Molo: pontile con il Faro sabotato e le casse 2³ e 2⁴ */
  molo: {
    bg() {
      return `${bgImage('pontile')}
      ${twinkleSVG([[22, 8], [64, 24], [128, 10], [176, 30], [236, 14], [330, 12], [378, 30, 1.1]])}
      <circle class="faro-blink" cx="85" cy="52" r="9" fill="#ff5a5a" opacity="0.45"/>
      ${glowSVG('gl-pont', 198, 74, 26)}
      <g class="wave" style="animation-duration:9s"><path d="${wavePath(126, 1)}" stroke="#e4ddff" stroke-opacity="0.35" fill="none" stroke-width="0.8"/></g>`;
    }
  },

  /* Molo: spiaggia con la nave di Vera e il capanno */
  spiaggia: {
    bg() {
      return `${bgImage('spiaggia')}
      ${[[255, 120, 24], [258, 126, 18], [254, 132, 12]].map(([x, y, w], i) =>
        `<rect class="shimmer" x="${x - w / 2}" y="${y}" width="${w}" height="1.2" rx="0.6" fill="#fff4c4" style="animation-delay:-${i * 0.5}s"/>`).join('')}
      ${glowSVG('gl-sp1', 309, 113, 14)}${glowSVG('gl-sp2', 358, 113, 14, '#ffb347', 1.1)}
      <g class="wave" style="animation-duration:7s"><path d="${wavePath(150, 1.2)}" stroke="#fff" stroke-opacity="0.5" fill="none" stroke-width="1"/></g>`;
    }
  },

  /* Molo: interno del capanno */
  capanno: {
    bg() {
      const motes = [[192, 70], [206, 92], [186, 112], [214, 128], [200, 150], [178, 132], [220, 104]].map(([x, y], i) =>
        `<circle class="twinkle" cx="${x}" cy="${y}" r="0.7" fill="#ffe1a0" style="animation-delay:-${i * 0.5}s"/>`).join('');
      return `${bgImage('capanno')}${glowSVG('gl-cap', 196, 44, 34)}${motes}`;
    }
  },

  /* Taverna: strada davanti alla Taverna */
  strada: {
    bg() {
      return `${bgImage('strada')}
      ${twinkleSVG([[16, 30], [40, 64, 0.7], [92, 52], [356, 40], [384, 64, 0.7], [362, 14]])}
      ${glowSVG('gl-st1', 127, 88, 18)}${glowSVG('gl-st2', 284, 86, 24, '#ffb347', 1.3)}`;
    }
  },

  /* Taverna: sala con il tavolo dei dadi */
  taverna: {
    bg() {
      return `${bgImage('taverna')}
      ${glowSVG('gl-tv1', 103, 46, 34)}${glowSVG('gl-tv2', 299, 46, 34, '#ffb347', 1.2)}${glowSVG('gl-tv3', 131, 140, 10, '#ffd27a', 0.6)}
      <circle class="smoke" cx="131" cy="130" r="1.6" fill="#e5e7eb" opacity="0.5"/>
      <circle class="smoke" cx="131" cy="130" r="1.2" fill="#e5e7eb" opacity="0.5" style="animation-delay:-2s"/>`;
    }
  },

  /* Torre: terrazza dell'osservatorio con l'ascensore */
  torre: {
    bg() {
      return `${bgImage('torre')}
      ${twinkleSVG([[150, 20], [182, 44, 1.1], [214, 22], [262, 70], [120, 60, 0.7], [280, 34, 0.7], [204, 100, 0.7]])}
      <g transform="translate(280 30)"><line class="shoot" x1="0" y1="0" x2="12" y2="-6" stroke="#fff" stroke-width="0.8" style="animation-delay:-3s"/></g>
      ${glowSVG('gl-to', 310, 86, 22, '#ff5a3a')}
      <circle class="led-blink" cx="310" cy="86" r="2.6" fill="#ff7a5a" opacity="0.8"/>`;
    }
  },

  /* Belvedere: terrazza con mongolfiera, galleria e scalinata del Faro */
  belvedere: {
    bg() {
      return `${bgImage('belvedere')}
      ${twinkleSVG([[12, 10], [86, 8, 1.1], [150, 18], [210, 24], [244, 12], [338, 22, 1.1], [384, 12]])}
      <circle class="faro-blink" cx="55" cy="28" r="4" fill="#fde68a" opacity="0.6"/>
      ${[[366, 130, 22], [368, 136, 14]].map(([x, y, w], i) =>
        `<rect class="shimmer" x="${x - w / 2}" y="${y}" width="${w}" height="1" rx="0.5" fill="#ffe1a0" style="animation-delay:-${i * 0.6}s"/>`).join('')}`;
    }
  }
};
Object.assign(SCENES, IMAGE_SCENES);
