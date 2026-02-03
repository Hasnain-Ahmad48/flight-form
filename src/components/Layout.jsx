import { Toaster } from "@/components/ui/toaster"

export function Layout({ children }) {
    // Background image placeholder
    return (
        <div className="min-h-screen w-full relative overflow-x-hidden font-sans">
            {/* Background with overlay */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-flight-blue-900/40 via-flight-blue-900/20 to-indigo-900/40 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            <Toaster />
        </div>
    )
}
