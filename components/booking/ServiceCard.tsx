import { Checkbox } from "@/components/ui/checkbox";


export function ServiceCard({
  service,
  selected,
  toggleService,
}: {
  service: any;
  selected: boolean;
  toggleService: (id: number) => void;
}) {
  return (
    <div
      key={service.id}
      onClick={() => toggleService(service.id)}
      className={`flex items-center justify-between border rounded-md p-4 cursor-pointer transition
              ${selected ? "border-gold bg-gold/5" : "hover:shadow-sm"}
            `}
    >
      {/* LEFT */}
      <div className="space-y-1">
        <h3 className="font-semibold text-base">{service.name}</h3>

        {service.description && (
          <p className="text-sm text-muted-foreground">{service.description}</p>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-sm">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(service.price)}
        </span>

        <Checkbox
          checked={selected}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={() => toggleService(service.id)}
          className="data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-white"
        />
      </div>
    </div>
  );
}
