import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const reactAppEnvDefines = Object.fromEntries(
    Object.entries(env)
      .filter(([key]) => key.startsWith('REACT_APP_'))
      .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
  );

  return {
    plugins: [react()],
    define: {
      ...reactAppEnvDefines,
      'process.env.NODE_ENV': JSON.stringify(mode)
    }
  };
});
