import React, { useEffect, useState } from 'react';
import { fetchOpenWeatherData, OpenWeatherDataI } from '../../utils/api';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';
import 'fontsource-roboto';
import { LoaderOptionsPlugin } from 'webpack';

// Nice way to reuse containers
const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color='secondary' onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

enum WeatherCardStatusE {
  loading,
  error,
  ready,
}

export const WeatherCard: React.FC<{
  city: string;
  onDelete?: () => void;
}> = ({ city, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherDataI | null>(null);
  const [status, setStatus] = useState<WeatherCardStatusE>(
    WeatherCardStatusE.loading
  );

  useEffect(() => {
    // NOTE useEffect cannot be async, so need to attach these (prob not a good idea to await)
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data);
        setStatus(WeatherCardStatusE.ready);
      })
      .catch((err) => setStatus(WeatherCardStatusE.error));
  }, [city]);

  if (
    status === WeatherCardStatusE.loading ||
    status === WeatherCardStatusE.error
  ) {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography>
          {status === WeatherCardStatusE.error
            ? 'Error: could not retrieve data for this city'
            : 'Loading'}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant='h5'>{weatherData.name}</Typography>
      <Typography variant='body1'>
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant='body1'>
        Feels Like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
