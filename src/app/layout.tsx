import "./globals.css"

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <main className="flex min-h-screen flex-col bg-[url(/wood-bg.jpeg)]">
                    {children}
                </main>
            </body>
        </html>
    )
}
