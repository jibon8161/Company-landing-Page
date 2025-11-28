import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
import NextTopLoader from "nextjs-toploader";
import VantaClouds from "@/components/VantaTopology"; // Changed to Clouds

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader />
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          {/* Vanta Clouds Background */}
          <VantaClouds />

          <Aoscompo>
            <div className="relative z-10">
              <Header />
              {children}
              <Footer />
            </div>
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
