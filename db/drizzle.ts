import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from "./schema"
import { neon } from '@neondatabase/serverless';



const connnectionString = process.env.EXPO_PUBLIC_DATABASE_URL;


const client = neon(connnectionString as string);
const db = drizzle(client, { schema });




export default db;
