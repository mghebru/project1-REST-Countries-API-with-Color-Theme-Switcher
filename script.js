const countriesContainer = document.querySelector('.countries-container')

fetch('https://restcountries.com/v3.1/independent?status=true')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((country) => {
            //console.log(country);
            const countryCard = document.createElement('a')
            countryCard.classList.add('country-card')
            countryCard.href = `country.html?name=${country.name.common}`
            countryCard.innerHTML = `
              <img src="${country.flags.svg}" alt="${country.name.common} flag">
                <div class="card-text">
                    <h3 class="card-title">${country.name.common}</h3>
                    <p><b>Population</b> ${country.population}</p>
                    <p><b>Region</b> ${country.region}</p>
                    <p><b>Capital</b> ${country.capital?.[0]}</p>
                </div>
            `

            countriesContainer.append(countryCard);

        });
    })

// const cardImg = document.createElement('img')
// cardImg.src = 'https://flagcdn.com/de.svg'
// countryCard.append(cardImg)

