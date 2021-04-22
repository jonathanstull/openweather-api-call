import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './services/weather-service.js';
import GiphyService from './services/giphy-service.js';

function clearFields () {
  $('#location').val("");
  $('.showErrors').val("");
}

function displayWeatherDescription(description) {
  $('.weather-description').text(`The weather is ${description}!`);
}

function displayGif(response) {
  const url = response.data[0].images.downsized.url;
  $('.show-gif').html(`<img src='${url}'>`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

// async function makeApiCall(city) {
//   const response = await WeatherService.getWeather(city);
//   getElements(response);
// }

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    WeatherService.getWeather(city)
      .then(function(weatherResponse) {
        if (weatherResponse instanceof Error) {
          throw Error(`OpenWeather API error: ${weatherResponse.message}`);
        }
        const weatherDescription = weatherResponse.weather[0].description;
        displayWeatherDescription(weatherDescription);
        return GiphyService.getGif(weatherDescription);
        })
        .then(function(giphyResponse) {
          if (giphyResponse instanceof Error) {
            throw Error(`Giphy API error: ${giphyResponse.message}`);
          }
          displayGif(giphyResponse);
        })
        .catch(function(error) {
          displayErrors(error.message);
        })
  });
});