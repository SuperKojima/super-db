import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.dev.vars' })

export default defineConfig({
    schema: './src/schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        // eslint-disable-next-line node/prefer-global/process
        url: process.env.DATABASE_URL!,
    },
})
