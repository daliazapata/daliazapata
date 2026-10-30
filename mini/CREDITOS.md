# Créditos y licencia

**Aventura del Gato Andino — Michi Mini** es una adaptación independiente para el perfil de Dalia Zapata.

- Original: [daliazapata/michi-andino](https://github.com/daliazapata/michi-andino), revisión `47d23c04114316ba63a7a921a9528b6102bd3cf2`.
- `src/game/art.js`: generación del gato y sus fotogramas extraída de `src/game/art.js` del original.
- `src/game/animation.js`: función `catPose` adaptada de `src/game/presentation.js`.
- `src/game/rules.js`: salto e integración de movimiento adaptados de `src/game/rules.js`; el resto de las reglas se simplificó para esta versión.
- El desplazamiento, ciclo de simulación y limpieza de eventos de `src/main.js` adaptan el enfoque de `src/scenes/GameScene.js`.
- Paisaje nocturno, estrellas, rocas, interfaz y reglas de 30 segundos creados para esta adaptación. Cambios realizados el 30 de octubre de 2026.
- Referencia visual: mockup del perfil proporcionado por Dalia. No se utiliza como fondo ni se incorpora su imagen al juego.

Se conserva la licencia **GNU Affero General Public License, versión 3**, del proyecto original. El texto completo está en [LICENSE](LICENSE). Esta adaptación se distribuye bajo AGPL-3.0-only, sin garantía. El código fuente y los archivos necesarios para compilar se encuentran en esta carpeta del repositorio público.

Phaser y Vite son dependencias externas con licencia MIT; sus avisos se conservan en sus paquetes. No se copian dependencias instaladas ni recursos de terceros desde el proyecto original.
