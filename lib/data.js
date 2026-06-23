import {
    Calendar,
    Video,
    CreditCard,
    User,
    FileText,
    ShieldCheck,
} from "lucide-react";

export const features =[
    {
        icon: <User className="h-6 w-6 text-emerald-600" />,
        title: "Create Your Profile",
        description: "Sign up and complete your profile to get personalized healthcare recommendations and services.",
    },
    {
        icon: <Calendar className="h-6 w-6 text-emerald-400" />,
        title: "Book Appointments",
        description: "Browse doctor profiles, check availability and book appointments that fit your schedule.",

    },
    {
        icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
        title: "Verified Doctors",
        description: "All healthcare providers are carefully vetted and verified to ensure quality care",
    },
    {
        icon: <FileText className="h-6 w-6 text-emerald-600"/>,
        title: "Medical Documentation",
        description: "Access and manage your appointment history, doctor's notes and medical recommendations.",
    },
];

export const testimonials= [
    {
        initials: "SP",
        name: "Sarah P.",
        role: "Patient",
        quote: "The online consultation feature saved me so much time. i was able to get medical advice without taking off work or travelling"
    },
    {
        initials:"DR",
        name: "Dr. Robert M.",
        role: "Cardiologist",
        quote:"This platform has revolutionized my practicee. I can now reach more patients and provide timely care without the constraint of physical office",

    },
    {
        initials:"JT",
        name:"James T.",
        role: "Patient",
        quote:"The booking option is so convenient. I am able to consult with specialists whenever needed",

    },

];

export const creditBenefits=[
    "Each consultation requires <strong class='text-emerald-600'>2 credits</strong> regardless of duration",
];