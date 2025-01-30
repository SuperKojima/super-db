import { Hono } from 'hono'

interface Env {
  DATABASE_URL: string
}

const app = new Hono<{ Bindings: Env }>()

app
  .get('/', (c) => {
    return c.text('Hello Hono!')
  })

export default app