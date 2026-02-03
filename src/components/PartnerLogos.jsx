export function PartnerLogos() {
    const partners = [
        { name: "Emirates", src: "/logos/emirates.png", color: "bg-red-600" }, // Mock paths
        { name: "Qatar Airways", src: "/logos/qatar.png", color: "bg-purple-900" },
        { name: "Turkish Airlines", src: "/logos/turkish.png", color: "bg-red-700" },
        { name: "PIA", src: "/logos/pia.png", color: "bg-green-700" },
        { name: "Etihad", src: "/logos/etihad.png", color: "bg-yellow-600" },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6 p-4 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            <h3 className="col-span-2 md:col-span-1 text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2 text-center md:text-left">
                Trusted Partners
            </h3>
            {partners.map((partner) => (
                <div key={partner.name} className="flex items-center justify-center md:justify-start space-x-3 group cursor-default">
                    {/* Using a colored div as fallback if image missing, typically for demo purposes */}
                    <div className={`w-8 h-8 rounded-full ${partner.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {partner.name[0]}
                    </div>
                    <span className="font-medium text-slate-700 group-hover:text-black transition-colors">{partner.name}</span>
                </div>
            ))}
        </div>
    )
}
