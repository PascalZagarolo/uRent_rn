import { Pool } from "@neondatabase/serverless"
import { drizzle } from 'drizzle-orm/neon-serverless';

export const createPool = () => {
 
    const connnectionString = process.env.EXPO_PUBLIC_DATABASE_URL;

    const pool = new Pool({
        connectionString : connnectionString
    })

    const db = drizzle(pool);
    
}