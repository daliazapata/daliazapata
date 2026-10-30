import Phaser from 'phaser';
import './style.css';
import { createArt } from './game/art.js';
import { catPose } from './game/animation.js';
import { drawLandscape, createItems } from './game/landscape.js';
import { WORLD, DURATION, RUN_SPEED, initialRunner, newSession, jump, stepRunner, touches, collect, tick, ended, createSpawner, readRecord, saveRecord } from './game/rules.js';

const ui = Object.fromEntries(['score','time','record','overlay','overlay-label','message','detail','play','jump','status'].map(id => [id, document.getElementById(id)]));
let record = 0;
try { record = readRecord(); } catch { /* El navegador puede bloquear el almacenamiento. */ }
ui.record.textContent = record;
class Adventure extends Phaser.Scene {
  constructor() { super('Adventure'); }
  create() {
    createArt(this); createItems(this);
    this.land = this.add.graphics(); drawLandscape(this.land);
    this.shadow = this.add.ellipse(184, 289, 69, 6, 0x090713, .5);
    this.cat = this.add.image(185, WORLD.groundY, 'michi-0').setOrigin(.5,1).setScale(.98);
    this.running = false; this.paused = false; this.items = []; this.runner = initialRunner();
    this.distance = 0; this.session = newSession(); this.landingUntil = 0; this.expressionUntil = 0;
    ui.jump.disabled = true;
    this.startHandler = () => this.startRun();
    this.jumpHandler = event => { event.preventDefault(); this.tryJump(); };
    this.keyHandler = event => {
      if (['Space','ArrowUp'].includes(event.code) && !event.repeat && !['BUTTON','A'].includes(document.activeElement?.tagName)) {
        event.preventDefault(); this.tryJump();
      }
    };
    this.visibilityHandler = () => {
      if (!this.running) return;
      if (document.hidden) this.paused = true;
      else if (this.paused) {
        this.showOverlay('AVENTURA EN PAUSA', 'Tu aventura te espera', 'El tiempo se detuvo mientras estabas fuera.', 'Continuar →');
      }
    };
    ui.play.addEventListener('click', this.startHandler);
    ui.jump.addEventListener('pointerdown', this.jumpHandler);
    this.jumpClickHandler = event => { if (event.detail === 0) this.tryJump(); };
    ui.jump.addEventListener('click', this.jumpClickHandler);
    window.addEventListener('keydown', this.keyHandler);
    document.addEventListener('visibilitychange', this.visibilityHandler);
    this.events.once('shutdown', () => {
      ui.play.removeEventListener('click', this.startHandler); ui.jump.removeEventListener('pointerdown', this.jumpHandler); ui.jump.removeEventListener('click', this.jumpClickHandler);
      window.removeEventListener('keydown', this.keyHandler); document.removeEventListener('visibilitychange', this.visibilityHandler);
    });
    // Diagnóstico de desarrollo para pruebas del juego real; no se expone en producción.
    if (import.meta.env.DEV) window.__michi = this;
  }
  startRun() {
    if (document.hidden) return;
    if (this.running && this.paused) { this.paused = false; this.skipFrame = true; }
    else {
      this.items.forEach(item => item.sprite.destroy()); this.items = [];
      this.session = newSession(); this.runner = initialRunner(); this.distance = 0; this.nextAt = 80;
      this.spawn = createSpawner(); this.running = true; this.paused = false; this.skipFrame = true;
      this.landingUntil = 0; this.expressionUntil = 0;
      ui.status.textContent = '¡Vamos, Michi! Estrellas +10 · Rocas −10.';
    }
    ui.overlay.hidden = true; ui.jump.disabled = false;
    ui.play.blur(); document.activeElement?.blur(); this.refreshHUD();
  }
  tryJump() { if (this.running && !this.paused && !document.hidden) this.runner = jump(this.runner); }
  showOverlay(label, title, detail, button) {
    ui['overlay-label'].textContent = label; ui.message.textContent = title;
    ui.detail.textContent = detail; ui.play.textContent = button;
    ui.overlay.hidden = false; ui.jump.disabled = true;
  }
  refreshHUD() {
    ui.score.textContent = this.session.score;
    ui.time.textContent = Math.ceil(DURATION - this.session.elapsed);
    ui.record.textContent = record;
  }
  simulate(dt) {
    this.distance += RUN_SPEED * dt;
    const grounded = this.runner.grounded;
    this.runner = stepRunner(this.runner, dt);
    if (!grounded && this.runner.grounded) this.landingUntil = this.session.elapsed + .14;
    if (this.distance >= this.nextAt && this.session.elapsed < DURATION - 3.5) {
      const item = this.spawn();
      item.sprite = this.add.image(item.x,item.y,item.type).setDisplaySize(item.width,item.height);
      // Tamaño y pulso exclusivamente visuales: la caja de colisión no cambia.
      if (item.type === 'star') item.sprite.setDisplaySize(32,32);
      this.items.push(item); this.nextAt = this.distance + item.gap;
    }
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i]; item.x -= RUN_SPEED * dt; item.sprite.x = item.x;
      if (item.type === 'star') {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const pulse = reduced ? 1 : 1 + .06 * Math.sin(this.session.elapsed * Math.PI * 2);
        item.sprite.setDisplaySize(32 * pulse,32 * pulse);
      }
      if (touches(this.runner,185,item)) {
        const previous = this.session; this.session = collect(this.session,item); item.used = true;
        if (previous !== this.session) {
          this.expressionUntil = this.session.elapsed + .55; this.expression = item.type === 'rock' ? 'michi-hurt' : 'michi-happy';
          ui.status.textContent = item.type === 'rock' ? '¡Cuidado! −10 puntos. Protección breve activada.' : '¡Una estrella más! +10 puntos.';
          const text = this.add.text(195,this.runner.y-65,item.type === 'rock' ? '−10' : '+10',{fontFamily:'monospace',fontSize:'18px',color:item.type === 'rock' ? '#ff8ed0' : '#ffdf83'});
          this.tweens.add({targets:text,y:text.y-25,alpha:0,duration:550,onComplete:()=>text.destroy()});
        }
      }
      if (item.used || item.x < -50) { item.sprite.destroy(); this.items.splice(i,1); }
    }
    this.session = tick(this.session,dt);
    if (ended(this.session)) {
      this.running = false; record = Math.max(record,saveRecord(this.session.score));
      this.showOverlay('¡AVENTURA COMPLETADA!', '¡Brillaste entre los Andes!', `${this.session.score} puntos · ${this.session.stars} estrellas · Récord: ${record}`, 'Jugar otra vez →');
      ui.status.textContent = 'Una nueva aventura empieza con un salto.'; ui.play.focus();
    }
  }
  update(_time,delta) {
    if (!this.running || this.paused || document.hidden) return;
    if (this.skipFrame) { this.skipFrame = false; return; }
    let remaining = Math.min(delta / 1000,DURATION - this.session.elapsed);
    while (remaining > 0 && this.running) { const dt = Math.min(remaining,1/60);this.simulate(dt);remaining -= dt; }
    drawLandscape(this.land,this.distance);
    const pose = catPose(this.runner,this.session.elapsed,this.landingUntil,this.expression,this.expressionUntil);
    this.cat.setPosition(185,this.runner.y+pose.offset).setTexture(pose.texture).setScale(.98*pose.sx,.98*pose.sy).setAngle(pose.angle);
    const immune = this.session.elapsed < this.session.immuneUntil;
    this.cat.setAlpha(immune ? .6 : 1); if (immune) this.cat.setTint(0xff9bd8); else this.cat.clearTint();
    this.shadow.setScale(this.runner.grounded ? 1 : .6); this.refreshHUD();
  }
}
new Phaser.Game({type:Phaser.AUTO,parent:'game',width:WORLD.width,height:WORLD.height,pixelArt:true,backgroundColor:'#140d2b',scene:[Adventure],scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},fps:{smoothStep:false}});
