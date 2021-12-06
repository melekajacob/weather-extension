import { setStoredCities, setStoredOptions } from './../utils/storage';

// Good practice to set data in storage onInstalled (look into how user can overwrite user data)
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({ tempScale: 'metric' });
});
