import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './popup.css';
import WeatherCard from './WeatherCard';
import {
  InputBase,
  IconButton,
  Paper,
  Input,
  Box,
  Grid,
  Icon,
} from '@material-ui/core';
import { Add, Add as AddIcon } from '@material-ui/icons';
import {
  getStoredCities,
  setStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    // Notice how these can run in parallel now (don't need to Promise.allSettled)
    getStoredCities().then((cities) => {
      setCities(cities);
    });

    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleCityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCityInput(e.target.value);
  };

  const handleAddCity = () => {
    if (cityInput.trim() === '') return;

    const updatedCities = [...cities, cityInput];

    // Prob could have done this with await right?
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput(''); // Don't forget to clear text fields
    });
  };

  const handleCityDelete = (index: number) => {
    cities.splice(index, 1);

    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    };

    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx='8px' my='16px'>
      <Grid container justifyContent='space-evenly'>
        <Grid item>
          <Paper>
            <Box px='15px' py='5px'>
              <InputBase
                value={cityInput}
                onChange={handleCityInputChange}
                placeholder='Add a city name'
              />
              <IconButton onClick={handleAddCity}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <Box>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, index) => {
        return (
          <WeatherCard
            key={city}
            city={city}
            tempScale={options.tempScale}
            onDelete={() => handleCityDelete(index)}
          />
        );
      })}

      <Box height='16px' />
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
