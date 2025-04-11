function search() {
    const searchInput = document.getElementById("search_input").value.toLowerCase();
    const searchResults = document.querySelector(".search_results");

    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            let results = [];

            // Search in countries
            data.countries.forEach(country => {
                if (country.name.toLowerCase() === searchInput || country.name.toLowerCase() + "s" === searchInput) {
                    results = results.concat(country.cities);
                }
            });

            // Search in temples
            if (searchInput === "temple" || searchInput === "temples") {
                results = results.concat(data.temples);
            }

            // Search in beaches
            if (searchInput === "beach" || searchInput === "beaches") {
                results = results.concat(data.beaches);
            }

            // Display results
            if (results.length > 0) {
                searchResults.innerHTML = results.map(item => `
                    <div class="search_display">
                        <img class="search_img" src="${item.imageUrl}" alt="${item.name}" />
                        <div class="search_content">
                            <h2 class="search_title">${item.name}</h2>
                            <p class="search_description">${item.description}</p>
                            <button class="btn_searchOutput">Visit</button>
                        </div>
                    </div>
                `).join('');
            } else {
                searchResults.innerHTML = `<p>No results found for "${searchInput}"</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function clearSearch() {
    const searchResults = document.querySelector(".search_results");
    const searchInput = document.getElementById("search_input");

    if (searchResults) searchResults.innerHTML = "";
    if (searchInput) searchInput.value = "";
}




function displayTeams() {
    const teamsContainer = document.querySelector(".teams_container");
    teamsContainer.innerHTML = `<h2 class="teams_title">Our Team</h2>`;
    fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        if (data.teams) {
            teamsContainer.innerHTML += data.teams.map(team => `
                
                <div class="team_card">
                    <img src="${team.imageUrl}" alt="">
                    <div class="team_menber">
                        <h3 class="team_name">${team.name}</h3>
                        <p class="team_description">${team.description}</p>
                        <button class="btn_team">${team.role}</button>
                    </div>
                </div>`).join('');
        }
            
        
    }).catch(error =>{
        console.error("Error fetching data:",error);
        
    });
}


document.addEventListener("DOMContentLoaded", displayTeams);


