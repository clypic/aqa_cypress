import { defineConfig } from 'cypress'

export default defineConfig({
    allowCypressEnv: false,
    e2e: {},
    expose: {
        environment: 'staging',
    },
    injectDocumentDomain: false
});
