import fs from 'fs-extra'
import path from 'path'
import { defineConfig } from 'cypress'

export default defineConfig({
    allowCypressEnv: false,
    e2e: {
        setupNodeEvents(on, config) {
            const file = config.env.environment || 'development'
            const configFile = path.join(config.projectRoot, 'cypress', 'config', `${file}.json`)
            return fs.readJson(configFile)
        },
    },
    injectDocumentDomain: false
})
