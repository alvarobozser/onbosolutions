# Research Plan — ONBO Solutions Web

  "feature": "ONBO Solutions Web",
Construir el sitio web corporativo de ONBO Solutions: landing de marketing con 5 páginas (Home, Servicios, Guías, Identidad, Contacto), diseño minimalista blanco/negro, multiidioma ES/EN, desplegado en GitHub Pages.

## Contexto y Restricciones

- **Referencia visual**: estructura y patrones de UI de OSIX Tech — NO se copia copy ni branding
- **Sin backend**: formulario de contacto vía servicio externo (Web3Forms — tier gratuito, sin cuenta obligatoria)
- **GitHub Pages**: SPA con React necesita `HashRouter` o el truco `404.html`; usaremos `HashRouter` para simplicidad
- **Multiidioma desde el inicio**: `react-i18next` + archivos JSON por idioma (`es.json`, `en.json`)
- **NO haremos**: CMS, autenticación, base de datos, analytics avanzados, blog dinámico (las guías serán contenido estático en la primera versión)
- **Paleta**: Negro `#000000` / Blanco `#FFFFFF` — sin colores de acento en MVP

## Decisiones de Diseño

- **Router**: `react-router-dom` con `HashRouter` — evita configuración 404 custom en GitHub Pages
- **i18n**: `react-i18next` — estándar de la comunidad React, tree-shakeable, lazy loading de traducciones
- **Formulario**: `Web3Forms` — no requiere backend, tier gratuito, recibe emails directamente
- **Iconos**: `lucide-react` — ligero, consistente, tree-shakeable
- **Animaciones**: CSS puro + `@keyframes` para el carrusel infinito — sin dependencias extra
- **Deploy**: GitHub Actions workflow que construye y publica a rama `gh-pages` en cada push a `main`
- **Base path**: `vite.config.ts` con `base: '/onbosolutions/'` para GitHub Pages

## Riesgos Identificados

- **HashRouter y SEO**: las URLs con `#` no son indexables. Mitigación: aceptable para MVP, documentar para migración futura a SSG (Astro/Next.js) si SEO es prioritario
- **GitHub Pages y custom domain**: si se añade dominio propio, el `base` de Vite cambia. Mitigación: externalizar en variable de entorno desde el inicio
- **Web3Forms límite gratuito**: 250 envíos/mes. Mitigación: suficiente para MVP; escalar a Resend/Postmark si crece
- **Contenido equipo ficticio**: el brief pide perfiles compuestos basados en experiencia real. Mitigación: redactar bios genéricas sin datos identificables

## Stack del Proyecto

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 |
| Build | Vite 8 |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS v4 |
| Router | react-router-dom v7 (HashRouter) |
| i18n | react-i18next |
| Formulario | Web3Forms (fetch API) |
| Iconos | lucide-react |
| Package manager | pnpm |
| Deploy | GitHub Actions → GitHub Pages |
| Linter | oxlint (ya incluido en scaffold) |

## Estructura de Páginas

```
/ (Home)          → Hero, Servicios preview, CTA, Logos carrusel, Guías preview, CTA negro
/servicios        → 3 cards partidas blanco/negro en detalle
/guias            → Grid de artículos estáticos
/identidad        → Narrativa, cita, valores, equipo
/contacto         → Info + formulario Web3Forms
```

## Próximo Paso
→ Activar Planner para generar el tech-plan con tasks atómicas por componente
