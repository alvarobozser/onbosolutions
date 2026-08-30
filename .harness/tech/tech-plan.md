# Tech Plan — ONBO Solutions Web

## Resumen
Sitio web corporativo de ONBO Solutions: 5 páginas (Home, Servicios, Guías, Identidad, Contacto), diseño minimalista blanco/negro, multiidioma ES/EN con react-i18next, formulario vía Web3Forms, desplegado en GitHub Pages con GitHub Actions.

## Entorno
- Lenguaje: TypeScript (strict)
- Build: `pnpm build`
- Dev: `pnpm dev`
- Lint: `pnpm lint`
- Tests: N/A en esta fase (sitio estático, sin lógica de negocio compleja)

---

## Tareas

### Task 1: Configurar proyecto base (Vite + Tailwind v4 + TypeScript strict)
**Archivos**:
- `vite.config.ts` — modificar: añadir `base: '/onbosolutions/'` y plugin de Tailwind
- `src/index.css` — modificar: importar Tailwind v4 con `@import "tailwindcss"`
- `tsconfig.app.json` — modificar: activar `strict: true`, `noUnusedLocals`, `noUnusedParameters`
- `src/App.tsx` — limpiar: eliminar contenido de demo de Vite
- `src/main.tsx` — revisar: asegurar que monta `<App />` correctamente

**Qué hacer**:
Dejar el proyecto con Vite configurado para GitHub Pages (`base`), Tailwind v4 activo via plugin, y TypeScript en modo strict. Eliminar todo el código de demo generado por Vite (estilos, componentes de ejemplo, logo SVG).

**Criterios de Aceptación**:
- [ ] `pnpm build` termina sin errores
- [ ] `pnpm dev` levanta en localhost y muestra página en blanco (sin demo)
- [ ] `pnpm lint` sin errores

**Validación**: `pnpm build && pnpm lint`
**Estimado**: 20 min

---

### Task 2: Instalar dependencias de producción
**Archivos**:
- `package.json` — modificar: añadir dependencias
- `pnpm-lock.yaml` — actualizar automáticamente

**Qué hacer**:
Instalar con pnpm:
```
pnpm add react-router-dom react-i18next i18next lucide-react
```
Verificar que no hay conflictos de versiones con React 19.

**Criterios de Aceptación**:
- [ ] `pnpm install` termina sin warnings de peer deps
- [ ] `pnpm build` sigue pasando tras instalar

**Validación**: `pnpm build`
**Estimado**: 10 min

---

### Task 3: Configurar routing (HashRouter + 5 rutas)
**Archivos**:
- `src/main.tsx` — modificar: envolver `<App>` en `<HashRouter>`
- `src/App.tsx` — modificar: definir `<Routes>` con las 5 páginas
- `src/pages/Home.tsx` — crear: componente placeholder `<main>Home</main>`
- `src/pages/Servicios.tsx` — crear: placeholder
- `src/pages/Guias.tsx` — crear: placeholder
- `src/pages/Identidad.tsx` — crear: placeholder
- `src/pages/Contacto.tsx` — crear: placeholder

**Qué hacer**:
Configurar `HashRouter` con rutas `/`, `/servicios`, `/guias`, `/identidad`, `/contacto`. Cada página es un componente funcional mínimo con un `<h1>` de su nombre. Sin layouts todavía.

**Criterios de Aceptación**:
- [ ] Navegar a `/#/servicios` renderiza el componente Servicios
- [ ] Navegar a `/#/contacto` renderiza el componente Contacto
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 20 min

---

### Task 4: Configurar i18n (react-i18next + ES/EN)
**Archivos**:
- `src/i18n/index.ts` — crear: inicialización de i18next con detección de idioma
- `src/i18n/locales/es.json` — crear: todas las claves en español
- `src/i18n/locales/en.json` — crear: todas las claves en inglés
- `src/main.tsx` — modificar: importar `src/i18n/index.ts` antes del render

**Qué hacer**:
Inicializar i18next con `i18next-browser-languagedetector`. Idioma por defecto: `es`. Fallback: `es`. Incluir todas las claves de texto de las 5 páginas (nav, hero, servicios, CTA, guías, identidad, FAQ, contacto). El selector de idioma (`ES ▾` / `EN ▾`) cambiará el idioma globalmente sin recargar.

**Criterios de Aceptación**:
- [ ] `useTranslation()` disponible en cualquier componente
- [ ] Cambiar idioma con `i18next.changeLanguage('en')` actualiza los textos
- [ ] `pnpm build` sin errores de tipos

**Validación**: `pnpm build`
**Estimado**: 30 min

---

### Task 5: Componente Layout (Header + Footer + WhatsApp FAB)
**Archivos**:
- `src/components/layout/Header.tsx` — crear: nav con logo, links, selector idioma, botón CONTACTO
- `src/components/layout/Footer.tsx` — crear: footer minimalista con links y copyright
- `src/components/layout/WhatsAppFAB.tsx` — crear: botón flotante WhatsApp esquina inferior derecha
- `src/components/layout/Layout.tsx` — crear: wrapper `<Header> + {children} + <WhatsAppFAB> + <Footer>`
- `src/App.tsx` — modificar: envolver cada `<Route>` con `<Layout>`

**Qué hacer**:
Header: logo wordmark "ONBO" bold, nav links, dropdown "Servicios ▾" (hover), selector idioma ES/EN, botón CTA negro "CONTACTO →". Mobile: menú hamburguesa. Footer: logo, links, copyright, email. WhatsApp FAB: círculo verde fijo bottom-right, abre `https://wa.me/{número}` en nueva pestaña (el número se define como constante en `src/config/constants.ts`).

**Criterios de Aceptación**:
- [ ] Header visible en todas las páginas
- [ ] Dropdown de Servicios funciona en hover (desktop) y click (mobile)
- [ ] Selector idioma cambia textos del header
- [ ] WhatsApp FAB visible en todas las páginas
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 1.5h

---

### Task 6: Página Home — sección Hero
**Archivos**:
- `src/pages/Home.tsx` — modificar: añadir sección Hero
- `src/components/home/Hero.tsx` — crear

**Qué hacer**:
Fondo blanco, formas geométricas 3D abstractas negras como SVG inline (prismas/bloques flotando), titular bold en 2 líneas (traducido), dos CTAs: primario negro sólido ("Cómo te ayudamos" → `/servicios`) y secundario outline ("Habla con nosotros" → `/contacto`). Logo ONBO grande bottom-right decorativo.

**Criterios de Aceptación**:
- [ ] Hero renderiza en desktop y mobile sin overflow horizontal
- [ ] Los dos CTAs navegan a la ruta correcta
- [ ] Texto usa `useTranslation()`
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 1h

---

### Task 7: Página Home — sección Servicios preview (3 cards partidas)
**Archivos**:
- `src/components/home/ServiciosPreview.tsx` — crear
- `src/components/shared/SplitCard.tsx` — crear: card reutilizable blanco/negro

**Qué hacer**:
Componente `SplitCard` con prop `left` (fondo blanco, texto) y `right` (fondo negro, refuerzo). Tres instancias en Home: Desarrollo a Medida, Consultoría IA, Innovación/Financiación. El lado derecho de cada card muestra casos de éxito, métricas o CTA según el brief. Todo traducido.

**Criterios de Aceptación**:
- [ ] `SplitCard` acepta props tipadas (no `any`)
- [ ] Layout responde correctamente en mobile (stacked) y desktop (side by side)
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 1h

---

### Task 8: Página Home — CTA negro + Carrusel de logos
**Archivos**:
- `src/components/home/CTABanner.tsx` — crear: sección fondo negro con badge, titular, pills, botón CTA, email
- `src/components/shared/LogoCarousel.tsx` — crear: carrusel infinito CSS

**Qué hacer**:
`CTABanner`: fondo `#000`, badge pequeño, titular centrado blanco 2 líneas, subtítulo gris, 3 pills con check, botón CTA blanco sólido, línea de email alternativo. `LogoCarousel`: animación CSS `@keyframes scroll` con `animation-play-state: paused` on hover, logos en escala de grises (placeholders SVG con nombre de empresa ficticio). Sin librerías externas.

**Criterios de Aceptación**:
- [ ] Carrusel anima en bucle continuo sin saltos
- [ ] Se pausa al hacer hover
- [ ] Funciona en mobile
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 1h

---

### Task 9: Página Home — Guías preview + ensamblaje Home completo
**Archivos**:
- `src/components/home/GuiasPreview.tsx` — crear: grid 3x2 de cards de guía + card negra "Ver todas"
- `src/pages/Home.tsx` — modificar: ensamblar todas las secciones en orden

**Qué hacer**:
Grid responsive de cards con patrón geométrico abstracto como fondo (SVG inline o `background` CSS), badge categoría, título artículo, fecha + flecha. Última card negra "10+ Ver todas las guías" con link a `/guias`. Ensamblar: `<Hero> <ServiciosPreview> <CTABanner> <LogoCarousel> <GuiasPreview>`.

**Criterios de Aceptación**:
- [ ] Home completo renderiza sin errores de consola
- [ ] Grid colapsa correctamente en mobile
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 1h

---

### Task 10: Página Servicios (detalle)
**Archivos**:
- `src/pages/Servicios.tsx` — modificar: implementar página completa con 3 `SplitCard`

**Qué hacer**:
Reusar `SplitCard` de Task 7 con contenido más detallado que en Home. Añadir hero de página con título "Nuestros Servicios" y subtítulo. Todo traducido.

**Criterios de Aceptación**:
- [ ] Página renderiza las 3 cards con contenido diferenciado
- [ ] Reutiliza `SplitCard` sin duplicar estilos
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 45 min

---

### Task 11: Página Guías (grid completo)
**Archivos**:
- `src/data/guias.ts` — crear: array tipado con las guías estáticas (título, categoría, fecha, descripción, slug)
- `src/pages/Guias.tsx` — modificar: implementar grid completo de artículos

**Qué hacer**:
6–8 artículos estáticos en `guias.ts` (tipados con interfaz `Guia`). Grid 3 columnas desktop / 2 tablet / 1 mobile. Filtro por categoría (pills clicables arriba del grid). Sin routing de artículo individual en esta fase.

**Criterios de Aceptación**:
- [ ] `guias.ts` exporta array con tipo `Guia[]` sin `any`
- [ ] Filtro por categoría funciona sin recarga
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 1h

---

### Task 12: Página Identidad (Nosotros)
**Archivos**:
- `src/pages/Identidad.tsx` — modificar: implementar página completa
- `src/components/identidad/TeamCard.tsx` — crear: card de miembro del equipo

**Qué hacer**:
Implementar las 4 subsecciones del brief: narrativa (card borde fino), cita destacada + imagen abstracta (panel negro), valores en pills (fondo negro, 4 conceptos), equipo (3–4 `TeamCard` con bios compuestas basadas en el brief, sin nombre real ni empleador). Todo traducido.

**Criterios de Aceptación**:
- [ ] 3–4 cards de equipo con roles diferenciados (Arquitecto Backend, Especialista IA, Ingeniero Full-Stack)
- [ ] Ninguna bio menciona empleador real ni nombre identificable
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 1.5h

---

### Task 13: Página Contacto (info + formulario Web3Forms)
**Archivos**:
- `src/pages/Contacto.tsx` — modificar: implementar layout 2 columnas
- `src/components/contacto/ContactForm.tsx` — crear: formulario con validación client-side
- `src/config/constants.ts` — crear/modificar: `WEB3FORMS_ACCESS_KEY` leído de `import.meta.env`

**Qué hacer**:
Layout 2 columnas: izquierda (info con iconos lucide en cuadrado negro, links política privacidad), derecha (formulario sobre panel negro). Campos: Nombre, Email, select "¿Qué te interesa?", Teléfono (opcional), Mensaje. Validación HTML5 + JS antes de enviar. Submit via `fetch` a Web3Forms API. Estados: idle / loading / success / error. Access key en variable de entorno `VITE_WEB3FORMS_KEY` (sin hardcodear). Todo traducido.

**Criterios de Aceptación**:
- [ ] Formulario no envía con campos requeridos vacíos
- [ ] `VITE_WEB3FORMS_KEY` se lee de `import.meta.env` (nunca hardcodeada)
- [ ] Estado de éxito/error visible al usuario
- [ ] `pnpm build` sin errores
- [ ] `.env.example` creado con `VITE_WEB3FORMS_KEY=your_key_here`

**Validación**: `pnpm build`
**Estimado**: 1h

---

### Task 14: Página FAQ (acordeón)
**Archivos**:
- `src/data/faq.ts` — crear: array tipado con preguntas y respuestas
- `src/components/shared/Accordion.tsx` — crear: componente acordeón reutilizable
- `src/pages/Contacto.tsx` — modificar: añadir sección FAQ encima o debajo del formulario (a decidir en impl.)

**Qué hacer**:
`Accordion` con estado interno (qué ítem está abierto). Primera pregunta abierta por defecto. Ícono `+`/`−` a la derecha. Animación suave con CSS `max-height` transition. 5–6 preguntas en `faq.ts` en ES/EN (claves de i18n). Layout 2 columnas: título fijo izquierda, acordeón derecha.

**Criterios de Aceptación**:
- [ ] Solo un ítem abierto a la vez
- [ ] Animación de apertura/cierre sin saltos
- [ ] `pnpm build` sin errores

**Validación**: `pnpm build`
**Estimado**: 45 min

---

### Task 15: GitHub Actions — deploy a GitHub Pages
**Archivos**:
- `.github/workflows/deploy.yml` — crear: workflow de CI/CD

**Qué hacer**:
Workflow que se dispara en push a `main`. Pasos: checkout → setup Node → setup pnpm → `pnpm install --frozen-lockfile` → `pnpm build` → deploy de `dist/` a rama `gh-pages` con `peaceiris/actions-gh-pages`. Secrets necesarios: `VITE_WEB3FORMS_KEY` como GitHub Actions secret.

**Criterios de Aceptación**:
- [ ] Workflow válido (pasa `yamllint`)
- [ ] No hardcodea ningún secret
- [ ] `dist/` se publica en rama `gh-pages` tras push a `main`
- [ ] Documentar en README.md qué secrets configurar en GitHub

**Validación**: revisión manual del YAML + primer push a `main`
**Estimado**: 30 min

---

### Task 16: Primer commit + push inicial a GitHub
**Archivos**:
- `.gitignore` — verificar: incluye `node_modules`, `dist`, `.env`
- `README.md` — modificar: documentar stack, comandos de dev, secrets necesarios
- Todos los archivos del scaffold configurado

**Qué hacer**:
Verificar `.gitignore` correcto, hacer `git add` selectivo (excluir `.env` si existe), commit inicial con mensaje `chore: scaffold inicial React + Vite + Tailwind + pnpm`, push a `origin main`.

**Criterios de Aceptación**:
- [ ] Ningún `.env` ni secret en el commit
- [ ] `git status` limpio tras el push
- [ ] Rama `main` visible en `https://github.com/alvarobozser/onbosolutions`

**Validación**: `git log --oneline -1` + revisar GitHub
**Estimado**: 15 min

---

## Validación Global
```
pnpm build && pnpm lint
```

## Si Algo Falla
1. Para la ejecución inmediatamente
2. Reporta el output exacto del error
3. Espera instrucción humana antes de continuar
