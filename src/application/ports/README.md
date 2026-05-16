# Puertos de la aplicacion

La aplicacion usa estos contratos como puertos de salida:

- `authRepository`: valida credenciales y crea sesiones invitadas.
- `scheduleRepository`: entrega opciones y horarios por distrito.
- `reportRepository`: lista, crea y actualiza reportes.

En JavaScript los contratos se cumplen por convencion: cada adaptador debe
implementar los metodos usados por `CollectionScheduleUseCases`.
