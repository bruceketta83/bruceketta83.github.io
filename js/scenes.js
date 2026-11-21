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
function crateSVG(x, y, w, h, label, brace) {
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#b07a46" ${wink(0.9)}/>
  ${[1, 2].map(i => `<line x1="${x}" y1="${y + (h * i) / 3}" x2="${x + w}" y2="${y + (h * i) / 3}" stroke="#7a4a26" stroke-width="0.7"/>`).join('')}
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#7a4a26" stroke-width="2.6" opacity="0.85"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" ${wink(0.9)}/>
  <path d="M${x + 1} ${y + h - 1} L${x + w - 1} ${y + 1}" stroke="#7a4a26" stroke-width="${brace ? 2.4 : 0}" />
  <rect x="${x + 1.3}" y="${y + h - 3}" width="${w - 2.6}" height="1.6" fill="#000" opacity="0.15"/>
  ${label ? `<text x="${x + w / 2}" y="${y + h / 2 + 4}" font-size="${Math.round(h * 0.45)}" fill="#3a2414" text-anchor="middle" font-weight="900" font-family="Courier New, monospace">${label}</text>` : ''}`;
}

const STARS_MOLO = [
  [24, 14, 1.1, 0], [62, 28, 0.8, 1.2], [104, 10, 1, 0.6], [140, 30, 0.7, 2.1],
  [178, 16, 1.2, 1.5], [214, 36, 0.7, 0.3], [246, 12, 0.9, 2.6], [276, 28, 0.7, 1.9],
  [368, 16, 1.1, 0.9], [386, 44, 0.8, 2.3], [12, 46, 0.7, 1.1], [196, 52, 0.6, 0.4]
];

const SCENES = {
  molo: {
    bg() {
      const stars = STARS_MOLO.map(([x, y, r, d]) =>
        `<circle class="twinkle" cx="${x}" cy="${y}" r="${r}" fill="#fff" style="animation-delay:-${d}s"/>`).join('');
      const seams = Array.from({ length: 23 }, (_, i) => {
        const x = i * 18 + (i % 3) * 2;
        return `<line x1="${x}" y1="154.5" x2="${x - 1}" y2="170" stroke="#5a3a20" stroke-width="0.9"/>
          <path d="M${x + 5} ${158 + (i % 4) * 2} q3 -0.6 6 0" stroke="#6b4424" stroke-width="0.6" fill="none"/>`;
      }).join('');
      const postsBack = [36, 128, 226].map(x =>
        `<rect x="${x}" y="134" width="6" height="22" rx="1" fill="#7a4a26" ${wink(0.7)}/><rect x="${x - 0.6}" y="133" width="7.2" height="2.4" rx="1" fill="#8a5a32" ${wink(0.5)}/>`).join('');
      const ropes = [[42, 128], [134, 226], [232, 322]].map(([a, b]) =>
        `<path d="M${a} 139 Q${(a + b) / 2} 147 ${b} 139" stroke="#3a2a1c" stroke-width="1.1" fill="none"/>`).join('');
      const posts = [20, 100, 180, 262, 342].map(x =>
        `<rect x="${x}" y="174" width="9" height="40" fill="#4a301c" ${wink(0.8)}/>
         <rect x="${x}" y="196" width="9" height="2" fill="#2a1a12" opacity="0.7"/>
         <ellipse class="shimmer" cx="${x + 4.5}" cy="214" rx="8" ry="1" fill="#c4b5fd" style="animation-delay:-${x % 5}s"/>`).join('');
      return `
      <defs>
        <linearGradient id="m-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1b1640"/>
          <stop offset="0.35" stop-color="#3a2468"/>
          <stop offset="0.66" stop-color="#a8467a"/>
          <stop offset="0.88" stop-color="#f08a4b"/>
          <stop offset="1" stop-color="#f8b55a"/>
        </linearGradient>
        <linearGradient id="m-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7c72b8"/>
          <stop offset="1" stop-color="#3b3a78"/>
        </linearGradient>
        <radialGradient id="m-moon">
          <stop offset="0" stop-color="#fef3c7" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#fef3c7" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="m-sun">
          <stop offset="0" stop-color="#ffd38a" stop-opacity="0.8"/>
          <stop offset="1" stop-color="#ffb35a" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="m-lamp">
          <stop offset="0" stop-color="#ffd27a" stop-opacity="0.9"/>
          <stop offset="1" stop-color="#ffb347" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="400" height="140" fill="url(#m-sky)"/>
      ${stars}
      <circle cx="300" cy="142" r="70" fill="url(#m-sun)"/>
      <circle cx="322" cy="34" r="34" fill="url(#m-moon)"/>
      <circle cx="322" cy="34" r="13" fill="#fdf3d0" stroke="#e9d8a6" stroke-width="0.6"/>
      <circle cx="317" cy="30" r="2.4" fill="#f3e3b3"/><circle cx="326" cy="39" r="1.6" fill="#f3e3b3"/>

      <g class="drift" style="animation-duration:95s;animation-delay:-20s">
        <path d="M-40 70 Q-30 60 -14 64 Q-4 54 12 60 Q26 56 32 66 Q40 72 -40 72 Z" fill="#c9a2d6" opacity="0.55"/>
      </g>
      <g class="drift" style="animation-duration:125s;animation-delay:-70s">
        <path d="M-50 104 Q-40 96 -22 99 Q-10 90 8 97 Q24 94 30 103 Z" fill="#d6a0c6" opacity="0.5"/>
      </g>

      <!-- Isola lontana con il Faro sabotato -->
      <path d="M0 140 Q14 128 40 127 Q64 120 92 128 Q112 133 124 140 Z" fill="#2c2a55"/>
      <path d="M48 127 L50 96 L60 96 L62 127 Z" fill="#26244a" stroke="#1a1838" stroke-width="0.6"/>
      <rect x="47" y="94" width="16" height="2.4" fill="#1a1838"/>
      <rect x="50" y="86" width="10" height="8" fill="#1a1838"/>
      <path d="M48.6 86 L55 79 L61.4 86 Z" fill="#1a1838"/>
      <circle class="faro-blink" cx="55" cy="90" r="6" fill="#fca5a5" opacity="0.5"/>
      <circle class="faro-blink" cx="55" cy="90" r="2.4" fill="#ff6b6b"/>

      <!-- Nave all'orizzonte -->
      <g transform="translate(262 139)"><g class="bob">
        <path d="M-12 -4 L12 -4 L9 0 L-9 0 Z" fill="#2c2a55"/>
        <rect x="-5" y="-8" width="9" height="4" fill="#2c2a55"/><rect x="0" y="-11" width="2" height="3" fill="#2c2a55"/>
      </g></g>

      <!-- Mare -->
      <rect y="139" width="400" height="81" fill="url(#m-sea)"/>
      <rect y="139" width="400" height="1.2" fill="#f8c27a" opacity="0.6"/>
      <ellipse class="shimmer" cx="300" cy="143" rx="22" ry="1.2" fill="#ffd38a"/>
      <ellipse class="shimmer" cx="300" cy="147" rx="13" ry="1" fill="#ffd38a" style="animation-delay:-0.7s"/>
      <ellipse class="shimmer" cx="96" cy="146" rx="18" ry="0.8" fill="#d8ccf4" style="animation-delay:-1.1s"/>
      <g class="wave" style="animation-duration:7s">
        <path d="${wavePath(145, 1.2)}" stroke="#d8ccf4" stroke-opacity="0.45" fill="none" stroke-width="0.9"/>
      </g>
      <g class="wave" style="animation-duration:10s;animation-direction:reverse">
        <path d="${wavePath(150, 1.4)}" stroke="#d8ccf4" stroke-opacity="0.3" fill="none" stroke-width="0.9"/>
      </g>

      <!-- Gabbiano sull'acqua e gabbiano in volo -->
      <g transform="translate(118 147)"><g class="bob" style="animation-duration:3s">
        <path d="M-4 0 Q-1 -3 3 -2 L6 -3.6 L5 -1 Q2 1 -4 0 Z" fill="#e5e7eb" stroke="#2c2a55" stroke-width="0.4"/>
        <path d="M-2.6 -0.8 Q0 -2.2 2.6 -1.4" stroke="#6b7280" stroke-width="0.6" fill="none"/>
      </g></g>
      <g class="gull">
        <path class="gull-wings" d="M0 0 q4 -4 8 0 q4 -4 8 0" stroke="#f8fafc" stroke-width="1.2" fill="none"/>
      </g>

      <!-- Pontile: ringhiera di corda dietro -->
      ${postsBack}
      ${ropes}

      <!-- Pali nell'acqua e riflessi -->
      <rect y="170" width="400" height="50" fill="#1b1838" opacity="0.25"/>
      ${posts}

      <!-- Assi del pontile -->
      <path d="M0 154 L400 154 L400 170 L0 170 Z" fill="#8a5a32" ${wink(0.9)}/>
      <rect y="154" width="400" height="1.8" fill="#c08a52"/>
      ${seams}
      <rect y="170" width="400" height="6" fill="#5a3a20" ${wink(0.8)}/>
      <rect y="176" width="400" height="3" fill="#000" opacity="0.25"/>

      <!-- Barile -->
      <g transform="translate(70 157)">
        <path d="M-9 0 Q-11 -10 -9 -20 L9 -20 Q11 -10 9 0 Z" fill="#8a5530" ${wink(0.8)}/>
        <path d="M-4 -20 Q-5.4 -10 -4 0" stroke="#6b3f1f" stroke-width="0.7" fill="none"/>
        <path d="M3 -20 Q4.4 -10 3 0" stroke="#6b3f1f" stroke-width="0.7" fill="none"/>
        <path d="M-10.2 -15 Q0 -14 10.2 -15 M-10.4 -5 Q0 -4 10.4 -5" stroke="#3f3f46" stroke-width="1.6" fill="none"/>
        <ellipse cx="0" cy="-20" rx="9" ry="2.2" fill="#a8703e" ${wink(0.7)}/>
        <path d="M6 -18 Q8 -10 6.4 -2" stroke="#b77d48" stroke-width="1" fill="none"/>
      </g>

      <!-- Lampione con lanterna appesa -->
      <rect x="157.5" y="96" width="5" height="62" fill="#5a3a20" ${wink(0.8)}/>
      <path d="M160 101 L182 101" stroke="${WOOD_INK}" stroke-width="3.6"/>
      <path d="M160 101 L182 101" stroke="#6b4424" stroke-width="2.2"/>
      <path d="M162 112 L170 101" stroke="#5a3a20" stroke-width="2"/>
      <g transform="translate(178 102)"><g class="swing" style="animation-duration:4.4s">
        <circle class="flicker" cx="0" cy="13" r="24" fill="url(#m-lamp)"/>
        <line x1="0" y1="0" x2="0" y2="5" stroke="${WOOD_INK}" stroke-width="0.8"/>
        <path d="M-4 5 L4 5 L5 8 L-5 8 Z" fill="#2b2b33" ${wink(0.5)}/>
        <rect class="flicker" x="-3.6" y="8" width="7.2" height="9" rx="1" fill="#ffcf5a" ${wink(0.5)}/>
        <path d="M0 8 L0 17" stroke="#2b2b33" stroke-width="0.6"/>
        <rect x="-4.6" y="17" width="9.2" height="2" rx="0.6" fill="#2b2b33" ${wink(0.4)}/>
      </g></g>

      <!-- Casse del carico: 2³ e 2⁴ -->
      ${crateSVG(310, 112, 25, 22, '', true)}
      ${crateSVG(297, 134, 26, 24, '2³')}
      ${crateSVG(323, 134, 26, 24, '2⁴')}
      `;
    },
    fg() {
      const bollard = (x, flip) => `
        <rect x="${x}" y="184" width="16" height="40" rx="3" fill="#15112a"/>
        <ellipse cx="${x + 8}" cy="184" rx="8" ry="2.4" fill="#221c3e"/>
        <path d="M${x + (flip ? 0 : 16)} 194 Q${x + (flip ? -26 : 42)} 212 ${x + (flip ? -60 : 76)} 200" stroke="#15112a" stroke-width="2.6" fill="none"/>`;
      return `
      <g class="wave" style="animation-duration:5s">
        <path d="${wavePath(200, 2)}" stroke="#d8ccf4" stroke-opacity="0.3" fill="none" stroke-width="1.2"/>
      </g>
      <g class="wave" style="animation-duration:8s;animation-direction:reverse">
        <path d="${wavePath(212, 2.2)}" stroke="#d8ccf4" stroke-opacity="0.22" fill="none" stroke-width="1.2"/>
      </g>
      ${bollard(2, true)}
      ${bollard(382, false)}`;
    }
  }
};

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
   SCENA 2: LA TAVERNA DEL QUOZIENTE
   ========================================================================== */
SCENES.taverna = {
  bg() {
    const planks = Array.from({ length: 16 }, (_, i) =>
      `<line x1="${i * 26 + 8}" y1="26" x2="${i * 26 + 8}" y2="165" stroke="#1c1008" stroke-width="1" opacity="0.45"/>`).join('');
    const floor = [172, 181, 192, 205].map(y =>
      `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#1c1008" stroke-width="0.9" opacity="0.5"/>`).join('');
    const bottles = [
      [306, '#15803d'], [316, '#b45309'], [326, '#7f1d1d'], [348, '#0e7490'], [358, '#15803d'], [370, '#a16207']
    ].map(([x, c], i) => `
      <rect x="${x}" y="${i % 2 ? 47 : 44}" width="7" height="${i % 2 ? 13 : 16}" rx="1.5" fill="${c}"/>
      <rect x="${x + 2.2}" y="${i % 2 ? 42 : 38}" width="2.6" height="6" fill="${c}"/>
      <rect x="${x + 1}" y="${i % 2 ? 49 : 47}" width="1.4" height="8" fill="#fff" opacity="0.3"/>`).join('');
    return `
    <defs>
      <linearGradient id="t-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2a170b"/><stop offset="1" stop-color="#4a2a14"/>
      </linearGradient>
      <linearGradient id="t-night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0b1026"/><stop offset="1" stop-color="#3b1d5e"/>
      </linearGradient>
      <radialGradient id="t-lamp">
        <stop offset="0" stop-color="#fde68a" stop-opacity="0.8"/>
        <stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="t-warm" cx="0.5" cy="0.3" r="0.7">
        <stop offset="0" stop-color="#f59e0b" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="400" height="220" fill="url(#t-wall)"/>
    ${planks}
    <rect width="400" height="220" fill="url(#t-warm)"/>
    <rect y="14" width="400" height="10" fill="#1c1008"/>
    <rect x="148" y="14" width="8" height="152" fill="#2a170b"/>

    <!-- Finestra sul mare di notte -->
    <rect x="16" y="34" width="74" height="56" rx="3" fill="url(#t-night)"/>
    <circle cx="70" cy="48" r="7" fill="#fef3c7"/>
    <circle class="twinkle" cx="28" cy="44" r="0.8" fill="#fff"/>
    <circle class="twinkle" cx="44" cy="40" r="0.6" fill="#fff" style="animation-delay:-1s"/>
    <circle class="twinkle" cx="38" cy="56" r="0.7" fill="#fff" style="animation-delay:-2s"/>
    <rect x="16" y="72" width="74" height="18" fill="#1e3a8a"/>
    <ellipse class="shimmer" cx="70" cy="76" rx="7" ry="1" fill="#fef3c7"/>
    <ellipse class="shimmer" cx="70" cy="80" rx="4" ry="0.8" fill="#fef3c7" style="animation-delay:-0.8s"/>
    <path d="M53 34 L53 90 M16 62 L90 62" stroke="#5b3415" stroke-width="3"/>
    <rect x="16" y="34" width="74" height="56" rx="3" fill="none" stroke="#5b3415" stroke-width="5"/>
    <rect x="12" y="90" width="82" height="5" rx="1.5" fill="#5b3415"/>

    <!-- Insegna -->
    <g transform="translate(212 46)">
      <line x1="-30" y1="-22" x2="-26" y2="-10" stroke="#1c1008" stroke-width="1"/>
      <line x1="30" y1="-22" x2="26" y2="-10" stroke="#1c1008" stroke-width="1"/>
      <rect x="-46" y="-11" width="92" height="22" rx="4" fill="#78350f" stroke="#451a03" stroke-width="2"/>
      <text x="0" y="-1.5" font-size="6.5" fill="#fde68a" text-anchor="middle" font-weight="800" font-family="Georgia, serif" letter-spacing="0.6">TAVERNA DEL</text>
      <text x="0" y="7" font-size="7.5" fill="#fbbf24" text-anchor="middle" font-weight="900" font-family="Georgia, serif" letter-spacing="0.8">÷ QUOZIENTE ÷</text>
    </g>

    <!-- Mensola con bottiglie -->
    ${bottles}
    <rect x="298" y="60" width="86" height="4" fill="#5b3415"/>
    <path d="M304 64 L310 70 M378 64 L372 70" stroke="#5b3415" stroke-width="2"/>
    <rect x="300" y="86" width="84" height="4" fill="#5b3415"/>
    <rect x="306" y="76" width="9" height="10" rx="1.5" fill="#d97706"/>
    <rect x="320" y="76" width="9" height="10" rx="1.5" fill="#d97706"/>
    <circle cx="352" cy="80" r="6" fill="#e7e5e4"/><circle cx="352" cy="80" r="3.6" fill="#a8a29e"/>

    <!-- Bancone dell'Oste -->
    <rect x="34" y="122" width="132" height="44" fill="#5b3415"/>
    <rect x="30" y="117" width="140" height="7" rx="2" fill="#92400e"/>
    <path d="M34 136 L166 136 M34 151 L166 151" stroke="#3b2410" stroke-width="1"/>
    <rect x="44" y="108" width="8" height="9" rx="1.2" fill="#d97706"/>
    <path d="M43.6 108 q2 -2.6 4.4 -1 q2 -2 4.4 0.6 Z" fill="#fffbeb"/>
    <rect x="140" y="106" width="16" height="11" rx="5" fill="#78350f"/>
    <rect x="146" y="102" width="4" height="4" fill="#78350f"/>

    <!-- Botti -->
    <g transform="translate(362 150)">
      <rect x="-16" y="-24" width="32" height="40" rx="7" fill="#92400e"/>
      <rect x="-16" y="-16" width="32" height="3" fill="#451a03"/><rect x="-16" y="4" width="32" height="3" fill="#451a03"/>
      <ellipse cx="0" cy="-24" rx="15" ry="3" fill="#b45309"/>
    </g>

    <!-- Pavimento -->
    <rect y="165" width="400" height="55" fill="#3b2410"/>
    ${floor}
    <rect y="165" width="400" height="2" fill="#5b3415"/>

    ${hangingLantern(118, 24, 22, 't-lamp')}
    ${hangingLantern(254, 24, 30, 't-lamp')}
    `;
  },
  fg() {
    return `
    <!-- Tavolo da gioco davanti ai Pirati Gemelli -->
    <g transform="translate(292 0)">
      <rect x="-3" y="156" width="6" height="18" fill="#3b2410"/>
      <rect x="-14" y="171" width="28" height="4" rx="2" fill="#3b2410"/>
      <ellipse cx="0" cy="155" rx="31" ry="6" fill="#78350f"/>
      <ellipse cx="0" cy="153.6" rx="31" ry="5.2" fill="#a16207"/>
      <g class="dice-bounce">
        <rect x="-12" y="144" width="7" height="7" rx="1.3" fill="#fff" stroke="#cbd5e1" stroke-width="0.5"/>
        <circle cx="-10" cy="146" r="0.8" fill="#111"/><circle cx="-7" cy="149" r="0.8" fill="#111"/>
      </g>
      <g class="dice-bounce" style="animation-delay:-0.35s">
        <rect x="-2" y="145" width="7" height="7" rx="1.3" fill="#fff" stroke="#cbd5e1" stroke-width="0.5"/>
        <circle cx="1.5" cy="148.5" r="0.8" fill="#111"/>
      </g>
      <rect x="10" y="145" width="6" height="7" rx="1" fill="#fde68a"/>
      <path d="M13 145 L13 142" stroke="#1c1008" stroke-width="0.6"/>
      <ellipse class="flicker" cx="13" cy="140.5" rx="1.4" ry="2.3" fill="#fbbf24"/>
      <circle class="smoke" cx="13" cy="136" r="2.2" fill="#e7e5e4"/>
      <circle class="smoke" cx="13" cy="136" r="2.2" fill="#e7e5e4" style="animation-delay:-1.4s"/>
      <circle class="smoke" cx="13" cy="136" r="2.2" fill="#e7e5e4" style="animation-delay:-2.8s"/>
      <circle cx="20" cy="150" r="2.6" fill="#fbbf24" stroke="#a16207" stroke-width="0.5"/>
      <circle cx="23" cy="152" r="2.6" fill="#fbbf24" stroke="#a16207" stroke-width="0.5"/>
    </g>`;
  }
};

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

/* ==========================================================================
   SCENA 3: LA TORRE DELL'OSSERVATORIO
   ========================================================================== */
SCENES.torre = {
  bg() {
    const constellation = [[218, 22], [236, 30], [252, 24], [262, 38], [246, 46]];
    const constLines = constellation.slice(1).map((p, i) =>
      `<line x1="${constellation[i][0]}" y1="${constellation[i][1]}" x2="${p[0]}" y2="${p[1]}" stroke="#a5b4fc" stroke-width="0.5" opacity="0.45"/>`).join('');
    const constStars = constellation.map(([x, y], i) =>
      `<circle class="twinkle" cx="${x}" cy="${y}" r="1.5" fill="#e0e7ff" style="animation-delay:-${i * 0.7}s"/>`).join('');
    const bricks = [];
    for (let row = 0; row < 11; row++) {
      const y = 82 + row * 9.5;
      bricks.push(`<line x1="156" y1="${y}" x2="236" y2="${y}" stroke="#1e293b" stroke-width="0.7" opacity="0.6"/>`);
      for (let c = 0; c < 5; c++) {
        const x = 160 + c * 16 + (row % 2 ? 8 : 0);
        if (x < 234) bricks.push(`<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 9.5}" stroke="#1e293b" stroke-width="0.6" opacity="0.5"/>`);
      }
    }
    const braces = [];
    for (let y = 18; y < 120; y += 22) {
      braces.push(`<path d="M304 ${y} L352 ${y + 22} M352 ${y} L304 ${y + 22}" stroke="#475569" stroke-width="1.2"/>`);
      braces.push(`<line x1="302" y1="${y}" x2="354" y2="${y}" stroke="#64748b" stroke-width="1.6"/>`);
    }
    const posts = [40, 70, 100, 252, 282].map(x =>
      `<rect x="${x}" y="166" width="5" height="20" fill="#475569"/><rect x="${x - 1.5}" y="163" width="8" height="4" fill="#64748b"/>`).join('');
    const tiles = [196, 204, 214].map(y =>
      `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#0f172a" stroke-width="0.8" opacity="0.6"/>`).join('');

    return `
    <defs>
      <linearGradient id="o-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#020617"/>
        <stop offset="0.6" stop-color="#1e1b4b"/>
        <stop offset="1" stop-color="#4c1d95"/>
      </linearGradient>
      <linearGradient id="o-milky" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#c4b5fd" stop-opacity="0"/>
        <stop offset="0.5" stop-color="#c4b5fd" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#c4b5fd" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="o-win">
        <stop offset="0" stop-color="#fde68a" stop-opacity="0.7"/>
        <stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="400" height="220" fill="url(#o-sky)"/>
    <ellipse cx="200" cy="70" rx="260" ry="22" fill="url(#o-milky)" transform="rotate(-18 200 70)"/>
    ${starField(70, 23, 400, 160, 1)}
    ${constLines}${constStars}
    <line class="shoot" x1="150" y1="18" x2="166" y2="10" stroke="#fff" stroke-width="1.2" stroke-linecap="round" style="animation-delay:-3s"/>
    <line class="shoot" x1="390" y1="40" x2="404" y2="32" stroke="#fff" stroke-width="1" stroke-linecap="round" style="animation-delay:-6.5s"/>

    <!-- Luna crescente -->
    <circle cx="70" cy="34" r="13" fill="#fef3c7"/>
    <circle cx="76" cy="30" r="12" fill="#0b0f2a"/>

    <!-- Colline lontane -->
    <path d="M0 170 Q60 140 120 158 Q190 132 260 156 Q330 138 400 160 L400 190 L0 190 Z" fill="#0f0b2a"/>

    <!-- Torre dell'Osservatorio -->
    <rect x="156" y="78" width="80" height="112" fill="#334155"/>
    ${bricks.join('')}
    <rect x="156" y="78" width="80" height="112" fill="none" stroke="#1e293b" stroke-width="1.2"/>
    <rect x="152" y="74" width="88" height="6" rx="1.5" fill="#475569"/>
    <circle class="flicker" cx="176" cy="104" r="12" fill="url(#o-win)"/>
    <path d="M170 112 L170 102 Q176 94 182 102 L182 112 Z" fill="#fbbf24" class="flicker"/>
    <circle class="flicker" cx="216" cy="130" r="12" fill="url(#o-win)" style="animation-delay:-1.3s"/>
    <path d="M210 138 L210 128 Q216 120 222 128 L222 138 Z" fill="#fbbf24" class="flicker" style="animation-delay:-1.3s"/>
    <path d="M184 190 L184 166 Q196 152 208 166 L208 190 Z" fill="#3b2410"/>
    <circle cx="203" cy="178" r="1.2" fill="#fbbf24"/>

    <!-- Cupola con telescopio che si muove -->
    <path d="M154 75 Q154 34 196 30 Q238 34 238 75 Z" fill="#475569"/>
    <path d="M190 31 L202 31 L206 75 L186 75 Z" fill="#0f172a" opacity="0.85"/>
    <path d="M160 70 Q166 42 196 36" stroke="#94a3b8" stroke-width="1" fill="none" opacity="0.5"/>
    <circle cx="196" cy="28" r="2.5" fill="#64748b"/>
    <g class="scope-sweep">
      <rect x="192" y="30" width="9" height="34" rx="3" fill="#b45309" transform="rotate(38 196 66)"/>
      <rect x="190" y="26" width="13" height="6" rx="2" fill="#78350f" transform="rotate(38 196 66)"/>
    </g>

    <!-- Sfera armillare e libri -->
    <g transform="translate(52 186)">
      <rect x="-3" y="-14" width="6" height="14" fill="#78350f"/>
      <rect x="-8" y="-2" width="16" height="2" fill="#5b3415"/>
      <g transform="translate(0 -22)">
        <g class="spin" style="animation-duration:14s">
          <circle r="8" fill="none" stroke="#fbbf24" stroke-width="1"/>
          <ellipse rx="8" ry="3" fill="none" stroke="#fbbf24" stroke-width="0.8"/>
          <ellipse rx="3" ry="8" fill="none" stroke="#f59e0b" stroke-width="0.8"/>
          <circle r="2" fill="#38bdf8"/>
        </g>
      </g>
    </g>
    <rect x="114" y="178" width="18" height="4" fill="#7f1d1d"/>
    <rect x="116" y="174" width="15" height="4" fill="#1e40af"/>
    <rect x="113" y="170" width="17" height="4" fill="#15803d"/>

    <!-- Balaustra -->
    <rect x="0" y="163" width="152" height="3" fill="#64748b"/>
    <rect x="240" y="163" width="60" height="3" fill="#64748b"/>
    ${posts}

    <!-- Pozzo dell'ascensore -->
    <rect x="302" y="10" width="4" height="178" fill="#64748b"/>
    <rect x="350" y="10" width="4" height="178" fill="#64748b"/>
    ${braces.join('')}
    ${gearSVG(328, 14, 13, 10, '#94a3b8', 9, false)}
    ${gearSVG(312, 28, 7, 8, '#cbd5e1', 5, true)}
    <line x1="322" y1="20" x2="322" y2="126" stroke="#cbd5e1" stroke-width="0.8"/>
    <line x1="334" y1="20" x2="334" y2="126" stroke="#cbd5e1" stroke-width="0.8"/>

    <!-- Contrappesi -->
    <g class="weight-bob">
      <line x1="342" y1="22" x2="342" y2="62" stroke="#cbd5e1" stroke-width="0.7"/>
      <rect x="335" y="62" width="14" height="13" rx="1.5" fill="#1e293b" stroke="#94a3b8" stroke-width="0.8"/>
      <text x="342" y="71.5" font-size="7" fill="#c4b5fd" text-anchor="middle" font-weight="800" font-family="Courier New, monospace">3²</text>
    </g>
    <g class="weight-bob" style="animation-delay:-1.4s">
      <line x1="312" y1="34" x2="312" y2="84" stroke="#cbd5e1" stroke-width="0.7"/>
      <rect x="305" y="84" width="14" height="13" rx="1.5" fill="#1e293b" stroke="#94a3b8" stroke-width="0.8"/>
      <text x="312" y="93.5" font-size="7" fill="#c4b5fd" text-anchor="middle" font-weight="800" font-family="Courier New, monospace">2⁴</text>
    </g>

    <!-- Cabina -->
    <rect x="306" y="126" width="44" height="62" fill="#1e293b" stroke="#94a3b8" stroke-width="1.4"/>
    <rect x="310" y="132" width="36" height="52" fill="#0f172a"/>
    <path d="M316 132 L316 184 M322 132 L322 184 M328 132 L328 184 M334 132 L334 184 M340 132 L340 184" stroke="#64748b" stroke-width="1.2"/>
    <rect x="306" y="120" width="44" height="7" fill="#475569"/>
    <circle class="led-blink" cx="328" cy="123.5" r="2" fill="#ef4444"/>

    <!-- Terrazza -->
    <rect y="186" width="400" height="34" fill="#1e293b"/>
    <rect y="186" width="400" height="2" fill="#334155"/>
    ${tiles}
    `;
  }
};

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
   MOLO – STANZA: SPIAGGIA (nave di Vera, capanno, palma) – stile mock-up
   ========================================================================== */
SCENES.spiaggia = {
  bg() {
    const fronds = [[-34, 8], [-26, -10], [-6, -20], [16, -14], [34, 2], [26, 18], [-18, 20]].map(([dx, dy], i) => {
      const c = i % 2 ? '#2f7a3a' : '#3c9447';
      return `<path d="M0 0 Q${dx * 0.45} ${dy - 12} ${dx} ${dy} Q${dx * 0.55} ${dy - 4} 0 2 Z" fill="${c}" ${wink(0.7)}/>
        <path d="M0 0 Q${dx * 0.45} ${dy - 9} ${dx * 0.9} ${dy - 0.5}" stroke="#1f5a2a" stroke-width="0.6" fill="none"/>`;
    }).join('');
    const trunk = Array.from({ length: 9 }, (_, i) => {
      const t = i / 9, x = 34 + t * 28 + Math.sin(t * 2.4) * 4, y = 200 - t * 118;
      return `<path d="M${x - 4} ${y} Q${x} ${y - 3} ${x + 4} ${y}" stroke="#4e2e18" stroke-width="0.8" fill="none"/>`;
    }).join('');
    const shells = [[120, 206, '#f9c6c9'], [214, 210, '#fde2b8'], [300, 214, '#f9c6c9'], [64, 214, '#e9d5ff']].map(([x, y, c]) =>
      `<path d="M${x - 3.4} ${y} Q${x} ${y - 5.6} ${x + 3.4} ${y} Z" fill="${c}" ${wink(0.5)}/><path d="M${x} ${y - 4.6} L${x} ${y} M${x - 1.6} ${y - 3.6} L${x - 1.4} ${y} M${x + 1.6} ${y - 3.6} L${x + 1.4} ${y}" stroke="#c08a8a" stroke-width="0.4"/>`).join('');
    const pebbles = [[150, 196], [176, 214], [252, 204], [92, 200], [330, 208], [276, 196]].map(([x, y]) =>
      `<ellipse cx="${x}" cy="${y}" rx="2.2" ry="1.3" fill="#9a8a80" ${wink(0.4)}/>`).join('');
    const wall = [276, 286, 296, 314, 324].map(x => `<line x1="${x}" y1="106" x2="${x}" y2="176" stroke="#5f5b54" stroke-width="0.8"/>`).join('');
    return `
    <defs>
      <linearGradient id="b-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5b2a86"/>
        <stop offset="0.35" stop-color="#b5397a"/>
        <stop offset="0.62" stop-color="#ef5d4e"/>
        <stop offset="0.84" stop-color="#f79a3e"/>
        <stop offset="1" stop-color="#fbd06a"/>
      </linearGradient>
      <linearGradient id="b-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a7fd8"/><stop offset="1" stop-color="#4b47a8"/>
      </linearGradient>
      <linearGradient id="b-sand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6bd62"/><stop offset="1" stop-color="#e39a43"/>
      </linearGradient>
      <radialGradient id="b-sun">
        <stop offset="0" stop-color="#fff1b8" stop-opacity="0.95"/>
        <stop offset="0.35" stop-color="#ffd27a" stop-opacity="0.6"/>
        <stop offset="1" stop-color="#ffb35a" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="b-lamp">
        <stop offset="0" stop-color="#ffd27a" stop-opacity="0.85"/>
        <stop offset="1" stop-color="#ffb347" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="400" height="130" fill="url(#b-sky)"/>
    <circle cx="252" cy="124" r="86" fill="url(#b-sun)"/>
    <circle cx="252" cy="124" r="22" fill="#fff4c4"/>
    <g class="drift" style="animation-duration:100s;animation-delay:-40s">
      <path d="M-40 40 Q-28 32 -12 36 Q0 28 16 34 Q28 32 32 40 Z" fill="#f6a3a0" opacity="0.5"/>
    </g>
    <g class="drift" style="animation-duration:130s;animation-delay:-90s">
      <path d="M-50 78 Q-36 72 -18 75 Q-4 68 14 74 Q26 72 30 79 Z" fill="#fcc08a" opacity="0.45"/>
    </g>

    <!-- Colline lontane -->
    <path d="M0 128 L0 104 Q22 92 44 100 Q64 88 90 98 Q112 104 130 128 Z" fill="#4b4a8a"/>
    <path d="M0 128 L0 112 Q30 104 58 112 Q80 106 104 128 Z" fill="#3a3a72"/>
    <path d="M118 128 Q126 120 136 128 Z" fill="#3a3a72"/>

    <!-- Mare con i riflessi del sole -->
    <rect y="126" width="400" height="38" fill="url(#b-sea)"/>
    <rect y="126" width="400" height="1.2" fill="#ffe1a0" opacity="0.7"/>
    ${[[252, 131, 26], [252, 136, 20], [256, 141, 16], [248, 146, 12], [254, 151, 9]].map(([x, y, w], i) =>
      `<rect class="shimmer" x="${x - w / 2}" y="${y}" width="${w}" height="1.3" rx="0.6" fill="#ffe9a8" style="animation-delay:-${i * 0.4}s"/>`).join('')}
    <g class="wave" style="animation-duration:8s"><path d="${wavePath(138, 1.2)}" stroke="#e4ddff" stroke-opacity="0.45" fill="none" stroke-width="0.9"/></g>
    <g class="wave" style="animation-duration:11s;animation-direction:reverse"><path d="${wavePath(150, 1.5)}" stroke="#e4ddff" stroke-opacity="0.35" fill="none" stroke-width="0.9"/></g>

    <!-- Nave di Capitana Vera -->
    <g transform="translate(186 146)">
      <g class="bob" style="animation-duration:5s">
        <path d="M-38 -2 L-38 -16 L48 -16 L48 -2 Q40 6 6 8 Q-30 6 -38 -2 Z" fill="#6b4022" ${wink(0.9)}/>
        <path d="M-36 -10 L46 -10 M-34 -4 L44 -4" stroke="#4e2e18" stroke-width="0.8"/>
        <rect x="-38" y="-18" width="86" height="3" fill="#8a5a32" ${wink(0.7)}/>
        ${[-30, -20, -10, 0, 10, 20, 30, 40].map(x => `<rect x="${x}" y="-24" width="1.4" height="6" fill="#8a5a32" ${wink(0.4)}/>`).join('')}
        <path d="M-38 -24 L48 -24" stroke="#8a5a32" stroke-width="1.6"/>
        <path d="M30 -16 L30 -32 L48 -32 L48 -16 Z" fill="#7a4a26" ${wink(0.8)}/>
        <rect x="34" y="-28" width="4" height="4" fill="#ffcf5a" ${wink(0.4)}/><rect x="41" y="-28" width="4" height="4" fill="#ffcf5a" ${wink(0.4)}/>
        ${[-24, -10, 4, 18].map(x => `<circle cx="${x}" cy="-8" r="1.6" fill="#2a1a12"/>`).join('')}
        <path d="M-32 -12 L-32 -6 M-35 -9 L-29 -9 M-34.6 -5.6 Q-32 -3.6 -29.4 -5.6" stroke="#2a1a12" stroke-width="0.9" fill="none"/>
        <path d="M-38 -14 L-60 -26" stroke="${WOOD_INK}" stroke-width="2.4"/><path d="M-38 -14 L-60 -26" stroke="#7a4a26" stroke-width="1.4"/>
        <line x1="2" y1="-18" x2="2" y2="-118" stroke="${WOOD_INK}" stroke-width="3"/>
        <line x1="2" y1="-18" x2="2" y2="-118" stroke="#6b4022" stroke-width="1.8"/>
        <path d="M-5 -110 L9 -110 L8 -102 L-4 -102 Z" fill="#7a4a26" ${wink(0.7)}/>
        <line x1="-24" y1="-96" x2="28" y2="-96" stroke="${WOOD_INK}" stroke-width="2.4"/><line x1="-24" y1="-96" x2="28" y2="-96" stroke="#6b4022" stroke-width="1.4"/>
        <path d="M2 -118 L-60 -26 M2 -118 L48 -24 M2 -100 L-48 -24" stroke="#3a2a1c" stroke-width="0.5"/>
        <path d="M-22 -95 Q2 -88 26 -95 Q31 -72 24 -44 Q2 -50 -20 -44 Q-27 -70 -22 -95 Z" fill="#eadcb6" ${wink(0.8)}/>
        <path d="M-20 -94 Q-25 -70 -19 -46 Q-12 -48 -10 -48 Q-15 -70 -12 -92 Z" fill="#d6c494"/>
        <path d="M6 -92 Q9 -70 6 -48" stroke="#d6c494" stroke-width="1" fill="none"/>
        <rect x="14" y="-62" width="7" height="6" fill="#d6c494" ${wink(0.5)} transform="rotate(8 17 -59)"/>
        <rect x="-16" y="-84" width="6" height="5" fill="#d6c494" ${wink(0.5)} transform="rotate(-6 -13 -82)"/>
        <text x="3" y="-56" font-size="30" fill="#5a3a22" text-anchor="middle" font-weight="900" font-family="Georgia, serif">2</text>
      </g>
    </g>
    <!-- Barca a remi legata alla nave -->
    <path d="M232 140 Q240 148 246 150" stroke="#3a2a1c" stroke-width="0.6" fill="none"/>
    <g transform="translate(254 154)"><g class="bob" style="animation-duration:3.6s">
      <path d="M-12 -3 L12 -3 Q9 3 0 3.6 Q-9 3 -12 -3 Z" fill="#7a4a26" ${wink(0.7)}/>
      <path d="M-11 -3 L11 -3" stroke="#a8703e" stroke-width="0.9"/>
    </g></g>

    <!-- Sabbia e battigia -->
    <path d="M0 160 Q100 154 200 160 T400 158 L400 220 L0 220 Z" fill="url(#b-sand)"/>
    <path d="M0 160 Q100 154 200 160 T400 158 L400 165 Q300 161 200 167 Q100 161 0 167 Z" fill="#d78c3c" opacity="0.45"/>
    <g class="wave" style="animation-duration:6s"><path d="${wavePath(159, 1.4)}" stroke="#fff" stroke-opacity="0.8" fill="none" stroke-width="1.6"/></g>
    <path d="M0 204 Q120 198 220 204 T400 202 L400 220 L0 220 Z" fill="#d8873a" opacity="0.6"/>

    <!-- Ombre lunghe -->
    <path d="M262 180 L346 180 L318 214 L222 214 Z" fill="#7a3a1a" opacity="0.22"/>
    <path d="M38 200 L74 198 L120 214 L60 216 Z" fill="#7a3a1a" opacity="0.18"/>

    ${shells}
    ${pebbles}
    <path d="M204 192 L207 186 L210 192 L216 193 L211 197 L212 203 L207 200 L202 203 L203 197 L198 193 Z" fill="#e2483d" ${wink(0.5)}/>
    <path d="M140 214 L162 208 M150 211 L154 206" stroke="#7a5a3a" stroke-width="1.6" stroke-linecap="round"/>

    <!-- Palma in primo piano a sinistra -->
    <path d="M30 202 Q44 150 62 82 L70 84 Q54 150 42 204 Z" fill="#7a4a26" ${wink(0.9)}/>
    <path d="M40 200 Q52 150 66 84" stroke="#9a6438" stroke-width="1.4" fill="none"/>
    ${trunk}
    <g transform="translate(66 80)"><g class="swing" style="animation-duration:5s">${fronds}
      <circle cx="-2" cy="4" r="2.6" fill="#6b4022" ${wink(0.5)}/><circle cx="3" cy="5" r="2.4" fill="#6b4022" ${wink(0.5)}/>
    </g></g>

    <!-- Capanno con portico -->
    <rect x="268" y="104" width="70" height="74" fill="#8e8a80" ${wink(0.9)}/>
    <rect x="268" y="104" width="12" height="74" fill="#77736a"/>
    ${wall}
    <path d="M262 106 L303 74 L344 106 Z" fill="#6b665e" ${wink(0.9)}/>
    <path d="M272 99 L303 76 L334 99 M282 101 L303 84" stroke="#55514a" stroke-width="0.8" fill="none"/>
    <rect x="281" y="88" width="44" height="11" rx="1" fill="#d9b98a" ${wink(0.8)}/>
    <text x="303" y="96.6" font-size="7" fill="#5a3a22" text-anchor="middle" font-weight="900" font-family="Georgia, serif" letter-spacing="0.6">CAPANNO</text>
    <rect x="290" y="134" width="22" height="44" fill="#7a5a3c" ${wink(0.8)}/>
    <path d="M297 134 L297 178 M304 134 L304 178" stroke="#5a3e26" stroke-width="0.8"/>
    <path d="M254 118 L352 118 L350 125 L256 125 Z" fill="#7d786e" ${wink(0.8)}/>
    <rect x="258" y="125" width="4" height="54" fill="#8a6a4a" ${wink(0.7)}/>
    <rect x="344" y="125" width="4" height="54" fill="#8a6a4a" ${wink(0.7)}/>
    <rect x="256" y="176" width="94" height="5" fill="#6b5a48" ${wink(0.7)}/>
    ${[280, 322].map(x => `<g transform="translate(${x} 128)"><g class="swing" style="animation-duration:4s;animation-delay:-${x % 3}s">
      <circle class="flicker" cx="0" cy="8" r="15" fill="url(#b-lamp)"/>
      <line x1="0" y1="0" x2="0" y2="3" stroke="${WOOD_INK}" stroke-width="0.7"/>
      <rect class="flicker" x="-2.8" y="3" width="5.6" height="7" rx="1" fill="#ffcf5a" ${wink(0.5)}/>
      <rect x="-3.4" y="2.2" width="6.8" height="1.4" fill="#2b2b33"/><rect x="-3.4" y="9.6" width="6.8" height="1.4" fill="#2b2b33"/>
    </g></g>`).join('')}
    <g transform="translate(272 179)">
      <path d="M-7 0 Q-8.4 -8 -7 -15 L7 -15 Q8.4 -8 7 0 Z" fill="#8a5530" ${wink(0.7)}/>
      <path d="M-7.8 -11 L7.8 -11 M-7.8 -4 L7.8 -4" stroke="#3f3f46" stroke-width="1.2"/>
      <ellipse cx="0" cy="-15" rx="7" ry="1.6" fill="#a8703e" ${wink(0.5)}/>
    </g>
    <path d="M316 182 L324 150 L329 151 L321 183 Z" fill="#a8845a" ${wink(0.7)}/>
    `;
  },
  fg() {
    return `
    <path d="M0 220 L0 196 Q8 188 16 194 Q22 186 30 194 Q38 190 42 200 Q48 204 44 220 Z" fill="#1f1a2e"/>
    <path d="M400 220 L400 192 Q392 186 384 192 Q378 184 370 192 Q362 190 360 202 Q356 210 362 220 Z" fill="#1f1a2e"/>`;
  }
};

/* ==========================================================================
   MOLO – STANZA: INTERNO DEL CAPANNO – stile mock-up
   ========================================================================== */
SCENES.capanno = {
  bg() {
    const planks = Array.from({ length: 13 }, (_, i) => {
      const y = 14 + i * 13;
      return `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#4e2e18" stroke-width="0.9"/>
        <path d="M${(i * 67) % 380 + 10} ${y + 6} q8 -2 16 0 M${(i * 131) % 360 + 20} ${y + 8} q5 -1.4 10 0" stroke="#6b4022" stroke-width="0.6" fill="none"/>`;
    }).join('');
    const mesh = [];
    for (let i = 0; i <= 8; i++) {
      mesh.push(`<path d="M${66 + i * 9} 32 L${60 + i * 11} 96" stroke="#c8a878" stroke-width="0.6"/>`);
      mesh.push(`<path d="M${66 + i * 9} 32 L${142 - (8 - i) * 9} 96" stroke="#c8a878" stroke-width="0.6"/>`);
    }
    const motes = [[196, 70], [214, 92], [188, 110], [222, 128], [204, 150], [180, 132], [228, 104]].map(([x, y], i) =>
      `<circle class="twinkle" cx="${x}" cy="${y}" r="0.7" fill="#ffe1a0" style="animation-delay:-${i * 0.5}s"/>`).join('');
    const floor = [192, 202, 214].map(y => `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#1e120a" stroke-width="1"/>`).join('');
    return `
    <defs>
      <linearGradient id="c-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a4a26"/><stop offset="1" stop-color="#5e3a1e"/>
      </linearGradient>
      <linearGradient id="c-door" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5ab8"/><stop offset="0.55" stop-color="#e0709a"/><stop offset="1" stop-color="#f4a35a"/>
      </linearGradient>
      <radialGradient id="c-lamp">
        <stop offset="0" stop-color="#ffcf7a" stop-opacity="0.9"/>
        <stop offset="0.5" stop-color="#ff9f45" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#ff9f45" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c-cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffe1a0" stop-opacity="0.35"/><stop offset="1" stop-color="#ffe1a0" stop-opacity="0.05"/>
      </linearGradient>
      <radialGradient id="c-vig" cx="0.52" cy="0.4" r="0.75">
        <stop offset="0.5" stop-color="#120a06" stop-opacity="0"/><stop offset="1" stop-color="#120a06" stop-opacity="0.6"/>
      </radialGradient>
    </defs>

    <rect width="400" height="220" fill="url(#c-wall)"/>
    ${planks}

    <!-- Trave del soffitto e corde -->
    <rect width="400" height="14" fill="#4e2e18" ${wink(0.9)}/>
    <path d="M20 14 Q40 34 64 16 M330 14 Q342 30 356 14" stroke="#b08a5a" stroke-width="1.2" fill="none"/>
    <path d="M300 14 L300 46" stroke="#b08a5a" stroke-width="1.2"/><circle cx="300" cy="14" r="2.4" fill="none" stroke="#b08a5a" stroke-width="1"/>

    <!-- Porta aperta sul tramonto -->
    <rect x="10" y="90" width="44" height="94" fill="#5e3a1e" ${wink(0.9)}/>
    <rect x="14" y="94" width="36" height="90" fill="url(#c-door)"/>
    <path d="M14 152 L50 152 L50 184 L14 184 Z" fill="#6c66b0"/>
    <path d="M16 152 L20 146 L24 152 M28 152 L30 140 L33 152" fill="#2c2a55"/>
    <path d="M18 160 L46 160 M20 170 L44 170" stroke="#d8ccf4" stroke-width="0.6" opacity="0.6"/>
    <path d="M54 92 L66 86 L66 190 L54 184 Z" fill="#8a5a32" ${wink(0.9)}/>
    <path d="M60 90 L60 187" stroke="#6b4022" stroke-width="0.8"/>
    <circle cx="63" cy="140" r="1.2" fill="#3f3f46"/>

    <!-- Rete da pesca con galleggianti -->
    <path d="M66 30 Q104 40 142 30 Q150 70 136 100 Q104 108 72 98 Q58 70 66 30 Z" fill="#c8a878" opacity="0.12"/>
    ${mesh.join('')}
    <path d="M66 30 Q104 40 142 30" stroke="#b08a5a" stroke-width="1.2" fill="none"/>
    ${[[72, 58, '#3b82f6'], [80, 80, '#22c55e'], [126, 62, '#f97316'], [112, 88, '#14b8a6'], [94, 70, '#22c55e']].map(([x, y, c]) =>
      `<circle cx="${x}" cy="${y}" r="3.4" fill="${c}" ${wink(0.6)}/><circle cx="${x - 1}" cy="${y - 1.2}" r="0.9" fill="#fff" opacity="0.6"/>`).join('')}
    <circle cx="66" cy="30" r="1.8" fill="#3f3f46"/><circle cx="142" cy="30" r="1.8" fill="#3f3f46"/>

    <!-- Finestrella -->
    <rect x="150" y="42" width="40" height="38" fill="#8a5a32" ${wink(0.9)}/>
    <rect x="154" y="46" width="32" height="30" fill="#c4b5fd"/>
    <rect x="154" y="46" width="32" height="12" fill="#ddd0fb"/>
    <path d="M170 46 L170 76 M154 61 L186 61" stroke="#8a5a32" stroke-width="2.4"/>
    <rect x="148" y="80" width="44" height="3" fill="#6b4022" ${wink(0.6)}/>

    <!-- Luce della lanterna -->
    <path d="M198 44 L214 44 L262 184 L150 184 Z" fill="url(#c-cone)"/>
    <circle class="flicker" cx="206" cy="36" r="40" fill="url(#c-lamp)"/>
    ${motes}

    <!-- Poster Googol -->
    <g transform="rotate(2 266 66)">
      <path d="M244 40 L288 40 L288 86 L282 92 L244 92 Z" fill="#f1e6cc" ${wink(0.8)}/>
      <path d="M282 92 L282 86 L288 86 Z" fill="#d8c8a0" ${wink(0.6)}/>
      <text x="264" y="66" font-size="15" fill="#3a2a1c" text-anchor="middle" font-weight="900" font-family="Courier New, monospace">10</text>
      <text x="280" y="57" font-size="7" fill="#3a2a1c" text-anchor="middle" font-weight="900" font-family="Courier New, monospace">100</text>
      <text x="266" y="80" font-size="7.4" fill="#3a2a1c" text-anchor="middle" font-weight="800" font-family="Georgia, serif" letter-spacing="0.8">GOOGOL</text>
      <circle cx="266" cy="42" r="1.2" fill="#7a4a26"/>
    </g>

    <!-- Mensola con barattoli -->
    <rect x="298" y="108" width="88" height="4" fill="#8a5a32" ${wink(0.7)}/>
    <path d="M304 112 L310 120 M380 112 L374 120" stroke="#6b4022" stroke-width="2"/>
    <rect x="302" y="94" width="12" height="14" rx="2" fill="#d8c8a8" fill-opacity="0.75" ${wink(0.6)}/>
    <rect x="303" y="99" width="10" height="8" fill="#a8703e" opacity="0.7"/>
    <rect x="301.5" y="92" width="13" height="3" rx="1" fill="#8a5a32" ${wink(0.4)}/>
    <path d="M344 108 L344 98 Q344 95 346 94 L346 89 L350 89 L350 94 Q352 95 352 98 L352 108 Z" fill="#9a6a8a" ${wink(0.6)}/>
    <path d="M362 108 L362 96 Q362 93 364 92 L364 86 L368 86 L368 92 Q370 93 370 96 L370 108 Z" fill="#5a3a22" ${wink(0.6)}/>
    <rect x="363" y="98" width="6" height="5" fill="#f1e6cc"/>

    <!-- Tavolo con la mappa -->
    <rect x="168" y="136" width="70" height="5" rx="1" fill="#8a5a32" ${wink(0.8)}/>
    <rect x="174" y="141" width="4.6" height="41" fill="#6b4022" ${wink(0.7)}/><rect x="227" y="141" width="4.6" height="41" fill="#6b4022" ${wink(0.7)}/>
    <path d="M178 135.6 L230 135.6 L226 129 L182 128.4 Z" fill="#ead6a6" ${wink(0.6)}/>
    <path d="M186 132 Q192 129 198 132 Q204 130 210 133 M214 131 Q218 129 224 132" stroke="#a8703e" stroke-width="0.8" fill="none"/>
    <circle cx="220" cy="131" r="1.6" fill="none" stroke="#c62828" stroke-width="0.7"/>

    <!-- Remo e botte -->
    <path d="M302 98 L288 176" stroke="${WOOD_INK}" stroke-width="3"/><path d="M302 98 L288 176" stroke="#b08a5a" stroke-width="1.8"/>
    <path d="M288 168 Q282 178 286 186 Q292 186 293 176 Z" fill="#b08a5a" ${wink(0.7)}/>
    <g transform="translate(366 182)">
      <path d="M-15 0 Q-18 -18 -15 -36 L15 -36 Q18 -18 15 0 Z" fill="#8a5530" ${wink(0.9)}/>
      <path d="M-5 -36 Q-6.6 -18 -5 0 M6 -36 Q7.6 -18 6 0" stroke="#6b3f1f" stroke-width="0.7" fill="none"/>
      <path d="M-16.6 -28 Q0 -26.6 16.6 -28 M-16.8 -8 Q0 -6.6 16.8 -8" stroke="#3f3f46" stroke-width="2" fill="none"/>
      <ellipse cx="0" cy="-36" rx="15" ry="3" fill="#a8703e" ${wink(0.7)}/>
    </g>

    <!-- Pavimento -->
    <rect y="182" width="400" height="38" fill="#3a2414"/>
    <rect y="182" width="400" height="5" fill="#2a1a10" ${wink(0.6)}/>
    ${floor}

    <!-- Lanterna appesa -->
    <g transform="translate(206 14)">
      <g class="swing" style="animation-duration:4.4s">
        <line x1="0" y1="0" x2="0" y2="12" stroke="#b08a5a" stroke-width="1.2"/>
        <circle cx="0" cy="13" r="2" fill="none" stroke="#2b2b33" stroke-width="1"/>
        <path d="M-6 15 L6 15 L7.6 19 L-7.6 19 Z" fill="#2b2b33" ${wink(0.5)}/>
        <rect class="flicker" x="-6" y="19" width="12" height="13" rx="2" fill="#ffcf5a" ${wink(0.6)}/>
        <path class="flicker" d="M0 30 Q-2.4 26 0 22 Q2.4 26 0 30 Z" fill="#fff4c4"/>
        <path d="M-6 19 L6 32 M6 19 L-6 32" stroke="#2b2b33" stroke-width="0.6" opacity="0.6"/>
        <rect x="-7.6" y="32" width="15.2" height="3" rx="1" fill="#2b2b33" ${wink(0.5)}/>
      </g>
    </g>

    <!-- Angoli in ombra -->
    <rect width="400" height="220" fill="url(#c-vig)"/>
    `;
  }
};

/* ==========================================================================
   TAVERNA – STANZA: LA STRADA DAVANTI ALLA TAVERNA
   ========================================================================== */
SCENES.strada = {
  bg() {
    const stones = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 15; c++) {
        stones.push(`<ellipse cx="${c * 28 + (r % 2 ? 14 : 0)}" cy="${186 + r * 10}" rx="12" ry="4" fill="#475569" opacity="${0.5 + (c % 3) * 0.15}"/>`);
      }
    }
    return `
    <defs>
      <linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#020617"/><stop offset="1" stop-color="#312e81"/>
      </linearGradient>
      <radialGradient id="st-lamp">
        <stop offset="0" stop-color="#fde68a" stop-opacity="0.8"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#st-sky)"/>
    ${starField(30, 77, 400, 80, 0.9)}
    <circle cx="70" cy="34" r="12" fill="#fef3c7"/>

    <!-- Case sullo sfondo -->
    <path d="M0 120 L0 70 L30 52 L60 70 L60 120 Z" fill="#1e1b4b"/>
    <path d="M340 120 L340 64 L372 44 L404 64 L404 120 Z" fill="#1e1b4b"/>
    <rect x="16" y="82" width="10" height="12" fill="#fbbf24" opacity="0.6"/>
    <rect x="356" y="78" width="10" height="12" fill="#fbbf24" opacity="0.5"/>

    <!-- Facciata della Taverna -->
    <rect x="140" y="58" width="196" height="124" fill="#5b3415"/>
    <path d="M140 72 L336 72 M140 100 L336 100 M140 128 L336 128 M140 156 L336 156" stroke="#3b2410" stroke-width="1.2"/>
    <polygon points="128,62 348,62 310,26 166,26" fill="#7f1d1d"/>
    <path d="M140 50 L336 50" stroke="#991b1b" stroke-width="2"/>
    <rect x="160" y="84" width="34" height="26" fill="#fbbf24" class="flicker"/>
    <path d="M177 84 L177 110 M160 97 L194 97" stroke="#3b2410" stroke-width="2.4"/>
    <rect x="282" y="84" width="34" height="26" fill="#fbbf24" class="flicker" style="animation-delay:-1.3s"/>
    <path d="M299 84 L299 110 M282 97 L316 97" stroke="#3b2410" stroke-width="2.4"/>
    <circle cx="170" cy="100" r="4" fill="#3b2410" opacity="0.6"/><circle cx="306" cy="98" r="4" fill="#3b2410" opacity="0.6"/>

    <!-- Insegna appesa -->
    <line x1="238" y1="58" x2="238" y2="66" stroke="#1c1008" stroke-width="1.2"/>
    <g transform="translate(238 66)"><g class="swing" style="animation-duration:4s">
      <rect x="-26" y="0" width="52" height="16" rx="3" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
      <text x="0" y="11" font-size="8" fill="#fbbf24" text-anchor="middle" font-weight="900" font-family="Georgia, serif">÷ TAVERNA</text>
    </g></g>

    <!-- Porta -->
    <rect x="218" y="116" width="40" height="66" rx="3" fill="#3b2410"/>
    <rect x="222" y="120" width="32" height="62" fill="#78350f"/>
    <path d="M238 120 L238 182" stroke="#451a03" stroke-width="1.2"/>
    <circle cx="249" cy="152" r="1.8" fill="#fbbf24"/>

    <!-- Lanterna a muro -->
    <circle class="flicker" cx="208" cy="124" r="16" fill="url(#st-lamp)"/>
    <rect x="204" y="118" width="8" height="11" rx="2" fill="#fbbf24" class="flicker"/>

    <!-- Casse e barile -->
    <rect x="58" y="150" width="30" height="32" fill="#a16207" stroke="#713f12" stroke-width="1"/>
    <path d="M58 150 L88 182 M88 150 L58 182" stroke="#713f12" stroke-width="0.8" opacity="0.6"/>
    <rect x="92" y="160" width="22" height="22" fill="#92400e" stroke="#713f12" stroke-width="1"/>
    <g transform="translate(350 168)">
      <rect x="-12" y="-16" width="24" height="30" rx="6" fill="#92400e"/>
      <rect x="-12" y="-9" width="24" height="2.5" fill="#451a03"/><rect x="-12" y="6" width="24" height="2.5" fill="#451a03"/>
    </g>
    <!-- Gatto che dorme sul davanzale -->
    <g transform="translate(299 112)">
      <ellipse cx="0" cy="0" rx="9" ry="4" fill="#1c1917"/>
      <circle cx="8" cy="-2" r="3.2" fill="#1c1917"/>
      <path d="M6 -5 L7 -7.5 L8.5 -5 M9 -5 L10.5 -7.5 L11 -4.6" fill="#1c1917"/>
      <path d="M-9 0 Q-14 -4 -12 -8" stroke="#1c1917" stroke-width="1.6" fill="none" class="swing" style="animation-duration:3s"/>
    </g>

    <!-- Strada di ciottoli -->
    <rect y="180" width="400" height="40" fill="#334155"/>
    ${stones.join('')}
    `;
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
   PUNTO CENTRALE NORD: IL BELVEDERE (mongolfiera per il viaggio rapido)
   ========================================================================== */
SCENES.belvedere = {
  bg() {
    const u = typeof state !== 'undefined' ? state.unlockedArea : 0;
    const sign = (x, y, text, open) => `<g transform="translate(${x} ${y})">
      <rect x="-1.5" y="0" width="3" height="26" fill="#78350f"/>
      <rect x="-22" y="-10" width="44" height="12" rx="2" fill="${open ? '#fef3c7' : '#a8a29e'}"/>
      <text x="0" y="-2" font-size="6.2" fill="#78350f" text-anchor="middle" font-weight="900">${text}</text></g>`;
    return `
    <defs>
      <linearGradient id="bv-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0f172a"/><stop offset="0.55" stop-color="#6d28d9"/><stop offset="1" stop-color="#fdba74"/>
      </linearGradient>
    </defs>
    <rect width="400" height="220" fill="url(#bv-sky)"/>
    ${starField(25, 99, 400, 70, 0.8)}
    <circle cx="320" cy="120" r="22" fill="#fde68a" opacity="0.9"/>
    <rect y="128" width="400" height="30" fill="#1e3a8a" opacity="0.8"/>
    <g class="wave" style="animation-duration:10s"><path d="${wavePath(136, 1)}" stroke="#bfdbfe" stroke-opacity="0.3" fill="none"/></g>
    <!-- Monte con il Faro in cima -->
    <path d="M120 140 Q170 30 216 24 Q262 30 300 140 Z" fill="#3b0764"/>
    <rect x="210" y="6" width="10" height="20" fill="#e2e8f0"/><rect x="210" y="12" width="10" height="4" fill="#dc2626"/>
    <polygon points="208,6 222,6 215,0" fill="#b91c1c"/>
    <circle class="faro-blink" cx="215" cy="8" r="4" fill="#fde68a"/>
    <!-- Scalinata verso il Faro -->
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${196 + i * 2}" y="${178 - i * 10}" width="${28 - i * 3}" height="6" fill="#a8a29e" stroke="#57534e" stroke-width="0.6"/>`).join('')}
    <!-- Galleria verso l'Officina -->
    <path d="M78 186 L78 136 Q102 116 126 136 L126 186 Z" fill="#292524"/>
    <path d="M78 136 Q102 116 126 136" stroke="#78716c" stroke-width="4" fill="none"/>
    <g transform="translate(102 128)"><g class="spin" style="animation-duration:8s"><path d="${gearPath(7, 8)}" fill="#d97706"/><circle r="2" fill="#292524"/></g></g>
    <!-- Serra in lontananza (destra) -->
    <path d="M330 150 Q356 118 382 150 Z" fill="#6ee7b7" opacity="0.7"/>
    <path d="M343 150 L343 132 M356 150 L356 124 M369 150 L369 132" stroke="#f1f5f9" stroke-width="1" opacity="0.7"/>
    <!-- Mongolfiera -->
    <g transform="translate(300 90)"><g class="crystal-float" style="animation-duration:4s">
      <path d="M0 -40 Q26 -40 24 -12 Q20 6 6 14 L-6 14 Q-20 6 -24 -12 Q-26 -40 0 -40 Z" fill="#ef4444"/>
      <path d="M0 -40 Q10 -38 9 -12 Q7 6 3 14 M0 -40 Q-10 -38 -9 -12 Q-7 6 -3 14" stroke="#facc15" stroke-width="3" fill="none"/>
      <path d="M-6 14 L-6 26 M6 14 L6 26" stroke="#78350f" stroke-width="0.8"/>
      <rect x="-8" y="26" width="16" height="10" rx="2" fill="#92400e"/>
    </g></g>
    <line x1="300" y1="126" x2="300" y2="186" stroke="#78350f" stroke-width="0.8" stroke-dasharray="2 2"/>
    <!-- Cannocchiale panoramico -->
    <g transform="translate(160 186)"><rect x="-2" y="-24" width="4" height="24" fill="#475569"/><rect x="-8" y="-32" width="16" height="9" rx="3" fill="#64748b" transform="rotate(-15 0 -28)"/></g>
    <!-- Terrazza con ringhiera -->
    <rect y="186" width="400" height="34" fill="#57534e"/>
    <path d="M0 196 L400 196 M0 208 L400 208" stroke="#44403c" stroke-width="1"/>
    `;
  }
};
