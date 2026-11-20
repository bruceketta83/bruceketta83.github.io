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
const STARS_MOLO = [
  [24, 18, 1.1, 0], [62, 34, 0.8, 1.2], [104, 12, 1, 0.6], [140, 40, 0.7, 2.1],
  [178, 20, 1.2, 1.5], [214, 46, 0.7, 0.3], [246, 14, 0.9, 2.6], [276, 34, 0.7, 1.9],
  [366, 20, 1.1, 0.9], [384, 52, 0.8, 2.3], [12, 58, 0.7, 1.1], [196, 66, 0.6, 0.4],
  [92, 70, 0.6, 2.8], [352, 76, 0.6, 1.6]
];

const SCENES = {
  molo: {
    bg() {
      const stars = STARS_MOLO.map(([x, y, r, d]) =>
        `<circle class="twinkle" cx="${x}" cy="${y}" r="${r}" fill="#fff" style="animation-delay:-${d}s"/>`).join('');
      const seams = Array.from({ length: 17 }, (_, i) =>
        `<line x1="${i * 24 + 6}" y1="157.5" x2="${i * 24 + 6}" y2="168" stroke="#4a2c11" stroke-width="0.8"/>`).join('');
      const posts = [14, 112, 210, 308, 392].map(x =>
        `<rect x="${x}" y="166" width="9" height="56" fill="#3b2410"/><rect x="${x - 0.5}" y="182" width="10" height="2" fill="#1c1208"/>`).join('');
      return `
      <defs>
        <linearGradient id="m-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0b1026"/>
          <stop offset="0.5" stop-color="#3b1d5e"/>
          <stop offset="0.82" stop-color="#b4436c"/>
          <stop offset="1" stop-color="#f59e0b"/>
        </linearGradient>
        <linearGradient id="m-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1e3a8a"/>
          <stop offset="1" stop-color="#0a1633"/>
        </linearGradient>
        <radialGradient id="m-moon">
          <stop offset="0" stop-color="#fef3c7" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#fef3c7" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="m-lamp">
          <stop offset="0" stop-color="#fde68a" stop-opacity="0.85"/>
          <stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="400" height="142" fill="url(#m-sky)"/>
      ${stars}
      <circle cx="318" cy="40" r="36" fill="url(#m-moon)"/>
      <circle cx="318" cy="40" r="14" fill="#fef3c7"/>
      <circle cx="313" cy="36" r="2.8" fill="#fde68a"/>
      <circle cx="322" cy="45" r="1.8" fill="#fde68a"/>

      <g class="drift" style="animation-duration:90s;animation-delay:-20s">
        <g fill="#c4b5fd" opacity="0.3"><ellipse cx="0" cy="30" rx="28" ry="6"/><ellipse cx="12" cy="25" rx="16" ry="6"/></g>
      </g>
      <g class="drift" style="animation-duration:120s;animation-delay:-75s">
        <g fill="#f0abfc" opacity="0.22"><ellipse cx="0" cy="62" rx="36" ry="5"/><ellipse cx="-10" cy="58" rx="18" ry="5"/></g>
      </g>

      <!-- Isola lontana con il Faro sabotato -->
      <path d="M0 142 Q20 128 45 126 Q70 116 100 128 Q118 134 132 142 Z" fill="#1e1b4b"/>
      <polygon points="54,124 66,124 64,100 56,100" fill="#312e81"/>
      <rect x="55.5" y="108" width="9" height="3" fill="#4338ca"/>
      <rect x="55" y="116" width="10" height="3" fill="#4338ca"/>
      <rect x="55" y="94" width="10" height="6" fill="#1e1b4b"/>
      <polygon points="53,94 67,94 60,88" fill="#312e81"/>
      <polygon class="faro-blink" points="60,97 150,82 150,110" fill="#fde68a" opacity="0.2"/>
      <circle class="faro-blink" cx="60" cy="97" r="3" fill="#fca5a5"/>

      <!-- Nave lontana -->
      <g transform="translate(225 140)">
        <g class="bob">
          <path d="M-18 -6 L18 -6 L13 0 L-13 0 Z" fill="#0f0a1e"/>
          <line x1="0" y1="-6" x2="0" y2="-30" stroke="#0f0a1e" stroke-width="1.4"/>
          <path d="M1 -28 Q11 -19 1 -9 Z" fill="#1e1b4b"/>
          <path d="M-1 -26 Q-9 -18 -1 -10 Z" fill="#1e1b4b"/>
          <path d="M0 -30 L6 -28 L0 -26 Z" fill="#dc2626"/>
        </g>
      </g>

      <!-- Mare -->
      <rect y="140" width="400" height="80" fill="url(#m-sea)"/>
      <ellipse class="shimmer" cx="318" cy="146" rx="11" ry="1.2" fill="#fef3c7"/>
      <ellipse class="shimmer" cx="318" cy="150.5" rx="7" ry="1" fill="#fef3c7" style="animation-delay:-0.7s"/>
      <ellipse class="shimmer" cx="318" cy="154.5" rx="4" ry="0.8" fill="#fef3c7" style="animation-delay:-1.4s"/>
      <g class="wave" style="animation-duration:7s">
        <path d="${wavePath(146, 1.4)}" stroke="#93c5fd" stroke-opacity="0.35" fill="none" stroke-width="1"/>
      </g>
      <g class="wave" style="animation-duration:10s;animation-direction:reverse">
        <path d="${wavePath(152, 1.6)}" stroke="#bfdbfe" stroke-opacity="0.25" fill="none" stroke-width="1"/>
      </g>
      <g class="fog">
        <ellipse cx="120" cy="140" rx="95" ry="5" fill="#e9d5ff" opacity="0.12"/>
        <ellipse cx="330" cy="137" rx="70" ry="4" fill="#e9d5ff" opacity="0.1"/>
      </g>

      <!-- Gabbiano -->
      <g class="gull">
        <path class="gull-wings" d="M0 0 q4 -4 8 0 q4 -4 8 0" stroke="#f8fafc" stroke-width="1.2" fill="none"/>
      </g>

      <!-- Pontile -->
      <rect y="166" width="400" height="54" fill="#020617" opacity="0.35"/>
      ${posts}
      <rect y="157" width="400" height="11" fill="#7c4a1e"/>
      <rect y="157" width="400" height="1.8" fill="#b45309"/>
      ${seams}

      <!-- Barile -->
      <rect x="10" y="138" width="20" height="20" rx="4" fill="#92400e"/>
      <rect x="10" y="142" width="20" height="2" fill="#451a03"/>
      <rect x="10" y="152" width="20" height="2" fill="#451a03"/>
      <ellipse cx="20" cy="138.5" rx="9.5" ry="2" fill="#b45309"/>

      <!-- Lanterna -->
      <rect x="158.5" y="116" width="3" height="42" fill="#3b2410"/>
      <rect x="158.5" y="116" width="11" height="2" fill="#3b2410"/>
      <circle class="flicker" cx="167" cy="124" r="17" fill="url(#m-lamp)"/>
      <rect class="flicker" x="164" y="119" width="6" height="9" rx="1.2" fill="#fbbf24"/>
      <rect x="163.5" y="118" width="7" height="1.6" fill="#1c1208"/>

      <!-- Casse del carico: 2³ e 2⁴ -->
      <rect x="333" y="135" width="27" height="23" fill="#a16207" stroke="#713f12" stroke-width="1.2"/>
      <path d="M333 135 L360 158 M360 135 L333 158" stroke="#713f12" stroke-width="0.8" opacity="0.6"/>
      <rect x="340" y="140" width="13" height="12" rx="2" fill="#451a03" opacity="0.85"/>
      <text x="346.5" y="149.5" font-size="9" fill="#fde68a" text-anchor="middle" font-weight="700" font-family="Courier New, monospace">2³</text>
      <rect x="337" y="113" width="22" height="22" fill="#b45309" stroke="#713f12" stroke-width="1.2"/>
      <rect x="341.5" y="118" width="13" height="12" rx="2" fill="#451a03" opacity="0.85"/>
      <text x="348" y="127.5" font-size="9" fill="#fde68a" text-anchor="middle" font-weight="700" font-family="Courier New, monospace">2⁴</text>
      <rect x="363" y="140" width="22" height="18" fill="#92400e" stroke="#713f12" stroke-width="1.2"/>
      <ellipse cx="380" cy="156" rx="9" ry="3" fill="none" stroke="#d6b88a" stroke-width="1.6"/>
      `;
    },
    fg() {
      return `
      <g class="wave" style="animation-duration:5s">
        <path d="${wavePath(200, 2)}" stroke="#93c5fd" stroke-opacity="0.3" fill="none" stroke-width="1.2"/>
      </g>
      <g class="wave" style="animation-duration:8s;animation-direction:reverse">
        <path d="${wavePath(212, 2.2)}" stroke="#bfdbfe" stroke-opacity="0.22" fill="none" stroke-width="1.2"/>
      </g>`;
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
