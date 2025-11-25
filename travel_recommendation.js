const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const btnSearchIcon = document.getElementById('btnSearchIcon');

function resetForm() {
	document.getElementById("conditionInput").value = "";
}
btnClear.addEventListener('click', resetForm);

function searchCondition() {
	const input = document.getElementById('conditionInput').value.toLowerCase();
	const resultsDiv = document.getElementById('results');
	resultDiv.innerHTML = '';
	fetch('./travel_recommendation_api.json')
	.then(response => response.json())
	.then(data => {
        let searchResults = searchCountries(data, input);
        searchResults = searchResults.concat(searchTemples(data, input));
        searchResults = searchResults.concat(searchBeaches(data, input));
       
        if (searchResults && searchResults.length > 0) {
            for (let i = 0; i < searchResults.length; i++) {
                resultsDiv.innerHTML += `<div class="result-div">`;
                resultsDiv.innerHTML += `<img src="${searchResults[i].imageUrl}" alt="hjh"></img>`;
                resultsDiv.innerHTML += `<h2>${searchResults[i].name}</h2>`;
                resultsDiv.innerHTML += `<p><strong>Symptoms:</strong> ${searchResults[i].description}</p>`;
                resultsDiv.innerHTML += `<button id="btnVisit" class="btn-label">Visit</button>`;
                resultsDiv.innerHTML += `</div>`;
            }
        } else {
            resultsDiv.innerHTML = 'No result.';
        }
	})
	.catch(error => {
		console.error('Error:', error);
		resultsDiv.innerHTML = 'An error occurred while fetching data.';
	});
}

function searchCountries(data, input) {
    let results = [];
    for (let i = 0; i < data.countries.length; i++) {
        let country = data.countries[i];
        const result = country.cities.filter(item => item.name.toLowerCase().includes(input));
        if (result && result.length > 0) {
            if (results.length === 0) {
                results = result;
            } else {
                results.concat(result);
            }
        }
    }
    return results;
}

function searchTemples(data, input) {
    let results = [];
    const result = data.temples.filter(item => item.name.toLowerCase().includes(input));
    if (result && result.length > 0) {
        if (results.length === 0) {
            results = result;
        } else {
            results.concat(result);
        }
    }
    return results;
}

function searchBeaches(data, input) {
    let results = [];
    const result = data.beaches.filter(item => item.name.toLowerCase().includes(input));
    if (result && result.length > 0) {
        if (results.length === 0) {
            results = result;
        } else {
            results.concat(result);
        }
    }
    return results;
}

btnSearch.addEventListener('click', searchCondition);
btnSearchIcon.addEventListener('click', searchCondition);
