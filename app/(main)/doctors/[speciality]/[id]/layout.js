import { getDoctorById } from "@/actions/appointments";
import { redirect } from "next/navigation";
import PageHeader from "@/components/ui/page-header";
import React from "react";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const { doctor } = await getDoctorById(id);

    return {
        title: `Dr. ${doctor.name} - Medsched`,
        description: `Book an appointment with Dr. ${doctor.name}, ${doctor.specialty} specialist with ${doctor.experience} years of experience.`,
    };
}

const DoctorProfileLayout = async ({children, params}) => {

    const { id } = await params;
    const { doctor } = await getDoctorById(id);

    if (!doctor) redirect("/doctors");


    return (
        <div className="container mx-auto px-4 py-8">
            <PageHeader
                title={"Dr. " + doctor.name}
                backlink= {`/doctors/${doctor.specialty}`}
                backLabel= {`Back to ${doctor.specialty}`}
            />

            {children}
        </div>
    );
};

export default DoctorProfileLayout;