const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container')

const themChanger = document.querySelector('.theme-changer')

let allCountriesData


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
}

fetch('https://restcountries.com/v3.1/independent?status=true')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    })

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then(renderCountries)
})

function renderCountries(data) {
    countriesContainer.innerHTML = ''
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
}

searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})

themChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')

     localStorage.setItem(
        'theme',
        document.body.classList.contains('dark') ? 'dark' : 'light'
    );
})

// const cardImg = document.createElement('img')
// cardImg.src = 'https://flagcdn.com/de.svg'
// countryCard.append(cardImg)

