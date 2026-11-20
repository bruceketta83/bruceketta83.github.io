/* ==========================================================================
   DATABASE DIDATTICO (IL TACCUINO)
   ========================================================================== */
const RULES_DATA = [
  {
    id: 'prod_same_base',
    title: '1. Prodotto con la stessa base',
    short: 'Prodotto, stessa base',
    formula: 'a<sup>m</sup> · a<sup>n</sup> = a<sup>m + n</sup>',
    desc: 'Quando moltiplichi due potenze che hanno la <b>stessa base</b>, il risultato è una potenza che ha per base la stessa base e per esponente la <b>somma degli esponenti</b>.',
    example: 'Esempio: 2<sup>3</sup> · 2<sup>4</sup> = 2<sup>3+4</sup> = 2<sup>7</sup>'
  },
  {
    id: 'quot_same_base',
    title: '2. Quoziente con la stessa base',
    short: 'Quoziente, stessa base',
    formula: 'a<sup>m</sup> : a<sup>n</sup> = a<sup>m − n</sup>',
    desc: 'Quando dividi due potenze che hanno la <b>stessa base</b>, il risultato è una potenza che ha per base la stessa base e per esponente la <b>differenza degli esponenti</b>.',
    example: 'Esempio: 5<sup>7</sup> : 5<sup>2</sup> = 5<sup>7−2</sup> = 5<sup>5</sup>'
  },
  {
    id: 'pow_of_pow',
    title: '3. Potenza di una potenza',
    short: 'Potenza di potenza',
    formula: '(a<sup>m</sup>)<sup>n</sup> = a<sup>m · n</sup>',
    desc: 'Quando elevi una potenza a un altro esponente, il risultato è una potenza che ha per base la stessa base e per esponente il <b>prodotto degli esponenti</b>.',
    example: 'Esempio: (3<sup>2</sup>)<sup>4</sup> = 3<sup>2·4</sup> = 3<sup>8</sup>'
  },
  {
    id: 'zero_one_exp',
    title: '4. Esponente 0 e Esponente 1',
    short: 'Esponente 0 e 1',
    formula: 'a<sup>0</sup> = 1 (con a ≠ 0)  |  a<sup>1</sup> = a',
    desc: 'Qualsiasi numero diverso da zero elevato a <b>0</b> dà sempre <b>1</b>. Qualsiasi numero elevato a <b>1</b> rimane se stesso. Attenzione: <b>0<sup>0</sup> non ha significato</b>.',
    example: 'Esempio: 458<sup>0</sup> = 1  |  9<sup>1</sup> = 9'
  },
  {
    id: 'same_exp',
    title: '5. Prodotto e Quoziente con stesso esponente',
    short: 'Stesso esponente',
    formula: 'a<sup>n</sup> · b<sup>n</sup> = (a · b)<sup>n</sup>  |  a<sup>n</sup> : b<sup>n</sup> = (a : b)<sup>n</sup>',
    desc: 'Se due potenze hanno lo <b>stesso esponente</b> ma basi diverse, si moltiplicano (o dividono) prima le basi e si lascia lo <b>stesso esponente</b>.',
    example: 'Esempio: 2<sup>3</sup> · 5<sup>3</sup> = (2 · 5)<sup>3</sup> = 10<sup>3</sup>'
  }
];

/* ==========================================================================
   AREE, PERSONAGGI, DIALOGHI E SFIDE
   layout: posizioni nella scena SVG (viewBox 400 x 220).
     groundY  = linea dei piedi dei personaggi disegnati
     ariaY    = linea dei piedi di Aria (se diversa)
     mentor / guardian:
       x      = centro del personaggio
       stand  = punto dove Aria si ferma per parlare
       draw   = nome del personaggio SVG animato (scenes.js)
       top/bottom = area toccabile per le scene ancora statiche
   maxHp: colpi necessari per vincere il duello.
   ========================================================================== */
const AREAS = [
  {
    id: 0,
    name: '1. Il Molo delle Basi Uguali',
    ruleId: 'prod_same_base',
    music: 'shanty',
    maxHp: 3,
    scene: 'molo',
    layout: {
      groundY: 162,
      ariaStart: 196,
      mentor: { x: 88, draw: 'vera', stand: 122, label: '🏴‍☠️ Capitana Vera' },
      guardian: { x: 300, draw: 'barnaba', stand: 262, label: '🦍 Barnaba' }
    },
    crystal: { id: 'c1', name: 'Cristallo Ambra', icon: '🟠', desc: 'Pulsa con l’energia della somma degli esponenti.' },
    item: { id: 'i1', name: 'Chiave della Taverna', icon: '🗝️', desc: 'Consegnata da Barnaba dopo aver sistemato il carico.' },
    intro: 'Sei appena sbarcata al Molo delle Basi Uguali. Il Faro in lontananza lampeggia a fatica. Tocca <b>Capitana Vera</b> per ripassare la prima regola, poi affronta <b>Barnaba</b>!',
    mentor: {
      name: 'Capitana Vera',
      role: 'Mentore • Prodotto con stessa base',
      avatar: '🏴‍☠️',
      lines: [
        'Ehilà mozzo! Vuoi entrare alla Taverna? Barnaba non fa passare nessuno che non sappia fare i conti con le casse del carico.',
        'Ascolta bene: quando due navi hanno la <b>stessa bandiera (la base)</b> e uniscono i carichi (moltiplicazione), non devi moltiplicare le basi! Tieni la <b>stessa base</b> e <b>somma gli esponenti</b>.',
        'Guarda le casse vicino a Barnaba: <span class="math-expr">2<sup>3</sup> · 2<sup>4</sup> = 2<sup>3+4</sup> = 2<sup>7</sup></span>. Base ferma, esponenti sommati. Easy.',
        'Ti ho appena trascritto la <b>Regola 1</b> nel tuo Taccuino. Dagli un’occhiata quando vuoi e vai a zittire Barnaba!'
      ]
    },
    guardian: {
      name: 'Barnaba il Buttafuori',
      role: 'Guardiano del Molo',
      avatar: '🦍',
      intro: 'Alt lì, baddie! Qui non si passa se non sistemi il carico. E non fare scena muta.',
      blockMsg: 'Ehi, frena! Non ti conosco. Prima fatti spiegare la regola da <b>Capitana Vera</b>, poi torna qui.',
      loseMsg: 'Fuori dal mio molo! Torna quando sai sommare gli esponenti, baddie. Ti aspetto qui.',
      questions: [
        {
          prompt: 'Ho due casse. Calcola il prodotto: <span class="math-expr">2<sup>3</sup> · 2<sup>4</sup></span>',
          steps: '2<sup>3</sup> · 2<sup>4</sup> = 2<sup>3+4</sup> = 2<sup>7</sup>',
          options: [
            { text: '2⁷', correct: true },
            { text: '2¹²', correct: false, msg: 'Bro, hai moltiplicato gli esponenti! Nemmeno Fabri Fibra nei suoi testi più paranoici farebbe un errore così. Stessa base = gli esponenti si SOMMANO!' },
            { text: '4⁷', correct: false, msg: 'Hai moltiplicato le basi! Le basi restano ferme come Marracash sul trono. Riprova!' },
            { text: '6⁷', correct: false, msg: 'Six seven?! Ma che stai facendo, il balletto su TikTok?! Qui le basi sono 2, non fare il fenomeno!' }
          ]
        },
        {
          prompt: 'Ok, fortuna del principiante. Fammi questa: <span class="math-expr">5<sup>2</sup> · 5 · 5<sup>3</sup></span> (ricorda che 5 = 5<sup>1</sup>)',
          steps: '5<sup>2</sup> · 5<sup>1</sup> · 5<sup>3</sup> = 5<sup>2+1+3</sup> = 5<sup>6</sup>',
          options: [
            { text: '5⁶', correct: true },
            { text: '5⁵', correct: false, msg: 'Cringe! Hai dimenticato che il 5 da solo ha esponente 1 nascosto! 2 + 1 + 3 fa 6!' },
            { text: '125⁶', correct: false, msg: 'Non devi moltiplicare 5 · 5 · 5! La base resta 5, somma solo gli esponenti.' },
            { text: '5⁷', correct: false, msg: 'Quasi, ma hai contato un esponente di troppo. Somma bene: 2 + 1 + 3.' }
          ]
        }
      ],
      winMsg: 'Slay! Stessa base, esponenti sommati alla perfezione. Ecco il <b>Cristallo Ambra</b> e la chiave per la Taverna. Passa pure, vera baddie della matematica!'
    }
  },
  {
    id: 1,
    name: '2. La Taverna del Quoziente',
    ruleId: 'quot_same_base',
    music: 'tavern',
    maxHp: 3,
    layout: {
      groundY: 172,
      ariaStart: 190,
      mentor: { x: 100, top: 100, bottom: 165, stand: 135, label: '🍺 Oste Bartolomeo' },
      guardian: { x: 275, top: 101, bottom: 165, stand: 240, label: '🎲 Pirati Gemelli' }
    },
    crystal: { id: 'c2', name: 'Cristallo Ciano', icon: '🔵', desc: 'Brilla della luce fredda della sottrazione.' },
    item: { id: 'i2', name: 'Cannocchiale Ottico', icon: '🔭', desc: 'Vinto ai dadi contro i Pirati Gemelli.' },
    svgBg: `
      <rect width="400" height="220" fill="#291509"/>
      <rect x="20" y="25" width="110" height="75" rx="6" fill="#0f172a" stroke="#78350f" stroke-width="4"/>
      <circle cx="95" cy="50" r="10" fill="#fef08a" opacity="0.6"/>
      <rect x="0" y="165" width="400" height="55" fill="#451a03"/>
      <circle cx="100" cy="115" r="15" fill="#fed7aa"/>
      <rect x="82" y="130" width="36" height="35" rx="6" fill="#d97706"/>
      <circle cx="275" cy="115" r="14" fill="#fde68a"/>
      <rect x="255" y="129" width="40" height="36" rx="6" fill="#be123c"/>
    `,
    intro: 'La Taverna del Quoziente è piena di fumo e risate. L’Oste Bartolomeo sta lucidando i boccali, mentre i Pirati Gemelli giocano a dadi in un angolo.',
    mentor: {
      name: 'Oste Bartolomeo',
      role: 'Mentore • Quoziente con stessa base',
      avatar: '🍺',
      lines: [
        'Benvenuta nella Taverna! Quei due pirati laggiù hanno rubato il cannocchiale dell’Osservatorio e il Cristallo Ciano.',
        'Per batterli ti serve la regola della <b>divisione (quoziente)</b>: se due potenze hanno la <b>stessa base</b>, mantieni la base e <b>sottrai gli esponenti</b>.',
        'Ho aggiornato il tuo Taccuino con la <b>Regola 2</b>. Vai a riprenderti ciò che è nostro!'
      ]
    },
    guardian: {
      name: 'I Pirati Gemelli',
      role: 'Guardiani del Tavolo',
      avatar: '🎲',
      intro: 'Ehi ragazzina, qui si gioca pesante! Vuoi il Cannocchiale e il Cristallo? Risolvi queste divisioni senza andare in tilt!',
      blockMsg: 'Al nostro tavolo si siede solo chi conosce le regole! Parla prima con l’<b>Oste Bartolomeo</b>.',
      loseMsg: 'Ahah, sei andata in tilt! Ripassa la Regola 2 e torna al tavolo, se hai il coraggio.',
      questions: [
        {
          prompt: 'Riduci a potenza unica: <span class="math-expr">7<sup>8</sup> : 7<sup>3</sup></span>',
          steps: '7<sup>8</sup> : 7<sup>3</sup> = 7<sup>8−3</sup> = 7<sup>5</sup>',
          options: [
            { text: '7⁵', correct: true },
            { text: '7¹¹', correct: false, msg: 'Hai sommato invece di sottrarre! C’è il simbolo di DIVISO (:), non per!' },
            { text: '1⁵', correct: false, msg: 'Non devi fare 7 : 7 = 1! La base resta 7, sottrai solo gli esponenti.' },
            { text: '6⁷', correct: false, msg: 'Ancora con sto six seven?! Dai focus, fai 8 meno 3!' }
          ]
        },
        {
          prompt: 'Seconda mano! Calcola: <span class="math-expr">10<sup>9</sup> : 10<sup>4</sup> : 10<sup>2</sup></span>',
          steps: '10<sup>9</sup> : 10<sup>4</sup> : 10<sup>2</sup> = 10<sup>9−4−2</sup> = 10<sup>3</sup>',
          options: [
            { text: '10³', correct: true },
            { text: '10⁷', correct: false, msg: 'Hai sottratto 4 ma poi hai sommato 2! Si sottraggono tutti: 9 − 4 − 2 = 3.' },
            { text: '10⁵', correct: false, msg: 'Ti sei fermata a metà! Devi togliere anche il 2 finale.' },
            { text: '1³', correct: false, msg: 'La base 10 non si divide! Resta 10 elevato a 3.' }
          ]
        }
      ],
      winMsg: 'Incredibile, ci ha ripuliti! Prendi pure il <b>Cristallo Ciano</b> e il <b>Cannocchiale</b>. Hai un’aura spaventosa!'
    }
  },
  {
    id: 2,
    name: "3. La Torre dell'Osservatorio",
    ruleId: 'pow_of_pow',
    music: 'mystery',
    maxHp: 3,
    layout: {
      groundY: 192,
      ariaStart: 195,
      mentor: { x: 105, top: 121, bottom: 185, stand: 140, label: '🔭 Archimede' },
      guardian: { x: 297, top: 105, bottom: 180, stand: 258, label: '⚙️ Ascensore' }
    },
    crystal: { id: 'c3', name: 'Cristallo Viola', icon: '🟣', desc: 'Vibra con la forza della potenza di potenza.' },
    item: { id: 'i3', name: 'Lente Stellare', icon: '🔍', desc: 'Calibrata in cima alla Torre.' },
    svgBg: `
      <rect width="400" height="220" fill="#1e1b4b"/>
      <circle cx="80" cy="40" r="2" fill="#fff"/><circle cx="200" cy="30" r="2" fill="#fff"/>
      <circle cx="340" cy="60" r="3" fill="#fde047"/><circle cx="150" cy="70" r="2" fill="#fff"/>
      <polygon points="140,220 170,60 230,60 260,220" fill="#312e81"/>
      <path d="M160 60 Q200 15 240 60 Z" fill="#4f46e5"/>
      <circle cx="105" cy="135" r="14" fill="#fed7aa"/>
      <rect x="91" y="149" width="28" height="36" rx="5" fill="#0d9488"/>
      <rect x="270" y="105" width="54" height="75" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="3"/>
    `,
    intro: 'Sei ai piedi della Torre dell’Osservatorio. Il Bibliotecario Archimede sta sistemando delle lenti sovrapposte accanto all’ascensore bloccato.',
    mentor: {
      name: 'Bibliotecario Archimede',
      role: 'Mentore • Potenza di potenza',
      avatar: '🔭',
      lines: [
        'Oh, il mio cannocchiale! Grazie mille! Guarda come funziona: se metti una lente che ingrandisce <span class="math-expr">2<sup>3</sup></span> dentro un’altra lente che eleva tutto alla <span class="math-expr">2</span>...',
        'In una <b>potenza di potenza</b> <span class="math-expr">(a<sup>m</sup>)<sup>n</sup></span>, la base rimane uguale e gli esponenti si <b>MOLTIPLICANO</b> tra loro!',
        'Ho annotato la <b>Regola 3</b> nel tuo Taccuino. Ora calibra i contrappesi dell’ascensore!'
      ]
    },
    guardian: {
      name: "Terminale dell'Ascensore",
      role: 'Meccanismo di Sicurezza',
      avatar: '⚙️',
      intro: 'BEEP! Accesso alla cupola bloccato. Inserire il valore corretto dei contrappesi per attivare il motore.',
      blockMsg: 'BEEP! Utente non autorizzato. Consultare il <b>Bibliotecario Archimede</b> per la procedura.',
      loseMsg: 'ERRORE CRITICO. Accesso negato. Consultare il Taccuino e riprovare.',
      questions: [
        {
          prompt: 'Calibra il primo contrappeso: <span class="math-expr">(3<sup>2</sup>)<sup>4</sup></span>',
          steps: '(3<sup>2</sup>)<sup>4</sup> = 3<sup>2·4</sup> = 3<sup>8</sup>',
          options: [
            { text: '3⁸', correct: true },
            { text: '3⁶', correct: false, msg: 'Errore di sistema! Hai sommato 2 + 4! Nella potenza di potenza gli esponenti si MOLTIPLICANO (2 · 4).' },
            { text: '6⁴', correct: false, msg: 'Hai moltiplicato la base per l’esponente (3 · 2)! La base 3 resta ferma, moltiplica gli esponenti.' },
            { text: '6⁷', correct: false, msg: 'BEEP! Meme rilevato, ma risposta sbagliata. Fai 2 per 4!' }
          ]
        },
        {
          prompt: 'Secondo contrappeso: <span class="math-expr">[(2<sup>3</sup>)<sup>2</sup>]<sup>2</sup></span>',
          steps: '[(2<sup>3</sup>)<sup>2</sup>]<sup>2</sup> = 2<sup>3·2·2</sup> = 2<sup>12</sup>',
          options: [
            { text: '2¹²', correct: true },
            { text: '2⁷', correct: false, msg: 'Hai sommato 3 + 2 + 2! Devi moltiplicarli tutti: 3 · 2 · 2 = 12!' },
            { text: '2⁸', correct: false, msg: 'Quasi, hai fatto 3 · 2 = 6 e poi hai sommato 2! Moltiplica anche l’ultimo 2.' },
            { text: '4¹²', correct: false, msg: 'La base 2 non cambia mai! Resta 2 elevato a 12.' }
          ]
        }
      ],
      winMsg: 'ACCESSO CONSENTITO! L’ascensore sale fino alla cima e rilascia il <b>Cristallo Viola</b> e la <b>Lente Stellare</b>!'
    }
  },
  {
    id: 3,
    name: '4. La Serra degli Esponenti Zero',
    ruleId: 'zero_one_exp',
    music: 'mystery',
    maxHp: 3,
    layout: {
      groundY: 182,
      ariaStart: 185,
      mentor: { x: 95, top: 105, bottom: 173, stand: 130, label: '🕶️ Madame Zeri' },
      guardian: { x: 285, top: 71, bottom: 180, stand: 248, label: '🌺 Pianta Carnivora' }
    },
    crystal: { id: 'c4', name: 'Cristallo Smeraldo', icon: '🟢', desc: 'Racchiude il potere assoluto dell’unità.' },
    item: { id: 'i4', name: 'Seme Luminescente', icon: '🌱', desc: 'Donato da Madame Zeri.' },
    svgBg: `
      <rect width="400" height="220" fill="#064e3b"/>
      <path d="M0 40 L400 40 M0 100 L400 100 M100 0 L100 220 M300 0 L300 220" stroke="#10b981" stroke-width="2" opacity="0.25"/>
      <circle cx="95" cy="120" r="15" fill="#fed7aa"/>
      <rect x="82" y="114" width="26" height="7" fill="#0f172a"/>
      <rect x="80" y="135" width="30" height="38" rx="6" fill="#ec4899"/>
      <path d="M280 180 Q270 130 285 105" stroke="#22c55e" stroke-width="8" fill="none"/>
      <circle cx="285" cy="95" r="24" fill="#be185d"/>
      <polygon points="265,95 285,82 305,95 285,108" fill="#fef08a"/>
    `,
    intro: 'L’aria nella Serra è umida e profuma di ozono. Madame Zeri indossa occhiali da sole anche al chiuso, mentre una pianta gigante ringhia davanti al Cristallo Smeraldo.',
    mentor: {
      name: 'Madame Zeri',
      role: 'Mentore • Esponente 0 e 1',
      avatar: '🕶️',
      lines: [
        'Tesoro, qui dentro vige la legge della Vera Baddie: non importa quanto un numero sia gigante o spaventoso, se lo elevi a <b>0</b> diventa subito <b>1</b>. Zero drama, zero sbatti.',
        'Ricorda solo due cose: <b>qualsiasi numero (tranne zero) elevato a 0 fa 1</b>, mentre <b>qualsiasi numero elevato a 1 resta se stesso</b>. E 0<sup>0</sup> non esiste!',
        'Ho inserito la <b>Regola 4</b> nel Taccuino. Vai a potare quella piantina!'
      ]
    },
    guardian: {
      name: 'Pianta Carnivora Gigante',
      role: 'Guardiana della Serra',
      avatar: '🌺',
      intro: 'GRRR! Se non mi riduci all’unità, ti mangio lo zaino! Quanto fa questa roba?!',
      blockMsg: 'GRRR! Chi sei? Prima vai da <b>Madame Zeri</b>, poi forse non ti mangio.',
      loseMsg: 'GNAM! Mi sono mangiata il tuo zaino... scherzo. Ripassa la Regola 4 e riprova!',
      questions: [
        {
          prompt: 'Calcola al volo: <span class="math-expr">(458<sup>3</sup> · 458<sup>9</sup>)<sup>0</sup></span>',
          steps: '(458<sup>3</sup> · 458<sup>9</sup>)<sup>0</sup> = 1 &nbsp;(tutto elevato a 0 fa 1)',
          options: [
            { text: '1', correct: true },
            { text: '0', correct: false, msg: 'Cringe! Un numero elevato a zero non fa zero, fa UNO! Riprova prima che ti morda!' },
            { text: '458¹²', correct: false, msg: 'Ti sei messa a fare i conti dentro la parentesi?! C’era uno ZERO fuori! Come dice Fibra: "Non c’è problema, tranne te"!' },
            { text: '458', correct: false, msg: 'Quello sarebbe con esponente 1! Con esponente 0 il risultato è sempre 1.' }
          ]
        },
        {
          prompt: 'Attenta al trabocchetto! Quale di queste scritture <b>NON ha significato</b> in matematica?',
          steps: '0<sup>0</sup> non ha significato. Tutte le altre sì.',
          options: [
            { text: '0⁰', correct: true },
            { text: '1⁰', correct: false, msg: '1 elevato a 0 fa tranquillamente 1! C’è un’altra espressione impossibile.' },
            { text: '0¹', correct: false, msg: '0 elevato a 1 fa 0, è validissimo! Cerca lo zero elevato a zero.' },
            { text: '99⁰', correct: false, msg: '99 elevato a 0 fa 1. Riguarda la Regola 4 nel Taccuino!' }
          ]
        }
      ],
      winMsg: 'GNAM... La pianta si rimpicciolisce fino a diventare un fiorellino alto 1 centimetro! Ottieni il <b>Cristallo Smeraldo</b> e il <b>Seme Luminescente</b>.'
    }
  },
  {
    id: 4,
    name: "5. L'Officina Steampunk",
    ruleId: 'same_exp',
    music: 'workshop',
    maxHp: 3,
    layout: {
      groundY: 178,
      ariaStart: 190,
      mentor: { x: 103, top: 112, bottom: 170, stand: 150, label: '👯‍♀️ Mira & Nora' },
      guardian: { x: 284, top: 95, bottom: 150, stand: 248, label: '🤖 Automa' }
    },
    crystal: { id: 'c5', name: 'Cristallo Rubino', icon: '🔴', desc: 'L’ultimo cristallo! Arde di energia pura.' },
    item: { id: 'i5', name: "Chiave Inglese d'Oro", icon: '🔧', desc: 'Forgiata dalle Gemelle Mira e Nora.' },
    svgBg: `
      <rect width="400" height="220" fill="#27272a"/>
      <circle cx="70" cy="65" r="32" fill="none" stroke="#f59e0b" stroke-width="6" stroke-dasharray="10 6"/>
      <circle cx="330" cy="55" r="24" fill="none" stroke="#06b6d4" stroke-width="5" stroke-dasharray="8 5"/>
      <circle cx="85" cy="125" r="13" fill="#fed7aa"/>
      <rect x="73" y="138" width="24" height="32" rx="4" fill="#0284c7"/>
      <circle cx="122" cy="125" r="13" fill="#fed7aa"/>
      <rect x="110" y="138" width="24" height="32" rx="4" fill="#7c3aed"/>
      <rect x="260" y="95" width="48" height="55" rx="8" fill="#64748b" stroke="#cbd5e1" stroke-width="2"/>
      <circle cx="275" cy="115" r="5" fill="#ef4444"/><circle cx="293" cy="115" r="5" fill="#ef4444"/>
    `,
    intro: 'Ingranaggi dorati girano sulle pareti dell’Officina. Le gemelle Mira e Nora stanno riparando un enorme Automa che sbarra il cancello verso il Faro.',
    mentor: {
      name: 'Gemelle Mira e Nora',
      role: 'Mentori • Stesso esponente',
      avatar: '👯‍♀️',
      lines: [
        'Mira: "Io e Nora abbiamo gusti diversi (basi diverse), ma portiamo gli stessi occhiali (<b>stesso esponente</b>)!"',
        'Nora: "Esatto! Quando moltiplichi o dividi potenze con lo <b>stesso esponente</b>, fai prima l’operazione tra le basi e lasci lo stesso esponente!"',
        'Abbiamo scritto la <b>Regola 5</b> nel tuo Taccuino. Ora sblocca l’Automa!'
      ]
    },
    guardian: {
      name: 'Automa del Cancello',
      role: 'Guardiano del Faro',
      avatar: '🤖',
      intro: 'PROTOCOLLO DI BLOCCO ATTIVO. Fondere gli ingranaggi con lo stesso esponente per aprire il passaggio.',
      blockMsg: 'ACCESSO NEGATO. Richiesta autorizzazione delle <b>Gemelle Mira e Nora</b>.',
      loseMsg: 'PROTOCOLLO DI ESPULSIONE. Ricalibrare le conoscenze e riprovare.',
      questions: [
        {
          prompt: 'Fondi gli ingranaggi: <span class="math-expr">2<sup>4</sup> · 5<sup>4</sup></span>',
          steps: '2<sup>4</sup> · 5<sup>4</sup> = (2 · 5)<sup>4</sup> = 10<sup>4</sup>',
          options: [
            { text: '10⁴', correct: true },
            { text: '10⁸', correct: false, msg: 'ERRORE! Hai moltiplicato le basi E hai sommato gli esponenti! L’esponente resta 4!' },
            { text: '7⁴', correct: false, msg: 'Hai sommato 2 + 5! C’è il segno PER (·), devi fare 2 · 5 = 10.' },
            { text: '10¹⁶', correct: false, msg: 'Troppo alto! Non moltiplicare gli esponenti, lascia 4.' }
          ]
        },
        {
          prompt: 'Dividi la potenza: <span class="math-expr">18<sup>5</sup> : 6<sup>5</sup></span>',
          steps: '18<sup>5</sup> : 6<sup>5</sup> = (18 : 6)<sup>5</sup> = 3<sup>5</sup>',
          options: [
            { text: '3⁵', correct: true },
            { text: '3⁰', correct: false, msg: 'Non sottrarre gli esponenti! Qui l’esponente 5 resta uguale, devi solo fare 18 : 6!' },
            { text: '12⁵', correct: false, msg: 'Hai fatto 18 − 6 invece di 18 : 6! Dividi le basi: 18 diviso 6 fa 3.' },
            { text: '3¹⁰', correct: false, msg: 'L’esponente resta 5! Non sommarlo.' }
          ]
        }
      ],
      winMsg: 'CLANK! Il cancello del Faro si spalanca! Hai recuperato il <b>Cristallo Rubino</b> (5/5) e la <b>Chiave Inglese d’Oro</b>!'
    }
  },
  {
    id: 5,
    name: '6. La Cima del Faro (Duello Finale)',
    ruleId: null,
    music: 'boss',
    maxHp: 4,
    layout: {
      groundY: 182,
      ariaStart: 120,
      guardian: { x: 285, top: 95, bottom: 173, stand: 248, label: '👑 Lavinia' }
    },
    crystal: null,
    item: null,
    svgBg: `
      <rect width="400" height="220" fill="#090d16"/>
      <polygon points="200,30 400,0 400,110" fill="#fef08a" opacity="0.22"/>
      <polygon points="200,30 0,0 0,110" fill="#fef08a" opacity="0.22"/>
      <circle cx="200" cy="45" r="22" fill="#f59e0b"/>
      <rect x="175" y="67" width="50" height="153" fill="#cbd5e1"/>
      <circle cx="285" cy="120" r="15" fill="#fed7aa"/>
      <path d="M270 112 Q285 95 300 112 L305 140 L265 140 Z" fill="#a855f7"/>
      <rect x="271" y="135" width="28" height="38" rx="6" fill="#ec4899"/>
    `,
    intro: 'Sei in cima al Faro con tutti e 5 i Cristalli! Lavinia è davanti al piedistallo centrale, circondata da scintille fuori controllo. È il momento del Duello Finale!',
    mentor: null,
    guardian: {
      name: 'Lavinia, la Rivalessa',
      role: "Boss Finale dell'Accademia",
      avatar: '👑',
      intro: 'Pensi davvero di battermi, Aria? Io ho l’aura da prima della classe! Vediamo se reggi questi round combinati!',
      loseMsg: 'Visto? L’aura da prima della classe è mia. Ripassa il Taccuino e torna, se hai coraggio!',
      questions: [
        {
          rule: 'pow_of_pow',
          prompt: 'Risolvi in due passaggi: <span class="math-expr">(2<sup>3</sup>)<sup>2</sup> : 2<sup>4</sup></span>',
          steps: '(2<sup>3</sup>)<sup>2</sup> = 2<sup>6</sup> → 2<sup>6</sup> : 2<sup>4</sup> = 2<sup>2</sup>',
          options: [
            { text: '2²', correct: true },
            { text: '2¹', correct: false, msg: 'Lavinia ride: "Ah! Hai fatto 3 + 2 = 5 invece di 3 · 2 = 6! Riprova!"' },
            { text: '2¹⁰', correct: false, msg: 'Lavinia: "Alla fine c’era un DIVISO, non un per! 6 meno 4 fa 2!"' },
            { text: '1²', correct: false, msg: 'Lavinia: "La base 2 resta 2, principiante!"' }
          ]
        },
        {
          rule: 'prod_same_base',
          prompt: 'Stabilizza il nucleo! <span class="math-expr">(3<sup>4</sup> · 3<sup>2</sup>) : 3<sup>5</sup></span>',
          steps: '3<sup>4</sup> · 3<sup>2</sup> = 3<sup>6</sup> → 3<sup>6</sup> : 3<sup>5</sup> = 3<sup>1</sup> = 3',
          options: [
            { text: '3¹  (cioè 3)', correct: true },
            { text: '3³', correct: false, msg: 'Lavinia: "Hai sottratto invece di sommare dentro la parentesi! 4 + 2 = 6, poi 6 − 5 = 1!"' },
            { text: '3¹¹', correct: false, msg: 'Lavinia: "Non puoi sommare tutto! L’ultimo è un diviso!"' },
            { text: '0', correct: false, msg: 'Lavinia: "3 elevato a 1 fa 3, non zero!"' }
          ]
        },
        {
          rule: 'same_exp',
          prompt: 'L’onda d’urto! <span class="math-expr">(2<sup>5</sup> · 5<sup>5</sup>) : 10<sup>3</sup></span>',
          steps: '2<sup>5</sup> · 5<sup>5</sup> = 10<sup>5</sup> → 10<sup>5</sup> : 10<sup>3</sup> = 10<sup>2</sup>',
          options: [
            { text: '10²', correct: true },
            { text: '10⁷', correct: false, msg: 'Lavinia: "Prima fai 2⁵ · 5⁵ = 10⁵, poi dividi per 10³: 5 − 3 = 2!"' },
            { text: '7²', correct: false, msg: 'Lavinia: "2 per 5 fa 10, non 7! Dai che ci sei quasi!"' },
            { text: '10⁸', correct: false, msg: 'Lavinia: "Devi sottrarre 3 da 5, non sommarlo!"' }
          ]
        }
      ],
      winMsg: 'NOOO, LA MIA AURA! Mi hai sbugiardata peggio di un dissing di Marra! I 5 Cristalli tornano al loro posto e il Faro illumina tutta l’isola!'
    }
  }
];
