import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Forced reload to rebuild dependency cache after three.js downgrade
export default defineConfig({
  plugins: [react()],
})
