"""Divide un foglio di oggetti (griglia su sfondo magenta) in tante immagini.

Uso: python3 tools/foglio.py foglio.png righe colonne nome1 nome2 ... [-]
- La griglia si legge da sinistra a destra, dall'alto in basso.
- Un nome "-" salta la cella (cella vuota o oggetto da non usare).
- Ogni oggetto finisce in img/obj/<nome>.webp, senza sfondo e ritagliato.
"""
import os
import sys
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from scontorna import maschera, riquadro  # noqa: E402

OUT = os.path.join(os.path.dirname(__file__), '..', 'img', 'obj')


def dividi(src, rows, cols, names, size=256):
    os.makedirs(OUT, exist_ok=True)
    tmp = src + '.tmp.png'
    full = Image.open(src).convert('RGB')
    W, H = full.size
    done = []
    for i, name in enumerate(names):
        if name == '-':
            continue
        r, c = divmod(i, cols)
        cell = full.crop((c * W // cols, r * H // rows, (c + 1) * W // cols, (r + 1) * H // rows))
        cell.save(tmp)
        img = maschera(tmp)
        img = img.crop(riquadro(img, pad=4))
        img.thumbnail((size, size), Image.LANCZOS)
        dst = os.path.join(OUT, name + '.webp')
        img.save(dst, 'WEBP', quality=86, method=6)
        done.append((name, img.size))
    os.remove(tmp)
    return done


if __name__ == '__main__':
    src, rows, cols, *names = sys.argv[1:]
    for n, s in dividi(src, int(rows), int(cols), names):
        print(n, s)
