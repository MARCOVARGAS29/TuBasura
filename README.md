# TuBasura

Aplicacion web base para consultar horarios de recoleccion por distrito.

## Funcionalidad actual

- Seleccion de distrito mediante `select` con opciones del `1` al `15`.
- Visualizacion de dias y hora aproximada de recoleccion.
- Arquitectura MVP con separacion de `model`, `view` y `presenter`.
- Pruebas unitarias en Jest para modelo, presenter y vista.

## Comandos

- `npm install`: instala dependencias.
- `npm start`: levanta la aplicacion con Parcel.
- `npm run build`: genera la version de produccion.
- `npm test`: ejecuta el flujo TDD configurado por el proyecto.
- `npm run test-once`: ejecuta toda la suite Jest una sola vez.
- `npm run test:model`: ejecuta solo las pruebas del modelo.
- `npm run test:presenter`: ejecuta solo las pruebas del presenter.
- `npm run test:view`: ejecuta solo las pruebas de la vista.
- `npm run lint`: valida el estilo del codigo.
