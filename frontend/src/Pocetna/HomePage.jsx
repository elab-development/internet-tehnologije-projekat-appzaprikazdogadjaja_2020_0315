import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import EventCard from './EventCard';
import CategoryCard from './CategoryCard';
import { WiThermometer, WiHumidity, WiStrongWind, WiCloud, WiSunrise, WiSunset } from 'react-icons/wi';

const HomePage = () => {
    const [eventImages, setEventImages] = useState([]);
    const [categoryImages, setCategoryImages] = useState([]);
    const [weather, setWeather] = useState(null);
    const [loadingWeather, setLoadingWeather] = useState(true);
    const [weatherError, setWeatherError] = useState(null);
    const lat = 44.8176; // Latitude for Belgrade
    const lon = 20.4633; // Longitude for Belgrade
    const apiKey = 'cdBp5C7hVS7gbjOonMGK5KRnvweJwu3ie2B5TQAt';

    useEffect(() => {
        const fetchImages = async () => {
            const eventKeywords = ['concert', 'art exhibition', 'sports event'];
            const categoryKeywords = ['music', 'art', 'sports'];

            const fetchEventImages = eventKeywords.map((keyword, index) =>
                axios.get(`https://picsum.photos/400/300?random=${index}`)
            );
            const fetchCategoryImages = categoryKeywords.map((keyword, index) =>
                axios.get(`https://picsum.photos/200/200?random=${index}`)
            );

            try {
                const eventResponses = await Promise.all(fetchEventImages);
                const categoryResponses = await Promise.all(fetchCategoryImages);

                setEventImages(eventResponses.map(response => response.request.responseURL));
                setCategoryImages(categoryResponses.map(response => response.request.responseURL));
            } catch (error) {
                console.error('Error fetching images from Lorem Picsum API', error);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoadingWeather(true);
            setWeatherError(null);
            try {
                const response = await axios.get('https://api.api-ninjas.com/v1/weather', {
                    params: { lat, lon },
                    headers: { 'X-Api-Key': apiKey },
                });
                setWeather(response.data);
            } catch (error) {
                setWeatherError(error);
            } finally {
                setLoadingWeather(false);
            }
        };

        fetchWeather();
    }, [lat, lon, apiKey]);

    return (
        <div className="homepage">
            <header className="header">
                <h1>Welcome to Belgrade Events</h1>
                <p>Discover the best events happening in Belgrade</p>
            </header>
            <section className="events-highlight">
                <h2>Upcoming Events</h2>
                <div className="event-cards">
                    {eventImages.map((image, index) => (
                        <EventCard
                            key={index}
                            image={image}
                            title={`Event Title ${index + 1}`}
                            description="Event description goes here."
                        />
                    ))}
                </div>
            </section>
            <section className="categories">
                <h2>Categories</h2>
                <div className="category-cards">
                    {categoryImages.map((image, index) => (
                        <CategoryCard
                            key={index}
                            image={image}
                            title={['Music', 'Art', 'Sports'][index]}
                        />
                    ))}
                </div>
            </section>
            <section className="weather">
                <h2>Weather Forecast for Belgrade</h2>
                {loadingWeather ? (
                    <p>Loading weather data...</p>
                ) : weatherError ? (
                    <p>Error loading weather data: {weatherError.message}</p>
                ) : weather ? (
                    <div className="weather-info">
                        <div className="weather-item">
                            <WiThermometer size={50} />
                            <p>Temperature: {weather.temp}°C</p>
                        </div>
                        <div className="weather-item">
                            <WiThermometer size={50} />
                            <p>Feels Like: {weather.feels_like}°C</p>
                        </div>
                        <div className="weather-item">
                            <WiHumidity size={50} />
                            <p>Humidity: {weather.humidity}%</p>
                        </div>
                        <div className="weather-item">
                            <WiStrongWind size={50} />
                            <p>Wind Speed: {weather.wind_speed} m/s</p>
                        </div>
                        <div className="weather-item">
                            <WiStrongWind size={50} />
                            <p>Wind Direction: {weather.wind_degrees}°</p>
                        </div>
                        <div className="weather-item">
                            <WiCloud size={50} />
                            <p>Cloudiness: {weather.cloud_pct}%</p>
                        </div>
                        <div className="weather-item">
                            <WiThermometer size={50} />
                            <p>Max Temperature: {weather.max_temp}°C</p>
                        </div>
                        <div className="weather-item">
                            <WiThermometer size={50} />
                            <p>Min Temperature: {weather.min_temp}°C</p>
                        </div>
                    </div>
                ) : null}
            </section>
            <footer className="footer">
                <p>© 2024 Belgrade Events. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
