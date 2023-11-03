document.addEventListener("DOMContentLoaded", () => {
    var cardContainer = document.getElementById("card-container");

    fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((country) => {
                createCard(country);
            });
        })

    function createCard(country) {
        var card = document.createElement("div");
        card.classList.add("col-lg-4", "col-sm-12");

        card.innerHTML = `
            <div class="card">
                <div class="card-header">${country.name.common}</div>
                <div class="card-body">
                <img src="${country.flags.png}" alt="${country.name.common}" style="max-width: 100%">
                    <h5 class="card-title">Capital: ${country.capital}</h5>
                    <h5 class="card-text">Region: ${country.region}</h5>
                    <h5 class="card-text">Latlng: ${country.latlng.join(", ")}</h5>
                    <h5 class="card-text">Country Codes: ${country.cca2}, ${country.cca3}</h5>
                    <button class="btn btn-primary" data-country="${country.name.common}">Click for Weather</button>
                </div>
            </div>
        `;

        cardContainer.appendChild(card);

        var weatherButtons = card.querySelectorAll("button");
        weatherButtons.forEach((button) => {
            button.addEventListener("click", () => {
                var countryName = button.getAttribute("data-country");
                fetchWeatherData(countryName);
            });
        });
    }
    function fetchWeatherData(countryName) {
        var apiKey = 'b045049f5b7da0a403f923fa6847ed7d';
        
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`;
    
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                var weatherDescription = data.weather[0].description;
                var temperature = data.main.temp;
    
                alert(`Weather in ${countryName}: ${weatherDescription}, Temperature: ${temperature}°C`);
            })
    }
});


