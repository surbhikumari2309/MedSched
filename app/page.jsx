import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link"

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

                <p className= "text-muted-foreground text-lg md:text-xl max-w-md">
                  Book appointments, consult online and manage your healthcare journey in all in one secure platform.
                </p> 
                <div className="flex flex-col sm:flex-row gap-4">
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
          <div className="relative h-[300px] lg:h-[600px] rounded-xl overflow-hidden">
            <Image 
              src="/banner.png"
              alt="Doctor consultation"
              fill
              priority
              className="object-cover md:pt-14 rounded-xl"
            />
            
            

          </div>
        </div>
      </div>
    </section>
   
    </div>
    
    
    
            
  
}
