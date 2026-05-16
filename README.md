# TuBasura

Aplicacion web base para consultar horarios de recoleccion por distrito.

## Funcionalidad actual

- Seleccion de distrito mediante `select` con opciones del `1` al `15`.
- Visualizacion de dias y hora aproximada de recoleccion.
- Arquitectura hexagonal con dominio, casos de uso, puertos y adaptadores.
- Pruebas unitarias en Jest para modelo, presenter y vista.

## Arquitectura hexagonal

- `src/domain`: reglas y datos del negocio, como horarios, usuarios y reportes.
- `src/application`: casos de uso de la aplicacion y definicion de puertos.
- `src/infrastructure`: adaptadores de salida, como almacenamiento en `localStorage`
  y repositorios en memoria.
- `src/adapters/ui`: adaptadores de entrada para la interfaz web (`view` y
  `presenter`).
- `src/main.js`: composicion de dependencias; conecta la UI con los casos de uso.

Los archivos `src/model.js`, `src/presenter.js` y `src/view.js` se mantienen como
fachadas para compatibilidad con las pruebas existentes.

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
