import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, FileText } from "lucide-react";
import { format } from "date-fns";

const DoctorAppointments = ({ appointments = [] }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Upcoming Consultations</h2>
                <p className="text-sm text-muted-foreground">
                    Review your scheduled appointments and patient consultation descriptions.
                </p>
            </div>

            {appointments.length === 0 ? (
                <Card className="bg-muted/20 border-emerald-900/20 text-center py-12">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">No Consultations Found</CardTitle>
                        <CardDescription>
                            There are currently no scheduled appointments in your calendar.
                        </CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
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
                                        
                                
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-emerald-900/10 flex-shrink-0">
                                                {appointment.patient.imageUrl ? (
                                                    <img 
                                                        src={appointment.patient.imageUrl} 
                                                        alt={appointment.patient.name}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-emerald-400 font-bold">
                                                        {appointment.patient.name?.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-lg flex items-center gap-1.5">
                                                    {appointment.patient.name || "Surbhi Patient"}
                                                </h3>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <User className="h-3.5 w-3.5 text-emerald-400" />
                                                    {appointment.patient.email}
                                                </p>
                                            </div>
                                        </div>

                                        
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

                                    
                                    {appointment.patientDescription && (
                                        <div className="mt-4 pt-4 border-t border-emerald-950/10">
                                            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                                                <FileText className="h-3.5 w-3.5" />
                                                Patient Consultation Description
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

export default DoctorAppointments;