import type { Metadata } from "next";
import "./globals.css";

// Final title and description are copy, drafted in Phase 6 behind the copy gate.
export const metadata: Metadata = {
  title: "Dofrane Acquisitions",
  description: "Dofrane Acquisitions, Maryland.",
};

// One family, Helvetica on the system stack (brand ruling 2026-09-09): no next/font request.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
