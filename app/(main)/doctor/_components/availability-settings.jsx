"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { setAvailabilitySlots } from "@/actions/doctor";

import useFetch from "@/hooks/use-fetch";
import { Clock, Plus, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";

const AvailabilitySettings = ({ slots }) => {
    const [showForm, setShowForm] = useState(true);


    const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);


    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        defaultValues: {
            startTime: "",
            endTime: "",
        },
    });

    function createLocalDateFromTime(timeStr) {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const now = new Date();
        const date = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes
        );
        return date;
    }

    const onSubmit= async (data) => {
        if (loading) return;

        const formData= new FormData();

        const startDate = createLocalDateFromTime(data.startTime);
        const endDate = createLocalDateFromTime(data.endTime);

        if (startDate >= endDate) {
            toast.error("End time must be after start time");
            return;
        }

        formData.append("startTime", startDate.toISOString());
        formData.append("endTime", endDate.toISOString());

        await submitSlots(formData);

    };

    useEffect(() => {
        if (data && data?.success) {
            setShowForm(false);
            toast.success("Availability slots updated successfully");
        }
    }, [data]);

    const formatTimeString = (dateString) => {
        try {
            return format(new Date(dateString), "h:mm a");
        } catch (e) {
            return "Invalid time";
        }
    };

    const getEndTimeString = (startTimeString) => {
        try {
            const start = new Date(startTimeString);
            const end = new Date(start.getTime() + 60 * 60 * 1000);
            return format(end, "h:mm a");
        } catch (e) {
            return "Invalid time"
        }
    };

    return (
        <Card className="border-emerald-900/20">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                    <Clock className= "h-5 w-5 text-emerald-400" />
                    Availability Settings
                </CardTitle>
                <CardDescription>
                    Set your daily availability for patient appointments
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!showForm ? (
                    <>

                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-3">
                            Current Availability
                        </h3>

                        {slots.length===0? (
                             <p className="text-muted-foreground">
                            You haven&apos;t set any avaialability slots yet.
                            Add your avaialability to start accepting appointments
                        </p>
                        ) : (
                           <div>
                            {slots.map((slot) => {
                                return (
                                    <div
                                       key={slot.id}
                                       className="flex items-center p-3 rounded-md bg-muted/20 border border-emerald-900/20"
                                    >
                                    
                                    <div className="bg-emerald-900/20 p-2 rounded-full mr-3">
                                      <Clock className="h-4 w-4 text-emerald-400" />
                                    </div>

                                    
                                        <p className= "text-white font-medium">
                                            {formatTimeString(slot.startTime)} - {" "}
                                            
                                            {getEndTimeString(slot.startTime)}
                                        </p>
                                    </div>
                                
                               );
                            })}
                           </div>
                            
                        )}
                        
                      </div>

                      <Button
                         onClick={() => setShowForm(true)}
                         className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4 me-2" />
                        Set Availability Time
                    </Button>
                    </>
                ) : (
                <form className= "space-y-4 border border-emerald-900/20 rounded-md p-4"
                      onSubmit={handleSubmit(onSubmit)}
                >
                    <h3 className= "text-lg font-medium text-white mb-2">
                        Set Daily Availability
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className= "space-y-2">
                            <Label htmlFor="startTime">Start Time</Label>
                            <Input 
                               id="startTime"
                               type="time"
                               {...register("startTime", {
                                required: "Start time is required",
                               })}
                               className="bg-background border-emerald-900/20"
                            />
                            {errors.startTime && (
                                <p className= "text-sm font-medium text-red-500">
                                    {errors.startTime.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="endTime">End Time</Label>
                            <Input 
                               id="endTime"
                               type="time"
                               {...register("endTime", {
                                required: "end time is required",
                               })}
                               className="bg-background border-emerald-900/20"
                            />
                            {errors.endTime && (
                                <p className= "text-sm font-medium text-red-500">
                                    {errors.endTime.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowForm(false)}
                          disabled={loading}
                          className="border-emerald-900/30"
                        >
                            Cancel
                        </Button>
                        <Button
                           type="submit"
                           disabled={loading}
                           className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                   Saving...
                                </>
                            ) : (
                                "Save Availability"

                            )}
                           
                        </Button>
                    </div>

                </form>
                )}

            </CardContent>
        </Card>

    );
};

export default AvailabilitySettings;