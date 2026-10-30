// Paisaje independiente inspirado en el mockup: geometría y píxeles, sin imágenes externas.
export function drawLandscape(g, distance = 0) {
  g.clear(); g.fillStyle(0x140d2b); g.fillRect(0, 0, 960, 360);
  for (let i = 0; i < 85; i++) {
    const x = (i * 137 + 19) % 960, y = (i * 59 + 7) % 218;
    g.fillStyle(i % 4 ? 0xd6a7ed : 0xffd773, i % 3 ? .6 : 1);
    g.fillRect(x, y, i % 4 ? 1 : 2, 2);
    if (i % 13 === 0) { g.fillRect(x - 3, y + 1, 8, 1); g.fillRect(x, y - 3, 1, 8); }
  }
  // Halo en escalones y luna con cráteres cuadrados.
  g.fillStyle(0xffc55d, .06); g.fillCircle(765, 81, 60);
  g.fillStyle(0xffc55d, .09); g.fillCircle(765, 81, 48);
  for (let row = -34; row <= 34; row += 4) {
    const half = Math.floor(Math.sqrt(Math.max(0, 34 * 34 - row * row)) / 4) * 4;
    g.fillStyle(row < 0 ? 0xffda79 : 0xefae51); g.fillRect(765 - half, 81 + row, half * 2, 4);
  }
  g.fillStyle(0xd58d46, .5);
  for (let i = 0; i < 13; i++) g.fillRect(744 + i * 13 % 39, 61 + i * 7 % 40, 4 + i % 3 * 3, 4);
  // Dos cordilleras con caras iluminadas y nieve violeta.
  for (let layer = 0; layer < 2; layer++) for (let i = -1; i < 6; i++) {
    const x = i * 245 - (distance * (layer ? .17 : .07)) % 245;
    const peak = (layer ? 146 : 103) + ((i + 6) % 3) * 22;
    g.fillStyle(layer ? 0x342059 : 0x44206e); g.fillTriangle(x - 125, 290, x + 68, peak, x + 245, 290);
    g.fillStyle(layer ? 0x512875 : 0x6e3595); g.fillTriangle(x + 68, peak, x + 98, peak + 65, x + 245, 290);
    g.fillStyle(layer ? 0x75429b : 0xb35bba); g.fillTriangle(x + 68, peak, x + 30, peak + 47, x + 79, peak + 27);
    g.fillStyle(0x271739); g.fillTriangle(x + 68, peak + 23, x + 36, 290, x + 96, 290);
    g.fillStyle(0xa74c9c,.5); g.fillRect(x + 90, peak + 56, 8, 4);
  }
  // Ruinas al fondo y luces cálidas del valle.
  for (let i = -1; i < 23; i++) {
    const x = i * 52 - distance * .28 % 52, h = 14 + (i + 25) % 4 * 7;
    g.fillStyle(0x21142e); g.fillRect(x, 288 - h, 34, h);
    g.fillStyle(i % 3 ? 0xa55c6b : 0xffcb69); g.fillRect(x + 6, 287 - h, 9, 3);
  }
  // Camino continuo de bloques sólidos, sin huecos mortales.
  g.fillStyle(0x21132d); g.fillRect(0, 289, 960, 71);
  for (let row = 0; row < 3; row++) for (let i = -1; i < 25; i++) {
    const x = i * 46 - distance % 46 + (row % 2) * 23, y = 290 + row * 24;
    g.fillStyle(row ? 0x3b254b : 0x70516e); g.fillRect(x + 1, y, 43, 21);
    g.fillStyle(row ? 0x513259 : 0xb38097); g.fillRect(x + 2, y, 39, 3);
    g.fillStyle(0x231332); g.fillRect(x + 36, y + 5, 6, 15);
    g.fillStyle(0x8e4c81); g.fillRect(x + 7, y + 9, 6, 3);
    if ((i + row + 30) % 7 === 0) { g.fillStyle(0xff5cbd); g.fillRect(x + 9, y + 4, 2, 6); g.fillRect(x + 9, y + 9, 7, 2); }
  }
  for (let i = -1; i < 9; i++) {
    const x = i * 141 - distance * .7 % 141;
    g.fillStyle(0x6b397c); g.fillRect(x, 278, 3, 11); g.fillRect(x + 5, 282, 3, 7);
    g.fillStyle(0xf272b6); g.fillRect(x - 2, 275, 6, 4);
    g.fillStyle(0xffd47b); g.fillRect(x + 4, 280, 5, 3);
  }
}
export function createItems(scene) {
  const g = scene.make.graphics({ add: false });
  g.fillStyle(0xffd565); g.fillPoints([{x:12,y:0},{x:16,y:8},{x:24,y:9},{x:18,y:15},{x:20,y:24},{x:12,y:19},{x:4,y:24},{x:6,y:15},{x:0,y:9},{x:8,y:8}], true);
  g.fillStyle(0xfff1b0); g.fillRect(10,7,3,9); g.fillRect(7,10,9,3); g.generateTexture('star',24,24);
  g.clear();g.fillStyle(0x46314f);g.fillRect(1,14,34,21);g.fillRect(7,4,23,27);g.fillRect(14,0,12,8);
  g.fillStyle(0xa0749c);g.fillRect(8,5,6,19);g.fillRect(14,3,10,5);
  g.fillStyle(0xff68ba);g.fillRect(22,12,2,8);g.fillRect(22,19,7,2);g.generateTexture('rock',36,36);g.destroy();
}
