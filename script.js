// JavaScript to handle form submission
document.addEventListener('DOMContentLoaded', function () {
    // Find the form by its ID
    const contactForm = document.getElementById('contactForm');

    // Add a submit event listener to the form
    contactForm.addEventListener('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Collect form data
        const formData = new FormData(contactForm);

        // Convert form data to JSON object
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Send the form data to the server (replace 'your-server-endpoint' with the actual endpoint)
        fetch('your-server-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server (if needed)
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '3df48198692a73c6df1c07343d362bd3'; // Replace with your actual API key
    const weatherInfoElement = document.getElementById('weather-info');

    // Function to fetch weather data
    async function getWeatherData(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
            return null;
        }
    }

    // Function to update weather widget
    function updateWeatherWidget(city) {
        getWeatherData(city)
            .then(data => {
                if (data) {
                    const temperature = data.main.temp;
                    const description = data.weather[0].description;

                    const weatherHtml = `<p>Temperature: &nbsp;${temperature} °C</p>
                                         <p>Conditions: &nbsp;${description}</p>`;

                    weatherInfoElement.innerHTML = weatherHtml;
                }
            })
            .catch(error => console.error('Error updating weather widget:', error.message));
    }

    // Update weather widget for a specific city (e.g., Innsbruck)
    updateWeatherWidget('Innsbruck');
});

document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;

    window.addEventListener('scroll', function () {
        // Calculate the scroll position
        const scrollPosition = window.scrollY;

        // Apply a parallax effect by adjusting the background position
        body.style.backgroundPositionY = -scrollPosition * 1 + 'px';
    });
});