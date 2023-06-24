import { derived, writable } from "svelte/store";
import translations from "./translations";
import { browser } from "$app/environment";

export const locales = Object.keys(translations);

function getLocale(): string {
  if (!browser) return "de";

  const locale = localStorage.getItem("locale");
  if (locale) return locale;

  for (const browserLocale of navigator.languages) {
    for (const locale of locales) {
      if (browserLocale.includes(locale)) return locale;
    }
  }

  return "de";
}

export const locale = writable(getLocale());

function translate(locale: string, key: string, vars: {[key: string]: string}): string {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // If the locale doesn't exist, throw an error.
  if (!(locale in translations)) throw new Error(`no translations for locale "${locale}"`);
  if (!(key in translations[locale])) {
    console.error(`no translation found for ${locale}.${key}`);
    return key;
  };
  
  // Grab the translation from the translations object.
  let text: string = translations[locale][key];

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]) ?? text;
  });

  return text;
}

export const t = derived(locale, ($locale) => 
  (key: string, vars: {[key: string]: string} = {}) => translate($locale, key, vars)
);