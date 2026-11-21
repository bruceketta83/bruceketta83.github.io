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
      return `<path d="M-11 -53 Q0 -49 11 -53 Q7 -63 0 -61.5 Q-7 -63 -11 -53 Z" fill="#1d1b22" ${ink(0.6)}/>
        <path d="M-9.5 -53.5 Q0 -50.4 9.5 -53.5" stroke="#fbbf24" stroke-width="0.9" fill="none"/>
        <circle cx="0" cy="-57" r="1.6" fill="#f8fafc"/>`;
    case 'corona':
      return `<path d="M-6 -54 L-5 -60 L-2 -56.5 L0.5 -61.5 L3 -56.5 L6 -60 L7 -54 Q0.5 -55.6 -6 -54 Z" fill="#fbbf24" ${ink(0.5)}/>
        <circle cx="0.5" cy="-58.4" r="1" fill="#ec4899"/>`;
    case 'cappellino':
      return `<path d="M-9 -50 Q-8.4 -59 1 -58.8 Q9 -58.4 9.2 -50.6 Z" fill="#2563eb" ${ink(0.6)}/>
        <path d="M5 -50.6 Q12 -50.8 14.5 -48.6 Q9 -48.4 5 -49.2 Z" fill="#1d4ed8" ${ink(0.5)}/>
        <circle cx="0.5" cy="-58.2" r="1" fill="#fbbf24"/>`;
    case 'fiore':
      return `<g transform="translate(-6.6 -52)">${[0, 72, 144, 216, 288].map(a =>
        `<ellipse cx="0" cy="-2.2" rx="1.4" ry="2.2" fill="#f472b6" transform="rotate(${a})"/>`).join('')}<circle r="1.2" fill="#fde047"/></g>`;
    case 'cuffie':
      return `<path d="M-8.8 -47 Q-9 -58.5 0 -58.5 Q9 -58.5 8.8 -47" stroke="#111827" stroke-width="1.6" fill="none"/>
        <rect x="-10.6" y="-49.5" width="3.6" height="6" rx="1.4" fill="#ec4899" ${ink(0.5)}/>`;
    default:
      return '';
  }
}

/* Contorno dei personaggi: blu notte scuro, mai nero puro (stile dei mock-up). */
const INK = '#1c1426';
function ink(w = 0.7) { return `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`; }

function drawAria() {
  const look = ariaLook();
  const [tunic, tunicDark] = ARIA_TUNIC[look.tunic] || ARIA_TUNIC.teal;
  const scarf = look.scarf || '#e11d48';
  const pack = look.pack || '#92400e';
  const skin = '#f6c9a0', hair = '#6b3a1c', hairL = '#8f5630';
  const clip = look.hat && look.hat !== 'cuffie' && look.hat !== 'fiore' ? '' : `<circle cx="-6.4" cy="-52.4" r="2" fill="${scarf}" ${ink(0.5)}/>`;
  const glasses = look.glasses
    ? `<rect x="0.6" y="-48.4" width="3.8" height="3" rx="1.2" fill="#0f172a" stroke="${look.glasses}" stroke-width="0.7"/>
       <rect x="4.8" y="-48.4" width="3.6" height="3" rx="1.2" fill="#0f172a" stroke="${look.glasses}" stroke-width="0.7"/>
       <path d="M4.4 -47.2 L4.8 -47.2" stroke="${look.glasses}" stroke-width="0.6"/>`
    : '';
  return `
  <g class="char aria">
    <ellipse cx="0" cy="0.3" rx="11" ry="2.6" fill="#000" opacity="0.3"/>
    <g class="leg leg-b">
      <path d="M-4.8 -17 L-0.6 -17 L-0.8 -2.6 L-4.6 -2.6 Z" fill="#3a5aa8" ${ink(0.6)}/>
      <path d="M-6.6 -3.4 Q-6.8 0 -3 0 L0 0 Q0.4 -2.2 -0.8 -3.4 Z" fill="#5c3518" ${ink(0.6)}/>
    </g>
    <g class="leg leg-f">
      <path d="M0.2 -17 L4.6 -17 L4.4 -2.6 L0.6 -2.6 Z" fill="#4c72c4" ${ink(0.6)}/>
      <path d="M1.4 -15 L1.6 -5" stroke="#3a5aa8" stroke-width="0.6"/>
      <path d="M0 -3.4 Q-0.2 0 3.4 0 L7.6 0 Q8 -2.4 4.6 -3.4 Z" fill="#7a4524" ${ink(0.6)}/>
    </g>
    <g class="torso">
      <path d="M-5.6 -38.4 Q-13.6 -38.6 -13.6 -31 L-13.2 -22.4 Q-12.8 -19.6 -9 -19.8 L-5.6 -20.2 Z" fill="${pack}" ${ink(0.7)}/>
      <path d="M-13.3 -27.6 L-8.4 -27.6 L-8.4 -20.4 Q-12.8 -20.4 -13.1 -22.6 Z" fill="${pack}" ${ink(0.6)}/>
      <path d="M-13 -31.4 Q-9.6 -30.2 -6 -31.4" stroke="#000" stroke-opacity="0.25" stroke-width="0.8" fill="none"/>
      <path d="M-7 -38.6 Q0 -40.6 7 -38.6 Q8.6 -27 9.6 -15.6 Q0 -13.4 -9 -15.6 Q-8.2 -27 -7 -38.6 Z" fill="${tunic}" ${ink(0.7)}/>
      <path d="M-6.8 -38.4 Q-5.2 -38.8 -4 -38.6 Q-5 -27 -4.4 -14.4 Q-7 -14.8 -8.8 -15.6 Q-8 -27 -6.8 -38.4 Z" fill="${tunicDark}"/>
      <path d="M2.2 -21.6 Q2.8 -18 2.4 -14.6 M-1.4 -21.4 Q-1.8 -18 -1.6 -14.4" stroke="${tunicDark}" stroke-width="0.6" fill="none"/>
      <path d="M-4.8 -38.2 Q-3.2 -31 -4.4 -24.8" stroke="#5c3518" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M-8.3 -25.4 Q0 -24.2 8.8 -25.6 L9 -22.9 Q0 -21.6 -8.5 -22.8 Z" fill="#6b3f1f" ${ink(0.5)}/>
      <rect x="2.2" y="-25.4" width="3.2" height="2.9" rx="0.5" fill="#fbbf24" ${ink(0.4)}/>
      <path d="M-6.6 -39.8 Q0 -43.2 7.2 -39.6 Q7.8 -36.8 6.2 -35.4 Q0 -37.8 -6.2 -35.6 Q-7.6 -37.4 -6.6 -39.8 Z" fill="${scarf}" ${ink(0.6)}/>
      <path d="M-4 -37.6 Q0.4 -39.6 4.8 -37.4" stroke="#000" stroke-opacity="0.22" stroke-width="0.7" fill="none"/>
      <g class="arm">
        <path d="M3.2 -37.8 Q8.8 -35.2 8.6 -24.4 L5.2 -24.2 Q5.6 -31.6 2 -34.2 Z" fill="${tunic}" ${ink(0.6)}/>
        <path d="M6.8 -32 Q7.8 -28 7.6 -24.6" stroke="${tunicDark}" stroke-width="0.8" fill="none"/>
        <ellipse cx="6.9" cy="-22.7" rx="1.9" ry="2" fill="${skin}" ${ink(0.5)}/>
      </g>
      <g class="head">
        <path class="ponytail" d="M-3.4 -55.6 Q-12.4 -58 -15.8 -49.6 Q-18.2 -42.4 -15.2 -36.4 Q-13.2 -31.6 -16.6 -27 Q-11.2 -28.8 -11.2 -34.4 Q-11.4 -40 -9.6 -44.6 Q-7.6 -49.6 -2.8 -51.4 Z" fill="${hair}" ${ink(0.7)}/>
        <path d="M-12.6 -49.6 Q-15 -43 -12.6 -37.6" stroke="${hairL}" stroke-width="0.9" fill="none"/>
        <circle cx="0" cy="-46" r="9" fill="${skin}" ${ink(0.7)}/>
        <path d="M-9.4 -44.4 Q-10.6 -56.6 0 -56.8 Q9.8 -56.8 9.6 -47.6 Q9.4 -43.6 8.8 -41.2 Q8 -46 6.8 -49.6 Q2.8 -51.6 -1.6 -50.2 Q-4.4 -48.6 -5.4 -45.2 Q-7.4 -45.4 -7.8 -42.2 Q-8.6 -40.6 -9.4 -40.4 Z" fill="${hair}" ${ink(0.7)}/>
        <path d="M-3.4 -54.6 Q2 -55.6 6.4 -52.6" stroke="${hairL}" stroke-width="0.9" fill="none"/>
        <circle cx="-5.6" cy="-44.6" r="1.9" fill="${skin}" ${ink(0.5)}/>
        <path d="M-5.9 -45.4 Q-5 -44.6 -5.8 -43.6" stroke="#e3a57a" stroke-width="0.5" fill="none"/>
        ${clip}
        <g class="eyes">
          <ellipse cx="2.8" cy="-46.4" rx="1.15" ry="1.65" fill="#1e2a4a"/>
          <ellipse cx="6.6" cy="-46.4" rx="1.15" ry="1.65" fill="#1e2a4a"/>
          <circle cx="3.1" cy="-47" r="0.35" fill="#fff"/><circle cx="6.9" cy="-47" r="0.35" fill="#fff"/>
        </g>
        <path d="M1.6 -49.2 Q2.8 -49.8 4 -49.3 M5.6 -49.3 Q6.8 -49.8 7.8 -49.1" stroke="${hair}" stroke-width="0.6" fill="none"/>
        <path d="M8.9 -45 Q9.8 -43.8 8.8 -43.2" stroke="#d99a72" stroke-width="0.5" fill="none"/>
        <ellipse cx="1.2" cy="-42.8" rx="1.6" ry="1" fill="#f28b8b" opacity="0.55"/>
        <ellipse cx="8.2" cy="-42.8" rx="0.9" ry="0.8" fill="#f28b8b" opacity="0.5"/>
        <path class="mouth" d="M3.6 -42 Q5.4 -40 7.2 -42 Q5.4 -41.2 3.6 -42 Z" fill="#8a2f2f" stroke="#8a2f2f" stroke-width="0.4"/>
        ${glasses}
        ${ariaHatSVG(look.hat)}
      </g>
    </g>
  </g>`;
}

function drawVera() {
  const skin = '#f3c09a', hair = '#b5481e', hairD = '#8e3612';
  return `
  <g class="char vera">
    <ellipse cx="0" cy="0.3" rx="12.5" ry="2.7" fill="#000" opacity="0.3"/>
    <g class="leg leg-b">
      <path d="M-5.2 -24 L-0.6 -24 L-0.8 -12 L-5 -12 Z" fill="#6b4a2f" ${ink(0.6)}/>
      <path d="M-6.4 -13.4 L0.2 -13.4 L-0.2 0 L-6.8 0 Q-7.6 -0.2 -6.8 -2 Z" fill="#1f1d24" ${ink(0.6)}/>
      <rect x="-6.8" y="-14.2" width="7.4" height="2.4" rx="0.6" fill="#2a2830" ${ink(0.5)}/>
    </g>
    <g class="leg leg-f">
      <path d="M0.4 -24 L5 -24 L4.8 -12 L0.6 -12 Z" fill="#7d5a3a" ${ink(0.6)}/>
      <path d="M-0.2 -13.4 L5.6 -13.4 L5.4 -3.6 Q8.6 -3 8.6 0 L-0.4 0 Z" fill="#26242c" ${ink(0.6)}/>
      <rect x="-0.6" y="-14.2" width="7" height="2.4" rx="0.6" fill="#33313a" ${ink(0.5)}/>
    </g>
    <g class="torso">
      <path d="M-8.6 -57 Q-14 -46 -11.6 -33 Q-8 -35 -6 -38 Q-6 -47 -4.6 -52 Z" fill="${hair}" ${ink(0.7)}/>
      <path d="M11.6 -32 L-16 -8" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M11.6 -32 L-16 -8" stroke="#cbd5e1" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M9.4 -34.6 Q14.6 -34.6 14.8 -29.4" stroke="#9ca3af" stroke-width="1" fill="none"/>
      <path d="M11.4 -32.2 L14.6 -35" stroke="#6b3f1f" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M-8.4 -44.2 Q0 -46.8 8.4 -44.2 Q10.4 -30 11.4 -16 Q0 -14 -11.2 -16 Q-10.4 -30 -8.4 -44.2 Z" fill="#2346c8" ${ink(0.7)}/>
      <path d="M-8.2 -44 Q-6.4 -44.6 -5 -44.6 Q-6 -30 -5.6 -14.8 Q-8.6 -15 -11 -16 Q-10.2 -30 -8.2 -44 Z" fill="#1a3299"/>
      <path d="M-2.6 -45 L3 -45 L0.6 -33.6 Z" fill="#f8fafc" ${ink(0.5)}/>
      <path d="M0.6 -33.6 L0.4 -15" stroke="${INK}" stroke-width="0.5" opacity="0.6"/>
      <path d="M-4.6 -46.6 L-2.6 -45 L-4 -42.4 Z M5 -46.6 L3 -45 L4.4 -42.2 Z" fill="#1a3299" ${ink(0.5)}/>
      ${[-41.4, -38.4, -35.4].map(y => `<circle cx="3" cy="${y}" r="0.75" fill="#fbbf24" ${ink(0.3)}/><circle cx="5.8" cy="${y + 0.2}" r="0.75" fill="#fbbf24" ${ink(0.3)}/>`).join('')}
      <path d="M-10.2 -30.6 Q0 -32.4 10.6 -30.6 L10.8 -25.6 Q0 -24 -10.4 -25.6 Z" fill="#c62828" ${ink(0.6)}/>
      <path d="M-6 -29.6 Q0 -30.6 6 -29.4" stroke="#8e1b1b" stroke-width="0.6" fill="none"/>
      <path d="M-9.6 -26 Q-12.6 -22 -11.4 -18.6 Q-9.4 -21 -8 -25.4 Z" fill="#c62828" ${ink(0.5)}/>
      <g class="arm">
        <path d="M4.4 -43.6 Q11.4 -41 12.4 -33.6 Q11.4 -30 7.6 -27.6 L5.8 -29.8 Q8.8 -32 8.8 -34.6 Q7.8 -38.4 3.6 -39.6 Z" fill="#2346c8" ${ink(0.6)}/>
        <path d="M9.4 -31.4 L6.8 -28.2" stroke="#f3e6c8" stroke-width="1.2"/>
        <ellipse cx="6.6" cy="-27.6" rx="1.9" ry="1.6" fill="${skin}" ${ink(0.5)}/>
      </g>
      <g class="head">
        <circle cx="0" cy="-51" r="9" fill="${skin}" ${ink(0.7)}/>
        <path d="M-9.2 -50 Q-9.6 -58 -2 -58.6 Q6.6 -58.8 9 -52.6 Q5 -55.4 1 -54.4 Q-2.4 -53.2 -4.4 -49.6 Q-6.4 -46 -7 -41.6 Q-8.8 -42.4 -9.2 -45 Z" fill="${hair}" ${ink(0.7)}/>
        <path d="M8.8 -52.4 Q10.4 -48 9 -43.6 Q8.6 -47 7.4 -49.6 Z" fill="${hair}" ${ink(0.5)}/>
        <path d="M-6 -55 Q-7.6 -50 -7.2 -45" stroke="${hairD}" stroke-width="0.7" fill="none"/>
        <circle cx="-4.6" cy="-49.4" r="1.8" fill="${skin}" ${ink(0.5)}/>
        <circle cx="-4.6" cy="-46.6" r="1.4" fill="none" stroke="#f2b53a" stroke-width="0.7"/>
        <g class="eyes">
          <ellipse cx="3" cy="-51" rx="1.1" ry="1.55" fill="#1e2a4a"/>
          <ellipse cx="6.8" cy="-51" rx="1.1" ry="1.55" fill="#1e2a4a"/>
          <circle cx="3.3" cy="-51.6" r="0.33" fill="#fff"/><circle cx="7.1" cy="-51.6" r="0.33" fill="#fff"/>
        </g>
        <path d="M1.2 -54.6 L4.6 -53.4 M5.6 -53.4 L8.8 -54.8" stroke="#6b2a10" stroke-width="0.9" stroke-linecap="round"/>
        <path d="M9 -50 Q10 -48.6 8.9 -48" stroke="#d99a72" stroke-width="0.5" fill="none"/>
        <ellipse cx="1.2" cy="-47.6" rx="1.6" ry="1" fill="#f28b8b" opacity="0.55"/>
        <path class="mouth" d="M3.4 -46.6 Q5.6 -43.8 8 -46.8 Q5.6 -45.8 3.4 -46.6 Z" fill="#8a2f2f" stroke="#8a2f2f" stroke-width="0.4"/>
        <path d="M-14.4 -56 Q-8 -53.6 0 -55.2 Q8 -53.6 14.6 -56.6 Q11.4 -60.2 8.2 -59.6 Q6.4 -66.6 0 -66.2 Q-6.4 -66.6 -8.2 -59.6 Q-11.4 -60 -14.4 -56 Z" fill="#1d1b22" ${ink(0.7)}/>
        <path d="M-13.4 -56.4 Q-8 -54.4 0 -55.8 Q8 -54.4 13.6 -56.8" stroke="#f2b53a" stroke-width="0.9" fill="none"/>
        <path d="M-8.2 -59.6 Q-6.4 -66.6 0 -66.2 Q6.4 -66.6 8.2 -59.6" stroke="#f2b53a" stroke-width="0.7" fill="none"/>
        <circle cx="0" cy="-61.4" r="1.5" fill="#f8fafc"/>
        <path d="M-2.2 -58.8 L2.2 -63.6 M2.2 -58.8 L-2.2 -63.6" stroke="#f8fafc" stroke-width="0.6"/>
        <circle cx="-0.5" cy="-61.6" r="0.3" fill="#1d1b22"/><circle cx="0.5" cy="-61.6" r="0.3" fill="#1d1b22"/>
      </g>
    </g>
  </g>`;
}

function drawBarnaba() {
  const skin = '#d39a72', skinD = '#b97d58';
  return `
  <g class="char barnaba">
    <ellipse cx="0" cy="0.3" rx="17" ry="3" fill="#000" opacity="0.3"/>
    <g class="leg leg-b">
      <path d="M-10.4 -30 L-1.6 -30 L-2.4 -4 L-9.6 -4 Z" fill="#1f2128" ${ink(0.7)}/>
      <path d="M-12.6 -5 Q-13 0 -8 0 L-1.2 0 Q-0.6 -3.6 -3 -5.6 Z" fill="#eef1f5" ${ink(0.7)}/>
      <path d="M-12.6 -1.4 L-1 -1.4" stroke="#b8c0cc" stroke-width="1"/>
    </g>
    <g class="leg leg-f">
      <path d="M1.2 -30 L10.4 -30 L9.6 -4 L2.2 -4 Z" fill="#2a2d36" ${ink(0.7)}/>
      <path d="M4 -26 L4.4 -8" stroke="#1a1c22" stroke-width="0.7"/>
      <path d="M1.4 -5.6 Q0.8 0 5 0 L13.4 0 Q14 -4 9.6 -5.6 Z" fill="#f8fafc" ${ink(0.7)}/>
      <path d="M1 -1.4 L13.8 -1.4" stroke="#cbd2da" stroke-width="1"/>
      <circle cx="7" cy="-4.4" r="0.4" fill="#94a3b8"/><circle cx="9" cy="-4.2" r="0.4" fill="#94a3b8"/>
    </g>
    <g class="torso">
      <path d="M-15.6 -62 Q0 -66.4 15.6 -62 Q19 -46 14.4 -28.6 L-14.4 -28.6 Q-19 -46 -15.6 -62 Z" fill="#1e1e24" ${ink(0.8)}/>
      <path d="M12 -60 Q15.6 -46 12.6 -30" stroke="#3a3a46" stroke-width="1.4" fill="none"/>
      <path d="M-14.6 -31.4 Q0 -30 14.6 -31.4 L14.6 -28.4 Q0 -27.4 -14.6 -28.4 Z" fill="#26262c" ${ink(0.6)}/>
      <rect x="-3" y="-31.6" width="6" height="3.6" rx="0.6" fill="#f5c518" ${ink(0.5)}/>
      <path d="M-20.4 -59 Q-23.6 -52 -21 -46.4 L-15.4 -46.6 L-14 -60 Z" fill="#1e1e24" ${ink(0.7)}/>
      <path d="M20.4 -59 Q23.6 -52 21 -46.4 L15.4 -46.6 L14 -60 Z" fill="#1e1e24" ${ink(0.7)}/>
      <path d="M-20.6 -47.4 Q-23.4 -42 -19.6 -37.6 L-15.4 -40 L-16 -47 Z" fill="${skin}" ${ink(0.7)}/>
      <path d="M20.6 -47.4 Q23.4 -42 19.6 -37.6 L15.4 -40 L16 -47 Z" fill="${skinD}" ${ink(0.7)}/>
      <path d="M-6 -64.4 Q-4 -56 0 -54.6 Q4 -56 6 -64.4" stroke="#e2b13c" stroke-width="1.1" fill="none"/>
      <circle cx="0" cy="-53.4" r="2.4" fill="#f5c518" ${ink(0.5)}/>
      <circle cx="-0.6" cy="-54" r="0.7" fill="#fff6c2"/>
      <rect x="-20" y="-45.6" width="34" height="8" rx="4" fill="${skin}" ${ink(0.7)}/>
      <path d="M-14 -43.6 Q-6 -45 2 -43.8" stroke="${skinD}" stroke-width="0.9" fill="none"/>
      <rect x="-14" y="-40.6" width="34" height="7.4" rx="3.7" fill="${skinD}" ${ink(0.7)}/>
      <path d="M-8 -38.4 Q2 -39.6 12 -38.2" stroke="#9e6646" stroke-width="0.9" fill="none"/>
      <ellipse cx="-17.6" cy="-37" rx="3.2" ry="3" fill="${skinD}" ${ink(0.6)}/>
      <ellipse cx="16" cy="-41.6" rx="3.4" ry="3.2" fill="${skin}" ${ink(0.6)}/>
      <rect x="-4.6" y="-66" width="9.2" height="6" fill="${skinD}" ${ink(0.6)}/>
      <g class="head">
        <ellipse cx="-10" cy="-71" rx="2.3" ry="2.8" fill="${skinD}" ${ink(0.6)}/>
        <ellipse cx="0" cy="-73" rx="10.4" ry="11" fill="${skin}" ${ink(0.8)}/>
        <ellipse cx="-3" cy="-80.6" rx="3.6" ry="1.8" fill="#fff" opacity="0.35"/>
        <path d="M-9.6 -70 Q-9.4 -62.8 -4 -61.6 Q0 -60.6 4 -61.6 Q9.4 -62.8 9.8 -70 Q8 -66.6 5.6 -66.4 Q0 -67.6 -5.6 -66.4 Q-8 -66.6 -9.6 -70 Z" fill="#7f7f88" ${ink(0.6)}/>
        <path d="M-6 -64 L-5.4 -63.4 M-2 -63 L-1.6 -62.4 M2 -63 L2.4 -62.4 M5.4 -64 L6 -63.4" stroke="#5c5c64" stroke-width="0.5"/>
        <g class="brows">
          <path d="M-8.6 -78.4 L-2 -76.2 M2 -76.2 L8.6 -78.4" stroke="#3a2a20" stroke-width="1.6" stroke-linecap="round"/>
        </g>
        <rect x="-8.8" y="-76" width="7.8" height="4.4" rx="1.4" fill="#121218" ${ink(0.5)}/>
        <rect x="1" y="-76" width="7.8" height="4.4" rx="1.4" fill="#121218" ${ink(0.5)}/>
        <rect x="-1.2" y="-75" width="2.4" height="1" fill="#121218"/>
        <path d="M-7.4 -74.8 L-5 -74.8 M2.4 -74.8 L4.8 -74.8" stroke="#fff" stroke-width="0.6" opacity="0.6"/>
        <path d="M0.4 -71 Q1.6 -68.4 0 -67.8" stroke="${skinD}" stroke-width="0.8" fill="none"/>
        <ellipse cx="-6.4" cy="-69.6" rx="1.6" ry="0.9" fill="#e07a6a" opacity="0.45"/>
        <ellipse cx="6.6" cy="-69.6" rx="1.6" ry="0.9" fill="#e07a6a" opacity="0.45"/>
        <rect class="mouth" x="-3.2" y="-65.8" width="6.4" height="1.3" rx="0.65" fill="#5c2626"/>
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
  const skin = '#f6d5bf', hair = '#8b3fd1', hairD = '#6a2aa8', hairL = '#a865e8';
  return `
  <g class="char lavinia">
    <ellipse cx="0" cy="0.3" rx="12" ry="2.6" fill="#000" opacity="0.3"/>
    <g class="leg leg-b">
      <path d="M-4.8 -17 L-0.6 -17 L-0.8 -6 L-4.6 -6 Z" fill="#8b5cc7" ${ink(0.6)}/>
      <path d="M-5.4 -7 L0 -7 L-0.2 0 L-7.4 0 Q-7.8 -2 -5.4 -2.6 Z" fill="#ede9f6" ${ink(0.6)}/>
      <circle cx="-2.4" cy="-5" r="0.45" fill="#7c6f99"/>
    </g>
    <g class="leg leg-f">
      <path d="M0.2 -17 L4.6 -17 L4.4 -6 L0.6 -6 Z" fill="#9d6fd6" ${ink(0.6)}/>
      <path d="M0 -7 L5.2 -7 L5 -2.6 Q8.4 -2.2 8.4 0 L-0.2 0 Z" fill="#f8f6fc" ${ink(0.6)}/>
      <circle cx="2.6" cy="-5" r="0.45" fill="#7c6f99"/><circle cx="2.6" cy="-3" r="0.45" fill="#7c6f99"/>
    </g>
    <g class="torso">
      <path class="hair-sway" d="M-6.6 -57.6 Q-14.8 -52 -13.4 -41 Q-15.4 -33.4 -12 -27 Q-9.4 -24.4 -6.6 -27.4 Q-8.4 -31 -6.4 -35 Q-4.6 -42 -3 -48 Z" fill="${hair}" ${ink(0.7)}/>
      <path d="M-11.6 -45 Q-13 -37 -10.8 -30" stroke="${hairL}" stroke-width="0.8" fill="none"/>
      <path d="M-7.8 -24 L7.8 -24 L11.4 -13.6 Q0 -12 -11.4 -13.6 Z" fill="#7e3fc4" ${ink(0.6)}/>
      <path d="M-4.4 -23.8 L-6 -13 M-0.8 -23.8 L-1.2 -12.6 M2.8 -23.8 L3.6 -12.8 M6 -23.8 L8.2 -13.2" stroke="#5f2aa0" stroke-width="0.6"/>
      <path d="M-7 -39.6 Q0 -42 7 -39.6 L7.8 -23 Q0 -22 -7.8 -23 Z" fill="#e05a98" ${ink(0.7)}/>
      <path d="M-6.8 -39.4 Q-5.4 -39.8 -4.4 -39.8 L-4.8 -22.6 Q-6.4 -22.6 -7.6 -23 Z" fill="#c4447f"/>
      <path d="M-4.6 -40.6 Q-2 -37 0.2 -39.4 Q2.6 -37 5 -40.4 Q0 -42.4 -4.6 -40.6 Z" fill="#fdf7fb" ${ink(0.5)}/>
      <circle cx="0.2" cy="-37.4" r="1.2" fill="#ec4899" stroke="#f2b53a" stroke-width="0.5"/>
      <g class="arm">
        <path d="M-7.8 -34.6 Q0 -36.4 9 -33.6 Q10 -30.6 8.4 -29.4 Q0 -31.6 -7 -30.4 Z" fill="#e05a98" ${ink(0.6)}/>
        <path d="M-6.4 -31 Q1 -29.6 8.6 -31.6 Q9.4 -28.4 7.8 -27 Q0 -26.4 -6.8 -27.8 Z" fill="#c4447f" ${ink(0.6)}/>
        <path d="M7.6 -33.8 L8.6 -29.6" stroke="#fdf7fb" stroke-width="1"/>
        <ellipse cx="-7.4" cy="-29" rx="1.7" ry="1.6" fill="${skin}" ${ink(0.5)}/>
        <ellipse cx="9.2" cy="-31.6" rx="1.6" ry="1.5" fill="${skin}" ${ink(0.5)}/>
      </g>
      <g class="head">
        <circle cx="0" cy="-51" r="9" fill="${skin}" ${ink(0.7)}/>
        <path d="M-9.4 -50 Q-10.4 -60.4 0 -60.6 Q10 -60.6 9.8 -50.4 L9.6 -43 Q8.6 -47 8.4 -52.4 L-6 -52.4 Q-7 -47 -7.8 -42 Q-9.2 -45 -9.4 -50 Z" fill="${hair}" ${ink(0.7)}/>
        <path d="M-6.4 -52.6 L8.6 -52.6" stroke="${hairD}" stroke-width="0.6"/>
        <path d="M-1 -59.4 Q4 -60 7.6 -56.6" stroke="${hairL}" stroke-width="0.9" fill="none"/>
        <circle cx="-5.4" cy="-49.6" r="1.8" fill="${skin}" ${ink(0.5)}/>
        <g class="eyes">
          <ellipse cx="3" cy="-49.8" rx="1.1" ry="1.3" fill="#1e2a4a"/>
          <ellipse cx="6.8" cy="-49.8" rx="1.1" ry="1.3" fill="#1e2a4a"/>
        </g>
        <path d="M1.6 -50.8 Q3 -51.6 4.4 -50.8 M5.4 -50.8 Q6.8 -51.6 8.2 -50.8" stroke="${INK}" stroke-width="0.8" fill="none"/>
        <path d="M1.6 -50.8 L0.8 -51.6 M8.2 -50.8 L9 -51.6" stroke="${INK}" stroke-width="0.5"/>
        <path d="M1.2 -53.6 Q3 -55 4.8 -54.2 M5.4 -54.2 Q7 -55.2 8.8 -53.8" stroke="${hairD}" stroke-width="0.8" fill="none"/>
        <path d="M9.1 -48.6 Q10 -47.4 9 -46.8" stroke="#d99a72" stroke-width="0.5" fill="none"/>
        <ellipse cx="1.2" cy="-46.4" rx="1.6" ry="1" fill="#f28b8b" opacity="0.55"/>
        <path class="mouth" d="M3.8 -45.4 Q6.2 -43.8 8.4 -46.2 Q6 -44.8 3.8 -45.4 Z" fill="#9b2457" stroke="#9b2457" stroke-width="0.5"/>
        <path d="M-6.4 -58.6 L-4.6 -63 L-1.6 -59.8 L1.6 -64.6 L4.6 -59.8 L7.2 -63 L8.4 -58.2 Q1 -61.2 -6.4 -58.6 Z" fill="#fbbf24" ${ink(0.5)}/>
        <circle cx="1.6" cy="-61" r="1.2" fill="#ec4899" ${ink(0.3)}/>
      </g>
    </g>
  </g>`;
}

/* --------------------------------------------------------------------------
   PIAZZA: ZIA TURBINA, LA MERCANTE SVALVOLATA
   -------------------------------------------------------------------------- */
function drawTurbina() {
  const skin = '#f6cba4';
  const spikes = [
    ['#ec4899', 'M-6 -55 L-19 -60 L-10 -51 L-20 -48 L-9 -46 Z'],
    ['#a855f7', 'M-8 -50 L-19 -44 L-9 -42 Z'],
    ['#22d3ee', 'M-5 -56 L-11 -68 L-1 -58 Z'],
    ['#ec4899', 'M-2 -57 L-3 -70 L4 -58 Z'],
    ['#facc15', 'M2 -57 L9 -69 L8 -56 Z'],
    ['#84cc16', 'M6 -55 L17 -63 L10 -52 Z'],
    ['#f97316', 'M8 -52 L19 -53 L10 -48 Z'],
    ['#22d3ee', 'M-7 -45 L-15 -38 L-6 -41 Z']
  ].map(([c, d]) => `<path d="${d}" fill="${c}" ${ink(0.6)}/>`).join('');
  const patch = (x, y, w, h, c, r) => `<g transform="rotate(${r} ${x + w / 2} ${y + h / 2})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${ink(0.4)}/>
    <path d="M${x + 0.6} ${y - 0.4} l0 1 M${x + w - 0.6} ${y - 0.4} l0 1 M${x - 0.4} ${y + h / 2} l1 0 M${x + w - 0.6} ${y + h / 2} l1 0" stroke="${INK}" stroke-width="0.4"/></g>`;
  const button = (x, y, c) => `<circle cx="${x}" cy="${y}" r="1.2" fill="${c}" ${ink(0.3)}/><path d="M${x - 0.5} ${y - 0.5} l1 1 M${x + 0.5} ${y - 0.5} l-1 1" stroke="${INK}" stroke-width="0.3"/>`;
  return `
  <g class="char turbina">
    <ellipse cx="0" cy="0.3" rx="12" ry="2.6" fill="#000" opacity="0.3"/>
    <g class="leg leg-b">
      <rect x="-4.8" y="-16" width="4.4" height="13" rx="1" fill="#a78bfa" ${ink(0.6)}/>
      <path d="M-4.8 -13 L-0.4 -13 M-4.8 -10 L-0.4 -10 M-4.8 -7 L-0.4 -7" stroke="#5eead4" stroke-width="1.1"/>
      <path d="M-5.6 -5.4 L0 -5.4 L-0.2 0 L-7.6 0 Q-8 -2.2 -5.6 -2.6 Z" fill="#8a6a4a" ${ink(0.6)}/>
    </g>
    <g class="leg leg-f">
      <rect x="0.2" y="-16" width="4.4" height="13" rx="1" fill="#3b82f6" ${ink(0.6)}/>
      <circle cx="1.6" cy="-13" r="0.6" fill="#fde047"/><circle cx="3.4" cy="-10" r="0.6" fill="#fde047"/><circle cx="1.6" cy="-7" r="0.6" fill="#fde047"/>
      <path d="M-0.2 -4.2 Q-0.6 0 3 0 L8.8 0 Q9.2 -3 4.8 -4.4 Z" fill="#ec4899" ${ink(0.6)}/>
      <path d="M-0.4 -1 L9 -1" stroke="#5eead4" stroke-width="1"/>
    </g>
    <g class="torso">
      <path d="M-8.4 -42 Q0 -44.6 8.4 -42 Q11 -28 12.8 -14 Q0 -11.8 -12.8 -14 Q-11 -28 -8.4 -42 Z" fill="#f08a1c" ${ink(0.7)}/>
      <path d="M-8.2 -41.8 Q-6.6 -42.4 -5.4 -42.4 Q-6.6 -28 -6.4 -12.8 Q-10 -13.2 -12.6 -14 Q-10.8 -28 -8.2 -41.8 Z" fill="#d06f10"/>
      <path d="M0.4 -42 L1 -13" stroke="${INK}" stroke-width="0.5" opacity="0.6"/>
      ${patch(-9.4, -24, 5, 5, '#ec4899', -8)}
      ${patch(4.4, -20, 5, 4.4, '#facc15', 10)}
      ${patch(-7, -36, 4, 4, '#60a5fa', 6)}
      ${button(2.4, -37, '#ec4899')}${button(2.8, -31, '#84cc16')}${button(3.2, -25, '#60a5fa')}
      <g class="arm">
        <path d="M4.4 -40.8 Q10 -38 10.6 -31.4 L7.8 -30.4 Q7.4 -35 3.6 -37.2 Z" fill="#f08a1c" ${ink(0.6)}/>
        <path d="M-6 -36 Q-1 -30 5 -30.4 L5.4 -27.6 Q-2 -27.2 -7 -33.4 Z" fill="#d06f10" ${ink(0.6)}/>
        <path d="M8 -38 L8 -35.4 Q12.4 -33.4 12.2 -29 Q12 -25 8 -25 Q4 -25 3.8 -29 Q3.6 -33.4 8 -35.4 Z" fill="#a3e635" fill-opacity="0.85" ${ink(0.6)}/>
        <path d="M4.4 -29 Q8 -27.6 11.6 -29 Q11.4 -25.6 8 -25.6 Q4.6 -25.6 4.4 -29 Z" fill="#4d9a2a"/>
        <rect x="6.8" y="-39.4" width="2.6" height="1.8" rx="0.4" fill="#a16207" ${ink(0.4)}/>
        <circle cx="9.6" cy="-29.6" r="0.7" fill="#ecfccb"/>
        <circle class="steam" cx="8.6" cy="-40.6" r="1.5" fill="#bbf7d0"/>
        <circle class="steam" cx="7.4" cy="-40.6" r="1.1" fill="#bbf7d0" style="animation-delay:-1.2s"/>
        <ellipse cx="4.6" cy="-28.8" rx="1.8" ry="1.7" fill="${skin}" ${ink(0.5)}/>
        <ellipse cx="11.6" cy="-30" rx="1.7" ry="1.7" fill="${skin}" ${ink(0.5)}/>
      </g>
      <g class="head">
        <g class="hair-boing">${spikes}</g>
        <circle cx="0" cy="-49" r="9" fill="${skin}" ${ink(0.7)}/>
        <path d="M-9 -50 Q-8 -58.4 0.6 -58.2 Q8.6 -58 9.4 -51 Q6 -54.4 2 -53.6 Q-1 -55.4 -4 -52.6 Q-6.6 -53.6 -9 -50 Z" fill="#a855f7" ${ink(0.6)}/>
        <path d="M-4 -56.6 Q0 -58 3 -55.6 L2 -53.6 Q-1 -55.4 -4 -52.6 Z" fill="#22d3ee"/>
        <path d="M3 -56 Q7 -56.4 9.2 -52 L7 -52.6 Q5 -54.6 2 -53.6 Z" fill="#facc15"/>
        <circle cx="-5.4" cy="-47.4" r="1.9" fill="${skin}" ${ink(0.5)}/>
        <path d="M-9.4 -57.2 Q-8 -63.4 -1 -63 Q2.4 -62.6 2.6 -59.4 Q-3.4 -58 -9.4 -57.2 Z" fill="#3b6fd8" ${ink(0.6)}/>
        <path d="M-8.6 -58 Q-6 -61.6 -2.6 -61.6" stroke="#6d95ea" stroke-width="0.8" fill="none"/>
        <line x1="-3.4" y1="-62.8" x2="-3.6" y2="-65.6" stroke="${INK}" stroke-width="0.8"/>
        <g transform="translate(-3.6 -66)"><g class="spin" style="animation-duration:0.6s">
          <ellipse rx="6.4" ry="1.3" fill="#ef4444" ${ink(0.5)}/><circle r="0.8" fill="#facc15"/>
        </g></g>
        <g class="eyes">
          <ellipse cx="2.8" cy="-49.4" rx="0.9" ry="1.2" fill="#1e2a4a"/>
          <ellipse cx="7.4" cy="-49.4" rx="0.9" ry="1.2" fill="#1e2a4a"/>
        </g>
        <circle cx="2.8" cy="-49.4" r="3.2" fill="#e9d5ff" fill-opacity="0.55" stroke="#7c3aed" stroke-width="1.1"/>
        <g transform="translate(2.8 -49.4)"><g class="spin" style="animation-duration:2.5s">
          <path d="M0 0 Q1.2 -1.2 1.6 0 Q1.2 2 -0.8 1.6 Q-2.6 0.8 -2 -1.6 Q-0.6 -3.2 1.8 -2.4" stroke="#7c3aed" stroke-width="0.6" fill="none"/>
        </g></g>
        <rect x="6.2" y="-51.8" width="4.2" height="4.4" rx="0.8" fill="#86efac" fill-opacity="0.55" stroke="#16a34a" stroke-width="1.1"/>
        <path d="M6 -49.6 L6.2 -49.6" stroke="${INK}" stroke-width="0.6"/>
        <ellipse cx="0.4" cy="-44.6" rx="1.5" ry="0.9" fill="#f28b8b" opacity="0.55"/>
        <g class="mouth">
          <path d="M1.6 -44.6 Q5.4 -39.6 9.4 -44.8 Q5.4 -43 1.6 -44.6 Z" fill="#7f1d1d" ${ink(0.5)}/>
          <path d="M2.6 -44.2 Q5.4 -42.8 8.4 -44.2 L8 -43.2 Q5.4 -42.2 3 -43.2 Z" fill="#fff"/>
        </g>
      </g>
    </g>
  </g>`;
}


/* --------------------------------------------------------------------------
   PERSONAGGI A IMMAGINE (img/chars/*.webp, sfondo tolto con tools/scontorna.py)
   L'immagine ha i piedi sul bordo in basso. Sopra, in SVG:
   - palpebre che si chiudono ogni tanto (classe "lid");
   - bocca che si apre solo quando il personaggio parla (classe "img-mouth").
   Coordinate di occhi e bocca in pixel dell'immagine.
   -------------------------------------------------------------------------- */
function imageChar({ cls, file, eyes = [], lidColor, eyeR = 12, mouth, mouthW = 18, mouthH = 10, extra = '' }) {
  const H = CHAR_IMG_H[file];
  const sc = H.h / H.px;
  const width = H.w * sc;
  const P = (x, y) => [x * sc - width / 2, y * sc - H.h];
  const lids = eyes.map(([x, y]) => {
    const [cx, cy] = P(x, y);
    return `<ellipse cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" rx="${(eyeR * sc).toFixed(2)}" ry="${(eyeR * sc).toFixed(2)}" fill="${lidColor}"/>`;
  }).join('');
  let m = '';
  if (mouth) {
    const [mx, my] = P(...mouth);
    m = `<ellipse class="img-mouth" cx="${mx.toFixed(2)}" cy="${my.toFixed(2)}" rx="${(mouthW / 2 * sc).toFixed(2)}" ry="${(mouthH / 2 * sc).toFixed(2)}" fill="#5c1a1a"/>`;
  }
  return `
  <g class="char ${cls} img-char">
    <ellipse cx="0" cy="0.3" rx="${(width * 0.32).toFixed(1)}" ry="2.8" fill="#000" opacity="0.3"/>
    <g class="torso">
      <image href="img/chars/${file}.webp" x="${(-width / 2).toFixed(2)}" y="${-H.h}" width="${width.toFixed(2)}" height="${H.h}"/>
      ${lids ? `<g class="lid">${lids}</g>` : ''}
      ${m}
      ${extra}
    </g>
  </g>`;
}

/* Misure delle immagini: larghezza e altezza in pixel, altezza nel gioco. */
const CHAR_IMG_H = {
  oste: { w: 432, px: 640, h: 61 },
  pianta: { w: 362, px: 640, h: 110 }
};

function drawOsteImg() {
  return imageChar({ cls: 'oste', file: 'oste', eyes: [[188, 86], [238, 84]], lidColor: '#f2c4a2', eyeR: 9, mouth: [229, 128], mouthW: 18, mouthH: 8 });
}
/* La Pianta ha 2 immagini: fauci chiuse e aperte. Quella aperta compare per il morso. */
function drawPlantImg() {
  const H = CHAR_IMG_H.pianta;
  const width = H.w * H.h / H.px;
  return imageChar({
    cls: 'plant', file: 'pianta', eyes: [[246, 150], [318, 150]], lidColor: '#c4479f', eyeR: 21,
    extra: `<image class="jaw-open" href="img/chars/pianta-aperta.webp" x="${(-width / 2).toFixed(2)}" y="${-H.h}" width="${width.toFixed(2)}" height="${H.h}"/>`
  });
}

const CHARS = {
  aria: { draw: drawAria, h: 57, portraitVB: '-14 -63 30 30' },
  vera: { draw: drawVera, h: 67, portraitVB: '-15 -68 30 30' },
  barnaba: { draw: drawBarnaba, h: 82, portraitVB: '-14 -84 28 28' },
  oste: { draw: drawOsteImg, h: 61, portraitVB: '-13 -63 26 26' },
  gemelli: { draw: drawGemelli, h: 56, portraitVB: '-21 -60 40 40' },
  archimede: { draw: drawArchimede, h: 66, portraitVB: '-13 -67 30 30' },
  terminal: { draw: drawTerminal, h: 79, portraitVB: '-18 -70 36 36' },
  zeri: { draw: drawZeri, h: 64, portraitVB: '-12 -65 28 28' },
  plant: { draw: drawPlantImg, h: 110, portraitVB: '0 -102 36 36' },
  gemelle: { draw: drawGemelle, h: 56, portraitVB: '-21 -60 40 40' },
  automa: { draw: drawAutoma, h: 84, portraitVB: '-17 -88 34 34' },
  lavinia: { draw: drawLavinia, h: 65, portraitVB: '-12 -66 28 28' },
  turbina: { draw: drawTurbina, h: 72, portraitVB: '-17 -72 36 36' }
};

function portraitSVG(key) {
  const c = CHARS[key];
  return `<svg viewBox="${c.portraitVB}" class="portrait" aria-hidden="true">${c.draw()}</svg>`;
}

