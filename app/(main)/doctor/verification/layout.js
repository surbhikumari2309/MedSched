import PageHeader from "@/components/ui/page-header";
import React from "react";
import { Stethoscope } from "lucide-react";

export const metadata = {
    title: "Doctor Dashboard- MedSched",
    description: "Manage your appointments and availability",
};

const DoctorDashboardLayout = ({ children }) => {
    return (
        <div className= "container mx-auto px-4 py-8">
            <PageHeader icon= {<Stethoscope />} title={"Doctor's Dashboard"} />

            {children}
        </div>

    );
};

export default DoctorDashboardLayout;