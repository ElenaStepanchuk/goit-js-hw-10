import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetch-countries';


const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const aboutCountry = document.querySelector('.country-info');

input.addEventListener('input', debounce(handleInputCountry, DEBOUNCE_DELAY));

function handleInputCountry() {
    const name = input.value.trim();
    if (name === ``) {
        return aboutCountry.innerHTML = ``;
    }
    fetchCountries(name).then(handleShowCountryList).catch(handleWrongCountryList)
}

function handleShowCountryList(array) {
    console.log(array)
    if (array.length > 10) {
        aboutCountry.innerHTML = ``;
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (array.length >= 2) {
    return aboutCountry.innerHTML = handleCreateCountryList(array)
    }
    return aboutCountry.innerHTML = handleCreateAboutCountryList(array);
}

function handleCreateCountryList(array) {
    return array.map(({flags, name}) => {
        return `<p class="name-country">
    <img src="${flags.svg}" alt="" width="20px" height="20px">
      ${name}
      </p>`
    }).join("")
}


function handleCreateAboutCountryList(array) {
  return array.map(({ flags, name, capital, population, languages }) => {
    console.log(Object.values(languages))
        return `<h1 class="name-country">
    <img src="${flags.svg}" alt="" width="20px" height="20px">
      ${name}
      </h1>
      <ul class="list">
      ${capital ? `<li class="country-info">
          <span>Capital:</span> ${capital}
        </li>` : ``}
              ${population ? `<li class="country-info">
          <span>Population:</span> ${population}
        </li>` : ``}
              ${Object.values(languages) ? `<li class="country-info">
          <span>Languages:</span> ${Object.values(languages)}
        </li>` : ``}
      </ul>`
    }).join("")
}

function handleWrongCountryList() {
return Notiflix.Notify.failure("Oops, there is no country with that name")
}
