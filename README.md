# ONBO Solutions — Sitio Web Corporativo

## Stack

- React 19 + Vite 8 + TypeScript (strict)
- Tailwind CSS v4
- react-router-dom v7 (HashRouter)
- react-i18next — ES / EN
- Package manager: **pnpm**

## Desarrollo local

```bash
cp .env.example .env   # rellena las variables
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Deploy — GitHub Pages

El workflow `.github/workflows/deploy.yml` despliega automáticamente a GitHub Pages en cada push a `main`.

**Configuración inicial:**
1. Ve a **Settings → Pages → Source** y selecciona la rama `gh-pages`.
2. Añade los secrets en **Settings → Secrets and variables → Actions**:

| Secret | Descripción |
|--------|-------------|
| `VITE_WEB3FORMS_KEY` | Access key de [web3forms.com](https://web3forms.com) |

## Variables de entorno

Copia `.env.example` a `.env` y rellena los valores:

```env
VITE_WEB3FORMS_KEY=tu_key_aqui
```
