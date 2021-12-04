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
} from '@material-ui/core';
import { Add, Add as AddIcon } from '@material-ui/icons';
import { getStoredCities, setStoredCities } from '../utils/storage';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');

  useEffect(() => {
    getStoredCities().then((cities) => {
      setCities(cities);
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

  return (
    <Box mx='8px' my='16px'>
      <Grid container>
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
      </Grid>
      {cities.map((city, index) => {
        return (
          <WeatherCard
            key={city}
            city={city}
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
