import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {

    port: process.env.PORT || 3000 // Use the PORT environment variable if available, otherwise default to 3000

  }
});
