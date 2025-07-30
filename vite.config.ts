import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: process.env.NODE_ENV === "production" ? "/2048/" : "/",
    server: {
        host: "0.0.0.0",
        port: 3000,
        strictPort: true,
        allowedHosts: true,
        headers: {
            "X-Frame-Options": "ALLOWALL",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control",
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
