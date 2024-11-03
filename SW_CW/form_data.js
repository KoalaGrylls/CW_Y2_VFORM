let form = document.getElementsByTagName("form")[0];



function test(message, assertion) {
    try {
        const result = assertion();
        console.log(result ? `Pass: ${message
            }
    ` : `Fail: ${message
        }
    `);
    }
    catch (error) {
        console.error(`Error: ${message
            }
    - ${error.message
            }
    `);
    }
}


function checkName(){

}

function checkAge(age){
    if (age <= 0){
       return "Invalid Input: Enter non negative age";
    } else if (age > 120){
        return "Invalid Input: Age too high"
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const countryDropdown = document.getElementById("countryDropdown");
    
    function getCountries() {
        fetch("https://restcountries.com/v2/all") // I am using the restcountries API to get a list of all countries
        .then(response => response.json()) // Parse the response as JSON so we can read the data
        .then(data => { 
            // Populates the dropdown with each country by going through each index of the data array
            data.forEach(country => {
                const option = document.createElement("option");
                option.value = country.name;
                option.text = country.name;
                countryDropdown.appendChild(option); // this appends each option to the dropdown
            });
        })
        .catch(error => console.error("Error fetching countries:", error));// If the Api call fails, this will log the error to the console
    }// To do: add a catch that uses an json file already in the project
    getCountries();
});



test('calculate for negative age', () => {
    const age = -1;
    const res= checkAge(age);
    return res === '';
});