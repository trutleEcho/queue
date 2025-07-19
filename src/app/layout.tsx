import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RootProvider from "@/providers/RootProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Queue - Modern Queue Management System',
        template: '%s | Queue',
    },
    description:
        'Transform how businesses handle wait times with intelligent queue management. Reduce wait times by 80% and boost customer satisfaction.',
    keywords: [
        'Queue',
        'queue management system',
        'smart queueing',
        'digital queue solution',
        'customer flow management',
        'wait time reduction',
        'customer experience',
        'smart kiosks',
        'appointment booking system',
        'token system',
        'virtual queue',
        'queue optimization',
        'queue analytics',
        'retail queue system',
        'bank queue software',
        'clinic queue management',
        'enterprise queue solution',
        'smart business solutions',
        'real-time queue tracking',
        'automated queue management',
    ],
    authors: [{ name: 'Queue Team', url: 'https://queue.corsw.in' }],
    creator: 'Queue',
    publisher: 'Queue',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://queue.corsw.in'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Queue - Modern Queue Management System',
        description:
            'Transform how businesses handle wait times with intelligent queue management. Reduce wait times by 80% and boost customer satisfaction.',
        url: 'https://queue.corsw.in',
        siteName: 'Queue',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Queue Dashboard Preview',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Queue - Modern Queue Management System',
        description:
            'Transform how businesses handle wait times with intelligent queue management. Reduce wait times by 80% and boost customer satisfaction.',
        site: '@queue.corsw.in',
        creator: '@queue.corsw.in',
        images: ['/twitter-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
        yahoo: 'your-yahoo-verification-code',
    },
    category: 'business software',
};


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="icon" href="/QUEUE_FAVICON_DARK.png" sizes="any" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Queue",
                        "url": "https://queue.corsw.in",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web-based",
                        "offers": {
                            "@type": "Offer",
                            "price": "Contact",
                            "priceCurrency": "INR"
                        },
                        "description":
                            "Queue helps businesses automate and manage queues efficiently with intelligent software solutions.",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Queue",
                            "url": "https://queue.corsw.in"
                        }
                    }),
                }}
            />
        </head>
        <body className={inter.className}>
        <RootProvider>
            {children}
        </RootProvider>
        </body>
        </html>
    );
}