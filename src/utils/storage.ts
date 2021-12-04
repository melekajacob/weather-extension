// Good idea to have type safety on the
// Like how seriously we take the types (perhaps abstract types from code)
export interface LocalStorage {
  cities?: string[];
}

export type LocalStorageKeys = keyof LocalStorage;

export const setStoredCities = (cities: string[]): Promise<void> => {
  // Made seperate variable for type safety
  const vals: LocalStorage = {
    cities,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
};

export const getStoredCities = (): Promise<string[]> => {
  const keys: LocalStorageKeys[] = ['cities'];

  return new Promise((res) => {
    chrome.storage.local.get(keys, (data: LocalStorage) => {
      res(data.cities ?? []);
    });
  });
};
