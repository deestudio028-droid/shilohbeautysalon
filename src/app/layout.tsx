import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shiloh Ladies & Kids Beauty Salon | Premium Luxury Beauty Brand",
  description: "Indulge in premium beauty services, bridal makeup, hair treatments, and kids styling in a royal, elegant environment at Shiloh Salon. Home services available in Chennai.",
  keywords: "Beauty Salon, Bridal Makeup, Hair Spa, Facial Services, Home Beauty Services, Ladies Salon, Kids Salon, Kolathur, Chennai, Shiloh Beauty Salon",
  authors: [{ name: "Shiloh Salon" }],
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased bg-[#050B1F] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
