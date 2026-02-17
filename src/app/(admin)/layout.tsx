import type { Metadata } from "next";
import { Kanit, Urbanist } from "next/font/google";
import { Providers } from "@/app/providers";
import "../globals.css";

const kanit = Kanit({
    weight: ['300', '400', '500', '600'],
    subsets: ["latin", "thai"],
    variable: "--font-kanit",
});

const urbanist = Urbanist({
    weight: ['400', '600', '700', '900'],
    subsets: ["latin"],
    variable: "--font-urbanist",
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
            <body className={`${kanit.variable} ${urbanist.variable} antialiased bg-gray-50`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
