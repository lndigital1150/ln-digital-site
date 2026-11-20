import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, WhatsAppIcon } from "./Icons";

type Props = {
  href: string;
  children: string;
  variant?: "primary" | "accent" | "ghost";
  size?: "small";
  icon?: "arrow" | "whatsapp" | "none";
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
  extra?: ReactNode;
};

/** Bouton-lien avec remplissage au survol, texte qui défile et effet magnétique optionnel. */
export default function Button({
  href,
  children,
  variant = "primary",
  size,
  icon = "arrow",
  external,
  magnetic = true,
  className = "",
  ariaLabel,
}: Props) {
  const cls = ["btn", variant !== "primary" && `btn--${variant}`, size && `btn--${size}`, className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span className="btn__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon === "arrow" && <ArrowUpRight className="btn__icon" />}
      {icon === "whatsapp" && <WhatsAppIcon className="btn__icon" />}
    </>
  );
  const common = { className: cls, "data-magnetic": magnetic ? "0.25" : undefined, "aria-label": ariaLabel };

  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...common}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} {...common}>
      {content}
    </Link>
  );
}
