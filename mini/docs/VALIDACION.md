# Validación de Michi Mini

Realizada el 30 de octubre de 2026 en Linux, Node.js 24.19.0, npm 11.9.0 y Chromium headless del entorno.

## Resultados

- `npm test`: **10 pruebas aprobadas**, cero fallos y cero omitidas. Física de salto, equivalencia entre 30/60/120 FPS, colisiones, puntuación, inmunidad, duración, alcance de estrellas, separación de obstáculos, récord, almacenamiento bloqueado y reinicio.
- `npm run build`: correcto con Vite 6.4.5. JavaScript: aproximadamente 1.494 KB minificado / 345 KB gzip. Aviso de paquete mayor de 500 KB debido a Phaser completo.
- `npm audit`: **0 vulnerabilidades** en la consulta realizada. Se actualizó Vite de 6.4.3 a 6.4.5 tras detectar avisos corregidos por esa versión.
- Chromium en desarrollo: salto con ESPACIO y flecha arriba, colisión con estrella (+10), roca (−10), finalización de una partida de 30 segundos activos, reinicio y récord 70 persistente tras recargar. La prueba de colisión coloca objetos de forma controlada en el escenario real; la de récord fija una puntuación para aislar la persistencia.
- Pausa: se simuló `document.hidden` y se emitió `visibilitychange`; se verificó que el tiempo no avanza y que volver requiere «Continuar». No equivale a una prueba manual cambiando de pestaña en un dispositivo físico.
- Escritorio: 1280 × 800. Móvil simulado: 390 × 844 y 844 × 390; sin desbordamiento horizontal. Salto táctil comprobado en emulación.
- Producción mediante `npm run preview`: HTTP 200, canvas activo, botón de inicio y temporizador funcionales, sin errores JavaScript. El acceso diagnóstico `window.__michi` no está presente en producción.
- Sin errores JavaScript durante la prueba de navegador.
- `git diff --check`: correcto. README principal sin cambios.

Durante la verificación se corrigió un caso de redondeo en el bucle de simulación que podía impedir finalizar una partida a una fracción de segundo de los 30. La repetición de la prueba de navegador comprobó la finalización y el reinicio.

## Repetir la prueba opcional de navegador

El entorno dispone de Playwright para Python y `/usr/bin/chromium`. No son dependencias del juego ni del build. Con Vite en el puerto 5173:

```sh
# Terminal 1, desde mini/
npm run dev -- --port 5173 --strictPort
# Terminal 2, desde mini/ (requiere Playwright Python instalado en el entorno)
python3 tests/browser_smoke.py
```

La prueba tarda algo más de 30 segundos y regenera las capturas en `docs/`. El identificador `window.__michi` existe exclusivamente en desarrollo para permitir estas comprobaciones.

## Capturas reales

- [Pantalla inicial en escritorio](escritorio.png)
- [Partida en escritorio](partida.png)
- [Salto en móvil simulado](movil.png)

## Límites

No se probó un teléfono físico, Safari ni Firefox. El workflow de Pages está preparado, pero no se ejecutó ni se habilitó Pages; no existe un despliegue verificado. La vista previa animada y el README del perfil quedan para una entrega posterior.
