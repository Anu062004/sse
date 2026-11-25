import type { QuoteInput } from "@/lib/validation";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildQuoteEmail(data: QuoteInput) {
  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Company", data.company],
    ["State", data.state],
    ["Machine", data.machine],
    ["Part number", data.partNumber],
    ["Quantity", data.quantity],
    ["Product", data.product],
    ["Message", data.message],
  ].filter(([, value]) => Boolean(value)) as Array<[string, string]>;

  const subjectLine =
    data.partNumber || data.product || data.machine || "General enquiry";
  const subject = `Quote request — ${subjectLine.replace(/[\r\n]+/g, " ")}`;

  const text = [
    "New quote request from the SSE website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Reply directly to this email to contact the customer.",
  ].join("\n");

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;border-bottom:1px solid #D9DCE1;vertical-align:top;color:#5A6070;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:8px 0;border-bottom:1px solid #D9DCE1;vertical-align:top;color:#0B1530;font-size:14px;">${escapeHtml(value).replace(/\n/g, "<br />")}</td></tr>`,
    )
    .join("");

  const html = `<div style="background:#F4F5F7;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border-top:6px solid #F5B800;padding:32px;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#5A6070;">SSE – S S Engineering</p>
    <h1 style="margin:0 0 24px;font-size:24px;line-height:1.2;color:#0B1530;">New quote request</h1>
    <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#5A6070;">Sent from the SSE website quote form. Reply directly to this email to contact the customer.</p>
  </div>
</div>`;

  return { subject, text, html };
}
