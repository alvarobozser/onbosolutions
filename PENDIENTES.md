# ONBO Solutions - Pendientes

Documento de seguimiento del proyecto. Las tareas estan ordenadas por impacto y no implican que deban ejecutarse todas antes de publicar.

## Estado actual

- Sitio React/Vite con TypeScript estricto.
- Home como pagina principal one-page.
- Navegacion principal hacia secciones de Home.
- Formulario independiente en `/contacto`.
- Privacidad independiente en `/privacidad`.
- Articulos individuales en `/blog/:slug`.
- Tests, build y lint configurados.
- No hay soporte real para ingles actualmente.
- Los cambios visuales actuales siguen sin commit hasta validacion visual final.

## Prioridad alta

### Identidad y contenido

- Definir el logo definitivo: wordmark, simbolo, proporciones y versiones para favicon, header, footer y redes.
- Confirmar nombre, rol y numero real de personas del equipo.
- Revisar las cifras y afirmaciones comerciales antes de publicarlas.
- Sustituir contenido provisional por casos de uso, clientes o testimonios autorizados.
- Revisar todos los textos de Home, Servicios, Identidad y Blog con el tono final de marca.

### Legal y privacidad

- Revisar la politica de privacidad con los datos legales reales de la empresa.
- Confirmar responsable del tratamiento, domicilio, base legal y plazos de conservacion.
- Confirmar condiciones de Web3Forms y transferencias internacionales.
- Valorar si hace falta aviso legal y politica de cookies independiente.
- Anadir aviso de privacidad junto al formulario.

### Formulario y seguridad

- Configurar `VITE_WEB3FORMS_KEY` en el entorno de produccion.
- Restringir la key por dominio desde Web3Forms si el proveedor lo permite.
- Anadir CAPTCHA o una proteccion anti-spam mas fuerte si aumenta el trafico.
- Monitorizar cuota, spam y entregabilidad de los mensajes.
- Definir un canal alternativo si Web3Forms no responde.

## Prioridad media

### SEO y arquitectura

- Decidir si se mantiene `HashRouter` o se migra a rutas reales con prerendering/SSG.
- Crear una imagen Open Graph propia en lugar del fallback actual.
- Anadir datos estructurados JSON-LD para empresa y articulos.
- Revisar canonical, sitemap y robots cuando exista dominio definitivo.
- Anadir metadatos especificos para cada articulo.
- Eliminar paginas/componentes legacy que ya no participan en la navegacion one-page.

### Idiomas

- Decidir si el producto necesita ingles en la primera version.
- Si se confirma, traducir todo el contenido, no solo la navegacion.
- Revisar fechas, metadatos SEO, formulario y textos legales por idioma.

### Accesibilidad y pruebas

- Anadir pruebas E2E con Playwright para navegacion, rutas de articulos y formulario.
- Ejecutar auditorias axe/Lighthouse en desktop y movil.
- Probar teclado completo: header, menu movil, acordeon, filtros y formulario.
- Validar contraste de textos secundarios y estados de foco en navegador real.
- Probar `prefers-reduced-motion` y navegadores sin `IntersectionObserver`.

### Rendimiento

- Medir Lighthouse antes de optimizar.
- Valorar carga diferida de paginas y articulos.
- Revisar el peso del bundle inicial.
- Valorar servir las tipografias localmente para reducir dependencias externas.
- Mantener las animaciones basadas en CSS/IntersectionObserver y evitar RAF continuo.

## Prioridad baja

### Infraestructura

- Fijar GitHub Actions a SHA despues de establecer un proceso de actualizacion.
- Revisar permisos del workflow con minimo privilegio.
- Configurar Dependabot o Renovate.
- Valorar CDN/proxy para CSP, `Referrer-Policy` y `Permissions-Policy`.

### Producto

- Definir analitica solo si existe una necesidad real y un sistema de consentimiento.
- Medir clics en contacto, envio de formulario y lectura de articulos.
- Crear una pagina de casos de estudio cuando haya material publicable.

## Decisiones abiertas

- Logo definitivo y sistema visual de marca.
- One-page pura frente a mantener articulos individuales.
- Mantener o retirar el idioma ingles del roadmap inmediato.
- Dominio definitivo y estrategia SEO.
- Proveedor final del formulario y nivel de proteccion anti-spam.

## Verificacion antes de publicar

```bash
pnpm test:run
pnpm build
pnpm lint
```

- Probar la Home en movil, tablet y desktop.
- Probar `/contacto`, `/privacidad` y un articulo individual.
- Verificar el formulario con una key de produccion en entorno seguro.
- Revisar enlaces, favicon, imagen social y datos legales.
