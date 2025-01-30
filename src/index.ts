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
  },
} satisfies ExportedHandler<Env>;