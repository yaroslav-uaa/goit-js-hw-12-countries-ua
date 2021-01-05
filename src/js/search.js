import countrySearch from "./fetchCountries.js";
import getRefs from "./getRefs";
import countryCard from "../templates/countryCard.hbs";
import countryList from "../templates/countryList.hbs";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
// Підключення дебанса і нотіфай
import { error } from "@pnotify/core";
import debounce from "lodash.debounce";
// Слухач на форму з відтермінуванням
const refs = getRefs();

refs.form.addEventListener("input", debounce(searchInputHandler, 500));

function searchInputHandler(e) {
  e.preventDefault();
  clearCountries();
  const searchQuery = e.target.value;
  // Якщо пустий інпут
  if (!searchQuery) {
    return;
  }
  countrySearch
    .fetchCountry(searchQuery)
    .then((data) => {
      if (data.length > 10) {
        error({
          text: "Too many matches found. Please enter a more specific name!",
        });
      } else if (data.status === 404) {
        error({
          text: "No country has been found. Please enter a more specific name!",
        });
      } else if (data.length === 1) {
        createListMarkup(data, countryCard);
      } else if (data.length <= 10) {
        createListMarkup(data, countryList);
      }
    })
    .catch((Error) => {
      Error({ text: "You must enter name parameters!" });
      console.log(Error);
    });
}

function createListMarkup(countries, template) {
  const markup = countries.map((country) => template(country)).join("");
  refs.countryCard.insertAdjacentHTML("afterbegin", markup);
}

function clearCountries() {
  refs.countryCard.innerHTML = "";
}
