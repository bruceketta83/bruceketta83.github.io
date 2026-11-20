/* ==========================================================================
   GRAFICA: PERSONAGGI E SCENE SVG ANIMATE
   Tutti i personaggi hanno i piedi in (0,0) e guardano a destra.
   Le classi CSS (torso, eyes, mouth, leg-f, leg-b...) attivano le animazioni.
   ========================================================================== */

function drawAria() {
  return `
  <g class="char aria">
    <ellipse cx="0" cy="0" rx="10" ry="2.5" fill="#000" opacity="0.3"/>
    <g class="leg leg-b">
      <rect x="-4.5" y="-19" width="4.2" height="19" rx="1.6" fill="#1e3a8a"/>
      <rect x="-5.5" y="-3.2" width="6.5" height="3.2" rx="1.2" fill="#3f2a1d"/>
    </g>
    <g class="leg leg-f">
      <rect x="0.3" y="-19" width="4.2" height="19" rx="1.6" fill="#2548b8"/>
      <rect x="-0.2" y="-3.2" width="7" height="3.2" rx="1.2" fill="#4a3222"/>
    </g>
    <g class="torso">
      <rect x="-12" y="-37" width="7.5" height="15" rx="2.5" fill="#92400e"/>
      <rect x="-12" y="-31" width="7.5" height="2" fill="#78350f"/>
      <path d="M-6.5 -37 Q0 -40 6.5 -37 L7.5 -17 L-7.5 -17 Z" fill="#0d9488"/>
      <rect x="-7.5" y="-21" width="15" height="3" fill="#78350f"/>
      <circle cx="3" cy="-19.5" r="1.8" fill="#fbbf24" stroke="#92400e" stroke-width="0.5"/>
      <path d="M-5.5 -37.5 L5.5 -37.5 L1.5 -32.5 Z" fill="#e11d48"/>
      <g class="arm">
        <path d="M2.5 -35 Q6.5 -29 5.5 -23" stroke="#0f766e" stroke-width="3.6" fill="none" stroke-linecap="round"/>
        <circle cx="5.5" cy="-22.5" r="1.9" fill="#f2c094"/>
      </g>
      <g class="head">
        <path class="ponytail" d="M-6.5 -51 Q-17 -49 -14 -38 Q-11.5 -44 -6 -45.5 Z" fill="#5b3415"/>
        <circle cx="0" cy="-46" r="8.6" fill="#f2c094"/>
        <path d="M-8.8 -46.5 Q-8 -56.5 0.5 -56 Q8.5 -55.5 8.8 -48.5 Q4.5 -52 -0.5 -50.8 Q-4.8 -49.8 -8.8 -44.5 Z" fill="#5b3415"/>
        <circle cx="-6.6" cy="-51.8" r="2.2" fill="#e11d48"/>
        <g class="eyes">
          <ellipse cx="2.6" cy="-46.6" rx="1.05" ry="1.5" fill="#1e293b"/>
          <ellipse cx="6.2" cy="-46.6" rx="1.05" ry="1.5" fill="#1e293b"/>
        </g>
        <circle cx="0.6" cy="-43.4" r="1.5" fill="#fb7185" opacity="0.45"/>
        <ellipse class="mouth" cx="4.8" cy="-42.2" rx="1.6" ry="0.9" fill="#7f1d1d"/>
      </g>
    </g>
  </g>`;
}

function drawVera() {
  return `
  <g class="char vera">
    <ellipse cx="0" cy="0" rx="12" ry="2.6" fill="#000" opacity="0.3"/>
    <g class="leg leg-b">
      <rect x="-5" y="-21" width="4.6" height="21" rx="1.5" fill="#3f2a1d"/>
      <rect x="-6" y="-7" width="6.4" height="7" rx="1.5" fill="#111"/>
    </g>
    <g class="leg leg-f">
      <rect x="0.4" y="-21" width="4.6" height="21" rx="1.5" fill="#4a3222"/>
      <rect x="0" y="-7" width="7" height="7" rx="1.5" fill="#1a1a1a"/>
    </g>
    <g class="torso">
      <path d="M-9 -43 L-13 -14 L-2 -17 Z" fill="#1e3a8a"/>
      <path d="M-8 -43 Q0 -46 8 -43 L10.5 -18 L-10.5 -18 Z" fill="#1d4ed8"/>
      <path d="M-3 -43 L3 -43 L0 -35 Z" fill="#f8fafc"/>
      <path d="M-3 -43 L0 -35 L0 -18" stroke="#fbbf24" stroke-width="1" fill="none"/>
      <rect x="-9.5" y="-26" width="19" height="3.6" fill="#dc2626"/>
      <circle cx="2.5" cy="-32" r="0.9" fill="#fbbf24"/>
      <circle cx="2.5" cy="-29" r="0.9" fill="#fbbf24"/>
      <path d="M-8 -24 L-15 -6" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="-9.5" y="-25.5" width="3" height="2.5" fill="#a16207"/>
      <g class="arm">
        <path d="M5 -41 Q11.5 -34 9.5 -26" stroke="#1d4ed8" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="9.5" cy="-25" r="2.1" fill="#d9a07a"/>
      </g>
      <g class="head">
        <path d="M-8 -53 Q-13 -41 -9.5 -33 Q-6 -40 -5 -47 Z" fill="#9a3412"/>
        <circle cx="0" cy="-50.5" r="8.6" fill="#d9a07a"/>
        <path d="M-8.6 -51 Q-4 -58.5 4 -57.5 Q7.5 -56.5 8.6 -52 Q2 -54.5 -3 -52.5 Z" fill="#9a3412"/>
        <circle cx="-2" cy="-46" r="1" fill="#fbbf24"/>
        <g class="eyes">
          <ellipse cx="3" cy="-51" rx="1.05" ry="1.5" fill="#1e293b"/>
          <ellipse cx="6.6" cy="-51" rx="1.05" ry="1.5" fill="#1e293b"/>
        </g>
        <path d="M1.6 -53.6 L4.4 -53.2 M5.4 -53.2 L8 -53.8" stroke="#7c2d12" stroke-width="0.7"/>
        <ellipse class="mouth" cx="5" cy="-46.6" rx="1.7" ry="0.9" fill="#7f1d1d"/>
        <path d="M-13.5 -55.5 Q0 -50.5 13.5 -55.5 Q8.5 -67 0 -65 Q-8.5 -67 -13.5 -55.5 Z" fill="#111827"/>
        <path d="M-11.5 -56 Q0 -52 11.5 -56" stroke="#fbbf24" stroke-width="1" fill="none"/>
        <circle cx="0" cy="-60" r="2" fill="#f8fafc"/>
        <rect x="-1.1" y="-58.6" width="2.2" height="0.8" fill="#111827"/>
      </g>
    </g>
  </g>`;
}

function drawBarnaba() {
  return `
  <g class="char barnaba">
    <ellipse cx="0" cy="0" rx="17" ry="3" fill="#000" opacity="0.3"/>
    <g class="leg leg-b">
      <rect x="-10" y="-27" width="8.5" height="27" rx="2.5" fill="#1f2937"/>
      <rect x="-12" y="-4.5" width="11" height="4.5" rx="2" fill="#f8fafc"/>
    </g>
    <g class="leg leg-f">
      <rect x="1.5" y="-27" width="8.5" height="27" rx="2.5" fill="#111827"/>
      <rect x="1" y="-4.5" width="11" height="4.5" rx="2" fill="#e2e8f0"/>
    </g>
    <g class="torso">
      <path d="M-16 -59 Q0 -63 16 -59 L14 -25 L-14 -25 Z" fill="#18181b"/>
      <rect x="-14" y="-28" width="28" height="3.5" fill="#a16207"/>
      <rect x="-2.5" y="-28.3" width="5" height="4" rx="0.8" fill="#facc15"/>
      <path d="M-16 -58 Q-23 -49 -17.5 -38" stroke="#c68a5c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M16 -58 Q23 -49 17.5 -38" stroke="#c68a5c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M-6.5 -60 Q0 -50 6.5 -60" stroke="#facc15" stroke-width="1.4" fill="none"/>
      <circle cx="0" cy="-52" r="1.8" fill="#facc15"/>
      <rect x="-18" y="-43" width="36" height="7.5" rx="3.7" fill="#c68a5c"/>
      <rect x="-16" y="-39" width="32" height="6.5" rx="3.2" fill="#b47a4e"/>
      <rect x="-4.5" y="-65" width="9" height="6" fill="#b47a4e"/>
      <g class="head">
        <circle cx="-10" cy="-70" r="2.3" fill="#b47a4e"/>
        <circle cx="10" cy="-70" r="2.3" fill="#b47a4e"/>
        <ellipse cx="0" cy="-71" rx="10" ry="10.5" fill="#c68a5c"/>
        <path d="M-7.5 -65 Q0 -59.5 7.5 -65 Q6 -61 0 -60.5 Q-6 -61 -7.5 -65 Z" fill="#6b4226" opacity="0.5"/>
        <g class="brows">
          <path d="M-8 -77 L-2 -75.5 M2 -75.5 L8 -77" stroke="#3f2a1d" stroke-width="1.4" stroke-linecap="round"/>
        </g>
        <rect x="-8.5" y="-74.5" width="7.5" height="4" rx="1.3" fill="#0a0a0a"/>
        <rect x="1" y="-74.5" width="7.5" height="4" rx="1.3" fill="#0a0a0a"/>
        <rect x="-1.2" y="-73.5" width="2.4" height="1" fill="#0a0a0a"/>
        <path d="M-7 -73.6 L-4.5 -73.6 M2.5 -73.6 L5 -73.6" stroke="#fff" stroke-width="0.6" opacity="0.6"/>
        <rect class="mouth" x="-3.2" y="-65.6" width="6.4" height="1.4" rx="0.7" fill="#7f1d1d"/>
        <path d="M-4 -80.5 Q0 -82.5 4 -80.5" stroke="#fff" stroke-width="0.8" opacity="0.25" fill="none"/>
      </g>
    </g>
  </g>`;
}

const CHARS = {
  aria: { draw: drawAria, h: 57, portraitVB: '-13 -59 26 26' },
  vera: { draw: drawVera, h: 67, portraitVB: '-15 -68 30 30' },
  barnaba: { draw: drawBarnaba, h: 82, portraitVB: '-14 -84 28 28' }
};

function portraitSVG(key) {
  const c = CHARS[key];
  return `<svg viewBox="${c.portraitVB}" class="portrait" aria-hidden="true">${c.draw()}</svg>`;
}

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
