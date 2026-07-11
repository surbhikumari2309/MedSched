import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/ui/header";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter= Inter({ subsets: ["latin"]});

// const Inter = Inter({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "MedSched- An App for your Doctor's Appointment",
  description: "Connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
       appearance={{
        baseTheme: dark,
       }}

      >

    <html lang="en" suppressHydrationWarning>
  <body className={inter.className}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <main className="pt-24 min-h-screen">
        <Toaster richColors/>
        {children}
      </main>

      <footer className="bg-muted/20 border-t border-emerald-950/20 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center space-y-3">
          <p className="text-emerald-400 font-bold text-lg flex items-center justify-center gap-2">
            MedSched
          </p>
           <p className="text-muted-foreground text-sm max-w-md mx-auto">
             Book appointments, consult online, and manage your healthcare journey in one secure platform.
           </p>
            <div className="border-t border-emerald-950/10 w-24 mx-auto my-2"></div>
            <p className="text-xs text-muted-foreground">
               {new Date().getFullYear()} MedSched. All rights reserved.
            </p> 
          
        </div>
      </footer>
    </ThemeProvider>
  </body>
</html>

</ClerkProvider>    



      
  );
}
