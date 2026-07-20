import Link from "next/link";
import Image from "next/image";
import type { PropertyStatus, PropertyType } from "@/generated/prisma/enums";
import { DoorPlate } from "@/components/door-plate";
import { PlaceholderPhoto } from "@/components/placeholder-photo";
import { CostBreakdown } from "@/components/cost-breakdown";

export interface PropertyCardData {
  codigo: string;
  status: PropertyStatus;
  type: PropertyType;
  title: string;
  bairro: string;
  bedrooms: number;
  bathrooms: number;
  areaM2: number;
  priceMonthly: number;
  condominio: number;
  iptu: number;
  depositAmount: number;
  photos: string; // JSON-encoded array
}

const typeLabels: Record<PropertyType, string> = {
  CASA: "Casa",
  APARTAMENTO: "Apartamento",
};

export function PropertyCard({ property }: { property: PropertyCardData }) {
  const photos = JSON.parse(property.photos) as string[];
  const cover = photos[0];

  return (
    <Link
      href={`/imoveis/${property.codigo}`}
      className="group block bg-white rounded-xl border border-carvao/10 overflow-hidden hover:shadow-lg hover:shadow-carvao/10 transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-anil"
    >
      <div className="relative aspect-[4/3] w-full">
        {cover ? (
          <Image
            src={cover}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderPhoto className="absolute inset-0" />
        )}
        <div className="absolute top-3 left-3">
          <DoorPlate codigo={property.codigo} status={property.status} size="sm" />
        </div>
      </div>

      <div className="p-4">
        <p className="font-utility text-[11px] uppercase tracking-wide text-grafite">
          {typeLabels[property.type]} · {property.bairro}
        </p>
        <h3 className="font-display font-semibold text-carvao mt-0.5 group-hover:text-anil">
          {property.title}
        </h3>
        <p className="text-sm text-grafite mt-1">
          {property.bedrooms} qt · {property.bathrooms} ban · {property.areaM2}m²
        </p>
        <div className="mt-3">
          <CostBreakdown property={property} compact />
        </div>
      </div>
    </Link>
  );
}
