/* ==========================================================================
   PERSONAGGI SVG ANIMATI
   Tutti i personaggi hanno i piedi in (0,0) e guardano a destra.
   Le classi CSS (torso, eyes, mouth, leg-f, leg-b...) attivano le animazioni.
   ========================================================================== */

/* Aspetto di Aria: colori e accessori comprati nel Negozio dell'Aura. */
const ARIA_TUNIC = {
  teal: ['#0d9488', '#0f766e'], viola: ['#7c3aed', '#6d28d9'], rosso: ['#dc2626', '#b91c1c'],
  oro: ['#d97706', '#b45309'], notte: ['#1e293b', '#0f172a'], rosa: ['#db2777', '#be185d']
};
function ariaLook() {
  return (typeof state !== 'undefined' && state && state.look) || {};
}

function ariaHatSVG(hat) {
  switch (hat) {
    case 'pirata':
      return `<path d="M-11 -53 Q0 -49 11 -53 Q7 -63 0 -61.5 Q-7 -63 -11 -53 Z" fill="#111827"/>
        <path d="M-9.5 -53.5 Q0 -50.4 9.5 -53.5" stroke="#fbbf24" stroke-width="0.9" fill="none"/>
        <circle cx="0" cy="-57" r="1.6" fill="#f8fafc"/>`;
    case 'corona':
      return `<path d="M-6 -54 L-5 -60 L-2 -56.5 L0.5 -61.5 L3 -56.5 L6 -60 L7 -54 Q0.5 -55.6 -6 -54 Z" fill="#fbbf24" stroke="#d97706" stroke-width="0.5"/>
        <circle cx="0.5" cy="-58.4" r="1" fill="#ec4899"/>`;
    case 'cappellino':
      return `<path d="M-8.6 -50 Q-8 -58.6 1 -58.4 Q8.6 -58 8.8 -50.6 Z" fill="#2563eb"/>
        <path d="M5 -50.6 Q12 -50.8 14.5 -48.6 Q9 -48.4 5 -49.2 Z" fill="#1d4ed8"/>
        <circle cx="0.5" cy="-58.2" r="1" fill="#fbbf24"/>`;
    case 'fiore':
      return `<g transform="translate(-6.6 -52)">${[0, 72, 144, 216, 288].map(a =>
        `<ellipse cx="0" cy="-2.2" rx="1.4" ry="2.2" fill="#f472b6" transform="rotate(${a})"/>`).join('')}<circle r="1.2" fill="#fde047"/></g>`;
    case 'cuffie':
      return `<path d="M-8.8 -47 Q-9 -58.5 0 -58.5 Q9 -58.5 8.8 -47" stroke="#111827" stroke-width="1.6" fill="none"/>
        <rect x="-10.4" y="-49.5" width="3.4" height="6" rx="1.4" fill="#ec4899"/>`;
    default:
      return '';
  }
}

function drawAria() {
  const look = ariaLook();
  const [tunic, tunicDark] = ARIA_TUNIC[look.tunic] || ARIA_TUNIC.teal;
  const scarf = look.scarf || '#e11d48';
  const pack = look.pack || '#92400e';
  const clip = look.hat && look.hat !== 'cuffie' && look.hat !== 'fiore' ? '' : `<circle cx="-6.6" cy="-51.8" r="2.2" fill="${scarf}"/>`;
  const glasses = look.glasses
    ? `<rect x="0.6" y="-48.4" width="3.8" height="3" rx="1.2" fill="#0f172a" stroke="${look.glasses}" stroke-width="0.6"/>
       <rect x="4.8" y="-48.4" width="3.6" height="3" rx="1.2" fill="#0f172a" stroke="${look.glasses}" stroke-width="0.6"/>
       <path d="M4.4 -47.2 L4.8 -47.2" stroke="${look.glasses}" stroke-width="0.6"/>`
    : '';
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
      <rect x="-12" y="-37" width="7.5" height="15" rx="2.5" fill="${pack}"/>
      <rect x="-12" y="-31" width="7.5" height="2" fill="#000" opacity="0.2"/>
      <path d="M-6.5 -37 Q0 -40 6.5 -37 L7.5 -17 L-7.5 -17 Z" fill="${tunic}"/>
      <rect x="-7.5" y="-21" width="15" height="3" fill="#78350f"/>
      <circle cx="3" cy="-19.5" r="1.8" fill="#fbbf24" stroke="#92400e" stroke-width="0.5"/>
      <path d="M-5.5 -37.5 L5.5 -37.5 L1.5 -32.5 Z" fill="${scarf}"/>
      <g class="arm">
        <path d="M2.5 -35 Q6.5 -29 5.5 -23" stroke="${tunicDark}" stroke-width="3.6" fill="none" stroke-linecap="round"/>
        <circle cx="5.5" cy="-22.5" r="1.9" fill="#f2c094"/>
      </g>
      <g class="head">
        <path class="ponytail" d="M-6.5 -51 Q-17 -49 -14 -38 Q-11.5 -44 -6 -45.5 Z" fill="#5b3415"/>
        <circle cx="0" cy="-46" r="8.6" fill="#f2c094"/>
        <path d="M-8.8 -46.5 Q-8 -56.5 0.5 -56 Q8.5 -55.5 8.8 -48.5 Q4.5 -52 -0.5 -50.8 Q-4.8 -49.8 -8.8 -44.5 Z" fill="#5b3415"/>
        ${clip}
        <g class="eyes">
          <ellipse cx="2.6" cy="-46.6" rx="1.05" ry="1.5" fill="#1e293b"/>
          <ellipse cx="6.2" cy="-46.6" rx="1.05" ry="1.5" fill="#1e293b"/>
        </g>
        ${glasses}
        <circle cx="0.6" cy="-43.4" r="1.5" fill="#fb7185" opacity="0.45"/>
        <ellipse class="mouth" cx="4.8" cy="-42.2" rx="1.6" ry="0.9" fill="#7f1d1d"/>
        ${ariaHatSVG(look.hat)}
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

/* --------------------------------------------------------------------------
   AREA 3: BIBLIOTECARIO ARCHIMEDE
   -------------------------------------------------------------------------- */
function drawArchimede() {
  const stars = [[-5, -31], [4, -21], [-3, -13], [6, -35], [-7, -20], [1, -9]].map(([x, y]) =>
    `<path d="M${x} ${y - 1.4} L${x + 0.4} ${y - 0.4} L${x + 1.4} ${y} L${x + 0.4} ${y + 0.4} L${x} ${y + 1.4} L${x - 0.4} ${y + 0.4} L${x - 1.4} ${y} L${x - 0.4} ${y - 0.4} Z" fill="#fde68a"/>`).join('');
  return `
  <g class="char archimede">
    <ellipse cx="0" cy="0" rx="13" ry="2.8" fill="#000" opacity="0.3"/>
    <g class="leg leg-b"><rect x="-5" y="-6" width="4" height="6" fill="#1e293b"/><rect x="-6.5" y="-2.6" width="6" height="2.6" rx="1" fill="#451a03"/></g>
    <g class="leg leg-f"><rect x="0.5" y="-6" width="4" height="6" fill="#1e293b"/><rect x="0" y="-2.6" width="6.5" height="2.6" rx="1" fill="#5b3415"/></g>
    <g class="torso">
      <path d="M-7.5 -43 Q0 -46 7.5 -43 L12 -4 L-12 -4 Z" fill="#1e3a8a"/>
      <path d="M-12 -4 L12 -4 L11.6 -7.5 L-11.6 -7.5 Z" fill="#fbbf24"/>
      <path d="M-2 -43 L0 -4" stroke="#172554" stroke-width="1"/>
      ${stars}
      <path d="M-9 -26 Q0 -23.5 9 -26" stroke="#d6b88a" stroke-width="1.5" fill="none"/>
      <path d="M-4 -25 L-5 -16 M-4 -25 L-2.5 -17" stroke="#d6b88a" stroke-width="1" fill="none"/>
      <g class="arm">
        <path d="M3 -41 Q10.5 -35 9 -27" stroke="#1e40af" stroke-width="4.6" fill="none" stroke-linecap="round"/>
        <line x1="10.5" y1="-28.5" x2="13.5" y2="-33" stroke="#78350f" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="15" cy="-35.5" r="3.6" fill="#bae6fd" fill-opacity="0.55" stroke="#b45309" stroke-width="1.3"/>
        <path d="M13.6 -37 Q14.6 -38 16 -37.6" stroke="#fff" stroke-width="0.7" fill="none" opacity="0.8"/>
        <circle cx="9.5" cy="-26.5" r="2.2" fill="#f1c9a5"/>
      </g>
      <g class="head">
        <path d="M-8.6 -55 Q-12.5 -51 -9.5 -45.5 Q-7.5 -49.5 -6 -52.5 Z" fill="#f1f5f9"/>
        <circle cx="0" cy="-52" r="8.6" fill="#f1c9a5"/>
        <circle cx="-1.8" cy="-51.5" r="1.9" fill="#e5b48c"/>
        <path d="M-2.4 -47.6 Q3 -45 9 -48 Q10 -40 5.8 -32.5 Q3.4 -29 1.2 -32.6 Q-2.8 -39 -2.4 -47.6 Z" fill="#f8fafc"/>
        <path d="M2.4 -47.9 Q5.8 -49.8 9.2 -47.9 Q5.8 -46.8 2.4 -47.9 Z" fill="#e2e8f0"/>
        <ellipse class="mouth" cx="5.8" cy="-46.4" rx="1.3" ry="0.7" fill="#7f1d1d"/>
        ${eyesSVG(-53)}
        <circle cx="2.8" cy="-53" r="2.3" fill="none" stroke="#b45309" stroke-width="0.7"/>
        <circle cx="6.6" cy="-53" r="2.3" fill="none" stroke="#b45309" stroke-width="0.7"/>
        <path d="M5 -53.2 L4.4 -53.2" stroke="#b45309" stroke-width="0.7"/>
        <path d="M1 -56.4 L4.4 -56.8 M5.2 -56.8 L8.6 -56.2" stroke="#f8fafc" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M-8.4 -56 Q0 -67.5 8.4 -56 Q0 -59.4 -8.4 -56 Z" fill="#1e3a8a"/>
        <path d="M0 -62.4 Q3 -63 4.6 -60" stroke="#fbbf24" stroke-width="0.9" fill="none"/>
        <circle cx="4.8" cy="-59.4" r="1.1" fill="#fbbf24"/>
      </g>
    </g>
  </g>`;
}

/* --------------------------------------------------------------------------
   AREA 3: TERMINALE DELL'ASCENSORE (macchina con viso sullo schermo)
   -------------------------------------------------------------------------- */
function drawTerminal() {
  const keys = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      keys.push(`<rect x="${-9 + c * 4.8}" y="${-33 + r * 3.6}" width="3.6" height="2.6" rx="0.6" fill="${r === 2 && c === 3 ? '#22c55e' : '#94a3b8'}"/>`);
    }
  }
  return `
  <g class="char terminal">
    <ellipse cx="0" cy="0" rx="16" ry="3" fill="#000" opacity="0.3"/>
    <rect x="-11" y="-14" width="22" height="14" rx="2" fill="#334155"/>
    <rect x="-14" y="-3" width="28" height="3" rx="1" fill="#1e293b"/>
    <path d="M14 -8 Q24 -8 30 -20" stroke="#0f172a" stroke-width="2" fill="none"/>
    <g class="torso">
      <line x1="-8" y1="-66" x2="-11" y2="-76" stroke="#94a3b8" stroke-width="1.2"/>
      <circle class="led-blink" cx="-11" cy="-77" r="1.8" fill="#ef4444"/>
      <rect x="-16" y="-66" width="32" height="53" rx="4" fill="#475569" stroke="#94a3b8" stroke-width="1.4"/>
      <rect x="-16" y="-66" width="32" height="4" rx="2" fill="#64748b"/>
      <rect x="-12.5" y="-60" width="25" height="20" rx="2.5" fill="#022c22" stroke="#0f172a" stroke-width="1.2"/>
      <path d="M-12.5 -55 L12.5 -55 M-12.5 -50 L12.5 -50 M-12.5 -45 L12.5 -45" stroke="#065f46" stroke-width="0.4" opacity="0.6"/>
      <g class="head">
        <g class="eyes">
          <rect x="-7.5" y="-56" width="4.6" height="5.4" rx="0.8" fill="#4ade80"/>
          <rect x="2.9" y="-56" width="4.6" height="5.4" rx="0.8" fill="#4ade80"/>
        </g>
        <rect class="mouth" x="-5.5" y="-46" width="11" height="1.8" rx="0.6" fill="#4ade80"/>
      </g>
      ${keys.join('')}
      <circle cx="10.5" cy="-17.5" r="1.6" fill="#facc15"/>
      <rect x="-12" y="-19" width="16" height="3" rx="1" fill="#1e293b"/>
      <circle cx="-13" cy="-62" r="0.8" fill="#cbd5e1"/><circle cx="13" cy="-62" r="0.8" fill="#cbd5e1"/>
      <circle cx="-13" cy="-16" r="0.8" fill="#cbd5e1"/><circle cx="13" cy="-16" r="0.8" fill="#cbd5e1"/>
    </g>
  </g>`;
}

/* --------------------------------------------------------------------------
   AREA 4: MADAME ZERI
   -------------------------------------------------------------------------- */
function drawZeri() {
  const skin = '#e8b49a';
  const pearls = [-5, -2.5, 0, 2.5, 5].map((x, i) =>
    `<circle cx="${x}" cy="${-37.6 + Math.abs(i - 2) * -0.5}" r="0.85" fill="#fff"/>`).join('');
  return `
  <g class="char zeri">
    <ellipse cx="0" cy="0" rx="12" ry="2.6" fill="#000" opacity="0.3"/>
    <g class="leg leg-b"><rect x="-3.6" y="-10" width="2.6" height="10" rx="1.2" fill="${skin}"/><path d="M-5 0 L-1 0 L-1 -2.4 L-4 -2.4 Z" fill="#be185d"/></g>
    <g class="leg leg-f"><rect x="1" y="-10" width="2.6" height="10" rx="1.2" fill="${skin}"/><path d="M0.4 0 L5.4 0 L4.4 -2.6 L1 -2.6 Z" fill="#db2777"/></g>
    <g class="torso">
      <path d="M-6 -39 Q0 -42 6 -39 L8 -28 L13.5 -8 L-13.5 -8 L-8 -28 Z" fill="#ec4899"/>
      <path d="M-8 -28 L-13.5 -8 L-9 -8 Z" fill="#db2777"/>
      <rect x="-8.2" y="-29.4" width="16.4" height="2.6" fill="#fbbf24"/>
      <rect x="-1.4" y="-29.8" width="2.8" height="3.4" rx="0.6" fill="#fde68a"/>
      <path d="M-8.4 -39.6 Q0 -33 8.4 -39.6 Q9.6 -36 7.4 -34 Q0 -29.6 -7.4 -34 Q-9.6 -36 -8.4 -39.6 Z" fill="#fdf2f8"/>
      ${pearls}
      <g class="arm">
        <path d="M4 -37 Q10 -31 7.5 -25" stroke="#ec4899" stroke-width="3.2" fill="none" stroke-linecap="round"/>
        <circle cx="7.5" cy="-24.5" r="1.9" fill="${skin}"/>
        <path d="M8.5 -26 L14 -31 M8.8 -25 L15 -28 M8.6 -24 L14.8 -24.6" stroke="#fbcfe8" stroke-width="1.6" stroke-linecap="round"/>
      </g>
      <g class="head">
        <path d="M-11 -50 Q-13.5 -63 0 -63 Q13 -63 11 -51 Q12 -42 7 -40 L-8 -40 Q-13.5 -43 -11 -50 Z" fill="#111827"/>
        <circle cx="0" cy="-50" r="8.2" fill="${skin}"/>
        <path d="M-8.6 -51.5 Q-4 -60.5 6 -58.4 Q9.4 -56.4 8.6 -53.2 Q2.6 -56.4 -2.6 -53.6 Q-6 -51.6 -8.6 -48 Z" fill="#111827"/>
        <circle cx="-1.6" cy="-46" r="1.5" fill="none" stroke="#fbbf24" stroke-width="0.7"/>
        <g class="brows"><path d="M0.8 -55.4 L4.6 -55.8 M5.6 -55.8 L9 -55" stroke="#111827" stroke-width="0.9" stroke-linecap="round"/></g>
        <rect x="0.4" y="-53.6" width="4.4" height="3.4" rx="1.5" fill="#0f172a" stroke="#f472b6" stroke-width="0.7"/>
        <rect x="5.4" y="-53.6" width="4" height="3.4" rx="1.5" fill="#0f172a" stroke="#f472b6" stroke-width="0.7"/>
        <path d="M4.8 -52.4 L5.4 -52.4" stroke="#f472b6" stroke-width="0.7"/>
        <path d="M1.2 -52.8 L2.6 -51.2 M6 -52.8 L7.2 -51.4" stroke="#fff" stroke-width="0.5" opacity="0.7"/>
        <circle cx="4" cy="-47.8" r="1.4" fill="#fb7185" opacity="0.4"/>
        <ellipse class="mouth" cx="5.6" cy="-45.4" rx="1.6" ry="0.85" fill="#be123c"/>
        <circle cx="7.4" cy="-47.6" r="0.35" fill="#3f2a1d"/>
      </g>
    </g>
  </g>`;
}

/* --------------------------------------------------------------------------
   AREA 4: PIANTA CARNIVORA GIGANTE (di fronte, fauci animate)
   -------------------------------------------------------------------------- */
function drawPlant() {
  const upTeeth = [];
  const lowTeeth = [];
  for (let x = -14; x <= 10; x += 4.8) {
    upTeeth.push(`${x},-88 ${x + 2.2},-83.5 ${x + 4.4},-88`);
    lowTeeth.push(`${x + 1},-87.6 ${x + 3.2},-92 ${x + 5.4},-87.6`);
  }
  const spots = [[-9, -96], [-2, -99], [6, -97], [11, -93], [-12, -91]].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="1.6" fill="#fbcfe8" opacity="0.75"/>`).join('');
  return `
  <g class="char plant">
    <ellipse cx="0" cy="0" rx="18" ry="3" fill="#000" opacity="0.3"/>
    <path d="M-15 -18 L15 -18 L11 0 L-11 0 Z" fill="#c2410c"/>
    <rect x="-17.5" y="-23" width="35" height="6" rx="1.8" fill="#ea580c"/>
    <path d="M-12 -12 Q0 -9 12 -12" stroke="#9a3412" stroke-width="1" fill="none"/>
    <ellipse cx="0" cy="-22.5" rx="15" ry="2" fill="#3f2a1d"/>
    <g class="torso">
      <path d="M0 -21 C-10 -40 10 -58 0 -80" stroke="#15803d" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M-1 -38 Q-19 -45 -21 -32 Q-10 -29.5 -1 -35.5 Z" fill="#22c55e"/>
      <path d="M-1 -38 Q-12 -37.5 -19 -33.5" stroke="#15803d" stroke-width="0.8" fill="none"/>
      <path d="M2.5 -56 Q19 -63 22 -50.5 Q11.5 -47 2.5 -53 Z" fill="#16a34a"/>
      <path d="M2.5 -56 Q13 -55 20 -51.5" stroke="#15803d" stroke-width="0.8" fill="none"/>
      <path d="M-3 -26 Q-12 -24 -15 -19" stroke="#15803d" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <g class="head">
        <g class="jaw-low">
          <path d="M-17 -88 Q0 -64 17 -88 Z" fill="#9d174d"/>
          <path d="M-12 -87.6 Q0 -74 12 -87.6 Z" fill="#831843"/>
          <path d="M-5 -82 Q0 -78 5 -82 Q0 -84 -5 -82 Z" fill="#f472b6"/>
          ${lowTeeth.map(p => `<polygon points="${p}" fill="#fefce8"/>`).join('')}
        </g>
        <g class="jaw-up">
          <path d="M-18 -88 Q0 -117 18 -88 Z" fill="#be185d"/>
          ${spots}
          ${upTeeth.map(p => `<polygon points="${p}" fill="#fefce8"/>`).join('')}
        </g>
        <g class="eyes">
          <circle cx="-6.5" cy="-104" r="4.2" fill="#fef08a" stroke="#9d174d" stroke-width="0.8"/>
          <circle cx="6.5" cy="-104" r="4.2" fill="#fef08a" stroke="#9d174d" stroke-width="0.8"/>
          <ellipse cx="-6" cy="-104" rx="1" ry="2.8" fill="#111"/>
          <ellipse cx="7" cy="-104" rx="1" ry="2.8" fill="#111"/>
        </g>
        <path d="M-11 -108.5 L-3.5 -106.5 M3.5 -106.5 L11 -108.5" stroke="#831843" stroke-width="1.6" stroke-linecap="round"/>
      </g>
    </g>
  </g>`;
}

/* --------------------------------------------------------------------------
   AREA 5: GEMELLE MIRA E NORA (stessi occhialoni, tute di colore diverso)
   -------------------------------------------------------------------------- */
function mechanicGirl({ overall, skin, hairBack, hairFront, tool }) {
  return `
    ${legsSVG({ len: 17, color: overall, shoe: '#292524' })}
    <g class="torso">
      <path d="M-6.5 -35 Q0 -38 6.5 -35 L7 -17 L-7 -17 Z" fill="#f8fafc"/>
      <path d="M-5 -30 L5 -30 L7 -17 L-7 -17 Z" fill="${overall}"/>
      <path d="M-4.6 -30 L-4 -36 M4.6 -30 L4 -36" stroke="${overall}" stroke-width="1.4"/>
      <circle cx="-3.6" cy="-29" r="0.8" fill="#fbbf24"/><circle cx="3.6" cy="-29" r="0.8" fill="#fbbf24"/>
      <rect x="-3" y="-25" width="6" height="4" rx="0.8" fill="#000" opacity="0.18"/>
      <path d="M-6 -31 Q-8 -24 -6.5 -19" stroke="#fde68a" stroke-width="0.6" fill="none" opacity="0.6"/>
      <g class="arm">
        <path d="M3 -33 Q8.5 -27 7 -21" stroke="#f8fafc" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        ${tool}
        <circle cx="7" cy="-20.5" r="1.9" fill="${skin}"/>
      </g>
      <g class="head">
        ${hairBack}
        <circle cx="0" cy="-44" r="8.2" fill="${skin}"/>
        ${hairFront}
        ${eyesSVG(-44.6)}
        <circle cx="1.6" cy="-41.6" r="0.4" fill="#92400e"/><circle cx="3" cy="-41" r="0.4" fill="#92400e"/><circle cx="7.6" cy="-41.4" r="0.4" fill="#92400e"/>
        <ellipse class="mouth" cx="4.9" cy="-40.2" rx="1.5" ry="0.85" fill="#7f1d1d"/>
        <path d="M-8.2 -49.6 Q0 -52.4 8.6 -49.4" stroke="#78350f" stroke-width="1.7" fill="none"/>
        <circle cx="2.3" cy="-50.6" r="2.5" fill="#22d3ee" stroke="#b45309" stroke-width="1.1"/>
        <circle cx="7.1" cy="-50.3" r="2.5" fill="#22d3ee" stroke="#b45309" stroke-width="1.1"/>
        <path d="M1.4 -51.6 L2.6 -50.4 M6.2 -51.3 L7.4 -50.1" stroke="#fff" stroke-width="0.6" opacity="0.8"/>
      </g>
    </g>`;
}

function drawGemelle() {
  const mira = mechanicGirl({
    overall: '#0284c7',
    skin: '#f2c094',
    hairBack: '<path d="M-9.2 -45 Q-9.6 -54.6 0 -54.6 Q9.2 -54.6 9.2 -46 L8.4 -39.6 L-9.6 -38 Z" fill="#111827"/>',
    hairFront: '<path d="M-8.6 -46 Q-7 -54 1 -53.6 Q8 -53 8.8 -47.6 Q5 -50 0 -49.6 Q-5 -49 -8.6 -44 Z" fill="#111827"/>',
    tool: '<path d="M7.4 -21 L12.4 -30.4" stroke="#94a3b8" stroke-width="1.7" stroke-linecap="round"/><path d="M11 -31.6 A2 2 0 1 1 14 -29.4" stroke="#94a3b8" stroke-width="1.5" fill="none"/>'
  });
  const nora = mechanicGirl({
    overall: '#7c3aed',
    skin: '#e8b48c',
    hairBack: '<circle cx="-6" cy="-54" r="3.6" fill="#ea580c"/><circle cx="5" cy="-55" r="3.4" fill="#ea580c"/><path d="M-9 -46 Q-11 -40 -8 -37 Q-6 -41 -6.6 -45 Z" fill="#ea580c"/>',
    hairFront: '<path d="M-8.6 -46 Q-6 -54.6 1.6 -53.8 Q8.4 -53 8.8 -47.6 Q6 -49.4 3 -48.4 Q1 -50.4 -2 -49 Q-5 -49.6 -8.6 -44 Z" fill="#ea580c"/>',
    tool: '<rect x="6.6" y="-29.6" width="2.2" height="9" rx="0.8" fill="#facc15"/><rect x="5.8" y="-31.6" width="3.8" height="2.6" rx="0.6" fill="#64748b"/>'
  });
  return `
  <g class="char gemelle">
    <ellipse cx="0" cy="0" rx="22" ry="3" fill="#000" opacity="0.3"/>
    <g transform="translate(10 -1)">${nora}</g>
    <g transform="translate(-9 0)">${mira}</g>
  </g>`;
}

/* --------------------------------------------------------------------------
   AREA 5: AUTOMA DEL CANCELLO (robot a caldaia, di fronte)
   -------------------------------------------------------------------------- */
function drawAutoma() {
  const rivets = [[-15, -59], [15, -59], [-15, -27], [15, -27], [-15, -43], [15, -43]].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="0.9" fill="#fde68a"/>`).join('');
  return `
  <g class="char automa">
    <ellipse cx="0" cy="0" rx="21" ry="3.2" fill="#000" opacity="0.3"/>
    <g class="leg leg-b">
      <rect x="-12" y="-26" width="7" height="23" rx="2" fill="#52525b"/>
      <rect x="-11.5" y="-17" width="6" height="3" fill="#a1a1aa"/>
      <rect x="-14.5" y="-4.5" width="12" height="4.5" rx="1.5" fill="#3f3f46"/>
    </g>
    <g class="leg leg-f">
      <rect x="5" y="-26" width="7" height="23" rx="2" fill="#52525b"/>
      <rect x="5.5" y="-17" width="6" height="3" fill="#a1a1aa"/>
      <rect x="2.5" y="-4.5" width="12" height="4.5" rx="1.5" fill="#3f3f46"/>
    </g>
    <g class="torso">
      <path d="M-18 -56 Q-27 -46 -24 -33" stroke="#71717a" stroke-width="6.5" fill="none" stroke-linecap="round"/>
      <path d="M18 -56 Q27 -46 24 -33" stroke="#71717a" stroke-width="6.5" fill="none" stroke-linecap="round"/>
      <circle cx="-19" cy="-55" r="3.4" fill="#b45309"/><circle cx="19" cy="-55" r="3.4" fill="#b45309"/>
      <path d="M-27.5 -33 L-24 -27 L-20.5 -33" stroke="#a1a1aa" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M20.5 -33 L24 -27 L27.5 -33" stroke="#a1a1aa" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <rect x="12.5" y="-74" width="6" height="14" fill="#3f3f46"/>
      <rect x="11.5" y="-75.5" width="8" height="2.5" fill="#52525b"/>
      <circle class="steam" cx="15.5" cy="-78" r="3" fill="#e5e7eb"/>
      <circle class="steam" cx="15.5" cy="-78" r="3" fill="#e5e7eb" style="animation-delay:-0.8s"/>
      <circle class="steam" cx="15.5" cy="-78" r="3" fill="#e5e7eb" style="animation-delay:-1.6s"/>
      <rect x="-18" y="-62" width="36" height="38" rx="9" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>
      <rect x="-18" y="-52" width="36" height="2.4" fill="#78350f"/>
      <rect x="-18" y="-35" width="36" height="2.4" fill="#78350f"/>
      ${rivets}
      <circle cx="0" cy="-42.5" r="6.8" fill="#1c1917" stroke="#78350f" stroke-width="1.4"/>
      <circle class="flicker" cx="0" cy="-42.5" r="5" fill="#f97316"/>
      <circle class="flicker" cx="0" cy="-41.5" r="2.6" fill="#fde047" style="animation-delay:-1s"/>
      <circle cx="10" cy="-57" r="3.2" fill="#fef3c7" stroke="#78350f" stroke-width="0.9"/>
      <line class="needle" x1="10" y1="-57" x2="11.9" y2="-59" stroke="#dc2626" stroke-width="0.8"/>
      <rect x="-4.5" y="-67" width="9" height="6" fill="#52525b"/>
      <g class="head">
        <rect x="-12" y="-82" width="24" height="17" rx="4" fill="#64748b" stroke="#334155" stroke-width="1.2"/>
        <circle cx="-13" cy="-73.5" r="1.8" fill="#a1a1aa"/><circle cx="13" cy="-73.5" r="1.8" fill="#a1a1aa"/>
        <g class="eyes">
          <circle cx="-5" cy="-75" r="3.2" fill="#ef4444"/>
          <circle cx="5" cy="-75" r="3.2" fill="#ef4444"/>
          <circle cx="-5.8" cy="-75.8" r="1.1" fill="#fecaca"/>
          <circle cx="4.2" cy="-75.8" r="1.1" fill="#fecaca"/>
        </g>
        <rect class="mouth" x="-5.5" y="-69.6" width="11" height="2.4" rx="0.8" fill="#1e293b"/>
        <path d="M-3 -69.6 L-3 -67.2 M0 -69.6 L0 -67.2 M3 -69.6 L3 -67.2" stroke="#64748b" stroke-width="0.6"/>
      </g>
    </g>
  </g>`;
}

/* --------------------------------------------------------------------------
   AREA 6: LAVINIA, LA RIVALESSA
   -------------------------------------------------------------------------- */
function drawLavinia() {
  const skin = '#f5d0b5';
  return `
  <g class="char lavinia">
    <ellipse cx="0" cy="0" rx="12" ry="2.6" fill="#000" opacity="0.3"/>
    ${legsSVG({ len: 17, color: '#581c87', color2: '#6b21a8', shoe: '#f8fafc', shoeH: 6 })}
    <g class="torso">
      <path class="hair-sway" d="M-7 -53 Q-13 -40 -14 -26 Q-10 -29 -8 -26 Q-7 -36 -4.5 -45 Z" fill="#7e22ce"/>
      <path d="M-7.6 -24 L7.6 -24 L11 -14.5 L-11 -14.5 Z" fill="#7e22ce"/>
      <path d="M-4 -24 L-5 -14.5 M2 -24 L2.6 -14.5" stroke="#6b21a8" stroke-width="0.8"/>
      <path d="M-6.5 -38 Q0 -41 6.5 -38 L7.4 -23 L-7.4 -23 Z" fill="#ec4899"/>
      <path d="M-3.4 -38.6 L0 -34 L3.4 -38.6" stroke="#fdf2f8" stroke-width="1.6" fill="none"/>
      <rect x="-8" y="-33" width="16" height="4.4" rx="2.2" fill="#ec4899"/>
      <rect x="-6.6" y="-30.2" width="14" height="3.8" rx="1.9" fill="#db2777"/>
      <circle cx="-7.4" cy="-28.4" r="1.7" fill="${skin}"/>
      <circle cx="8" cy="-31" r="1.7" fill="${skin}"/>
      <path d="M-1 -36 L0.4 -33.6 L-2 -34.6 Z" fill="#fde68a"/>
      <g class="head">
        <path d="M-9 -52 Q-11 -60 0 -60 Q10 -60 9.6 -51 Q7 -55 0 -55 Q-6 -55 -9 -49 Z" fill="#7e22ce"/>
        <circle cx="0" cy="-51" r="8.4" fill="${skin}"/>
        <path d="M-8.8 -51.6 Q-5 -60.8 3.6 -59.4 Q9.6 -58.2 8.8 -52.6 Q5 -56.6 0.6 -54.4 Q-3.6 -52.6 -8.8 -48 Z" fill="#7e22ce"/>
        ${eyesSVG(-51.6)}
        <path d="M1.6 -53.6 L1 -54.8 M7.6 -53.6 L8.4 -54.6" stroke="#1e293b" stroke-width="0.6"/>
        <path d="M1.2 -55.6 Q3 -56.6 4.6 -55.8 M5.6 -55.8 Q7.2 -56.6 8.8 -55.4" stroke="#581c87" stroke-width="0.9" fill="none"/>
        <circle cx="3.6" cy="-48.4" r="1.4" fill="#f472b6" opacity="0.5"/>
        <path class="mouth" d="M3.4 -46.8 Q6 -45 8.4 -47.4" stroke="#be185d" stroke-width="1.1" fill="none" stroke-linecap="round"/>
        <path d="M-5.4 -58.4 L-3.4 -62.4 L-0.6 -59.6 L2.4 -64 L5 -59.6 L7.6 -62 L8.2 -57.6 Q1.4 -60.4 -5.4 -58.4 Z" fill="#fbbf24" stroke="#d97706" stroke-width="0.5"/>
        <circle cx="2.4" cy="-61" r="1.2" fill="#ec4899"/>
      </g>
    </g>
  </g>`;
}

const CHARS = {
  aria: { draw: drawAria, h: 57, portraitVB: '-14 -63 30 30' },
  vera: { draw: drawVera, h: 67, portraitVB: '-15 -68 30 30' },
  barnaba: { draw: drawBarnaba, h: 82, portraitVB: '-14 -84 28 28' },
  oste: { draw: drawOste, h: 61, portraitVB: '-12 -64 28 28' },
  gemelli: { draw: drawGemelli, h: 56, portraitVB: '-21 -60 40 40' },
  archimede: { draw: drawArchimede, h: 66, portraitVB: '-13 -67 30 30' },
  terminal: { draw: drawTerminal, h: 79, portraitVB: '-18 -70 36 36' },
  zeri: { draw: drawZeri, h: 64, portraitVB: '-12 -65 28 28' },
  plant: { draw: drawPlant, h: 110, portraitVB: '-22 -114 44 44' },
  gemelle: { draw: drawGemelle, h: 56, portraitVB: '-21 -60 40 40' },
  automa: { draw: drawAutoma, h: 84, portraitVB: '-17 -88 34 34' },
  lavinia: { draw: drawLavinia, h: 65, portraitVB: '-12 -66 28 28' }
};

function portraitSVG(key) {
  const c = CHARS[key];
  return `<svg viewBox="${c.portraitVB}" class="portrait" aria-hidden="true">${c.draw()}</svg>`;
}

