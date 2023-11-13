import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    root: "./",
    environment: "jsdom",
    testTimeout: 100000,
    reporters: ["default", "junit"],
    outputFile: "coverage/junit.xml",
    clearMocks: true,
    coverage: {
      include: ["src"],
      reportsDirectory: "coverage",
      reporter: ["lcov", "cobertura", "html"],
    },
  },
});
