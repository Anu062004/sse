import Image from "next/image";
import photos from "@/data/landmark-photos.json";

export const landmarks: Record<string, (typeof photos)[keyof typeof photos]> = photos;

export function LandmarkPhoto({ state }: { state: string }) {
  const landmark = landmarks[state];
  if (!landmark) return null;

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-sand">
      <Image
        src={landmark.src}
        alt={`${landmark.name}, ${state}`}
        fill
        sizes="(max-width: 559px) 45vw, (max-width: 1099px) 30vw, 240px"
        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
      />
    </div>
  );
}

export function LandmarkCredits() {
  return (
    <details className="mt-5 text-xs text-muted">
      <summary className="cursor-pointer py-2 hover:text-navy">Photo credits</summary>
      <p className="mt-2">Photos resized and cropped for display. Each photo retains its linked license.</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {Object.entries(landmarks).map(([state, photo]) => (
          <li key={state}>
            <a href={photo.source} className="underline hover:text-navy">{photo.name}</a>
            {" — "}{photo.author}{" · "}
            <a href={photo.licenseUrl} className="underline hover:text-navy">{photo.license}</a>
          </li>
        ))}
      </ul>
    </details>
  );
}
