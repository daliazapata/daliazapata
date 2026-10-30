// Adaptado de Michi Andino (47d23c0), AGPL-3.0.
export function catPose(runner, elapsed, landingUntil, expression, expressionUntil) {
  let texture = runner.grounded ? `michi-${Math.floor(elapsed * 10) % 4}` : 'michi-jump';
  let sx = 1, sy = 1, angle = 0, offset = 0;
  if (runner.grounded) {
    offset = -Math.abs(Math.sin(elapsed * Math.PI * 10)) * 2;
    if (elapsed < landingUntil) { sx = 1.08; sy = .88; offset = 0; }
  } else { sx = .97; sy = 1.04; angle = runner.velocityY < 0 ? -5 : 5; }
  if (elapsed < expressionUntil) {
    texture = expression;
    if (expression === 'michi-hurt') { angle = -7; sx = .96; }
  }
  return {texture,sx,sy,angle,offset};
}

