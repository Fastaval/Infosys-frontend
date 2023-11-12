import { get } from './api.service';

let translations: { [key: string]: unknown };

export interface TranslationResponse {
  status: 'success' | 'error';
  translations;
}

export const translationsService = {
  populateTranslations: async () =>
    await get('/translations/ajax/tickets.*?lang=da').then((resp) => {
      translations = resp?.translations;
    }),

  getTranslations: async () => {
    if (!translations || Object.keys(translations).length === 0) await translationsService.populateTranslations();
    return translations;
  }
};
