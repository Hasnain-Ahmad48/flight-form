import { Layout } from "@/components/Layout"
import { FlightSearchCard } from "@/components/FlightSearchCard"
import { PartnerLogos } from "@/components/PartnerLogos"

export function SearchPage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col justify-center">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* Left/Top Content */}
                    <div className="lg:col-span-12 xl:col-span-8 flex flex-col items-center lg:items-start space-y-8">
                        <div className="text-center lg:text-left space-y-4 max-w-2xl">
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
                                Making Travel Easy
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow-sm max-w-lg mx-auto lg:mx-0">
                                Search and compare flights from trusted airlines worldwide with just a few clicks.
                            </p>
                        </div>

                        {/* Search Card */}
                        <div className="w-full">
                            <FlightSearchCard />
                        </div>
                    </div>

                    {/* Right Side - Partner Logos (Desktop) */}
                    <div className="lg:col-span-12 xl:col-span-4 flex flex-col items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl w-full max-w-sm">
                            <PartnerLogos />
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}
