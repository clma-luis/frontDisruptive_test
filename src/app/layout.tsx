import { Toaster } from "@/components/ui/Toast/toaster";
import ProtectRoute from "@/shared/hooks/ProtectRoutes";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StateProvider } from "@/shared/providers/StateProvider";
import { SheetProvider } from "@/shared/providers/SheetProvider";
import { SheetComponent } from "@/components/SheetComponent";
import { DialogModalProvider } from "@/shared/providers/DialogModalProvider";
import { DialogModal } from "@/components/DialogModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DISRUPTIVE",
  description: "DISRUPTIVE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ProtectRoute>
            <SheetProvider>
              <DialogModalProvider>
                <StateProvider>{children}</StateProvider>
                <Toaster />
                <SheetComponent />
                <DialogModal />
              </DialogModalProvider>
            </SheetProvider>
          </ProtectRoute>
        </ThemeProvider>
      </body>
    </html>
  );
}
