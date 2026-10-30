"""Gráficos SVG originales del perfil. Biblioteca estándar; sin red ni dependencias.
Ejecutar desde cualquier directorio: python3 assets/profile/generar.py
"""
from pathlib import Path
from html import escape
import random
ROOT = Path(__file__).resolve().parent

def rect(x,y,w,h,c,extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}" {extra}/>'
def path(d,c,extra=''):
    return f'<path d="{d}" fill="{c}" {extra}/>'
def text(x,y,s,size=20,c='#eee0ff',extra=''):
    return f'<text x="{x}" y="{y}" font-family="monospace" font-size="{size}" fill="{c}" {extra}>{escape(s)}</text>'
def save(name,w,h,body,title,desc):
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title desc">
<title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>
<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#100d27"/><stop offset="1" stop-color="#3e1758"/></linearGradient><linearGradient id="stone" x2="0" y2="1"><stop stop-color="#634474"/><stop offset="1" stop-color="#21162e"/></linearGradient></defs>
{body}</svg>'''
    (ROOT/name).write_text(svg)
def sky(w,h):
    rng=random.Random(28);s=rect(0,0,w,h,'url(#sky)')
    for i in range(w//5):
        x=rng.randrange(8,w-8)//3*3;y=rng.randrange(8,max(9,int(h*.7)))//3*3
        c=['#665080','#af69b0','#ffdc83'][i%3];s+=rect(x,y,2 if i%5 else 3,2 if i%5 else 3,c)
        if i%31==0:s+=rect(x-4,y+1,11,1,c)+rect(x+1,y-4,1,11,c)
    return s
def moon(x,y,r):
    s=f'<circle cx="{x}" cy="{y}" r="{r+19}" fill="#ffcd6b" opacity=".04"/>'
    for row in range(-r,r+1,4):
        half=int(max(0,r*r-row*row)**.5)//4*4
        s+=rect(x-half,y+row,half*2,4,'#ffda82' if row<0 else '#f1ae5e')
    for dx,dy,ww in [(-15,-11,12),(8,5,15),(-20,15,7),(5,-23,9)]:s+=rect(x+dx,y+dy,ww,6,'#d29250')
    return s
def mountains(w,h,base):
    s=''
    for layer in range(3):
        for i in range(-1,w//220+2):
            x=i*235+layer*75;peak=base-170+layer*42+(i%3)*21
            s+=path(f'M{x-120} {base} L{x+60} {peak} L{x+270} {base}Z',['#643184','#43235f','#271b42'][layer])
            s+=path(f'M{x+60} {peak} L{x+93} {peak+70} L{x+270} {base}Z',['#ab4eab','#713a88','#442854'][layer])
            s+=path(f'M{x+60} {peak} L{x+23} {peak+49} L{x+51} {peak+33} L{x+80} {peak+54}Z',['#d587cf','#98569d','#634474'][layer])
            for j in range(4):s+=rect(x+86+j*19,peak+65+j*14,12,4,'#9c4a9c' if layer==0 else '#583063')
    return s
def town(w,base):
    s=''
    for i in range(w//21):
        x=i*23;y=base-(i*17%51)
        s+=rect(x,y,19,base-y+15,'#2a1c39')+rect(x+3,y+7,3,5,'#e5a65e')
        if i%4==0:s+=rect(x-3,y+1,25,3,'#644168')
    return s
def blocks(w,y):
    s=rect(0,y,w,65,'#1c1429')
    for row in range(3):
        for i in range(-1,w//49+1):
            x=i*52+(row%2)*26;yy=y+row*24
            s+=rect(x,yy,49,21,'#48324f')+rect(x+1,yy,46,4,'#98718b')+rect(x+36,yy+5,10,15,'#302139')
            if i%7==0:s+=rect(x+9,yy+7,3,8,'#f766b7')+rect(x+9,yy+12,9,3,'#f766b7')
    return s
def cat(x,y,scale=1):
    s=f'<g transform="translate({x} {y}) scale({scale})" shape-rendering="crispEdges">'
    # Original pixel drawing: elevated ringed tail, spotted torso, two ears and cheeks.
    for xx,yy,w,h,c in [(-62,21,63,17,'#332838'),(-76,4,20,29,'#332838'),(-73,-5,15,24,'#332838'),(-60,23,63,12,'#e4d1b5'),(-73,6,14,24,'#e4d1b5'),(-70,-3,10,17,'#e4d1b5'),(-4,8,54,34,'#332838'),(0,11,47,27,'#c5b4a3'),(4,28,44,10,'#eee0c3'),(4,37,10,15,'#332838'),(34,37,10,15,'#332838'),(7,38,8,12,'#e4d1b5'),(36,38,8,12,'#e4d1b5'),(37,-14,39,42,'#332838'),(37,-27,12,19,'#332838'),(63,-27,12,19,'#332838'),(40,-23,7,15,'#d4bea9'),(65,-23,7,15,'#d4bea9'),(42,-20,3,7,'#dd8c9d'),(67,-20,3,7,'#dd8c9d'),(40,-11,33,33,'#d4bea9'),(45,10,32,12,'#f5e3c5'),(44,1,7,8,'#43323d'),(62,1,7,8,'#43323d'),(45,1,3,4,'#ffdc83'),(63,1,3,4,'#ffdc83'),(55,12,6,4,'#9b5668'),(56,17,4,2,'#493040'),(40,12,7,3,'#bc7890'),(68,12,6,3,'#bc7890')]:s+=rect(xx,yy,w,h,c)
    for xx in [-53,-37,-21]:s+=rect(xx,23,7,12,'#584656')
    s+=rect(-73,12,14,6,'#584656')+rect(-70,-1,10,6,'#584656')
    for xx,yy in [(6,13),(19,18),(30,12),(9,25),(32,26)]:s+=rect(xx,yy,5,6,'#72606c')
    s+=rect(0,34,46,4,'#9c3e80')+rect(44,26,24,5,'#ffcf75')
    return s+'</g>'
def flower(x,y):
    return rect(x,y,3,24,'#7c477d')+rect(x-5,y-2,13,5,'#e568b7')+rect(x-1,y-6,5,13,'#e568b7')+rect(x,y-1,3,3,'#ffe28e')

# Desktop cover: large typography stays separate from the richly layered landscape.
s=sky(1200,440)+moon(971,115,47)+mountains(1200,440,342)+town(1200,365)+blocks(1200,391)
s+=rect(23,26,672,300,'#100e25','opacity=".90"')+rect(24,27,3,52,'#e65fbe')
s+=text(50,66,'DATOS · IDEAS · PERSONAS',17,'#f8d583', 'letter-spacing="3"')
s+=text(48,128,'¡HOLA, SOY',48,'#ffd5f0')
s+=text(44,236,'DALIA',110,'#8e296e','stroke="#8e296e" stroke-width="9"')
s+=text(44,236,'DALIA',110,'#180f2b','stroke="#ff72c9" stroke-width="2"')
s+=text(50,280,'Tecnología con curiosidad y propósito.',21,'#f2e4fa')
s+=text(50,312,'Inspirada en el Perú. Creando nuevas posibilidades.',16,'#d7b9ed')
s+=cat(957,301,1.6)+flower(1120,371)+flower(1100,382)+flower(763,378)
s+=rect(8,8,1184,424,'none','rx="12" stroke="#9c5bc5" stroke-width="2"')
save('portada.svg',1200,440,s,'¡Hola, soy Dalia!','Portada original en pixel art: cordillera violeta, luna dorada, luces de un valle andino y gato de cola larga anillada. Datos, ideas y personas.')
# Mobile cover: composed separately rather than shrinking all desktop text.
s=sky(600,510)+moon(490,305,35)+mountains(600,510,453)+blocks(600,464)
s+=rect(20,20,560,250,'#110d25','opacity=".96"')+text(36,62,'DATOS · IDEAS · PERSONAS',16,'#ffdd8a')+text(33,119,'¡HOLA, SOY',37,'#ffd5f0')
s+=text(30,214,'DALIA',101,'#180f2b','stroke="#ff72c9" stroke-width="2"')+text(36,251,'Curiosidad, tecnología y propósito.',19,'#e8d4f4')+cat(294,385,1.4)
s+=rect(7,7,586,496,'none','rx="12" stroke="#9c5bc5" stroke-width="2"')
save('portada-movil.svg',600,510,s,'¡Hola, soy Dalia!','Portada móvil: Dalia, paisaje andino violeta y gato de cola anillada bajo la luna.')
# About illustration: desk, window and cat, no portrait invented for the user.
s=rect(0,0,1200,290,'#130e27')+rect(12,12,1176,266,'none','rx="10" stroke="#794693"')
s=rect(0,0,1200,290,'#130e27')+rect(12,12,1176,266,'none','rx="10" stroke="#794693"')
s+='<g transform="translate(36 25)">'+sky(455,220)+moon(375,54,25)+mountains(455,220,240)+'</g>'
s+=rect(34,24,459,224,'none','stroke="#795283" stroke-width="7"')+rect(238,25,6,222,'#795283')
s+=rect(562,53,252,148,'#75517d')+rect(570,61,236,128,'#15142c')
for i in range(7):s+=rect(587,81+i*13,35+(i*23)%130,4,['#ea72ba','#b385e3','#efcb7a'][i%3])
s+=path('M547 202 H831 L847 218 H535 Z','#9e729a')+rect(540,218,300,7,'#3f2a4d')
s+=cat(1020,160,1)+rect(28,228,1144,13,'#af7891')+rect(28,241,1144,28,'#39263f')
s+=text(600,265,'APRENDER · EXPERIMENTAR · CONSTRUIR',14,'#ffdd92')
s+=flower(897,205)+flower(917,214)
save('sobre-mi.svg',1200,290,s,'Un espacio para aprender y crear','Ilustración original de un escritorio con código, una ventana a los Andes y un gato junto al portátil; no representa una fotografía de Dalia.')
# Project vignettes, conceptual and original, never presented as product screenshots.
for kind,name,title in [('flight','flightpredict.svg','FlightPredict'),('sea','iris.svg','IRIS Maritime Intelligence'),('kitchen','culinary.svg','Culinary AI Agent')]:
    s=sky(1200,260)+moon(1070,62,26)
    if kind=='flight':
        s+=mountains(1200,260,270)
        s+='<g transform="translate(700 65) scale(2)" shape-rendering="crispEdges">'+path('M0 40 H55 L80 10 H96 L81 40 H138 L159 28 H169 L160 45 L174 52 H80 L97 73 H80 L55 52 H8 Z','#f5dcef')+rect(22,44,134,4,'#b552a7')
        for x in range(33,136,13):s+=rect(x,40,6,4,'#513970')
        s+='</g>'+text(38,51,'01 / DATOS QUE EXPLICAN EL VIAJE',18,'#ffdb85')
    elif kind=='sea':
        s+=mountains(1200,260,267)+rect(0,175,1200,85,'#191b39')
        for i in range(35):s+=rect(i*41%1200,183+i%5*15,22,2,'#71518b')
        s+='<g transform="translate(780 111)">'+path('M0 53 H220 L190 87 H30Z','#a26caa')+rect(25,25,140,28,'#704879')+rect(136,0,35,53,'#deb082')+rect(143,10,18,9,'#352341')+'</g>'
        s+=path('M185 208 L338 161 L440 191 L575 116 L681 153','none','stroke="#f8cf79" stroke-width="3" stroke-dasharray="8 8"')
        for x,y in [(185,208),(338,161),(440,191),(575,116),(681,153)]:s+=rect(x-4,y-4,9,9,'#ffe38a')
        s+=text(38,51,'02 / CADA SEÑAL MERECE CONTEXTO',18,'#ffdb85')
    else:
        s+=rect(0,158,1200,102,'#302039')+rect(620,35,490,126,'#302039')
        for x in range(640,1100,90):s+=rect(x,48,67,97,'#523657')+rect(x+48,79,4,24,'#f5c883')
        s+=rect(0,196,1200,10,'#b47b96')+rect(736,144,96,52,'#d4b7c5')+rect(748,135,72,9,'#eecee2')+rect(773,123,21,12,'#ae7199')
        s+=cat(1010,145,.95)+flower(590,175)
        s+=text(38,51,'03 / INGREDIENTES, CONTEXTO Y DECISIONES',18,'#ffdb85')
    s+=rect(8,8,1184,244,'none','rx="10" stroke="#9657ae" stroke-width="2"')
    save(name,1200,260,s,title+' · ilustración conceptual','Ilustración original inspirada en el tema del proyecto. No es una captura de la aplicación ni representa datos reales.')
# A quiet ornamental divider usable in either GitHub theme.
s=rect(0,0,1200,32,'#130e27')+rect(0,15,1200,1,'#75468e')
for x in [564,582,600,618,636]:s+=rect(x,10 if x==600 else 13,6,12 if x==600 else 6,'#ffcf7c' if x==600 else '#da64b5')
save('separador.svg',1200,32,s,'','Separador ornamental en morado, rosa y dorado.')
print('Gráficos originales generados en',ROOT)
