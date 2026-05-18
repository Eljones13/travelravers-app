// TRAVEL RAVERS: GEAR PRODUCT IMAGE
// Unsplash image with emoji badge overlay. onError hides broken image.

interface GearProductImageProps {
  imageQuery: string;
  icon: string;
  alt: string;
}

export default function GearProductImage({ imageQuery, icon, alt }: GearProductImageProps) {
  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-gray-900 relative">
      <img
        src={`https://source.unsplash.com/400x300/?${encodeURIComponent(imageQuery)}`}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <span
        className="absolute top-2 left-2 text-base leading-none bg-black/50 rounded px-1 py-0.5"
        aria-hidden="true"
      >
        {icon}
      </span>
    </div>
  );
}
