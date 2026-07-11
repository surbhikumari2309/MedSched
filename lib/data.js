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
        title: "Credit history",
        description: "Access and manage your credit history, Choose appointments from different available slots.",
    },

    {
        icon: <Video className="h-6 w-6 text-emerald-400" />,
        title: "Video Consultations",
        description: "COMING SOON...Will be released in 2nd version of the app...consult with your doctor online via high quality video calling."
    },
];

export const testimonials= [
    {
        initials: "SP",
        name: "Sarah P.",
        role: "Patient",
        quote: "The online booking appointment option saved me so much time, I was able to book online in advance without visiting the clinic a day prior."
    },
    {
        initials:"DR",
        name: "Dr. Robert M.",
        role: "Cardiologist",
        quote:"This platform has revolutionized my practices. I can now reach more patients and provide timely care without the constraint of physical office.",

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