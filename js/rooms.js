/* ==========================================================================
   ESPLORAZIONE: OGGETTI, CURIOSITÀ, MISSIONI E STANZE DELLE AREE
   Le frasi in [ ... ] sono varianti: il gioco ne sceglie una a caso.
   ========================================================================== */

/* --------------------------------------------------------------------------
   OGGETTI RACCOGLIBILI (usable = si può usare dallo Zaino)
   -------------------------------------------------------------------------- */
const ITEMS = {
  corda: { name: 'Corda robusta', icon: '🪢', desc: 'Lunga e resistente. Utile per ripescare cose.', usable: true },
  dadi: { name: 'Dadi fortunati', icon: '🎲', desc: 'I dadi dei Pirati Gemelli. Odorano di botte.', usable: true },
  scheda: { name: 'Scheda di calibrazione', icon: '💾', desc: 'Una scheda perforata con scritto "(a^m)^n".', usable: true },
  annaffiatoio: { name: 'Annaffiatoio', icon: '🚿', desc: 'Pieno d’acqua fresca del vivaio.', usable: true },
  ingranaggio: { name: 'Ingranaggio d’oro', icon: '⚙️', desc: 'Il pezzo mancante dell’Automa.', usable: true },
  // Premi dei guardiani: servono nell'area successiva.
  i1: { name: 'Chiave della Taverna', icon: '🗝️', desc: 'Consegnata da Barnaba dopo aver sistemato il carico.', usable: true },
  i2: { name: 'Cannocchiale Ottico', icon: '🔭', desc: 'Vinto ai dadi contro i Pirati Gemelli.', usable: true },
  i3: { name: 'Lente Stellare', icon: '🔍', desc: 'Calibrata in cima alla Torre. Concentra la luce.', usable: true },
  i4: { name: 'Seme Luminescente', icon: '🌱', desc: 'Donato da Madame Zeri. Brilla al buio.', usable: true },
  i5: { name: 'Chiave Inglese d’Oro', icon: '🔧', desc: 'Forgiata dalle Gemelle Mira e Nora.', usable: true }
};

/* --------------------------------------------------------------------------
   CURIOSITÀ SULLE POTENZE (si sbloccano leggendo)
   -------------------------------------------------------------------------- */
const CURIOSITIES = {
  scacchiera: {
    icon: '♟️',
    title: 'La leggenda della scacchiera',
    text: `Un re vuole premiare l'inventore degli scacchi. L'inventore chiede solo del riso: <b>1 chicco</b> sulla prima casella, <b>2</b> sulla seconda, <b>4</b> sulla terza... e così via, <b>raddoppiando</b> a ogni casella.<br><br>
      Sulla casella n° 64 ci vanno <span class="math-expr">2<sup>63</sup></span> chicchi: circa <b>9 miliardi di miliardi</b>! Il re non ha abbastanza riso in tutto il regno.<br><br>
      Morale: le potenze crescono in modo <b>esplosivo</b>.`,
    comment: ['Il re è stato fregato da una potenza di 2. Iconico.', 'Raddoppiare sembra poco... finché non arrivi a 2⁶³!', 'Note to self: mai sfidare un matematico con il riso.']
  },
  carta: {
    icon: '📄',
    title: 'I fogli A4 e le potenze di 2',
    text: `Il foglio <b>A0</b> ha un’area di <b>1 m²</b>. Se lo tagli a metà ottieni un A1, a metà ancora un A2... e così via.<br><br>
      Un foglio <b>A4</b> è A0 diviso 4 volte per 2: <span class="math-expr">1 : 2<sup>4</sup> = 1/16</span> di metro quadrato.<br><br>
      Ecco perché in un A3 ci stanno esattamente <b>2 fogli A4</b>!`,
    comment: ['Quindi il mio quaderno è fatto di potenze di 2. Pazzesco.', 'Dividere per 2 quattro volte = dividere per 2⁴. Chiaro!']
  },
  arenario: {
    icon: '🏖️',
    title: 'L’Arenario di Archimede',
    text: `Più di 2000 anni fa il vero <b>Archimede</b> si chiese: quanti granelli di sabbia servono per riempire tutto l’universo?<br><br>
      Per scrivere numeri così grandi inventò un sistema simile alle potenze. Il suo risultato: circa <span class="math-expr">10<sup>63</sup></span> granelli.<br><br>
      Il libro si chiama <b>"Arenario"</b>.`,
    comment: ['Archimede contava la sabbia dell’universo. E io mi lamento dei compiti.', '10⁶³ granelli. Mi fa male la testa, ma in modo bello.']
  },
  batteri: {
    icon: '🦠',
    title: 'I batteri che raddoppiano',
    text: `Alcuni batteri si dividono in due circa ogni <b>20 minuti</b>.<br><br>
      Da <b>1</b> batterio, dopo 10 divisioni ne hai <span class="math-expr">2<sup>10</sup> = 1024</span>. Dopo 20 divisioni ne hai più di <b>un milione</b> (2<sup>20</sup>).<br><br>
      Per questo è importante lavarsi le mani!`,
    comment: ['Ok, vado a lavarmi le mani. Subito.', '2²⁰ batteri. Bleah, ma che matematica!']
  },
  kilobyte: {
    icon: '💻',
    title: 'Perché 1 KB vale 1024 byte',
    text: `I computer contano in <b>base 2</b>: ogni bit vale 0 oppure 1.<br><br>
      Per questo un <b>kilobyte</b> nei computer vale spesso <span class="math-expr">2<sup>10</sup> = 1024</span> byte, non 1000.<br><br>
      E <span class="math-expr">2<sup>10</sup> · 2<sup>10</sup> = 2<sup>20</sup></span> byte fanno circa un megabyte!`,
    comment: ['Il mio telefono parla in potenze di 2. Lo sapevo che era nerd.', '2¹⁰ · 2¹⁰ = 2²⁰. Stessa base, esponenti sommati. Ovunque!']
  },
  videogiochi: {
    icon: '🎮',
    title: 'Il numero 256 nei videogiochi',
    text: `Molti videogiochi vecchi salvavano i numeri in <b>8 bit</b>. Con 8 bit puoi scrivere <span class="math-expr">2<sup>8</sup> = 256</span> valori diversi: da 0 a 255.<br><br>
      Per questo in alcuni giochi classici il livello <b>256</b> si "rompe": il contatore torna a zero e lo schermo impazzisce!`,
    comment: ['Un livello che si rompe per colpa di 2⁸. Leggendario.', 'Ora capisco perché 255 è un numero così famoso.']
  },
  googol: {
    icon: '🔟',
    title: 'Il Googol',
    text: `Un <b>googol</b> è il numero <span class="math-expr">10<sup>100</sup></span>: un 1 seguito da <b>100 zeri</b>.<br><br>
      Il nome lo ha inventato un bambino di 9 anni, Milton Sirotta, nipote del matematico Edward Kasner, intorno al 1920.<br><br>
      Il motore di ricerca <b>Google</b> prende il nome proprio da questo numero!`,
    comment: ['Un bambino di 9 anni ha dato il nome a un numero gigante. Goals.', 'Google viene da 10¹⁰⁰. Lo dico a tutti domani.', '100 zeri. Il mio quaderno non basterebbe.']
  }
};

/* --------------------------------------------------------------------------
   MISSIONI SECONDARIE
   -------------------------------------------------------------------------- */
function coinsFound() { return ['coin1', 'coin2', 'coin3'].filter(flag).length; }

const QUESTS = {
  dobloni: {
    icon: '🪙', piece: 'Doblone d’oro', giverName: 'Capitana Vera',
    title: 'I dobloni di Vera',
    desc: 'Trova i 3 dobloni d’oro persi da Capitana Vera e riportaglieli.',
    flags: ['coin1', 'coin2', 'coin3'],
    progress: () => `${coinsFound()}/3`
  },
  boccali: {
    icon: '🍺', piece: 'Boccale', giverName: 'l’Oste',
    title: 'I boccali dell’Oste',
    desc: 'Trova i 3 boccali sparsi intorno alla Taverna.',
    flags: ['mug1', 'mug2', 'mug3'],
    progress: () => `${questCount('boccali')}/3`
  },
  cannocchiale: {
    icon: '🔭', piece: 'Cannocchiale', giverName: 'Archimede',
    title: 'Il cannocchiale di Archimede',
    desc: 'Riporta ad Archimede il cannocchiale rubato dai Pirati Gemelli.',
    flags: ['cannocchiale_reso'],
    progress: () => (hasItem('i2') ? 'ce l’hai!' : '0/1')
  },
  bulloni: {
    icon: '🔩', piece: 'Bullone d’oro', giverName: 'Mira e Nora',
    title: 'I bulloni delle Gemelle',
    desc: 'Trova i 3 bulloni d’oro di Mira e Nora tra officina e magazzino.',
    flags: ['bul1', 'bul2', 'bul3'],
    progress: () => `${questCount('bulloni')}/3`
  },
  diario: {
    icon: '📓', piece: 'Pagina del diario', autoStart: true,
    title: 'Il diario di Lavinia',
    desc: 'Trova le 5 pagine del diario segreto di Lavinia sparse per l’isola.',
    flags: ['dia1', 'dia2', 'dia3', 'dia4', 'dia5'],
    progress: () => `${questCount('diario')}/5`,
    onComplete: () => {
      setQuest('diario', 'done');
      addAura(150);
      ariaSays('Ho tutte e 5 le pagine del diario di Lavinia (+150 Aura). Ora capisco tante cose...');
    }
  }
};

/* --------------------------------------------------------------------------
   DIARIO DI LAVINIA (5 pagine, una per area)
   -------------------------------------------------------------------------- */
const DIARY = [
  'Giorno 1. Oggi all’Accademia hanno premiato Aria come "Esploratrice dell’anno". Io avevo fatto 100 esercizi in più. Nessuno se n’è accorto. Ho un piano.',
  'Giorno 3. I cristalli del Faro sono 5. Se li prendo io, tutti vedranno chi è la vera prima della classe. I Pirati Gemelli mi hanno aiutata per 10 dobloni. Costosi, ma ne vale la pena.',
  'Giorno 5. Ho sbagliato un calcolo: ho moltiplicato le basi invece di sommare gli esponenti. Nessuno lo deve sapere. MAI.',
  'Giorno 7. Aria sta arrivando. È più brava di quanto pensassi. Tipo... davvero brava. Ugh.',
  'Giorno 9. Forse volevo solo che qualcuno mi dicesse "brava". Se Aria arriva fin quassù, forse se lo merita lei. Ma non glielo dirò mai. Forse.'
];

function readDiary(n) {
  showReading(`📓 Diario di Lavinia – pag. ${n}`, `<i>${DIARY[n - 1]}</i>`, () =>
    collectPiece('diario', `dia${n}`, [
      'Il diario segreto di Lavinia! Non dovrei leggerlo... ma l’ho già fatto.',
      'Una pagina del diario di Lavinia. Interessante...',
      'Lavinia scrive tutto. Proprio tutto.'
    ]));
}

/* Disegno di un foglio di diario a terra. */
function diaryPageSVG(x, y) {
  return `<g transform="translate(${x} ${y}) rotate(-12)">
    <rect x="-6" y="-4" width="12" height="8" fill="#f5d0fe" stroke="#a855f7" stroke-width="0.6"/>
    <path d="M-4 -1.5 L4 -1.5 M-4 0.5 L3 0.5 M-4 2.5 L2 2.5" stroke="#7e22ce" stroke-width="0.5"/>
  </g>`;
}

/* Disegno di un oggetto da raccogliere che luccica. */
function sparkleSVG(x, y, inner) {
  return `<g transform="translate(${x} ${y})">${inner}
    <path class="spark-pop" d="M4 -6 L4.8 -3.8 L7 -3 L4.8 -2.2 L4 0 L3.2 -2.2 L1 -3 L3.2 -3.8 Z" fill="#fff" style="animation-duration:1.6s"/></g>`;
}
const MUG = '<rect x="-3.5" y="-5" width="7" height="8" rx="1" fill="#d97706" stroke="#92400e" stroke-width="0.5"/><path d="M3.5 -3 q2.5 0 2.5 2.5 q0 2.5 -2.5 2.5" stroke="#92400e" stroke-width="1" fill="none"/><path d="M-4 -5 q2 -2 4 -0.6 q2 -1.6 4 0.6 Z" fill="#fffbeb"/>';
const BOLT = '<polygon points="-3,-3 3,-3 4.5,0 3,3 -3,3 -4.5,0" fill="#fbbf24" stroke="#a16207" stroke-width="0.6"/><circle r="1.2" fill="#a16207"/>';

function takeCoin(n) {
  setFlag(`coin${n}`);
  playSound('crystal');
  refreshLabels(AREAS[state.currentArea]);
  const c = coinsFound();
  toast(`🪙 Doblone d’oro trovato! <b>${c}/3</b>`);
  if (c === 3 && questState('dobloni') === 'active') {
    ariaSays(['Tre dobloni su tre! Torno da Capitana Vera.', 'Ho tutti i dobloni. Vera, arrivo!']);
  } else {
    ariaSays(['Un doblone d’oro! Brilla più della mia aura.', 'Oro! Qualcuno l’ha perso qui.', 'Un doblone. Questo è di Vera, ci scommetto.']);
  }
}

/* --------------------------------------------------------------------------
   LAVINIA: COMPARSE ANTIPATICHE CON DOMANDA LAMPO
   -------------------------------------------------------------------------- */
const LAVINIA = {
  name: 'Lavinia',
  role: 'Rivale (molto antipatica)',
  taunts: [
    'Oh, ma guarda chi c’è: la turista della matematica. Carino lo zainetto, l’hai preso in saldo?',
    'Aria! Che sorpresa... ah no, nessuna sorpresa: sei sempre in ritardo.',
    'Ciao Aria. Io i cristalli li ho quasi tutti. Tu invece hai... un taccuino. Adorabile.',
    'Ancora tu? Pensavo fossi rimasta a giocare con i granchi.'
  ],
  challenge: [
    'Domanda lampo. Vediamo se reggi o se vai in tilt.',
    'Facciamo un test. Tanto lo so già come finisce.',
    'Una domandina facile facile. Per me, eh.'
  ],
  win: [
    'Tsk. Fortuna. Pura fortuna. Ci vediamo in cima al Faro!',
    'Ok, questa la sapevi. Non montarti la testa.',
    'Ugh. Va bene. Ma il Faro sarà mio!'
  ],
  lose: [
    'Ahahah! Lo sapevo. Torna a giocare con i granchi.',
    'Sbagliato! Dovrei postarlo per i miei follower.',
    'Che cringe. Ripassa, principiante.'
  ],
  ariaAfter: [
    'Che antipatica. Ma la batterò.',
    'Lavinia se n’è andata. Finalmente si respira.',
    'Ok, Lavinia: game on.'
  ]
};

/* Lavinia appare, provoca Aria e fa una domanda lampo sulla regola dell'area. */
function laviniaCameo(area, flagKey) {
  const who = { name: LAVINIA.name, role: LAVINIA.role, avatar: 'lavinia', speaker: 'lavinia-cameo' };
  setDialogue(who.name, who.role, who.avatar, LAVINIA.taunts, who.speaker);
  clearChoices();
  const go = () => {
    const q = generateQuestion(area);
    quickQuestion(q, { ...who, intro: say(LAVINIA.challenge) }, (ok) => {
      setDialogue(who.name, who.role, who.avatar, ok ? LAVINIA.win : LAVINIA.lose, who.speaker);
      clearChoices();
      addChoice('Continua →', () => {
        setFlag(flagKey);
        if (ok) setFlag(`${flagKey}_won`);
        setFlag(`${flagKey}_here`, false);
        refreshLabels(area);
        ariaSays(LAVINIA.ariaAfter);
      }, 'primary-action');
    });
  };
  addChoice('⚡ Accetta la sfida', go, 'primary-action');
  addChoice('<span>🙄 Ignorala</span><span>→</span>', () => {
    setDialogue(who.name, who.role, who.avatar, ['Scappi? Tipico.', 'Paura, eh? Ti capisco.', 'Ok, vai pure. Tanto perdi lo stesso.'], who.speaker);
    clearChoices();
    addChoice('⚡ Va bene, sfida accettata', go, 'primary-action');
  });
}

/* ==========================================================================
   AREA 1: IL MOLO DELLE BASI UGUALI (3 stanze)
   ========================================================================== */
(function setupMolo() {
  const A = AREAS[0];

  A.intro = [
    'Sei appena sbarcata sulla spiaggia del Molo. Il Faro in lontananza lampeggia a fatica. Tocca le cose per guardarle, leggerle o prenderle!',
    'Eccoti al Molo delle Basi Uguali! Esplora: tocca persone e oggetti. Il puntino giallo indica le cose interessanti.'
  ];
  A.startRoom = 'spiaggia';

  /* ---------- Mentore: Capitana Vera ---------- */
  A.mentor.lines = [
    ['Ehilà mozzo! Benvenuta al Molo. Io sono Capitana Vera e questa è la mia spiaggia.',
     'Ahoy, mozzo! Sono Capitana Vera. Hai la faccia di chi cerca guai... o cristalli.',
     'Ehi, tu! Sì, tu con lo zaino. Sono Capitana Vera e qui comando io.'],
    'Ascolta bene: quando due navi hanno la <b>stessa bandiera (la base)</b> e uniscono i carichi (moltiplicazione), non devi moltiplicare le basi! Tieni la <b>stessa base</b> e <b>somma gli esponenti</b>.',
    ['Guarda le casse di Barnaba sul pontile: <span class="math-expr">2<sup>3</sup> · 2<sup>4</sup> = 2<sup>3+4</sup> = 2<sup>7</sup></span>. Base ferma, esponenti sommati. Easy.',
     'Esempio lampo: <span class="math-expr">2<sup>3</sup> · 2<sup>4</sup> = 2<sup>3+4</sup> = 2<sup>7</sup></span>. La base resta 2, gli esponenti si sommano. Zero sbatti.'],
    'Ti ho trascritto la <b>Regola 1</b> nel Taccuino. Barnaba è sul pontile, a destra. Ah, e già che ci sei: ho perso <b>3 dobloni d’oro</b> qui in giro. Se li trovi, ti ricompenso!'
  ];
  A.mentor.again = () => {
    if (questState('dobloni') === 'active' && coinsFound() < 3) {
      return say([
        `Hai trovato ${coinsFound()} dobloni su 3. Cerca bene: sabbia, capanno, mare...`,
        `${coinsFound()}/3 dobloni. Non arrenderti, mozzo!`
      ]);
    }
    return say([
      'Ancora qui, mozzo? Ricorda: stessa base, esponenti sommati!',
      'Se ti serve la lezione, chiedi pure. Ma senza piangere, eh.',
      'Barnaba è sul pontile. Non farti mettere i piedi in testa!',
      'Il mare è calmo, la matematica pure. Vai e spacca.'
    ]);
  };
  A.mentor.onEnd = () => {
    if (questState('dobloni') === 'none') setQuest('dobloni', 'active');
  };
  A.mentor.extraChoices = (area) => {
    if (questState('dobloni') !== 'active' || coinsFound() < 3) return [];
    return [{
      html: '🪙 Consegna i 3 dobloni',
      cls: 'primary-action',
      fn: () => {
        setQuest('dobloni', 'done');
        addAura(100);
        playSound('victory');
        setDialogue(A.mentor.name, A.mentor.role, 'vera', [
          'I miei dobloni! Sei una vera piratessa. Ecco <b>100 Aura</b> di ricompensa!',
          'Tutti e tre! Mozzo, hai l’occhio di un’aquila. Prendi <b>100 Aura</b>!'
        ], 'mentor');
        clearChoices();
        addChoice('↩️ Continua a esplorare', () => ariaSays(null), 'primary-action');
      }
    }];
  };

  /* ---------- Guardiano: Barnaba ---------- */
  A.guardian.intro = [
    'Alt lì, baddie! Qui non si passa se non sistemi il carico. E non fare scena muta.',
    'Eccoti. Il carico è tornato, ora tocca ai conti. Pronta?',
    'Ok, cassa ripescata. Rispetto. Ma adesso si fa sul serio.'
  ];
  A.guardian.blockMsg = [
    'Ehi, frena! Non ti conosco. Prima fatti spiegare la regola da <b>Capitana Vera</b>, sulla spiaggia.',
    'Niente sfide senza lezione. Vai da <b>Capitana Vera</b> sulla spiaggia, poi ne riparliamo.'
  ];
  A.guardian.loseMsg = [
    'Fuori dal mio molo! Torna quando sai sommare gli esponenti, baddie. Ti aspetto qui.',
    'Hai perso, ma niente drammi. Ripassa e torna: io non mi muovo.',
    'Tilt totale! Rileggi il Taccuino e riprova.'
  ];
  A.guardian.winMsg = [
    'Slay! Stessa base, esponenti sommati alla perfezione. Ecco il <b>Cristallo Ambra</b> e la chiave per la Taverna. Passa pure, vera baddie della matematica!',
    'Ok, ok, mi arrendo! Sei forte. Prendi il <b>Cristallo Ambra</b> e la chiave della Taverna. Rispetto totale.'
  ];
  A.duelGate = () => (flag('cassa_ok') ? null : [
    'Alt! Il mio carico è caduto in acqua, sotto il pontile. Ripescalo e poi parliamo di matematica.',
    'Prima la cassa, poi la sfida. Regole del molo, baddie. È lì sotto, in acqua.',
    'Senza la mia cassa niente duello. Trova un modo per ripescarla!'
  ]);

  /* ---------- Cosa devo fare? ---------- */
  A.objective = () => {
    if (!state.unlockedRules.includes(A.ruleId)) return 'Parla con Capitana Vera sulla spiaggia. Ti spiega la prima regola.';
    if (!flag('cassa_ok') && !hasItem('corda') && !flag('capanno_open')) {
      return flag('read_bacheca')
        ? 'Barnaba vuole la sua cassa. Serve una corda: forse nel capanno sulla spiaggia. Il codice del lucchetto è l’esponente di 2⁵ · 2⁷.'
        : 'Barnaba vuole la sua cassa, che galleggia sotto il pontile. Ti serve una corda. Leggi la bacheca sul pontile!';
    }
    if (!flag('cassa_ok') && !hasItem('corda')) return 'Il capanno è aperto. Dentro c’è una corda: prendila!';
    if (!flag('cassa_ok')) return 'Apri lo Zaino, tocca "Usa" sulla corda, poi tocca la cassa che galleggia sotto il pontile.';
    if (!state.completedAreas.includes(A.id)) return 'La cassa è salva. Ora sfida Barnaba sul pontile!';
    if (questState('dobloni') === 'active' && coinsFound() < 3) return `Missione extra: trova i dobloni di Vera (${coinsFound()}/3).`;
    if (questState('dobloni') === 'active') return 'Porta i 3 dobloni a Capitana Vera!';
    return 'Area completata! Puoi proseguire verso la Taverna.';
  };

  /* ---------- Stanze ---------- */
  A.rooms = {
    /* ===== SPIAGGIA ===== */
    spiaggia: {
      scene: 'spiaggia',
      enter: [
        'La sabbia è tiepida. Un granchio mi guarda male.',
        'Che tramonto! Peccato per il Faro spento laggiù.',
        'Spiaggia del Molo. Odore di salsedine e di avventura.'
      ],
      layout: {
        groundY: 178,
        ariaStart: 200,
        mentor: {
          x: 108, draw: 'vera', stand: 142, label: '🏴‍☠️ Capitana Vera',
          look: ['Capitana Vera. Ha un cappello più grande del mio zaino.', 'Vera ha la spada, il cappello e l’autostima. Tutto il pacchetto.']
        }
      },
      hotspots: [
        {
          id: 'granchio', name: '🦀 Granchio', box: [82, 180, 32, 18], stand: 132,
          draw: () => `<g transform="translate(96 192)"><g class="crab-walk">
            <ellipse cx="0" cy="0" rx="7" ry="4.5" fill="#dc2626"/>
            <path d="M-6 -2 Q-12 -8 -9 -11 M6 -2 Q12 -8 9 -11" stroke="#dc2626" stroke-width="2" fill="none" stroke-linecap="round"/>
            <circle cx="-9.5" cy="-11.5" r="2.2" fill="#ef4444"/><circle cx="9.5" cy="-11.5" r="2.2" fill="#ef4444"/>
            <path d="M-5 3 L-9 6 M-2 4 L-5 7 M5 3 L9 6 M2 4 L5 7" stroke="#b91c1c" stroke-width="1"/>
            <line x1="-2" y1="-4" x2="-2.5" y2="-7" stroke="#b91c1c" stroke-width="0.8"/><line x1="2" y1="-4" x2="2.5" y2="-7" stroke="#b91c1c" stroke-width="0.8"/>
            <circle cx="-2.5" cy="-7.5" r="1.1" fill="#111"/><circle cx="2.5" cy="-7.5" r="1.1" fill="#111"/>
          </g></g>`,
          look: [
            'Un granchio. Cammina di lato, come chi non sa le regole delle potenze.',
            'Il granchio mi fissa. Ha un’aura minacciosa.',
            'Ha due chele. 2¹ chele. Ok, sto diventando nerd.'
          ]
        },
        {
          id: 'nave', name: '⛵ La nave di Vera', box: [36, 94, 74, 40], stand: 150,
          look: [
            'La nave di Capitana Vera si chiama "Base Uguale". Che nome nerd.',
            'Una nave pirata vera! Le vele hanno delle toppe a forma di 2.'
          ]
        },
        {
          id: 'palma', name: '🌴 Palma', box: [192, 66, 30, 104], stand: 206, noDot: true,
          look: ['Una palma. Niente cocchi, purtroppo.', 'Se fossi una palma, sarei una palma elevata alla seconda.']
        },
        {
          id: 'bottiglia', name: '🍾 Messaggio in bottiglia', box: [334, 178, 24, 16], stand: 330,
          draw: () => `<g transform="translate(346 189) rotate(-18)">
            <rect x="-9" y="-3.5" width="14" height="7" rx="3" fill="#16a34a" opacity="0.85"/>
            <rect x="5" y="-1.8" width="5" height="3.6" fill="#16a34a" opacity="0.85"/>
            <rect x="9.5" y="-2" width="2.6" height="4" rx="0.8" fill="#a16207"/>
            <rect x="-6" y="-1.6" width="8" height="3.2" fill="#fef3c7"/>
            <path d="M-8 -2.4 L3 -2.4" stroke="#fff" stroke-width="0.6" opacity="0.6"/>
          </g>`,
          read: () => readCuriosity('scacchiera'),
          look: 'Una bottiglia con dentro un foglio arrotolato. Classico messaggio in bottiglia!'
        },
        {
          id: 'doblone1', name: '🪙 Qualcosa che luccica', box: [220, 184, 18, 12], stand: 229,
          visible: () => !flag('coin1'),
          draw: () => `<g transform="translate(229 190)">
            <circle r="3.6" fill="#fbbf24" stroke="#a16207" stroke-width="0.8"/>
            <path class="spark-pop" d="M4 -6 L4.8 -3.8 L7 -3 L4.8 -2.2 L4 0 L3.2 -2.2 L1 -3 L3.2 -3.8 Z" fill="#fff" style="animation-duration:1.6s"/>
          </g>`,
          take: () => takeCoin(1)
        },
        {
          id: 'lucchetto', name: '🔒 Lucchetto del capanno', box: [279, 146, 16, 16], stand: 286,
          visible: () => !flag('capanno_open'),
          draw: () => `<g transform="translate(287 154)">
            <path d="M-3.5 -2 L-3.5 -5 Q0 -9 3.5 -5 L3.5 -2" stroke="#9ca3af" stroke-width="1.6" fill="none"/>
            <rect x="-5" y="-2.5" width="10" height="8" rx="1.5" fill="#fbbf24" stroke="#a16207" stroke-width="0.7"/>
            <circle cy="1.5" r="1.2" fill="#78350f"/>
          </g>`,
          use: () => openPadlock(),
          useIcon: '🔢',
          useLabel: 'Codice',
          look: ['Un lucchetto a combinazione con 2 rotelle. Serve un codice di 2 cifre.', 'Il capanno è chiuso. Il lucchetto vuole un numero di 2 cifre.']
        },
        {
          id: 'porta-aperta', box: [0, 0, 0, 0], noDot: true,
          visible: () => flag('capanno_open'),
          draw: () => `<rect x="272" y="130" width="26" height="46" fill="#1c1008"/>
            <path d="M272 130 L264 134 L264 180 L272 176 Z" fill="#78350f"/>`
        }
      ],
      exits: [
        { id: 'to-pontile', label: 'Pontile ➜', box: [362, 120, 38, 66], stand: 372, to: 'pontile', arrive: 60, labelY: 112 },
        {
          id: 'to-capanno', label: '🚪 Capanno', box: [270, 126, 30, 52], stand: 285, to: 'capanno', arrive: 70, labelY: 120,
          visible: () => flag('capanno_open')
        }
      ]
    },

    /* ===== PONTILE (scena del Molo, con Barnaba) ===== */
    pontile: {
      scene: 'molo',
      enter: [
        'Il pontile scricchiola a ogni passo.',
        'Barnaba è ancora lì, con le braccia incrociate.',
        'Le casse del carico profumano di pesce. Bleah.'
      ],
      onEnter: (first) => {
        // Lavinia compare una volta, dopo la lezione di Vera.
        if (state.unlockedRules.includes(A.ruleId) && !flag('lav0') && !flag('lav0_here')) {
          setFlag('lav0_here');
          refreshLabels(A);
          laviniaCameo(A, 'lav0');
          return true;
        }
        return false;
      },
      layout: {
        groundY: 162,
        ariaStart: 60,
        guardian: {
          x: 300, draw: 'barnaba', stand: 262, label: '🦍 Barnaba',
          look: ['Barnaba. Braccia grosse come due potenze di 10.', 'Ha gli occhiali da sole anche al tramonto. Iconico.']
        }
      },
      hotspots: [
        {
          id: 'bacheca', name: '📌 Bacheca del porto', box: [96, 112, 32, 36], stand: 112,
          draw: () => `<g transform="translate(112 158)">
            <rect x="-12" y="-40" width="3" height="40" fill="#3b2410"/><rect x="9" y="-40" width="3" height="40" fill="#3b2410"/>
            <rect x="-15" y="-46" width="30" height="28" rx="1.5" fill="#92400e" stroke="#451a03" stroke-width="1"/>
            <rect x="-12" y="-43" width="11" height="15" fill="#fef3c7" transform="rotate(-4 -6 -35)"/>
            <rect x="1" y="-42" width="11" height="13" fill="#fde68a" transform="rotate(5 6 -36)"/>
            <path d="M-10 -39 L-4 -39 M-10 -36 L-3 -36 M-10 -33 L-5 -33 M3 -38 L10 -38 M3 -35 L9 -35" stroke="#78350f" stroke-width="0.6"/>
            <circle cx="-6.5" cy="-42" r="1" fill="#dc2626"/><circle cx="6.5" cy="-41" r="1" fill="#dc2626"/>
          </g>`,
          read: () => {
            setFlag('read_bacheca');
            showReading('📌 Bacheca del porto',
              `<b>AVVISO DELLA CAPITANERIA</b><br>Il capanno degli attrezzi sulla spiaggia è chiuso con un lucchetto.<br>
               La combinazione è l’<b>esponente</b> del risultato di: <span class="math-expr">2<sup>5</sup> · 2<sup>7</sup></span><br><br>
               <b>CERCASI</b><br>3 dobloni d’oro smarriti. Ricompensa! Chiedere di Capitana Vera.`,
              () => ariaSays(['Il codice del capanno è un calcolo con le potenze. Facile... credo.', 'Stessa base, esponenti sommati: il codice ce l’ho!']));
          },
          look: 'Una bacheca con dei fogli appesi. Qualcuno ha scritto qualcosa.'
        },
        {
          id: 'cassa-acqua', name: '📦 Cassa in acqua', box: [46, 180, 34, 26], stand: 62,
          visible: () => !flag('cassa_ok'),
          draw: () => `<g transform="translate(62 196)">
            <ellipse cx="0" cy="7" rx="15" ry="2.5" fill="#93c5fd" opacity="0.4" class="shimmer"/>
            <g class="bob">
              <rect x="-10" y="-10" width="20" height="16" fill="#a16207" stroke="#713f12" stroke-width="1"/>
              <path d="M-10 -10 L10 6 M10 -10 L-10 6" stroke="#713f12" stroke-width="0.7" opacity="0.6"/>
              <text x="0" y="0.5" font-size="7" fill="#fef3c7" text-anchor="middle" font-weight="700" font-family="Courier New, monospace">2⁵</text>
            </g>
          </g>`,
          look: [
            'Una cassa del carico galleggia sotto il pontile. Senza una corda non ci arrivo.',
            'È la cassa di Barnaba! Dondola tra le onde. Mi serve qualcosa per tirarla su.'
          ],
          useItem: {
            corda: () => {
              removeItem('corda');
              setFlag('cassa_ok');
              setFlag('coin3');
              playSound('success');
              refreshLabels(A);
              toast(`🪙 Doblone d’oro trovato! <b>${coinsFound()}/3</b>`);
              ariaSays([
                'Lancio la corda... presa! La cassa è salva. E dentro c’è un doblone d’oro!',
                'Tiro, tiro... fatto! Cassa recuperata. Sorpresa: dentro c’è un doblone!'
              ]);
            }
          }
        },
        {
          id: 'cassa-salva', name: '📦 Cassa recuperata', box: [214, 136, 26, 22], stand: 226, noDot: true,
          visible: () => flag('cassa_ok'),
          draw: () => `<g transform="translate(227 147)">
            <rect x="-11" y="-11" width="22" height="22" fill="#a16207" stroke="#713f12" stroke-width="1"/>
            <path d="M-11 -11 L11 11 M11 -11 L-11 11" stroke="#713f12" stroke-width="0.7" opacity="0.6"/>
            <text x="0" y="3" font-size="8" fill="#fef3c7" text-anchor="middle" font-weight="700" font-family="Courier New, monospace">2⁵</text>
          </g>`,
          look: ['La cassa recuperata. Barnaba la guarda con amore.', 'Ancora bagnata. Odora di alghe e di vittoria.']
        },
        {
          id: 'casse', name: '📦 Casse del carico', box: [332, 112, 30, 46], stand: 322, noDot: true,
          look: ['Due casse: 2³ e 2⁴. Insieme fanno 2⁷. Vera sarebbe fiera di me.', 'Casse con le potenze scritte sopra. Su quest’isola sono tutti fissati.']
        },
        {
          id: 'lavinia', name: '👑 Lavinia', box: [182, 96, 28, 66], stand: 160, noDot: true,
          visible: () => flag('lav0_here'),
          draw: () => charSVG('lavinia', 196, 162, -1, 'char-lavinia-cameo'),
          talk: () => laviniaCameo(A, 'lav0')
        }
      ],
      exits: [
        { id: 'to-spiaggia', label: '⬅ Spiaggia', box: [0, 108, 40, 56], stand: 26, to: 'spiaggia', arrive: 360, labelY: 104 },
        {
          id: 'to-taverna', label: 'Taverna ➜', box: [362, 160, 38, 30], stand: 378, toArea: 1, labelY: 176,
          visible: () => state.completedAreas.includes(0)
        }
      ]
    },

    /* ===== CAPANNO ===== */
    capanno: {
      scene: 'capanno',
      enter: [
        'Il capanno è pieno di reti e corde.',
        'Qui dentro c’è un sacco di roba utile. E polvere.',
        'Che disordine! Però magari trovo qualcosa.'
      ],
      layout: { groundY: 182, ariaStart: 70 },
      hotspots: [
        {
          id: 'corda', name: '🪢 Corda', box: [234, 164, 34, 18], stand: 250,
          visible: () => !hasItem('corda') && !flag('cassa_ok'),
          draw: () => `<g transform="translate(250 176)">
            <ellipse rx="14" ry="5" fill="none" stroke="#d6b88a" stroke-width="2.4"/>
            <ellipse rx="10" ry="3.6" fill="none" stroke="#c4a574" stroke-width="2.2"/>
            <ellipse rx="6" ry="2.2" fill="none" stroke="#d6b88a" stroke-width="2"/>
            <path d="M13 1 Q20 4 18 -6" stroke="#d6b88a" stroke-width="2" fill="none"/>
          </g>`,
          take: () => {
            giveItem('corda');
            refreshLabels(A);
            ariaSays(['Una corda robusta. Perfetta per ripescare qualcosa!', 'Presa! Con questa posso tirare su anche un elefante. O una cassa.']);
          },
          look: 'Un rotolo di corda. Sembra resistente.'
        },
        {
          id: 'doblone2', name: '🪙 Qualcosa che luccica', box: [320, 96, 16, 12], stand: 322,
          visible: () => !flag('coin2'),
          draw: () => `<g transform="translate(328 104)">
            <circle r="3.6" fill="#fbbf24" stroke="#a16207" stroke-width="0.8"/>
            <path class="spark-pop" d="M4 -6 L4.8 -3.8 L7 -3 L4.8 -2.2 L4 0 L3.2 -2.2 L1 -3 L3.2 -3.8 Z" fill="#fff" style="animation-duration:1.6s"/>
          </g>`,
          take: () => takeCoin(2)
        },
        {
          id: 'poster', name: '📜 Poster "Googol"', box: [168, 34, 52, 60], stand: 194,
          read: () => readCuriosity('googol'),
          look: 'Un poster con scritto 10¹⁰⁰. Chi appende un numero in un capanno? Un pirata nerd.'
        },
        {
          id: 'mappa', name: '🗺️ Mappa', box: [86, 128, 68, 22], stand: 120,
          look: [
            'Una mappa dell’isola: Molo, Taverna, Torre, Serra, Officina e il Faro in cima. Sei tappe, sei regole.',
            'Sulla mappa qualcuno ha cerchiato il Faro in rosso. E ha scritto "LAVINIA WAS HERE". Che nervi.'
          ]
        },
        {
          id: 'diario1', name: '📓 Un quaderno viola', box: [354, 132, 22, 14], stand: 340,
          visible: () => !flag('dia1'),
          draw: () => diaryPageSVG(366, 138),
          read: () => readDiary(1),
          look: 'Un foglio viola con una corona disegnata sopra. Mi ricorda qualcuno...'
        },
        {
          id: 'rete', name: '🕸️ Rete da pesca', box: [62, 28, 82, 70], stand: 104, noDot: true,
          look: ['Una rete da pesca. Ha un buco enorme. Il pesce ringrazia.', 'Una rete con dei galleggianti. Uno, due, quattro, otto... ok basta.']
        }
      ],
      exits: [
        { id: 'to-spiaggia2', label: '🚪 Esci', box: [10, 94, 40, 88], stand: 40, to: 'spiaggia', arrive: 285, labelY: 90 }
      ]
    }
  };

  /* Lucchetto del capanno: il codice è l'esponente di 2⁵ · 2⁷ = 2¹². */
  function openPadlock() {
    askCode({
      title: 'Lucchetto del capanno',
      prompt: flag('read_bacheca')
        ? 'Due rotelle con i numeri da 0 a 9. Il codice è l’<b>esponente</b> di <span class="math-expr">2<sup>5</sup> · 2<sup>7</sup></span>.'
        : 'Due rotelle con i numeri da 0 a 9. Serve un codice di 2 cifre. Forse qualcuno l’ha scritto da qualche parte...',
      answer: '12',
      onSuccess: () => {
        setFlag('capanno_open');
        refreshLabels(A);
        ariaSays(['Click! Il lucchetto si apre. 5 + 7 = 12, ovvio!', 'Aperto! Stessa base, esponenti sommati: 2¹². Too easy.']);
      }
    });
  }
})();
