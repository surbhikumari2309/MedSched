import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link"
import {
  features,
  testimonials
} from "@/lib/data"

import{
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";

// import {features} from "@/lib/data";

export default function Home() {
  return <div className= "bg-background">
    <section className="relative overflow-hidden py-32">
      <div className= "container mx-auto px-4"> 
        <div>
          <div>
            <Badge 
            variant= "outline"
            className= "bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-600 text-sm font-medium"  >
              Healthcare made simple </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight ">
                Connect with <br /> Doctors <br />{" "} <span className="gradient-title"> anytime, anywhere!</span></h1>

                <p className= "text-muted-foreground text-lg md:text-xl max-w-md text-white">
                  Book appointments online and manage your healthcare journey.
                </p> 
                <div className="flex flex-col sm:flex-row gap-4 mt-4"
                >
                  
                  <Button
                    asChild
                    size="lg"
                    className= "bg-emerald-600 text-white hover:bg-emerald-700">

                      <Link href={"/onboarding"}>
                         Get Started
                      </Link>


                  </Button>
                  <Button
                     asChild
                     size="lg"
                     className= "border-emerald-700/30 hover:bg-muted/80">

                     <Link href={"/doctors"}> Find Doctors</Link>


                  

                  </Button> <br/>
                </div>
            </div>
          <div className="relative h-[300px] lg:h-[600px] rounded-xl overflow-hidden mt-4">
            <Image 
              src="/banner2.0.jpg"
              alt="Doctor consultation"
              fill
              priority
              className="object-cover md:pt-14 rounded-xl"
            />

            
            

          </div>

          <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    What it does?
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Our platform makes healthcare accessible with just a few clicks.
                    It lets you book appointments and connect with doctors.
                  </p>


                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
                  {features.map((feature, index) => {
                    return (
                      <Card 
                         key={index}
                         className="border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300"
                         >
                        <CardHeader className="pb-2">
                          <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">{feature.icon}</div>
                          <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                        
                      </Card>
                    )
                  })}
                </div>
                
              </div>

          </section>

          <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge
                      variant="outline"
                      className= "bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
                      >
                        Success Stories
                      </Badge>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        What Our Users Say

                      </h2>
                      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Hear from patients and doctors who use our platform. Know what they think, how they feel, what they say, in all in one secure platform made simple just for you with MedSched
                      </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => {
                    return (
                      <Card
                        key={index}
                        className= "border-emerald-90/20 hover:border-emerald-800/40 transition-all duration-300"
                      >
                        <CardContent className= "pt-6">
                          <div className="flex items-center mb-4">
                            <div className= "w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mr-4">
                                <span className= "text-emerald-600 font-bold">
                                   {testimonial.initials}
                                </span>

                            </div>
                            <div>
                              <h4 className= "font-bold text-white">{testimonial.name}</h4>
                              <p>{testimonial.role}</p>

                            </div>
                            
                            </div>
                            <p className="text-muted-foreground">
                              &quot;{testimonial.quote}&quot;
                            </p>

                        </CardContent>
                        
                      
                      </Card>
                    )
                  })}
                </div>
              </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <Card className="bg-gradient-to-r from-emerald-900/30 to-emerald-950/20 border-emerald-800/20">
                <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Ready to take control of your healthcare?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      Join thousands of users who have simplified their healthcare journey with our platform.
                      Get started today and experience healthcare the way it should be.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Button
                         size="lg"
                         className="bg-emerald-600 text-white hover:bg-emerald-700"
                         asChild
                      >
                        <Link href= "/onboarding">Sign Up Now</Link>
                      </Button>
                      <Button
                         asChild
                         variant="outline"
                         size="lg"
                         className="border-emerald-700/30 hover:bg-muted/80"
                      >
                        <Link href="/pricing">View Pricing</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </section>
   
    </div>
    
    
    
            
  
}
