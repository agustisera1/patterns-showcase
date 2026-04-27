## Escenario 1: Construcción y Estrategia (Creacionales + Strategy)

**Problema:** El sistema debe procesar pagos de diferentes tipos (Crédito, Cripto, Transferencia Bancaria). Cada uno tiene una lógica de comisión y validación distinta.

**Requerimiento (TDD):** "Dada una solicitud de pago de tipo Cripto, el sistema debe calcular una comisión del 2%, mientras que para Transferencia debe ser 0%."

**Implementación:**

- Usa un Factory para instanciar el procesador correcto.
- Usa el Strategy Pattern para encapsular los algoritmos de cálculo de comisiones.

**Validación de Capa 0:** El código no debe tener un switch gigante. Agregar un nuevo método de pago debe implicar crear una clase nueva, no modificar las existentes (OCP).

---

## Escenario 2: El Pipeline de Seguridad (Chain of Responsibility)

**Problema:** Antes de procesar cualquier pago, este debe pasar por una serie de filtros obligatorios: Validación de Formato -> Verificación de Saldo -> Chequeo de Fraude.

**Requerimiento (TDD):** "Si un pago falla en el Chequeo de Fraude, el proceso debe detenerse inmediatamente y no intentar verificar el saldo ni ejecutar el pago."

**Implementación:** Crea una Chain of Responsibility. Cada "eslabón" decide si pasa el mando al siguiente o corta la ejecución.

**Validación de Capa 0:** Debes poder reordenar los pasos o añadir un paso de "Verificación de Identidad AI" simplemente cambiando la configuración de la cadena en el punto de entrada.

---

## Escenario 3: Compatibilidad y Auditoría (Adapter + Decorator)

**Problema:** Tienes que conectar con un proveedor externo (ej. Stripe) que tiene una interfaz incompatible con la tuya. Además, necesitas que cada operación guarde un log detallado en la base de datos sin ensuciar la lógica del negocio.

**Requerimiento (TDD):** "Al ejecutar un pago a través del proveedor LegacyBank, el sistema debe mapear sus campos extraños a nuestro estándar y, además, debe registrar el tiempo de ejecución en la consola."

**Implementación:**

- Usa un Adapter para que LegacyBank hable el idioma de tu interfaz `IPaymentProcessor`.
- Usa un Decorator para envolver cualquier procesador y añadirle la funcionalidad de Logging o Profiling dinámicamente.

**Validación de Capa 0:** El procesador de pagos original no debe saber que está siendo auditado.

---

## Escenario 4: Reacciones en Cadena (Observer)

**Problema de negocio:** Cuando un pago se completa con éxito, deben ocurrir tres cosas: enviar un email al usuario, actualizar el dashboard de analíticas y notificar al sistema de impuestos.

**Requerimiento (TDD):** "Cuando el estado del pago cambie a SUCCESS, se deben disparar automáticamente las notificaciones a todos los sistemas suscritos sin que el procesador de pagos los conozca directamente."

**Implementación:** Usa el Observer Pattern. El `PaymentService` emite un evento y los suscriptores reaccionan.

**Validación de Capa 0:** Si mañana quieres añadir una notificación por SMS, solo tienes que crear un nuevo Subscriber y suscribirlo, sin tocar una sola línea del `PaymentService`.

---

## Escenario 5: Reversibilidad de Operaciones (Command)

**Problema:** El sistema debe permitir "Deshacer" (Refund) una operación o reintentar una operación fallida exactamente con los mismos parámetros.

**Requerimiento (TDD):** "El sistema debe mantener un historial de comandos ejecutados y permitir invocar el método `undo()` en el último comando de pago para revertir la transacción."

**Implementación:** Encapsula la acción de pagar en un objeto Command.

**Validación de Capa 0:** Esto facilita enormemente la auditoría y la implementación de políticas de reintento.

---

## ¿Cómo estructurarlo en tu Portfolio?

No entregues solo el código. Crea una carpeta `docs/scenarios` donde expliques:

- **Contexto:** "El negocio necesitaba añadir un nuevo sistema de prevención de fraude".
- **El dolor (sin patrones):** "Teníamos que modificar 5 archivos y corríamos el riesgo de romper la lógica de pagos".
- **La solución (con patrones):** "Implementamos una Chain of Responsibility, lo que nos permitió añadir el chequeo de fraude como un módulo independiente".

Esta narrativa demuestra que no usas patrones "porque sí", sino para resolver problemas de escalabilidad y mantenimiento.

---

¿Te parece que esta narrativa de Fintech encaja con lo que tenías en mente, o prefieres algo más orientado a un sistema de gestión de contenidos o redes sociales?
