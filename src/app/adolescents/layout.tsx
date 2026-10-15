import "../globals.css"

export const metadata = {
  title: "FCid",
  description: "Sistema de gestión de adolescentes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b dark:bg-gray-600">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
              <span className="font-bold text-sky-600">FCid</span>
            </div>
          </header>

          <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}