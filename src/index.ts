import postgres from "postgres";

export interface Env {
  HYPERDRIVE: Hyperdrive;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const sql = postgres(env.HYPERDRIVE.connectionString);

    console.log({HYPERDRIVE: env.HYPERDRIVE});
    // {
    //   HYPERDRIVE: Hyperdrive {
    //     connectionString: 'postgresql://neondb_owner:xxxxxxxxxxxx.hyperdrive.local:5432/neondb?sslmode=disable',
    //     port: 5432,
    //     host: 'xxxxxxxxxxxx.hyperdrive.local',
    //     password: 'xxxxxxxxxxxx',
    //     user: 'neondb_owner',
    //     database: 'neondb'
    //   }
    // }

    try {
      const result = await sql`SELECT * from public."users"`;
      return Response.json({ result });
    } catch (e) {
      console.error(e);
      return Response.json(
        { error: e instanceof Error ? e.message : e },
        { status: 500 }
      );
    }

    //     ✘ [ERROR] PostgresError: connection is insecure (try using `sslmode=require`)
    //     at ErrorResponse
    // (file:///Users/kjm/dev/super-db/node_modules/postgres/cf/src/connection.js:790:26)
    //     at handle
    // (file:///Users/kjm/dev/super-db/node_modules/postgres/cf/src/connection.js:475:7)
    //     at EventEmitter.data
    // (file:///Users/kjm/dev/super-db/node_modules/postgres/cf/src/connection.js:317:9)
    //     at EventEmitter.emit (node-internal:events:307:32)
    //     at read (file:///Users/kjm/dev/super-db/node_modules/postgres/cf/polyfills.js:202:13)
    //     at cachedError
    // (file:///Users/kjm/dev/super-db/node_modules/postgres/cf/src/query.js:170:23)
    //     at new Query
    // (file:///Users/kjm/dev/super-db/node_modules/postgres/cf/src/query.js:36:24)
    //     at sql2 (file:///Users/kjm/dev/super-db/node_modules/postgres/cf/src/index.js:113:11)
    //     at Object.fetch (file:///Users/kjm/dev/super-db/src/index.ts:18:28) {
    //   severity_local: 'ERROR',
    //   code: 'XX000'
    // }
  },
} satisfies ExportedHandler<Env>;