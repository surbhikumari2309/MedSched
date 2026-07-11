"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function buyCredits(packageId) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const packages = {
        starter: {amount: 5, price: 10},
        professional: { amount: 12, price: 20 },
        enterprise: { amount: 30, price: 45 }
    }
    const selectedPackage = packages[packageId];

     if (!selectedPackage) {
        throw new Error("Invalid package selected");
    }
    try {
        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.role !== "PATIENT" && user.role !== "UNASSIGNED") {
            throw new Error("Only patients can purchase consultation credits");
        }
        
        await db.$transaction([
            db.user.update({
                where: { id: user.id },
                data: {
                    credits: {
                        increment: selectedPackage.amount
                    }
                }
            }),
            db.creditTransaction.create({
                data: {
                    userId: user.id,
                    amount: selectedPackage.amount,
                    type: "CREDIT_PURCHASE",
                    packageId: packageId
                }
            })
        ]);
        revalidatePath("/");
        revalidatePath("/pricing");
        return { success: true, amount: selectedPackage.amount };
    } catch (error) {
        throw new Error("Failed to purchase credits: " + error.message);
    }
}

export async function getUserTransactions(){
    const { userId } = await auth();
    if (!userId) return { transactions: [] };
 
    try {
        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        });
 
        if (!user) return { transactions: [] };

        const transactions = await db.creditTransaction.findMany({
             where: { userId: user.id },
             orderBy: { createdAt: "desc" }
        });
 
        return { transactions };
     } catch (error) {
         console.error("Failed to fetch transactions:", error);
         return { transactions: [] };
     }
 }


