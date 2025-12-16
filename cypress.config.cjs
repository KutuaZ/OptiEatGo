import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    viewportWidth: 375,
    viewportHeight: 812,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
  },
});
