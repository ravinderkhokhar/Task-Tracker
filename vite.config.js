import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'; // Import path module
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add the Tailwind CSS plugin here
  ],
  resolve: {
    alias: {
        "@": path.resolve(__dirname, "./src"), // Configure alias
    },
  },
})
