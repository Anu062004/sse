import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type Variant =
  | "light"
  | "dark"
  | "ghost"
  | "line"
  | "whatsapp"
  | "on-accent"
  // Legacy names, kept so existing pages map onto the new styles.
  | "primary"
  | "navy"
  | "outline"
  | "outline-light";

type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  light: "btn-light",
  dark: "btn-dark",
  ghost: "btn-ghost",
  line: "btn-line",
  whatsapp: "btn-whatsapp",
  "on-accent": "btn-dark btn-on-accent",
  primary: "btn-dark",
  navy: "btn-dark",
  outline: "btn-line",
  "outline-light": "btn-ghost",
};

export function buttonStyles({
  variant = "dark",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return cn("btn", variants[variant], size === "sm" && "btn-sm", className);
}

/** The round icon well on the right of a pill button. Defaults to an arrow. */
export function ButtonIcon({ children }: { children?: ReactNode }) {
  return <span className="btn-ic">{children ?? <ArrowRightIcon />}</span>;
}

/**
 * WhatsApp buttons lead with the brand logo, the way WhatsApp's own
 * click-to-chat buttons do; every other variant ends in the round icon well.
 */
function buttonContent(children: ReactNode, variant: Variant | undefined, icon: ReactNode | false | undefined) {
  if (variant === "whatsapp") {
    return (
      <>
        <WhatsAppIcon size={20} className="btn-lead" />
        {children}
      </>
    );
  }
  return (
    <>
      {children}
      {icon === false ? null : <ButtonIcon>{icon}</ButtonIcon>}
    </>
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode | false;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant,
  size,
  icon,
  className,
  onClick,
}: CommonProps & { href: string; onClick?: () => void }) {
  const classes = buttonStyles({ variant, size, className });
  const content = buttonContent(children, variant, icon);

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

export function Button({
  children,
  variant,
  size,
  icon,
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & CommonProps) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props}>
      {buttonContent(children, variant, icon)}
    </button>
  );
}
