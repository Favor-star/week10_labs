import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Skill Vault",
  description: "Skill management app created with nextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} max-w-screen w-full min-h-screen h-full bg-primary px-4 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
