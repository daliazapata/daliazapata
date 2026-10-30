# Primera versión del perfil de Dalia

Rama: `feat/profile-readme`. Preparada el 30 de octubre de 2026.

## Cambios y decisiones

- README de perfil en español con portada, presentación, habilidades, tres proyectos principales, proyecto secundario, minijuego, comunidad, actividad y contacto.
- SVG originales en `assets/profile/`: cordillera andina, cielo nocturno, luna dorada, gato de cola anillada, escritorio e ilustraciones temáticas de los proyectos. Se generan con `python3 assets/profile/generar.py`, usando únicamente la biblioteca estándar. No descargan recursos ni necesitan ejecutarse para mostrar el perfil.
- `<picture>` selecciona una composición de portada específica para pantallas pequeñas; el resto de los recursos usa ancho relativo y texto alternativo.
- Los proyectos se muestran como tarjetas verticales con ilustración, descripción, tecnologías y enlaces. La información permanece en Markdown seleccionable; las ilustraciones no sustituyen las descripciones ni se presentan como capturas de las aplicaciones.
- `assets/profile/michi-mini.png` es una captura real del canvas del minijuego de `main` durante una partida, obtenida con Chromium. Se guardó fuera de `mini/` sin cambiar su código. La captura remite al juego; README no ejecuta JavaScript.
- La sección del juego distingue el minijuego del perfil y el repositorio original. El código del minijuego mantiene su licencia AGPL-3.0; véanse `mini/LICENSE` y `mini/CREDITOS.md` para sus atribuciones.
- La actividad enlaza a GitHub. No se añadieron contadores ficticios ni servicios externos de estadísticas.
- Contacto: GitHub es el único enlace confirmado; LinkedIn, correo y portafolio quedan marcados para revisión.

## Fuentes verificadas

Se leyeron los README y manifiestos relevantes de los repositorios, sin modificarlos ni copiarlos al perfil. Referencias consultadas:

| Proyecto | Revisión | Qué se refleja en el perfil |
| --- | --- | --- |
| FlightPredict | `7eee0c72c2b2b4815120adb1388c2b6c190c39f5` | React, TypeScript, FastAPI, Python y comparación de enfoques de ML sobre datos históricos. |
| IRIS Maritime Intelligence | `f69c606dce4614e523f6024ed41bc6840b16147b` | MVP académico con reglas deterministas y escenarios sintéticos, sin atribuirle ML ni vigilancia operativa. |
| Culinary AI Agent | `bb8a0f84f704f65f0fcf37b03339164e555fd8bd` | Gemini, Google ADK, subagente y validación Pydantic; apoyo a decisiones, sin certificación alimentaria. |
| Rock'em Sock'em Robots | `97b12bdde202f91325891e2962d81fd0f9970d54` | README base de Next.js y manifiesto; se consultó además `app/page.tsx` para confirmar el tema del proyecto. No se afirma haber ejecutado o validado su funcionalidad. |

La descripción personal, UPC, voluntariado en QuantumHub Perú y participación en WomenCISO/MenCISO proceden de la información proporcionada por Dalia. El contexto académico WomenCISO4 / MenCISO Gen 1 también figura en el README de IRIS. No se añadieron cargos, fechas, niveles de dominio ni métricas.

## Validación realizada

- Renderizado con markdown-it-py 4.0.0 y Chromium: 1200×900, 390×844 y 320×740; imágenes cargadas, portada adaptada y ausencia de desbordamiento horizontal de la página. Las tecnologías se organizan en bloques verticales para evitar tablas anchas en móvil.
- HTML del README: solo etiquetas permitidas habituales de GitHub (`picture`, `source`, `img`, `a`, `p`, `strong`, `br`); sin scripts, estilos personalizados ni contenido ejecutable.
- SVG analizados como XML: sin scripts, imágenes externas, eventos ni `foreignObject`. Los gráficos son autocontenidos.
- Rutas locales y anclas verificadas; imágenes con texto alternativo y separadores decorativos con `alt=""`.
- HTTP HEAD: respuestas 200 para perfil, pestaña de repositorios, los cuatro proyectos destacados y `michi-andino`.
- El dominio `daliazapata.github.io` respondió con un rechazo del proxy (403 al establecer el túnel). No demuestra un fallo del sitio; la disponibilidad del juego publicado no se pudo comprobar desde este entorno. Se conserva la URL proporcionada por Dalia.
- `git diff --check`: correcto. `git diff origin/main -- mini .github`: vacío. No se requieren pruebas ni build del minijuego porque permanece sin cambios.

## Capturas y límites respecto al mockup

[Vista de escritorio](escritorio.png) · [Vista móvil](movil.png).

Las capturas son una **aproximación local al renderizado del README**: el CSS utilizado solo para revisarlo no está incluido en el README ni determina su presentación en GitHub. Falta confirmar el renderizado final en GitHub al revisar la rama o el PR.

GitHub controla la tipografía, el ancho, los colores de texto y la disposición del Markdown. Por eso el diseño adapta la referencia con SVG originales y secciones verticales; no reproduce su cuadrícula web, botones con efectos CSS, navegación fija ni brillo general. Las ilustraciones usan geometría pixel art propia, sin copiar el mockup como una imagen única ni emplear imágenes de terceros.

No se incrusta el gráfico de contribuciones ni se inventan estadísticas; la actividad real se consulta en GitHub. La vista previa del juego es estática. No se cambió la configuración de Pages ni se ejecutó su workflow. No se hizo merge.
