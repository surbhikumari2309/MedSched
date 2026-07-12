import { getPatientAppointments } from "@/actions/appointments"; 
import PageHeader from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Stethoscope, FileText, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";

export const metadata = {
    title: "My Appointments - MedSched",
    description: "View and manage your scheduled consultations",
};

const PatientAppointmentsPage = async () => {
    let appointments = [];
    try {
        const data = await getPatientAppointments();
        appointments = data.appointments || [];
    } catch (error) {
        console.error("Failed to load appointments:", error);
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <PageHeader icon={<Calendar className="h-6 w-6 text-emerald-400" />} title="My Appointments" />

            {appointments.length === 0 ? (
                <Card className="bg-muted/20 border-emerald-900/20 text-center py-12">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-white">No Appointments Scheduled</CardTitle>
                        <CardDescription>
                            You have no upcoming or past doctor consultations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white mt-4">
                            <Link href="/doctors" className="flex items-center gap-2">
                                Find a Doctor <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {appointments.map((appointment) => {
                        const statusColors = {
                            SCHEDULED: "bg-emerald-950/40 text-emerald-400 border-emerald-800/40",
                            COMPLETED: "bg-blue-950/40 text-blue-400 border-blue-800/40",
                            CANCELLED: "bg-red-950/40 text-red-400 border-red-800/40",
                        };

                        return (
                            <Card key={appointment.id} className="bg-muted/10 border-emerald-900/10 hover:border-emerald-800/20 transition-colors">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        
                                        {/* Doctor details */}
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-emerald-900/10 flex-shrink-0">
                                                {appointment.doctor.imageUrl ? (
                                                    <img 
                                                        src={appointment.doctor.imageUrl} 
                                                        alt={appointment.doctor.name}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-emerald-400 font-bold">
                                                        {appointment.doctor.name?.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-lg flex items-center gap-1.5">
                                                    Dr. {appointment.doctor.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Stethoscope className="h-3.5 w-3.5 text-emerald-400" />
                                                    {appointment.doctor.specialty}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Date and Time / Status */}
                                        <div className="flex flex-col items-start md:items-end gap-2">
                                            <Badge variant="outline" className={`px-2.5 py-0.5 font-medium rounded-full ${statusColors[appointment.status] || "bg-muted text-muted-foreground"}`}>
                                                {appointment.status}
                                            </Badge>
                                            <div className="text-sm text-white flex items-center gap-1.5 font-medium">
                                                <Calendar className="h-4 w-4 text-emerald-400" />
                                                {format(new Date(appointment.startTime), "PPP")}
                                            </div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                                <Clock className="h-3.5 w-3.5 text-emerald-400" />
                                                {format(new Date(appointment.startTime), "p")} - {format(new Date(appointment.endTime), "p")}
                                            </div>
                                        </div>

                                    </div>

                                    {/* Patient description / notes */}
                                    {appointment.patientDescription && (
                                        <div className="mt-4 pt-4 border-t border-emerald-950/10">
                                            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                                                <FileText className="h-3.5 w-3.5" />
                                                Reason for Consultation
                                            </h4>
                                            <p className="text-sm text-muted-foreground italic pl-4 border-l-2 border-emerald-900/30">
                                                "{appointment.patientDescription}"
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PatientAppointmentsPage;