import test from 'node:test';
import assert from 'node:assert/strict';
import { WORLD, DURATION, RUN_SPEED, initialRunner, newSession, jump, stepRunner, tick, ended, touches, collect, createSpawner, readRecord, saveRecord } from '../src/game/rules.js';
import { catPose } from '../src/game/animation.js';

test('salto solo desde suelo; asciende y aterriza exactamente', () => {
  let runner = jump(initialRunner());
  assert.ok(runner.velocityY < 0); assert.equal(jump(runner),runner);
  assert.ok(stepRunner(runner,.1).y < runner.y);
  for (let i=0;i<120;i++) runner=stepRunner(runner,1/60);
  assert.deepEqual(runner,initialRunner()); assert.equal(jump(runner).grounded,false);
});
test('trayectoria equivalente a 30, 60 y 120 FPS', () => {
  const positions=[30,60,120].map(fps=>{let r=jump(initialRunner());for(let i=0;i<fps/2;i++)r=stepRunner(r,1/fps);return r.y;});
  assert.ok(Math.max(...positions)-Math.min(...positions)<1e-6);
});
test('partida termina a los 30 segundos, sin desbordar', () => {
  let s=newSession();for(let i=0;i<299;i++)s=tick(s,.1);
  assert.equal(ended(s),false);s=tick(s,.2);assert.equal(s.elapsed,DURATION);assert.equal(ended(s),true);
  assert.equal(tick(s,100).elapsed,DURATION);
});
test('estrella puntúa una vez al consumirla; no puntúa al terminar', () => {
  const item={type:'star',used:false};let s=collect(newSession(),item);
  assert.equal(s.score,10);assert.equal(s.stars,1);item.used=true;assert.equal(collect(s,item),s);
  item.used=false;const end=tick(s,30);assert.equal(collect(end,item),end);
});
test('choque resta diez, protege temporalmente y nunca termina antes', () => {
  const item={type:'rock'};let s=collect({...newSession(),score:30},item);
  assert.equal(s.score,20);assert.equal(s.hits,1);assert.equal(ended(s),false);
  assert.equal(collect(s,item),s);s=collect(tick(s,1.3),item);assert.equal(s.score,10);
  s=collect(tick(s,1.3),item);s=collect(tick(s,1.3),item);assert.equal(s.score,0);assert.equal(ended(s),false);
});
test('caja de colisión permite esquivar una roca con salto', () => {
  const item={type:'rock',x:195,y:272,width:34,height:34};
  assert.equal(touches(initialRunner(),185,item),true);
  assert.equal(touches({...initialRunner(),y:180},185,item),false);
  assert.equal(touches(initialRunner(),50,item),false);
  assert.equal(touches(initialRunner(),185,{...item,used:true}),false);
});
test('generación ofrece estrellas bajas y altas alcanzables y separación recuperable', () => {
  for(const value of [0,.99]) {
    const spawn=createSpawner(()=>value);const items=Array.from({length:12},spawn);
    assert.equal(items.filter(i=>i.type==='rock').length,4);
    for(const item of items) {
      assert.ok(item.gap/RUN_SPEED>1.2);
      if(item.type==='star') {
        let runner=initialRunner(),x=item.y===258 ? 210 : 330,hit=false;
        if(item.y<220)runner=jump(runner);
        for(let i=0;i<60;i++){runner=stepRunner(runner,1/60);x-=RUN_SPEED/60;hit ||= touches(runner,185,{...item,x});}
        assert.ok(hit,`estrella a y=${item.y} alcanzable`);
      }
    }
  }
});
test('récord conserva máximo, clave independiente y tolera datos inválidos', () => {
  let value='50',key;const storage={getItem:k=>{key=k;return value;},setItem:(k,v)=>{key=k;value=v;}};
  assert.equal(saveRecord(20,storage),50);assert.equal(saveRecord(80,storage),80);
  assert.equal(key,'michi-andino-mini-record');value='Infinity';assert.equal(readRecord(storage),0);
  value='-5';assert.equal(readRecord(storage),0);
  const blocked={getItem(){throw Error();},setItem(){throw Error();}};
  assert.equal(readRecord(blocked),0);assert.equal(saveRecord(40,blocked),40);
});
test('tolera navegador que rechaza incluso acceder a localStorage', () => {
  const original=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
  try {Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw Error('bloqueado');}});
    assert.equal(readRecord(),0);assert.equal(saveRecord(30),30);
  } finally {if(original)Object.defineProperty(globalThis,'localStorage',original);else delete globalThis.localStorage;}
});
test('reinicio crea contadores nuevos y animaciones preservan cuatro pasos y salto', () => {
  const old=newSession();old.score=100;old.elapsed=30;assert.equal(newSession().score,0);
  const frames=new Set([0,.1,.2,.3].map(t=>catPose(initialRunner(),t,0,'',0).texture));assert.equal(frames.size,4);
  assert.equal(catPose(jump(initialRunner()),1,0,'',0).texture,'michi-jump');assert.equal(WORLD.width/WORLD.height,16/6);
});
