
'use server'

import { inserat } from '../db/schema';
import db from "../db/drizzle";
import { eq } from 'drizzle-orm';

export const getInserate = async () : Promise<typeof inserat.$inferSelect[]> => {
    try {
        const findInserate = db.query.inserat.findMany({
            where : eq(
                inserat.isPublished, true
            ), with: {
                user: {
                    with: {
                        subscription: {
                            select: {
                                plan: true
                            }
                        }
                    }
                },
                images: true,
                address: true,
                lkwAttribute: true,
                pkwAttribute: true,
                trailerAttribute: true,
                transportAttribute: true,
                bookings: true,
                vehicles: {
                    with: {
                        bookings: true
                    }
                }

            },
        }).prepare("findInserate");
        
        const foundInserate : any = await findInserate.execute();

        return foundInserate;
    } catch(error : any){
        console.log(error);
        return [];
    }
}