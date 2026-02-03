import { cn } from "@/lib/utils"

export function TripTypeToggle({ value, onChange }) {
    return (
        <div className="flex space-x-4 mb-4">
            <button
                onClick={() => onChange("round-trip")}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    value === "round-trip"
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-muted-foreground pb-1"
                )}
            >
                Round Trip
            </button>
            <button
                onClick={() => onChange("one-way")}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    value === "one-way"
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-muted-foreground pb-1"
                )}
            >
                One Way
            </button>
        </div>
    )
}
