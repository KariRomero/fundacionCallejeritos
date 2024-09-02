import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Opciones adicionales de configuración de Rollup, si es necesario
    },
  },
});