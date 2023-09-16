import { get } from './api.service';

let translations: { [key: string]: any };

export interface TranslationResponse {
  status: 'success' | 'error';
  translations;
}

export const populateTranslations = async () =>
  (await get('/translations/ajax/tickets.*?lang=da')).json().then((result) => (translations = result.translations));

export const getTranslations = async () => {
  if (!translations || Object.keys(translations).length === 0) await populateTranslations();
  return translations;
};
