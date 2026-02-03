import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
import NextTopLoader from "nextjs-toploader";
import VantaClouds from "@/components/VantaTopology";
import KillSwitchClientCheck from "@/components/KillSwitchClientCheck";
import ChatWidget from "@/components/ChatWidget"; // Add this import

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

          {/* Kill Switch Client Check */}
          <KillSwitchClientCheck />

          <Aoscompo>
            <div className="relative z-10">
              <Header />
              {children}
              <Footer />

              {/* Add Chat Widget Here - It will float above everything */}
              <ChatWidget />
            </div>
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
