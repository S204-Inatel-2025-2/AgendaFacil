import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
    },
  },
});
