const BASE_URL = "https://restcountries.eu/rest/v2/name/";

export default {
  fetchCountry(query) {
    const request = `${query}`;
    return fetch(BASE_URL + request).then((response) => response.json());
  },
};
