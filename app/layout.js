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

      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center">
          Footer
        </div>
      </footer>
    </ThemeProvider>
  </body>
</html>

</ClerkProvider>    



      
  );
}
