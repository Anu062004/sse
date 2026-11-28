"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { indianStates } from "@/data/states";
import { telHref, whatsappHref } from "@/lib/links";
import type { Product } from "@/lib/products";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "error" | "success";
type Errors = Record<string, string>;

const labelClass =
  "block text-xs font-bold uppercase tracking-[0.18em] text-muted";
const fieldClass =
  "mt-2 h-12 w-full border-b border-line bg-transparent text-base text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none";

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          className="mt-2 text-[11px] leading-snug text-error"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function QuoteForm({ product }: { product?: Product }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        errors?: Errors;
      };

      if (!response.ok) {
        setErrors(result.errors ?? {});
        setMessage(
          result.error ??
            "Could not send the request. Please call or WhatsApp us.",
        );
        setStatus("error");

        const firstError = result.errors ? Object.keys(result.errors)[0] : "";
        if (firstError) {
          document.getElementById(`quote-${firstError}`)?.focus();
        }
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Network error. Please call or WhatsApp us.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-t border-navy/20 pt-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
          Request sent
        </p>
        <h2 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.035em]">
          Thank you. We will be in touch.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-navy/65">
          We reply during business hours. For urgent parts, call or WhatsApp us
          directly and mention the machine and part number.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappHref()}>WhatsApp</ButtonLink>
          <ButtonLink href={telHref} variant="outline">
            Call {site.phone}
          </ButtonLink>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/55 underline-offset-4 hover:text-navy hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <>
      <noscript>
        <p className="mb-6 border-l-2 border-accent pl-3 text-sm leading-relaxed text-navy/70">
          The quote form needs JavaScript. Please{" "}
          <a href={telHref} className="underline">
            call {site.phone}
          </a>{" "}
          or{" "}
          <a href={whatsappHref()} className="underline">
            message us on WhatsApp
          </a>
          .
        </p>
      </noscript>

      <form onSubmit={handleSubmit} className="relative">
        {product ? (
          <div className="mb-8 border border-line bg-paper p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Quoting for
            </p>
            <p className="mt-2 text-base font-medium">{product.name}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {product.part_number ? `Part ${product.part_number}` : "Part number confirmed on enquiry"}
            </p>
          </div>
        ) : null}

        <input
          type="hidden"
          name="product"
          defaultValue={product ? product.name : ""}
        />

        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
          <Field label="Name" htmlFor="quote-name" error={errors.name}>
            <input
              id="quote-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "quote-name-error" : undefined}
              className={fieldClass}
            />
          </Field>

          <Field label="Phone" htmlFor="quote-phone" error={errors.phone}>
            <input
              id="quote-phone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone or WhatsApp number"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "quote-phone-error" : undefined}
              className={fieldClass}
            />
          </Field>

          <Field label="Email" htmlFor="quote-email" error={errors.email}>
            <input
              id="quote-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Optional"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "quote-email-error" : undefined}
              className={fieldClass}
            />
          </Field>

          <Field label="Company" htmlFor="quote-company">
            <input
              id="quote-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Optional"
              className={fieldClass}
            />
          </Field>

          <Field label="State" htmlFor="quote-state">
            <select
              id="quote-state"
              name="state"
              defaultValue=""
              className={fieldClass}
            >
              <option value="">Select a state</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Machine" htmlFor="quote-machine">
            <input
              id="quote-machine"
              name="machine"
              type="text"
              defaultValue={product?.machine ?? ""}
              placeholder="e.g. JCB 3DX"
              className={fieldClass}
            />
          </Field>

          <Field label="Part number" htmlFor="quote-partNumber">
            <input
              id="quote-partNumber"
              name="partNumber"
              type="text"
              defaultValue={product?.part_number ?? ""}
              placeholder="If known"
              className={fieldClass}
            />
          </Field>

          <Field label="Quantity" htmlFor="quote-quantity">
            <input
              id="quote-quantity"
              name="quantity"
              type="text"
              placeholder="e.g. 2 sets"
              className={fieldClass}
            />
          </Field>

          <Field
            label="Message"
            htmlFor="quote-message"
            className="sm:col-span-2"
          >
            <textarea
              id="quote-message"
              name="message"
              rows={5}
              placeholder="Machine year, valve block, or anything else we should know."
              className="mt-2 w-full resize-y border-b border-line bg-transparent py-3 text-base text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
            />
          </Field>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs text-[11px] leading-relaxed text-muted">
            We use your details only to respond to this enquiry.
          </p>
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="shrink-0"
          >
            {status === "submitting" ? "Sending…" : "Send request"}
          </Button>
        </div>

        {status === "error" && message ? (
          <p
            role="alert"
            className="mt-5 border-l-2 border-error pl-3 text-sm leading-relaxed text-error"
          >
            {message}
          </p>
        ) : null}

        <div className="absolute -left-[9999px] top-0" aria-hidden="true">
          <label htmlFor="quote-website">Website</label>
          <input
            id="quote-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </form>
    </>
  );
}
