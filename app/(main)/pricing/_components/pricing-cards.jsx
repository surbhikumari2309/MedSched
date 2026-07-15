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
import { Coins, Check, Loader2, HelpCircle } from "lucide-react";
import { format } from "date-fns";




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

export default function PricingCards({ initialCredits, transactions: initialTransactions }) {
    const [currentCredits, setCurrentCredits] = useState(initialCredits || 0);
    const [transactions, setTransactions] = useState(initialTransactions || []);
    const [purchasingId, setPurchasingId] = useState(null);
    const { loading, data, fn: submitPurchase } = useFetch(buyCredits);

    const handlePurchase = async (packageId) => {
        if (loading) return;
        setPurchasingId(packageId);
        await submitPurchase(packageId);
    };

    useEffect(() => {
        if (data?.success) {
            toast.success(`Successfully purchased package! Added ${data.amount} credits.`);
            setCurrentCredits((prev) => prev + data.amount);
            
            // Optimistically update transactions list locally
            const newTx = {
                id: Math.random().toString(),
                amount: data.amount,
                type: "CREDIT_PURCHASE",
                packageId: purchasingId,
                createdAt: new Date().toISOString()
            };
            setTransactions((prev) => [newTx, ...prev]);
        }
    }, [data]);

    useEffect(() => {
        if (!loading) {
            setPurchasingId(null);
        }
    }, [loading]);

    
    
    const displayTransactions = transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
                                {loading && purchasingId === pkg.id ? (
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

            
            <div className="max-w-4xl mx-auto mt-16 text-left">
                <Card className="bg-muted/10 border-emerald-900/10">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-emerald-400" />
                            How the Credit System Works
                        </CardTitle>
                        <CardDescription>
                            Everything you need to know about MedSched consultation credits
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-white flex items-center gap-2">
                                <span className="flex items-center justify-center bg-emerald-900/40 text-emerald-400 rounded-full w-6 h-6 text-xs font-bold">1</span>
                                What are credits?
                            </h4>
                            <p className="text-muted-foreground pl-8">
                                Credits are the internal currency of MedSched. Instead of paying doctors directly for each visit, you purchase credits and use them to schedule consultations.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-white flex items-center gap-2">
                                <span className="flex items-center justify-center bg-emerald-900/40 text-emerald-400 rounded-full w-6 h-6 text-xs font-bold">2</span>
                                How many credits does an appointment cost?
                            </h4>
                            <p className="text-muted-foreground pl-8">
                                Booking a standard 30-minute consultation with any verified healthcare provider costs exactly **2 credits**.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-white flex items-center gap-2">
                                <span className="flex items-center justify-center bg-emerald-900/40 text-emerald-400 rounded-full w-6 h-6 text-xs font-bold">3</span>
                                Do my credits expire?
                            </h4>
                            <p className="text-muted-foreground pl-8">
                                No, purchased credits never expire. They remain in your account indefinitely until you choose to use them for booking appointments.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-white flex items-center gap-2">
                                <span className="flex items-center justify-center bg-emerald-900/40 text-emerald-400 rounded-full w-6 h-6 text-xs font-bold">4</span>
                                Can I view my transactions?
                            </h4>
                            <p className="text-muted-foreground pl-8">
                                Yes, your credit transaction history is securely logged. You can review all your credit purchases and appointment deductions in the Credit History ledger below.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            
            <div className="max-w-4xl mx-auto mt-16 text-left">
                <Card className="bg-muted/20 border-emerald-900/20">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <Coins className="h-5 w-5 text-amber-500" />
                            Credit History
                        </CardTitle>
                        <CardDescription>
                            Track your purchased credits and consultation deductions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-muted-foreground">
                                <thead className="text-xs text-white uppercase bg-muted/40">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 rounded-l-lg">Date</th>
                                        <th scope="col" className="px-6 py-3">Activity</th>
                                        <th scope="col" className="px-6 py-3 rounded-r-lg text-right">Credits</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-emerald-900/10">
                                    {displayTransactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-muted/10 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">
                                                {format(new Date(tx.createdAt), "PPP")}
                                            </td>
                                            <td className="px-6 py-4">
                                                {tx.type === "CREDIT_PURCHASE" 
                                                    ? `Purchased ${tx.packageId ? `(${tx.packageId.toUpperCase()})` : "Package"}` 
                                                    : tx.type === "APPOINTMENT_DEDUCTION" 
                                                    ? "Booked Consultation Appointment" 
                                                    : tx.type === "ADMIN_ADJUSTMENT" && tx.packageId === "signup_bonus"
                                                    ? "Account Registration Bonus"
                                                    : "Administrative Adjustment"}
                                            </td>
                                            <td className={`px-6 py-4 text-right font-bold ${tx.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                                                {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}