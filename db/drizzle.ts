import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from "./schema"
import { neon } from '@neondatabase/serverless';



const connnectionString = process.env.EXPO_DATABASE_URL || 
"postgresql://main_owner:hHkq0BMb5gIr@ep-black-glade-a2ur9ox2-pooler.eu-central-1.aws.neon.tech/main?sslmode=require";

console.log("connnectionString", process.env.EXPO_DATABASE_URL);

const client = neon(connnectionString as string);
const db = drizzle(client, { schema });




export default db;
