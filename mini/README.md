# Aventura del Gato Andino — Michi Mini

Minijuego independiente con Phaser 3, JavaScript y Vite. Corre por un paisaje andino nocturno con montañas violetas, luna dorada y piedra iluminada por detalles rosa neón. El escenario lógico mide 960 × 360 (16:6); en celulares se encaja sin deformarlo y los controles quedan fuera del lienzo.

## Desarrollo

Requiere Node.js 22 o superior y npm. Desde `mini/`:

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`dist/` es la salida estática; `node_modules/` y `dist/` están ignorados. No hay backend, fuentes remotas ni imágenes necesarias para jugar. El gato, los obstáculos y las estrellas son objetos independientes. El arte se genera localmente con Phaser Graphics.

## Cómo jugar

- Pulsa **Jugar ahora**. Michi corre automáticamente.
- Salta con **ESPACIO**, **flecha arriba** o **Saltar**. No hay salto doble ni salto repetido al mantener la tecla.
- Cada estrella suma 10 puntos. Chocar con una roca resta 10, sin bajar de cero, y otorga 1,2 segundos de protección.
- La partida dura 30 segundos activos. Los choques no la terminan.
- Al ocultar la pestaña, el juego se pausa. Al volver, pulsa **Continuar**.
- Al terminar, consulta puntuación y récord y pulsa **Jugar otra vez**.

El récord usa la clave exclusiva `michi-andino-mini-record` en `localStorage`. Solo pertenece a ese navegador y origen; no se sincroniza. Si el navegador bloquea el almacenamiento se puede seguir jugando; el récord de la sesión permanece en memoria.

## GitHub Pages, preparado sin publicar

El workflow `../.github/workflows/deploy-mini.yml` **solo admite ejecución manual** y únicamente compila/publica desde `main`. No se ejecuta por push ni por Pull Request. Este cambio no habilita Pages ni realiza ningún despliegue.

Tras revisar, integrar y autorizar expresamente la publicación:

1. En el repositorio, seleccionar **Settings → Pages → Source: GitHub Actions**.
2. Ejecutar manualmente **Publicar Michi Mini (manual)** desde `main`.
3. El workflow instala desde el lockfile, ejecuta pruebas, compila y publica solo `mini/dist/`.

URL prevista sin dominio personalizado: `https://daliazapata.github.io/daliazapata/`. Vite usa `base: './'` para que los recursos funcionen bajo la ruta del repositorio. El README principal queda intacto; la vista previa animada y el enlace «Jugar ahora» se incorporarán por separado.

## Arquitectura

- `src/main.js`: una escena compacta, interfaz HTML accesible, entradas, pausa y ciclo de partida.
- `src/game/rules.js`: física y reglas puras, colisión y almacenamiento.
- `src/game/art.js`, `animation.js`: gato y animaciones adaptados del original.
- `src/game/landscape.js`: parallax, luna, cielo, ruinas, suelo, rocas y estrellas.
- `tests/rules.test.js`: pruebas de las reglas reales con el runner de Node.

## Revisión visual y validación

Las capturas en `docs/` muestran esta implementación, no el mockup. Los resultados y límites de verificación están en [docs/VALIDACION.md](docs/VALIDACION.md).

Phaser completo añade aproximadamente 345 KB gzip de JavaScript. Vite avisa del tamaño del paquete; no impide compilar. La versión mini no incluye sonido, alimentos, narrativa, fichas educativas, niveles ni clasificación en línea. No se requiere la copia del repositorio original para ejecutar o compilar.

## Licencia

AGPL-3.0-only. Véanse [LICENSE](LICENSE) y [CREDITOS.md](CREDITOS.md), con las fuentes y adaptaciones del original. Sin garantía.
