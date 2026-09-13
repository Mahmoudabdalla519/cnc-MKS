/**
 * Shared app constants and contact details
 */

export const WHATSAPP_PHONE = '201501112446';
export const WHATSAPP_PHONE_DISPLAY = '01501112446';

export const CREATE_PRODUCT_MESSAGE = 'استفسار عن إنشاء منتج';

export function getWhatsAppUrl(message: string = CREATE_PRODUCT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
