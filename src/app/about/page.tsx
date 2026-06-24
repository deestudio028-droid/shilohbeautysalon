import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Shiloh Beauty Salon | Ladies & Kids Beauty Salon Chennai",
  description: "Learn about Shiloh Beauty Salon, Chennai's trusted ladies and kids beauty destination since 2018. Bridal makeup, skincare, haircare, and premium salon services.",
  openGraph: {
    title: "About Shiloh Beauty Salon | Ladies & Kids Beauty Salon Chennai",
    description: "Learn about Shiloh Beauty Salon, Chennai's trusted ladies and kids beauty destination since 2018. Bridal makeup, skincare, haircare, and premium salon services.",
    url: "https://shilohbeauty.com/about",
    siteName: "Shiloh Beauty Salon",
    type: "website",
    images: [
      {
        url: "https://shilohbeauty.com/images/logo.webp",
        width: 800,
        height: 800,
        alt: "Shiloh Ladies & Kids Beauty Salon Logo",
      },
    ],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Shiloh Beauty Salon",
    "image": "https://shilohbeauty.com/images/logo.webp",
    "@id": "https://shilohbeauty.com/#salon",
    "url": "https://shilohbeauty.com/about",
    "telephone": "+919962110080",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2th, Selvam Nagar Cross St, Thillai Nagar, Senthil Nagar, Kolathur",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600099",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "13.1240",
      "longitude": "80.2096"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:30",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://maps.app.goo.gl/nnaUsdKC25bb4JEZA",
      "https://instagram.com"
    ]
  };

  return (
    <>
      {/* Inject LocalBusiness Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageClient />
    </>
  );
}
