// app/org/[dashboard]/metadata.ts
import { getOrganization } from "./server"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { orgId: string } }): Promise<Metadata> {
    const org = await getOrganization(params.orgId).then((res) => res.data)

    return {
        title: `${org.name} | Queue`,
        description: org.description ?? "Queue - Intelligent Queue Management System",
        openGraph: {
            title: `${org.name} | Queue`,
            description: org.description,
            images: [
                {
                    url: "/queue-og.jpg",
                    width: 1200,
                    height: 630,
                    alt: org.name,
                },
            ],
        },
    }
}
