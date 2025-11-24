import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // URL do frontend rodando no container
    baseUrl: "http://localhost:4200",

    // onde estão seus testes (opcional, mas bom deixar explícito)
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

    viewportWidth: 1920,
    viewportHeight: 1080,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
