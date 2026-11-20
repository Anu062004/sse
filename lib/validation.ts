export type QuoteInput = {
  name: string;
  phone: string;
  email: string;
  company: string;
  state: string;
  machine: string;
  partNumber: string;
  quantity: string;
  message: string;
  product: string;
  website: string;
};

export type ValidationResult =
  | { ok: true; data: QuoteInput }
  | { ok: false; errors: Record<string, string> };

function readString(value: unknown, maxLength: number): string {
  return typeof value === "string"
    ? value.trim().replace(/\u0000/g, "").slice(0, maxLength)
    : "";
}

export function validateQuote(input: unknown): ValidationResult {
  const source =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  const data: QuoteInput = {
    name: readString(source.name, 80),
    phone: readString(source.phone, 24),
    email: readString(source.email, 120),
    company: readString(source.company, 100),
    state: readString(source.state, 60),
    machine: readString(source.machine, 60),
    partNumber: readString(source.partNumber, 60),
    quantity: readString(source.quantity, 40),
    message: readString(source.message, 1500),
    product: readString(source.product, 80),
    website: readString(source.website, 200),
  };

  const errors: Record<string, string> = {};
  const digits = data.phone.replace(/\D/g, "");

  if (data.name.length < 2) {
    errors.name = "Enter your name.";
  }

  if (
    data.phone.length < 7 ||
    digits.length < 7 ||
    !/^[+0-9()\-\s]+$/.test(data.phone)
  ) {
    errors.phone = "Enter a valid phone number.";
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}
