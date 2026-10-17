import type { Metadata } from "next";
import { Kanit, Urbanist, Sarabun } from "next/font/google";
import { Providers } from "@/app/providers";
import "../globals.css";

const kanit = Kanit({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ["latin", "thai"],
    variable: "--font-kanit",
    display: 'swap',
});

const urbanist = Urbanist({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ["latin"],
    variable: "--font-urbanist",
    display: 'swap',
});

const sarabun = Sarabun({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ["latin", "thai"],
    variable: "--font-sarabun",
    display: 'swap',
});

export const metadata: Metadata = {
    title: "NONGTUNG Admin Panel",
    description: "Administrative interface for Nongtung",
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${kanit.variable} ${urbanist.variable} ${sarabun.variable} antialiased bg-gray-50`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
