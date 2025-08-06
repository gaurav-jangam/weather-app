import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions, GEO_API_URL } from '../../api';

/**
 * Search component that allows users to search for a location using async pagination.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onSearchChange - Callback function to handle changes in selected search option.
 * @param {string} [props.defaultCity] - Optional default placeholder city name.
 * @returns {JSX.Element} Async search input component.
 */
const Search = ({ onSearchChange, defaultCity }) => {
	const [search, setSearch] = useState(null);

	/**
	 * Fetches matching city options from the GeoDB Cities API based on user input.
	 *
	 * @async
	 * @function
	 * @param {string} inputValue - The user's input string to search for cities.
	 * @returns {Promise<{ options: Array<{ value: string, label: string }> }>}
	 * A promise that resolves to an object containing city options for the select input.
	 */
	const loadOptions = async (inputValue) => {
		const response = await fetch(
			`${GEO_API_URL}/cities?countryIds=IN&namePrefix=${inputValue}`,
			geoApiOptions
		);
		const response_1 = await response.json();
		return {
			options: response_1.data.map((city) => ({
				value: `${city.latitude} ${city.longitude}`,
				label: `${city.name}, ${city.countryCode}`,
			})),
		};
	};

	/**
	 * Handles changes when the user selects a city from the dropdown.
	 *
	 * @param {Object} searchData - The selected option from the dropdown.
	 */
	const handleOnChange = (searchData) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};

	return (
		<AsyncPaginate
			placeholder={defaultCity || 'Search for location'}
			debounceTimeout={600}
			value={search}
			onChange={handleOnChange}
			loadOptions={loadOptions}
		/>
	);
};

export default Search;
