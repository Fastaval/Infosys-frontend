export const userSettingsService = {
  get: (key: string): string | null => {
    return localStorage.getItem(key);
  },
  getBoolean: (key: string): boolean | null => {
    if (!localStorage.getItem(key)) return null;
    return localStorage.getItem(key) === 'true';
  },
  getNumber: (key: string): number | null => {
    if (!localStorage.getItem(key)) return null;
    return Number(localStorage.getItem(key));
  },
  set: (key: string, value: string): void => {
    localStorage.setItem(key, value);
  }
};
