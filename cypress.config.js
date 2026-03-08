import { defineConfig } from "cypress";

export default defineConfig({
    allowCypressEnv: false,
		injectDocumentDomain: false,
    e2e: {
				specPattern: 'cypress/e2e/**/*.cy.{mjs,js,jsx,ts,tsx}'
    },
});
