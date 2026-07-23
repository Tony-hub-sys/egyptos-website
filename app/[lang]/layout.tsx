import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Cairo } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/dictionaries";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    metadataBase: new URL("https://egyptos-website.vercel.app"),
    title: {
      default: isAr
        ? "مركز إيجيبتوس للغات والترجمة | مطروح، مصر — منذ 2016"
        : "Egyptos Centre for Languages and Translation | Matrouh, Egypt — Since 2016",
      template: isAr ? "%s | مركز إيجيبتوس" : "%s | Egyptos Centre",
    },
    description: isAr
      ? "مركز إيجيبتوس للغات والترجمة في مطروح، مصر. ترجمة معتمدة للوثائق، ترجمة فورية، كتابة مؤسسية، وبرنامجنا الرئيسي للمحادثة والكتابة بالإنجليزية في 18 أسبوعًا. في خدمة مطروح منذ 2016."
      : "Egyptos Centre for Languages and Translation in Matrouh, Egypt. Certified document translation, interpretation, corporate writing, and our flagship 18-Week English Conversation & Writing Program. Serving Matrouh since 2016.",
    alternates: {
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      title: isAr
        ? "مركز إيجيبتوس للغات والترجمة"
        : "Egyptos Centre for Languages and Translation",
      description: isAr
        ? "خدمات ترجمة احترافية وتعليم لغات في مطروح، مصر — منذ 2016."
        : "Professional translation services and language education in Matrouh, Egypt — since 2016.",
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      siteName: isAr ? "مركز إيجيبتوس" : "Egyptos Centre",
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const isAr = lang === "ar";

  return (
    <html
      lang={lang}
      dir={isAr ? "rtl" : "ltr"}
      className={`${inter.variable} ${cairo.variable}`}
    >
      <body
        className={`flex min-h-screen flex-col ${isAr ? "font-arabic" : "font-sans"}`}
      >
        <Navbar lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <WhatsAppButton label={dict.whatsapp.label} message={dict.whatsapp.message} />
      </body>
    </html>
  );
}
