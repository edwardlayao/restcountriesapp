<script>
import { createEventDispatcher } from 'svelte';
import { API_URL } from "./config";
import { getJSON } from "./helper";

const dispatch = createEventDispatcher()

export const state = {
  country: {},
};



export const loadCountryByName = async function (query) {
  try {
    const data = await getJSON(`${API_URL}name/${query}`);
    createCountryObject(data);
  } catch (error) {
    console.error(error);
  }
};

const createCountryObject = function (data) {
  const [countryData] = data;
  state.country = {
    name: countryData.name,
    nativeName: countryData.nativeName,
    altName: countryData.altSpellings,
    flag: countryData.flag,
    latlng: countryData.latlng,
    population: countryData.population,
    region: countryData.region,
    subregion: countryData.subregion,
    timezones: countryData.timezones,
  };
};



</script>