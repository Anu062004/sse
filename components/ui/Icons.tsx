import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 16, strokeWidth = 2.2, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </Svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2.4} {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2.4} {...props}>
      <path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg strokeWidth={3} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Svg>
  );
}

const phonePath =
  "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z";

export function PhoneIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <path d={phonePath} fill="currentColor" fillOpacity=".22" stroke="none" />
      <path d={phonePath} />
    </Svg>
  );
}

const bubblePath = "M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z";
const handsetPath =
  "M9.2 8.2c-.4 2.9 3.2 6.6 6.4 6.5l.9-1.5-1.9-1-.9.7c-.9-.4-1.9-1.3-2.3-2.3l.7-.9-1-1.9z";

export function WhatsAppIcon({ filled = true, ...props }: IconProps & { filled?: boolean }) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      {filled ? (
        <path d={bubblePath} fill="currentColor" fillOpacity=".22" stroke="none" />
      ) : null}
      <path d={bubblePath} />
      <path d={handsetPath} fill="currentColor" strokeWidth={1.2} />
    </Svg>
  );
}

const mailPath =
  "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z";

export function MailIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <path d={mailPath} fill="currentColor" fillOpacity=".22" stroke="none" />
      <path d={mailPath} />
      <path d="m22 6-10 7L2 6" />
    </Svg>
  );
}

const pinPath = "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z";

export function PinIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <path d={pinPath} fill="currentColor" fillOpacity=".22" stroke="none" />
      <path d={pinPath} />
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </Svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity=".22" stroke="none" />
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <circle cx="11" cy="11" r="7" fill="currentColor" fillOpacity=".18" stroke="none" />
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Svg>
  );
}

export function DocumentIcon(props: IconProps) {
  const path = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z";
  return (
    <Svg strokeWidth={2} {...props}>
      <path d={path} fill="currentColor" fillOpacity=".22" stroke="none" />
      <path d={path} />
      <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
    </Svg>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </Svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  const path = "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z";
  return (
    <Svg strokeWidth={2} {...props}>
      <path d={path} fill="currentColor" fillOpacity=".22" stroke="none" />
      <path d={path} />
      <path d="M16 11.4A4 4 0 1 1 12.6 8a4 4 0 0 1 3.4 3.4zM17.5 6.5h.01" />
    </Svg>
  );
}

export function BurstIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2.4} {...props}>
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </Svg>
  );
}
