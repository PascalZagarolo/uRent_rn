import db from "@/db/drizzle";
import { report } from "@/db/schema";
import { checkRateLimit } from "@/lib/api-rate-limiter";
import { and, eq, isNotNull, or } from "drizzle-orm";

export const createReport = async (values): Promise<{ error?: string, success?: string }> => {
    "use server";
    try {

        const isAllowed = await checkRateLimit();
        if (!isAllowed) {
            console.log("Zu viele Anfragen..");
            return { error: "Zu viele Anfragen" }
        }

        const {
            reportType,
            reportedAsset,
            inseratId,
            userId,
            messageId,
            conversationId,
            reportedUser,
            content
        } = values;

        const findExisting = await db.query.report.findFirst({
            where: or(
                and(
                    eq(report.userId, userId),
                    eq(report.inseratId, inseratId),
                    isNotNull(report.inseratId)
                ),
                and(
                    eq(report.userId, userId),
                    eq(report.messageId, messageId),
                    isNotNull(report.messageId)
                ),
                and(
                    eq(report.userId, userId),
                    eq(report.inseratId, inseratId),
                    isNotNull(report.inseratId)
                ),
                and(
                    eq(report.userId, userId),
                    eq(report.conversationId, conversationId),
                    isNotNull(report.conversationId)
                ),
                and(
                    eq(report.userId, userId),
                    eq(report.reportedUser, reportedUser),
                    isNotNull(report.reportedUser)
                ),

            )
        })

        if (findExisting) {
            return { success: "Schon gemeldet" };
        }

        let successMessage = "";

        //if not existing, create..
        switch (reportedAsset) {
            case "INSERAT":
                const createdReport = await db.insert(report).values({
                    ...userId && {
                        userId: userId
                    },
                    reportType: reportType,
                    inseratId: inseratId,
                    content: content
                })
                successMessage = "Das Inserat wurde erfolgreich gemeldet."
                break;
            case "USER":

                const createdReportUser = await db.insert(report).values({
                    ...userId && {
                        userId: userId
                    },
                    reportType: reportType,
                    reportedUser: reportedUser,
                    content: content
                })
                successMessage = "Das Profil wurde erfolgreich gemeldet."
            default:
                break;
        }

        return { success: successMessage as string };

    } catch (e: any) {
        console.log(e);
        return { error: e as string };
    }
}