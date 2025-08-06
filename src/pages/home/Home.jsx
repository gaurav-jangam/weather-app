import { useEffect, useState } from 'react';
import Search from '../../components/search/Search';
import Forecast from '../../components/forecast/Forecast';
import CurrentWeather from '../../components/current-weather/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../../api';

/**
 * Main component for the home page that fetches and displays weather data.
 * It includes a search input, current weather info, and forecast.
 *
 * @component
 */
function Home() {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [userCity, setUserCity] = useState('');

	/**
	 * Fetches the city name from latitude and longitude using OpenWeatherMap's reverse geocoding API.
	 *
	 * @async
	 * @function
	 * @param {number} lat - Latitude of the location.
	 * @param {number} lon - Longitude of the location.
	 * @returns {Promise<string>} - Returns the city name or 'Your Location' as fallback.
	 */
	const getCityNameFromCoords = async (lat, lon) => {
		const response = await fetch(
			`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
		);
		const data = await response.json();
		return data[0]?.name || 'Your Location';
	};

	/**
	 * Fetches both current weather and forecast data using OpenWeatherMap APIs.
	 * Updates the state with the retrieved data.
	 *
	 * @async
	 * @function
	 * @param {number} lat - Latitude of the location.
	 * @param {number} lon - Longitude of the location.
	 * @param {string} [label=''] - Optional city name label from the search component.
	 */
	const getWeatherData = async (lat, lon, label = '') => {
		const cityName = label || (await getCityNameFromCoords(lat, lon));
		setUserCity(cityName);

		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);
		const forecastFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		Promise.all([currentWeatherFetch, forecastFetch])
			.then(async (response) => {
				const weatherResponse = await response[0].json();
				const forecastResponse = await response[1].json();

				setCurrentWeather({
					city: cityName,
					...weatherResponse,
				});
				setForecast({ city: cityName, ...forecastResponse });
			})
			.catch(console.log);
	};

	/**
	 * Handles the city selection from the search component.
	 * Triggers weather data fetch based on selected coordinates.
	 *
	 * @function
	 * @param {Object} searchData - The selected option from the search component.
	 * @param {string} searchData.value - String containing latitude and longitude separated by a space.
	 * @param {string} searchData.label - Label of the selected city.
	 */
	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(' ');
		getWeatherData(lat, lon, searchData.label);
	};

	/**
	 * useEffect hook runs once on component mount to fetch user's geolocation and weather data.
	 */
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					await getWeatherData(latitude, longitude);
				},
				(error) => {
					console.error('Geolocation error:', error);
				}
			);
		} else {
			console.log('Geolocation not supported.');
		}
	}, []);

	return (
		<div className="container">
			{/* Search bar with default city shown based on geolocation */}
			<Search
				onSearchChange={handleOnSearchChange}
				defaultCity={userCity}
			/>

			{/* Display current weather data */}
			{currentWeather && <CurrentWeather data={currentWeather} />}

			{/* Display forecast weather data */}
			{forecast && <Forecast data={forecast} />}
		</div>
	);
}

export default Home;
