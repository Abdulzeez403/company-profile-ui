import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Company Profile Form",
  description:
    "The company profile form is a tool for collecting and managing company information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
