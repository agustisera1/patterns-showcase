Descripción: Una librería de control de tráfico y protección de APIs que gestiona el estado de forma distribuida para prevenir el abuso del sistema.

Algoritmos de Throttling: Implementación de Token Bucket, Fixed Window Counter y Sliding Window Log/Counter.

Sistemas Distribuidos (Intro): Gestión de estado compartido mediante backends externos (Redis).

Concurrencia y Atomicidad: Resolución de condiciones de carrera (Race Conditions) mediante el uso de scripts de Lua en Redis o bloqueos optimistas.

API Design: Diseño de interfaces públicas amigables, extensibilidad mediante el patrón Strategy y configuración por defecto.

Protocolos & Estándares: Manejo de Headers HTTP estándar (X-RateLimit-Limit, X-RateLimit-Remaining) y códigos de estado (429 Too Many Requests).

Resiliencia: Degradación controlada (Graceful Degradation) si el sistema de almacenamiento (Redis) falla.
