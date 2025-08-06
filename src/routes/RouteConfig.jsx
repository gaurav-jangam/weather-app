import { Route, Routes } from 'react-router-dom';
import App from '../App';

/**
 * RouteConfig - Defines the route structure for the application.
 *
 * @component
 * @returns {JSX.Element} Route configuration wrapped in Routes.
 */
function RouteConfig() {
	return (
		<Routes>
			<Route path="/" element={<App />} />
		</Routes>
	);
}

export default RouteConfig;
