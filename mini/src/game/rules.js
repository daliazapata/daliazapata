// Física adaptada de daliazapata/michi-andino, 47d23c0. AGPL-3.0.
export const WORLD = { width: 960, height: 360, groundY: 289 };
export const DURATION = 30, RUN_SPEED = 230, GRAVITY = 1450, JUMP_SPEED = -570;
export const initialRunner = () => ({ y: WORLD.groundY, velocityY: 0, grounded: true });
export const newSession = () => ({ score: 0, elapsed: 0, immuneUntil: 0, hits: 0, stars: 0 });
export function jump(state) {
  return state.grounded ? { ...state, velocityY: JUMP_SPEED, grounded: false } : state;
}
export function stepRunner(state, dt) {
  const y = state.y + state.velocityY * dt + .5 * GRAVITY * dt * dt;
  return y >= WORLD.groundY ? initialRunner() : { y, velocityY: state.velocityY + GRAVITY * dt, grounded: false };
}
export const ended = state => state.elapsed >= DURATION;
export function tick(state, dt) { return { ...state, elapsed: Math.min(DURATION, state.elapsed + Math.max(0, dt)) }; }
export function touches(runner, x, item) {
  return !item.used && Math.abs(x + 10 - item.x) < (40 + item.width) / 2 && Math.abs(runner.y - 25 - item.y) < (36 + item.height) / 2;
}
export function collect(state, item) {
  if (item.used || ended(state)) return state;
  if (item.type === 'star') return { ...state, score: state.score + 10, stars: state.stars + 1 };
  if (state.elapsed < state.immuneUntil) return state;
  return { ...state, score: Math.max(0, state.score - 10), hits: state.hits + 1, immuneUntil: state.elapsed + 1.2 };
}
export function createSpawner(random = Math.random) {
  let count = 0;
  return () => {
    const rock = ++count % 3 === 0;
    return { type: rock ? 'rock' : 'star', x: 1000, y: rock ? 272 : (random() < .5 ? 258 : 182), width: rock ? 34 : 22, height: rock ? 34 : 22, gap: 290 + random() * 80, used: false };
  };
}
export function readRecord(storage) {
  try { storage ??= globalThis.localStorage; const n = Number(storage?.getItem('michi-andino-mini-record')); return Number.isFinite(n) ? Math.max(0, n) : 0; } catch { return 0; }
}
export function saveRecord(score, storage) {
  try { storage ??= globalThis.localStorage; const n = Math.max(readRecord(storage), score); storage?.setItem('michi-andino-mini-record', String(n)); return n; } catch { return Math.max(0, score); }
}
