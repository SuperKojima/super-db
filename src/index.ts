import type { NeonDatabase } from 'drizzle-orm/neon-serverless';
import { Hono } from 'hono'
import { Client, neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as d } from 'drizzle-orm/neon-http';
import { usersTable } from './schema';

interface Env {
  DATABASE_URL: string
  HYPERDRIVE: Hyperdrive
}

const app = new Hono<{ Bindings: Env }>()

app
  .get('/', (c) => {
    return c.text('Hello Hono!')
  })
  // .get('/users', async (c) => {
  //   const sql = neon(c.env.DATABASE_URL)
  //   const db = drizzle(sql)
  //   const users = await db.select().from(usersTable)
  //   return c.json(users)
  // })
  .get('/users-hd', async (c) => {
    const sql = neon(c.env.HYPERDRIVE.connectionString)
    console.log({
      HYPERDRIVE: c.env.HYPERDRIVE,
    })
    const db = d(sql)
    const users = await db.select().from(usersTable)
    return c.json(users)
  })

export default app
