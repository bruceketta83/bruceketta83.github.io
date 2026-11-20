/* ==========================================================================
   PERSONAGGI SVG ANIMATI
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

/* --------------------------------------------------------------------------
   AIUTI COMUNI
   -------------------------------------------------------------------------- */
function legsSVG({ len = 19, color = '#1f2937', color2, shoe = '#1c1917', shoeH = 3.2 } = {}) {
  return `
    <g class="leg leg-b">
      <rect x="-4.5" y="${-len}" width="4.2" height="${len}" rx="1.6" fill="${color}"/>
      <rect x="-5.5" y="${-shoeH}" width="6.5" height="${shoeH}" rx="1.2" fill="${shoe}"/>
    </g>
    <g class="leg leg-f">
      <rect x="0.3" y="${-len}" width="4.2" height="${len}" rx="1.6" fill="${color2 || color}"/>
      <rect x="-0.2" y="${-shoeH}" width="7" height="${shoeH}" rx="1.2" fill="${shoe}"/>
    </g>`;
}

function eyesSVG(y, color = '#1e293b') {
  return `<g class="eyes">
    <ellipse cx="2.8" cy="${y}" rx="1.05" ry="1.5" fill="${color}"/>
    <ellipse cx="6.4" cy="${y}" rx="1.05" ry="1.5" fill="${color}"/>
  </g>`;
}

/* --------------------------------------------------------------------------
   AREA 2: OSTE BARTOLOMEO
   -------------------------------------------------------------------------- */
function drawOste() {
  return `
  <g class="char oste">
    <ellipse cx="0" cy="0" rx="13" ry="2.8" fill="#000" opacity="0.3"/>
    ${legsSVG({ len: 16, color: '#3f2a1d', color2: '#4a3222' })}
    <g class="torso">
      <path d="M-12 -42 Q0 -47 12 -42 Q17 -28 12 -14 L-12 -14 Q-17 -28 -12 -42 Z" fill="#e7e5e4"/>
      <path d="M-12 -42 Q-8 -44 -5 -44 L-6 -14 L-12 -14 Q-16.5 -28 -12 -42 Z" fill="#7f1d1d"/>
      <path d="M12 -42 Q8 -44 5 -44 L6 -14 L12 -14 Q16.5 -28 12 -42 Z" fill="#7f1d1d"/>
      <path d="M-8.5 -31 L8.5 -31 L10.5 -13 L-10.5 -13 Z" fill="#fafaf9" stroke="#d6d3d1" stroke-width="0.6"/>
      <path d="M-8 -31 L-5 -43 M8 -31 L5 -43" stroke="#d6d3d1" stroke-width="1.1"/>
      <rect x="-3" y="-26" width="6" height="4" rx="1" fill="#e7e5e4" stroke="#d6d3d1" stroke-width="0.5"/>
      <path d="M-12.5 -42 L-8 -43.5 L-8.6 -29 L-13 -30 Z" fill="#fef3c7"/>
      <path d="M-12.7 -38 L-8.3 -39 M-12.9 -34 L-8.4 -35" stroke="#dc2626" stroke-width="0.9"/>
      <g class="arm">
        <path d="M7 -40 Q14.5 -34 12.5 -26" stroke="#e7e5e4" stroke-width="4.6" fill="none" stroke-linecap="round"/>
        <rect x="11" y="-34" width="8.5" height="9.5" rx="1.3" fill="#d97706" stroke="#92400e" stroke-width="0.6"/>
        <path d="M19.5 -32 q3.2 0 3.2 3 q0 3 -3.2 3" stroke="#92400e" stroke-width="1.3" fill="none"/>
        <path d="M10.6 -34.3 q2 -2.8 4.6 -1.2 q2.2 -2.2 4.7 0.6 Z" fill="#fffbeb"/>
        <circle cx="12.3" cy="-26.3" r="2.5" fill="#f1c27d"/>
      </g>
      <g class="head">
        <circle cx="0" cy="-51" r="9.6" fill="#f1c27d"/>
        <path d="M-9.6 -51 Q-10.3 -57 -6 -58.3 L-5.6 -53 Q-8 -51 -7.6 -46.5 Z" fill="#9ca3af"/>
        <circle cx="-1.5" cy="-50.5" r="2.1" fill="#e0a96d"/>
        <path d="M-4 -59.5 Q1 -61.6 6 -59.6" stroke="#fffbeb" stroke-width="0.9" opacity="0.55" fill="none"/>
        ${eyesSVG(-52)}
        <path d="M1.3 -55.4 L4.4 -56 M5.4 -56 L8.4 -55.4" stroke="#6b7280" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="9.2" cy="-49.8" r="1.9" fill="#e0a96d"/>
        <circle cx="3.8" cy="-47.8" r="1.7" fill="#fb7185" opacity="0.45"/>
        <ellipse class="mouth" cx="6.4" cy="-45" rx="1.7" ry="0.9" fill="#7f1d1d"/>
        <path d="M2.6 -47.6 Q6.4 -49.6 10.4 -47.6 Q12 -45.6 12.6 -47.2 Q11.6 -44.4 9.4 -45.8 Q6.4 -46.8 3.8 -45.8 Q1.6 -44.6 1.2 -46.4 Z" fill="#6b4226"/>
      </g>
    </g>
  </g>`;
}

/* --------------------------------------------------------------------------
   AREA 2: PIRATI GEMELLI (due pirati uguali, bende su occhi opposti)
   -------------------------------------------------------------------------- */
function pirateTwin(color, patchFront) {
  const skin = '#e0ac69';
  const eye = patchFront ? 2.8 : 6.4;
  const patch = patchFront ? 6.4 : 2.8;
  const dots = [[-4, -51], [1, -52.5], [5.5, -50.8]].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="0.8" fill="#fff" opacity="0.8"/>`).join('');
  return `
    ${legsSVG({ len: 18, color: '#1e293b', shoe: '#0c0a09', shoeH: 5 })}
    <g class="torso">
      <path d="M-7 -36 Q0 -39 7 -36 L8 -17 L-8 -17 Z" fill="#f5f5f4"/>
      <path d="M-7 -36 L-3 -36.6 L-2 -17 L-8 -17 Z" fill="${color}"/>
      <path d="M7 -36 L3 -36.6 L2 -17 L8 -17 Z" fill="${color}"/>
      <rect x="-8" y="-21.5" width="16" height="3.2" fill="#fbbf24"/>
      <path d="M-8 -20 L-11 -14 L-8.5 -14.5 Z" fill="#fbbf24"/>
      <g class="arm">
        <path d="M3 -34 Q8.5 -28 7 -22" stroke="#f5f5f4" stroke-width="3.6" fill="none" stroke-linecap="round"/>
        <rect x="5.4" y="-26" width="4.6" height="4.6" rx="0.9" fill="#fff" stroke="#94a3b8" stroke-width="0.4"/>
        <circle cx="6.7" cy="-24.7" r="0.55" fill="#111"/><circle cx="8.7" cy="-22.7" r="0.55" fill="#111"/>
        <circle cx="7" cy="-21.6" r="1.9" fill="${skin}"/>
      </g>
      <g class="head">
        <circle cx="0" cy="-45" r="8.4" fill="${skin}"/>
        <path d="M-4 -41 Q2 -36 8.3 -42 Q7.5 -38.5 2 -37 Q-3 -37.6 -4 -41 Z" fill="#3f2a1d" opacity="0.28"/>
        <circle cx="-1.6" cy="-44.5" r="1.8" fill="#c68a4d"/>
        <circle cx="-1.6" cy="-41.6" r="1" fill="none" stroke="#fbbf24" stroke-width="0.7"/>
        <g class="eyes"><ellipse cx="${eye}" cy="-45.6" rx="1.05" ry="1.5" fill="#1e293b"/></g>
        <path d="M-7 -49 L${patch + 2} -45.2" stroke="#111" stroke-width="0.6"/>
        <ellipse cx="${patch}" cy="-45.4" rx="1.9" ry="1.7" fill="#111"/>
        <path class="mouth" d="M3.2 -41.2 Q6 -38.6 8.6 -41.4 Z" fill="#7f1d1d"/>
        <path d="M-8.6 -46 Q-8.2 -54.6 0 -54.6 Q8 -54.6 8.6 -47.2 Q0 -49.6 -8.6 -46 Z" fill="${color}"/>
        ${dots}
        <path d="M-8 -48.5 L-14.5 -45.5 L-12.4 -50.4 Z M-8 -48 L-13.4 -41.6 L-10.2 -45 Z" fill="${color}"/>
      </g>
    </g>`;
}

function drawGemelli() {
  return `
  <g class="char gemelli">
    <ellipse cx="0" cy="0" rx="22" ry="3" fill="#000" opacity="0.3"/>
    <g transform="translate(10 -1)">${pirateTwin('#1d4ed8', false)}</g>
    <g transform="translate(-9 0)">${pirateTwin('#be123c', true)}</g>
  </g>`;
}

const CHARS = {
  aria: { draw: drawAria, h: 57, portraitVB: '-13 -59 26 26' },
  vera: { draw: drawVera, h: 67, portraitVB: '-15 -68 30 30' },
  barnaba: { draw: drawBarnaba, h: 82, portraitVB: '-14 -84 28 28' },
  oste: { draw: drawOste, h: 61, portraitVB: '-12 -64 28 28' },
  gemelli: { draw: drawGemelli, h: 56, portraitVB: '-21 -60 40 40' }
};

function portraitSVG(key) {
  const c = CHARS[key];
  return `<svg viewBox="${c.portraitVB}" class="portrait" aria-hidden="true">${c.draw()}</svg>`;
}

