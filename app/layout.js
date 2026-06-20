import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/ui/header";

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
    <html lang="en">
  <body className={inter.className}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <main className="pt-24 min-h-screen">
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
    



      
  );
}
