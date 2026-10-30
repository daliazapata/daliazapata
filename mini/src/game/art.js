// Adaptado de Michi Andino, revisión 47d23c0. AGPL-3.0; véase CREDITOS.md.
function drawCatHead(g, ears = true) {
  g.fillStyle(0xbebbb1); g.fillRect(75, 8, 28, 29);
  if (ears) {
    g.fillRect(75, 0, 9, 15); g.fillRect(93, 0, 9, 15);
    g.fillStyle(0xd7978a); g.fillRect(78, 3, 4, 7); g.fillRect(96, 3, 4, 7);
  }
  g.fillStyle(0xf8ecd0); g.fillRect(86, 24, 20, 11);
  g.fillStyle(0x293746); g.fillRect(88, 16, 6, 7); g.fillRect(100, 24, 5, 4);
  g.fillStyle(0xffe3a0); g.fillRect(89, 16, 2, 2);
}

export function createArt(scene) {
  if (scene.textures.exists('michi-0')) return;
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  const catTextures = ['michi-0','michi-1','michi-2','michi-3','michi-happy','michi-hurt','michi-win','michi-hope','michi-jump','michi-rest'];
  for (let frame = 0; frame < catTextures.length + 4; frame++) {
    g.clear();
    const intro = frame >= catTextures.length;
    const pose = intro ? frame - catTextures.length : frame;
    // Cola grande, gruesa y anillada: silueta característica del gato andino.
    if (!intro) {
      const tailLift = frame < 4 ? [0, -2, 0, 2][frame] : frame === 8 ? -4 : 0;
      g.fillStyle(0xa9a5a0); g.fillRect(3, 26, 47, 15); g.fillRect(0, 20 + tailLift, 15, 16);
      g.fillStyle(0x555a64);
      for (let x = 6; x < 43; x += 12) g.fillRect(x, 26, 6, 15);
    }
    g.fillStyle(0xbebbb1); g.fillRect(42, 21, 43, 28);
    g.fillStyle(0xddd6c4); g.fillRect(49, 37, 37, 10);
    g.fillStyle(0x85858a);
    g.fillRect(51, 22, 5, 10); g.fillRect(65, 23, 5, 9); g.fillRect(77, 24, 5, 8);
    if (!intro) drawCatHead(g);
    g.fillStyle(0x85858a);
    const stride = [0,7,12,5][pose % 4];
    g.fillRect(48 + stride, 45, 9, frame === 8 ? 6 : 10);
    g.fillRect(80 - stride, 45, 9, frame === 8 ? 6 : 11 - pose % 3);
    if (frame >= 4 && !intro) {
      g.fillStyle(0xbebbb1); g.fillRect(87, 14, 10, 10);
      g.fillStyle(0x293746);
      if (frame === 5) { // Sobresalto: ojo abierto y ceja inclinada.
        g.fillRect(89, 15, 5, 8); g.fillRect(87, 12, 5, 2);
      } else if (frame === 7) { // Mirada baja y tristeza suave.
        g.fillRect(88, 19, 6, 2); g.fillRect(88, 17, 2, 2);
        g.fillRect(93, 30, 4, 2); g.fillRect(96, 32, 2, 2);
      } else if (frame === 9) { // Ojos cerrados al descansar.
        g.fillRect(88, 19, 7, 2); g.fillRect(92, 29, 5, 2);
      } else { // Sonrisa y ojos felices; victoria con mejilla cálida.
        g.fillRect(88, 18, 3, 2); g.fillRect(91, 16, 3, 2);
        g.fillRect(93, 29, 5, 2);
        if (frame === 6 || frame === 4) { g.fillStyle(0xd7978a); g.fillRect(87, 23, 5, 3); }
      }
    }
    g.generateTexture(intro ? `intro-body-${pose}` : catTextures[frame], 108, 58);
  }
  g.destroy();
}
