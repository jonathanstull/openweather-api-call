import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './services/weather-service.js';
import something from './services/giphy-service.js';

function clearFields () {
  $('#location').val("");
  $('.showErrors').val("");
  $('.showHumidity').val("");
  $('.showTemp').val("");
}

function getElements(response) {
  if (response.main) {
    $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(city) {
  const response = await WeatherService.getWeather(city);
  getElements(response);
}

$(document).ready(() => {
  $("#weatherLocation").click(() => {
    let city = $("#location").val();
    clearFields();
    makeApiCall(city);
  });
});