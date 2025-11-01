import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/feliz-cumple-amanda/' // Cambia si usas otro repo nombre
})
