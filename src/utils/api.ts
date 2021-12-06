// Free plan API key, low risk keeping it in frontend
const OPEN_WEATHER_API_KEY = `20f07b7926e0dfbe3356dc78f3a6d717`;

// We don't need to worry about payload coming from PAI changing because its a versioned API
export interface OpenWeatherDataI {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}

export type OpenWeatherTempScale = 'metric' | 'imperial';

export const fetchOpenWeatherData = async (
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherDataI> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=${tempScale}`
  );

  if (!res.ok) {
    throw new Error('City not found');
  }

  const data: OpenWeatherDataI = await res.json();

  return data;
};
