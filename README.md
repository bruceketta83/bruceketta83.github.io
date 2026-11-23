# 🎮 Giochi per imparare

Pagina di index dei giochi educativi: https://bruceketta83.github.io/

| Gioco | Repo | Indirizzo |
| :--- | :--- | :--- |
| 🏝️ Il Segreto dell'Isola di Espo-Nentia | [espo-nentia](https://github.com/bruceketta83/espo-nentia) | https://bruceketta83.github.io/espo-nentia/ |

## Come aggiungere un gioco

1. Crea un repo nuovo per il gioco, per esempio `nome-gioco`.
2. Nel repo del gioco, apri **Settings → Pages**. Scegli il branch `main` e la cartella `/ (root)`.
3. Usa solo percorsi relativi nel gioco (`img/...`, mai `/img/...`). Il gioco è servito in `/nome-gioco/`.
4. Se il gioco ha un service worker, fai cancellare solo le sue cache (nomi che iniziano con `nome-gioco-`). Tutti i giochi del sito condividono le cache e i salvataggi del browser.
5. Dai ai salvataggi (`localStorage`) un prefisso con il nome del gioco.
6. In questo repo, copia una scheda in `index.html`. Cambia link, immagine (`img/`, 720 × 446) e testi.

## File

- `index.html`: la pagina con le schede dei giochi. L'app installata dalla schermata Home con la versione vecchia va direttamente a `espo-nentia/`.
- `sw.js`: service worker di pulizia. Cancella le cache vecchie del gioco di quando era sulla radice, poi si disattiva. Tienilo finché ci sono telefoni con la versione vecchia.
- `tests/`: test automatici (Playwright). Avvio: `npm test`.
