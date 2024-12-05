const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'reportExecutionTest',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: "https://test-qa.inlaze.com/",
    chromeWebSecurity: false,
    testIsolation: false,
    // viewportHeight: 900,
    // viewportWidth: 1500,
    defaultCommandTimeout: 5000,
    retries: 2,
  },
});
