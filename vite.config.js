import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // kalau pakai React
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
