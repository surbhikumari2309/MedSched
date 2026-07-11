import { getAvailableTimeSlots, getDoctorById } from "@/actions/appointments";
import { redirect } from "next/navigation";
import DoctorProfile from "./_components/doctor-profile";
import React from "react";

const DoctorProfilePage = async ({ params }) => {
    const { id } = await params;

    try {
        const [doctorData, slotsData] = await Promise.all([
            getDoctorById(id),
            getAvailableTimeSlots(id),
        ]);

        return <DoctorProfile 
           doctor= {doctorData.doctor}
           availableDays={slotsData.days || []}
        />

    } catch (error) {
        console.error("Error loading doctor profile:", error);
        redirect("/doctors");
    }
};

export default DoctorProfilePage;