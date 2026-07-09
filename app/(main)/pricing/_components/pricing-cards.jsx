"use client";

import React, { useState, useEffect } from "react";
import { buyCredits } from "@/actions/credits";
import useFetch from "@/hooks/use-fetch";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Coins, Check, Loader2 } from "lucide-react";

const packages = [
    {
        id: "starter",
        name: "Starter Package",
        credits: 5,
        price: "$10",
        description: "Perfect for 2-3 short consultations",
        features: [
            "5 Consultation Credits",
            "Credits never expire",
            "Instant Booking",
            "Basic Support"
        ],
        badge: null
    },
    {
        id: "professional",
        name: "Professional Package",
        credits: 12,
        price: "$20",
        description: "Includes 2 free bonus credits",
        features: [
            "12 Consultation Credits",
            "Credits never expire",
            "Instant Booking",
            "Priority Support",
            "Bonus Credits Included"
        ],
        badge: "Most Popular"
    },
    {
        id: "enterprise",
        name: "Enterprise Package",
        credits: 30,
        price: "$45",
        description: "Best value, includes 10 bonus credits",
        features: [
            "30 Consultation Credits",
            "Credits never expire",
            "Instant Booking",
            "24/7 Priority Support",
            "Maximum Bonus Credits"
        ],
        badge: "Best Value"
    }
];

export default function PricingCards({ initialCredits }) {
    const [currentCredits, setCurrentCredits] = useState(initialCredits || 0);
    const { loading, data, fn: submitPurchase } = useFetch(buyCredits);

    const handlePurchase = async (packageId) => {
        if (loading) return;
        await submitPurchase(packageId);
    };

    useEffect(() => {
        if (data?.success) {
            toast.success(`Successfully purchased package! Added ${data.amount} credits.`);
            setCurrentCredits((prev) => prev + data.amount);
        }
    }, [data]);

    return (
        <div className="space-y-12">
            {initialCredits !== undefined && (
                <div className="flex justify-center">
                    <Badge variant="outline" className="px-6 py-2.5 bg-emerald-950/20 border-emerald-900/30 text-white flex items-center gap-2 text-base rounded-full">
                        <Coins className="h-5 w-5 text-amber-500 animate-pulse" />
                        <span>Your Current Balance:</span>
                        <strong className="text-emerald-400 font-bold">{currentCredits} Credits</strong>
                    </Badge>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {packages.map((pkg) => (
                    <Card key={pkg.id} className={`flex flex-col relative bg-muted/20 border-emerald-900/20 ${pkg.badge ? 'border-emerald-700/40 shadow-emerald-950/10 shadow-lg' : ''}`}>
                        {pkg.badge && (
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white hover:bg-emerald-700 font-medium px-3 py-0.5 rounded-full">
                                {pkg.badge}
                            </Badge>
                        )}
                        <CardHeader className="text-center pt-8">
                            <CardTitle className="text-xl font-bold text-white mb-1">{pkg.name}</CardTitle>
                            <CardDescription className="text-sm min-h-[40px]">{pkg.description}</CardDescription>
                            <div className="mt-4 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-extrabold text-white">{pkg.price}</span>
                                <span className="text-muted-foreground text-sm">/one-time</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow pt-4">
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="pb-8 pt-4">
                            <Button
                                onClick={() => handlePurchase(pkg.id)}
                                disabled={loading}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Purchase Package"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}