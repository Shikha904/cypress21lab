const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  pageLoadTimeout: 100000,
  chromeWebSecurity: false,
  execTimeout: 120000,
  timeout: 100000,
  defaultCommandTimeout: 100000,
  requestTimeout: 100000,
  responseTimeout: 100000,
  viewportWidth: 1200,
  viewportHeight: 700,
  env: {
    dev: 'https://ui-dev-us.app.perfectomobile.com/lab/scriptless-mobile/?scriptlessMobileEnv=dev',
    staging:
      'https://ui-dev-us.app.perfectomobile.com/lab/scriptless-mobile/?scriptlessMobileEnv=staging',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    charts: true,
    reportPageTitle: 'E2E Test Suite',
    embeddedScreenshots: true,
    inlineAssets: true,
  }, 
  e2e: {
    experimentalSessionAndOrigin:true,
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})