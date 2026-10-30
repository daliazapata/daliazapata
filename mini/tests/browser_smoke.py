# Prueba opcional: requiere Playwright para Python y Chromium del sistema.
# Ejecutar con npm run dev activo en el puerto 5173.
from playwright.sync_api import sync_playwright
import json,time
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1280,'height':800},device_scale_factor=1)
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:5173/');page.wait_for_function('window.__michi && window.__michi.cat')
 page.screenshot(path=str(ROOT / 'docs/escritorio.png'))
 page.get_by_role('button',name='Jugar ahora').click();page.wait_for_timeout(200)
 before=page.evaluate('window.__michi.runner.y');page.keyboard.press('Space');page.wait_for_timeout(150)
 assert page.evaluate('window.__michi.runner.y')<before
 page.wait_for_timeout(800);page.keyboard.press('ArrowUp');page.wait_for_timeout(150)
 assert not page.evaluate('window.__michi.runner.grounded')
 # Comprueba el manejador de visibilidad sin depender del foco de ventanas headless.
 page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))")
 elapsed=page.evaluate('window.__michi.session.elapsed');page.wait_for_timeout(600)
 assert page.evaluate('window.__michi.session.elapsed')==elapsed
 page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'))")
 assert page.get_by_role('button',name='Continuar').is_visible()
 page.get_by_role('button',name='Continuar').click()
 # Colisión real en el escenario: coloca estrella y roca en su trayectoria.
 page.wait_for_timeout(900)
 page.evaluate("""() => {const s=window.__michi; s.items.forEach(i=>i.sprite.destroy());s.items=[];s.runner={y:289,velocityY:0,grounded:true};s.nextAt=s.distance+10000;for(const [type,x] of [['star',220],['rock',330]]){const i={type,x,y:type==='star'?258:272,width:30,height:30,used:false};i.sprite=s.add.image(x,i.y,type);s.items.push(i);}}""")
 page.wait_for_timeout(700)
 result=page.evaluate('({stars:window.__michi.session.stars,hits:window.__michi.session.hits,score:window.__michi.session.score})')
 assert result['stars']>=1 and result['hits']>=1,result
 page.wait_for_function('!window.__michi.running',timeout=35000)
 assert page.locator('#time').inner_text()=='0'
 assert page.evaluate('window.__michi.session.elapsed')==30
 assert page.get_by_role('button',name='Jugar otra vez').is_visible()
 page.get_by_role('button',name='Jugar otra vez').click()
 assert page.evaluate('window.__michi.session.score')==0
 page.wait_for_timeout(50)
 page.wait_for_timeout(4800)
 page.screenshot(path=str(ROOT / 'docs/partida.png'))
 # Récord persiste al recargar: crea una segunda partida con puntos y finaliza por simulación.
 page.evaluate('window.__michi.items.forEach(i=>i.sprite.destroy());window.__michi.items=[];window.__michi.session.score=70;window.__michi.session.elapsed=29.95')
 page.wait_for_function('!window.__michi.running');page.reload();page.wait_for_function('window.__michi && window.__michi.cat')
 assert page.locator('#record').inner_text()=='70'
 mobile=browser.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=1)
 mobile.on('pageerror',lambda e:errors.append(str(e)));mobile.goto('http://127.0.0.1:5173/')
 mobile.wait_for_function('window.__michi && window.__michi.cat')
 assert mobile.evaluate('document.documentElement.scrollWidth<=innerWidth')
 mobile.get_by_role('button',name='Jugar ahora').tap();mobile.wait_for_timeout(100)
 mobile.get_by_role('button',name='Saltar',exact=True).tap();mobile.wait_for_timeout(100)
 assert not mobile.evaluate('window.__michi.runner.grounded')
 mobile.screenshot(path=str(ROOT / 'docs/movil.png'))
 mobile.set_viewport_size({'width':844,'height':390});mobile.wait_for_timeout(100)
 assert mobile.evaluate('document.documentElement.scrollWidth<=innerWidth')
 assert not errors,errors
 print(json.dumps({'browser':'Chromium','desktop':'1280x800','mobile':['390x844','844x390'],'keyboard_jump':True,'touch_jump':True,'visibility_handler_pause':True,'real_30s_game':True,'collision':result,'restart':True,'record_reload':70,'page_errors':errors},ensure_ascii=False))
 browser.close()
