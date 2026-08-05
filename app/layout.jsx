// app/layout.jsx
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  generator: 'v0.app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Omnidimension widget script */}
        <Script
          id="omnidimension-web-widget"
          src="https://backend.omnidim.io/web_widget.js?secret_key=ff5517579f0cd77a14dde2ec86f5a1be"
          strategy="afterInteractive"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}