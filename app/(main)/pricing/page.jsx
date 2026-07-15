import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/actions/onboarding";
import PricingCards from "./_components/pricing-cards";
import { db } from "@/lib/prisma";

const PricingPage = async () => {
    
    let user = null;
    let transactions = [];
    try {
        user = await getCurrentUser();
        if (user) {
            transactions = await db.creditTransaction.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: "desc" },
            });
        }
    } catch (e) {
        
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-start mb-2">
                <Link
                   href="/"
                   className="flex items-center text-muted-foreground hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
            </div>

            <div className="max-w-full mx-auto mb-12 text-center">
                <Badge
                   variant="outline"
                   className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-600 text-sm font-medium mb-4"
                >
                    Affordable Healthcare
                </Badge>

                <h1 className="text-4xl md:text-5xl font-bold gradient-title mb-4">
                    Simple, Transparent Pricing
                </h1>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Choose the perfect consultation package that fits your healthcare needs with no hidden fees or long term commitments
                </p>

                <PricingCards initialCredits={user?.credits} transactions={transactions} />
            </div>

            <div className="max-w-3xl mx-auto mt-16 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                    Questions? We're here to Help
                </h2>
                <p className="text-muted-foreground mb-4">
                    Contact our support team at coming soon.
                </p>
            </div>
        </div>
    );
};

export default PricingPage;