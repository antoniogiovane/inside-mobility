import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Se pubblichi in una sottocartella, imposta base: "/sottocartella/".
export default defineConfig({
  plugins: [react()],
  base: "./",
});
