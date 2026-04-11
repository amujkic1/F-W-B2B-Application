# Client (Vite + React)

This client app now runs on Vite.

## Requirements

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Available Scripts

### `npm run dev`

Starts the Vite development server.
Default URL: http://localhost:5173

### `npm start`

Alias of `npm run dev`.

### `npm run build`

Builds the app for production into `dist/`.

### `npm run preview`

Serves the production build locally for preview.

## Environment Variables

The project keeps compatibility with existing `REACT_APP_*` variables via Vite config, so current environment setup can remain unchanged.

## Notes

- Static template/vendor assets are served from `public/assets`.
- App entry HTML is `index.html` at the client root.
