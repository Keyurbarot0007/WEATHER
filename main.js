function getWeather() {
    const cityInput = document.getElementById('city-input');
    const cityName = cityInput.value;

    if (cityName.trim() === '') {
        alert('Please enter a city name');
        return;
    }

    const apiKey = '92ece691ee4fbf22ff1fae51598a3ed0'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');

    if (data.cod !== '404') {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
        const description = data.weather[0].description;

        const weatherHtml = `
            <h2>${cityName}</h2>
            <p>${description}</p>
            <p>Temperature: ${temperature}°C</p>
        `;

        weatherResult.innerHTML = weatherHtml;
    } else {
        alert('City not found. Please enter a valid city name.');
    }
}
