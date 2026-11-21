import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappHref } from "@/lib/links";

/** Floating WhatsApp button with a pulsing ring and a hover label. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with SSE on WhatsApp"
      className="group fixed bottom-[max(clamp(16px,2.4vw,32px),env(safe-area-inset-bottom))] right-[clamp(16px,2.4vw,32px)] z-[70] flex items-center gap-3 focus-visible:outline-none"
    >
      <span className="pointer-events-none translate-x-2.5 whitespace-nowrap rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white opacity-0 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)] transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
      <span className="wa-btn relative grid h-[62px] w-[62px] place-items-center rounded-full text-white group-hover:-translate-y-[3px] group-hover:scale-[1.04] group-focus-visible:outline group-focus-visible:outline-[3px] group-focus-visible:outline-offset-[3px] group-focus-visible:outline-white">
        <span aria-hidden="true" className="wa-ring absolute inset-0 rounded-full border-2 border-[#23B85F]" />
        <WhatsAppIcon size={28} filled={false} strokeWidth={1.7} />
      </span>
    </a>
  );
}
