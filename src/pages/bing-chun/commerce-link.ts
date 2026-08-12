import { commerce } from "./data";

type CommerceWhatsAppLinkResponse = {
    merchant_slug: string;
    merchant_display_name: string;
    display_phone_number: string;
    url: string;
};

export async function resolveCommerceWhatsAppLink(signal?: AbortSignal): Promise<CommerceWhatsAppLinkResponse> {
    const apiBaseUrl = commerce.apiBaseUrl.replace(/\/+$/, "");
    const endpoint = `${apiBaseUrl}/commerce/public/merchants/${encodeURIComponent(commerce.merchantSlug)}/whatsapp-link`;
    const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
        signal,
    });

    if (!response.ok)
        throw new Error(`Commerce channel resolver returned ${response.status}`);

    const result = await response.json() as CommerceWhatsAppLinkResponse;
    if (result.merchant_slug !== commerce.merchantSlug || !/^https:\/\/wa\.me\/\d{8,15}(?:\?|$)/.test(result.url))
        throw new Error("Commerce channel resolver returned an invalid destination");

    return result;
}

export function createCommerceWhatsAppUrl(baseUrl: string, message: string) {
    const url = new URL(baseUrl);

    if (url.protocol !== "https:" || url.hostname !== "wa.me")
        throw new Error("Cannot create an order link from an invalid WhatsApp destination");

    url.searchParams.set("text", message);
    return url.toString();
}
