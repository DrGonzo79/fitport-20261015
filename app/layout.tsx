import type {Metadata} from "next";
import "./globals.css";
export const metadata: Metadata = {title: "FitPort — Shore excursion fit check", description: "A source-aware physical-demand checker for cruise shore excursions."};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>}
