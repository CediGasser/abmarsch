import type { LayoutServerLoad } from "./$types"
import { locales } from "$lib/i18n"

export const load: LayoutServerLoad = async ({ request, cookies }) => {
  // If there's a locale cookie, use that.
  let locale = cookies.get('locale');

  // Check if the locale is available.
  if (locale && !locales.includes(locale)) {
    locale = undefined;
  }

  // If there's no locale cookie, check the Accept-Language header.
  if (!locale) {
    const browserLocales = request.headers.get('accept-language')?.split(',').map((l) => l.split(';')[0]);
    if (browserLocales) {
      for (const browserLocale of browserLocales) {
        for (const availableLocale of locales) {
          if (browserLocale.includes(availableLocale)) {
            locale = availableLocale;
            break;
          }
        }
        if (locale) break;
      }
    }
  }

  // If there's still no locale, use the default 'de'.
  if (!locale) {
    locale = 'de';
  }

  cookies.set('locale', locale, { path: '/', httpOnly: false });

  return {
    locale
  }
};
