"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    SignInButton,
    SignUpButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Stethoscope, Calendar, User } from "lucide-react";
import { getCurrentUser } from "@/actions/onboarding";

const Header = () => {
    const { isSignedIn, isLoaded } = useUser();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (isSignedIn) {
            const fetchUserRole = async () => {
                try {
                    const dbUser = await getCurrentUser();
                    setUserRole(dbUser?.role || "UNASSIGNED");
                } catch (error) {
                    console.error("Failed to fetch user role:", error);
                }
            };
            fetchUserRole();
        } else {
            setUserRole(null);
        }
    }, [isSignedIn]);

    // Role display variables based on Clerk's load state
    const showAdmin = isLoaded && isSignedIn && userRole === "ADMIN";
    const showDoctor = isLoaded && isSignedIn && userRole === "DOCTOR";
    const showPatient = isLoaded && isSignedIn && userRole === "PATIENT";
    const showUnassigned = isLoaded && isSignedIn && userRole === "UNASSIGNED";

    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/">
                    <Image 
                       src="/logo.png"
                       alt="MedSched Logo"
                       width={200}
                       height={60}
                       className="h-12 w-auto object-contain"
                       priority
                    />
                </Link>

                <div className="flex items-center space-x-2">
                    {showAdmin && (
                        <Link href="/admin">
                            <Button
                               variant="outline"
                               className="hidden md:inline-flex items-center gap-2"
                            >
                                <ShieldCheck className="h-4 w-4" />
                                Admin Dashboard
                            </Button>
                            <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                                <ShieldCheck className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}

                    {showDoctor && (
                        <Link href="/doctor">
                            <Button
                               variant="outline"
                               className="hidden md:inline-flex items-center gap-2"
                            >
                                <Stethoscope className="h-4 w-4" />
                                Doctor Dashboard
                            </Button>
                            <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                                <Stethoscope className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}

                    {showPatient && (
                        <Link href="/appointments">
                            <Button
                               variant="outline"
                               className="hidden md:inline-flex items-center gap-2"
                            >
                                <Calendar className="h-4 w-4" />
                                My Appointments
                            </Button>
                            <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                                <Calendar className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}

                    {showUnassigned && (
                        <Link href="/onboarding">
                            <Button
                               variant="outline"
                               className="hidden md:inline-flex items-center gap-2"
                            >
                                <User className="h-4 w-4" />
                                Complete Profile
                            </Button>
                            <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                                <User className="h-4 w-4" /> 
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {isLoaded && !isSignedIn && (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="outline" className="border-emerald-950/30 hover:bg-emerald-950/10">Sign In</Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Sign Up</Button>
                            </SignUpButton>
                        </>
                    )}
                    {isLoaded && isSignedIn && (
                        <UserButton 
                            appearance={{
                                elements: {
                                    avatarBox: "h-9 w-9"
                                }
                            }}
                        />
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;