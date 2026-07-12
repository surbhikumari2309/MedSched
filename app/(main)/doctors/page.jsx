import { Card, CardContent } from "@/components/ui/card";
import { SPECIALTIES } from "@/lib/specialities";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";

const SpecialitiesPage = () => {
    return (
        
        <>
           <div className="flex justify-start mb-6">
            <Link
              href="/"
              className="flex items-center text-muted-foreground hover:text-white transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
            </Link>
           </div>
            <div className="flex flex-col items-center justify-center mb-8 text-center">
                <h1 className="text-3xl font-bold md:text-4xl mb-2 gradient-title">Find Your Doctor</h1>
                <p className="text-muted-foreground text-white text-lg">
                    Browse by specialty or view all available healthcare providers
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {SPECIALTIES.map((specialty) => (
                    <Link key={specialty.name} href={`/doctors/${specialty.name}`}>
                        <Card className="hover:border-emerald-700/40 transition-all cursor-pointer border-emerald-900/20 h-full">
                            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                                <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mb-4">
                                    <div>{specialty.icon}</div>
                                </div>
                                <h3 className="font-medium text-white">{specialty.name}</h3>
                                {specialty.subtitle && (
                                    <span className ="text-xs text-emerald-400 mt-1 font-normal block">
                                        ({specialty.subtitle})
                                    </span>
                                )}

                            </CardContent>
                        </Card>
                    </Link>
                    
                ))}
            </div>
        </>
    );
}
export default SpecialitiesPage;