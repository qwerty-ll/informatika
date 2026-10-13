import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// сайт публикуется на GitHub Pages по адресу qwerty-ll.github.io/informatika/
export default defineConfig({
  base: '/informatika/',
  plugins: [react(), tailwindcss()],
});
