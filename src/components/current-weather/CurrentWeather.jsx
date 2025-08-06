import '../../styles/current-weather.css';

/**
 * Renders the current weather information.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.data - Weather data object.
 * @param {string} props.data.city - Name of the city.
 * @param {Object[]} props.data.weather - Weather array containing description and icon.
 * @param {string} props.data.weather[].description - Description of the weather (e.g., "clear sky").
 * @param {string} props.data.weather[].icon - Icon code for the weather condition.
 * @param {Object} props.data.main - Main weather details.
 * @param {number} props.data.main.temp - Current temperature in Celsius.
 * @param {number} props.data.main.feels_like - Feels-like temperature.
 * @param {number} props.data.main.humidity - Humidity percentage.
 * @param {number} props.data.main.pressure - Atmospheric pressure in hPa.
 * @param {Object} props.data.wind - Wind details.
 * @param {number} props.data.wind.speed - Wind speed in m/s.
 *
 * @returns {JSX.Element} The current weather UI component.
 */
const CurrentWeather = ({ data }) => {
	return (
		<div className="weather">
			<div className="top">
				<div>
					<p className="city">{data.city}</p>
					<p className="weather-description">
						{data.weather[0].description}
					</p>
				</div>
				<img
					alt="weather"
					className="weather-icon"
					src={`icons/${data.weather[0].icon}.png`}
				/>
			</div>
			<div className="bottom">
				<p className="temperature">{Math.round(data.main.temp)}°C</p>
				<div className="details">
					<div className="parameter-row">
						<span className="parameter-label">Details</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Feels like</span>
						<span className="parameter-value">
							{Math.round(data.main.feels_like)}°C
						</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Wind</span>
						<span className="parameter-value">
							{data.wind.speed} m/s
						</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Humidity</span>
						<span className="parameter-value">
							{data.main.humidity}%
						</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Pressure</span>
						<span className="parameter-value">
							{data.main.pressure} hPa
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;
