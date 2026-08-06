import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // ✅ Cambiado a ruta relativa
  server: {
    port: 3000,
  }
})