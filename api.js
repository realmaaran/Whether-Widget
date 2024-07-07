// api.js

// Function to fetch weather data based on user's current location
function fetchWeatherByLocation() {
    const apiKey = 'dfd11db5c8f522ef64a95562b54e8c5a';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Extract city name from the data
                    const city = data.name;

                    // Extract date
                    const currentDate = new Date();
                    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);

                    // Extract temperature from the data
                    const temperature = data.main.temp;

                    // Update location name, date, and temperature in the weather card
                    document.getElementById('location').innerText = city;
                    document.getElementById('date').innerText = formattedDate;
                    document.getElementById('temperature').innerText = `${temperature}°C`;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Call fetchWeatherByLocation function when the page loads
window.onload = fetchWeatherByLocation;
