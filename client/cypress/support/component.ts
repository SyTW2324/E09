// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
// import '@cypress/code-coverage/support';
// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)

// // cypress.config.js
// const { defineConfig } = require('cypress')

// module.exports = defineConfig({
//   // setupNodeEvents can be defined in either
//   // the e2e or component configuration
//   e2e: {
//     setupNodeEvents(on, config) {
//       require('@cypress/code-coverage/task')(on, config)
//       // include any other plugin code...

//       // It's IMPORTANT to return the config object
//       // with any changed environment variables
//       return config
//     },
//   },
// })