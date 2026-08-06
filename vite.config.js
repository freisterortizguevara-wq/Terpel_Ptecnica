import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Terpel_Ptecnica/',
  server: {
    port: 3000,
  }
})