import { writable } from "svelte/store";
const API_URL = "https://restcountries.com/v2/";
const countryList = writable([]);

const countriesStore = {
  subscribe: countryList.subscribe,
  fetchCountry: async (query) => {
    try {
      const data = await getJSON(`${API_URL}name/${query}`);
      countryList.set(data);
    } catch (error) {
      console.error(error);
    }
  },
};

export default countriesStore;

// HELPERS==========================================================================================
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(10)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(10)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request timed out..`));
    }, s * 1000);
  });
};
