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


function validateForm() {
    // Get the input elements and their values
    const name = document.getElementById("name").value;
    
    const surname = document.getElementById("surname").value;
   
    const email = document.getElementById("email").value;
    
    const age = document.getElementById("age").value;

    const check = document.getElementById("check").checked;

    const date = document.getElementById("date").value;
    console.log(date);
    
    
    // this displays the error message if any of the inputs are invalid
    document.getElementById("age_message").textContent = checkAge(age);
    document.getElementById("name_message").textContent = checkName(name);
    document.getElementById("surname_message").textContent = checkName(surname);
    document.getElementById("email_message").textContent = checkEmail(email);
    document.getElementById("checkB_message").textContent = checkBox(check);
    document.getElementById("dob_message").textContent = checkDOB(date);


}


function checkAge(x){
        if (x <= 0){
            console.log(x);
            console.log("Invalid Input: Enter non negative age")
           return "Invalid Input: Enter non negative age";
        } else if (x > 120){
            console.log(x);
            console.log("Invalid Input: Age too high")
            return "Invalid Input: Age too high"
        }
};


function checkName(x){
    if (x === "" || x === null || /\d/.test(x) || x.length < 2){
        console.log(x);
        console.log("Invalid Input: Enter a name")
        return "Invalid Input: Enter a name"
    }
};

function checkEmail(x){
    if (x === "" || x === null || !x.includes("@") || !x.includes(".")){
        return "Invalid Input: Enter a valid email"
    }
}

function checkBox(x){
    if (x === False){
        return "You must agree to the terms and conditions"
    }
}

function dateToday(){ // this function get the current date and formats it to a number
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensures two-digit month
    const day = String(today.getDate()).padStart(2, '0'); 
    const date = Number(`${year}${month}${day}`);
    return date;
}

function checkDOB(x){
    const today = dateToday();
    const userDate = Number(x.replace(/-/g, ""));// this conerts the date to a number so i can compare with the current date
    console.log(today);
    if (userDate > today){
        return "Invalid Input: Date of birth cannot be in the future"
    } 
}




test('calculate for high age', () => {
    const age = 1000;
    const res= checkAge(age);
    return res === 'Invalid Input: Age too high';
});

test('calculate for negative age', () => {
    const age = -1;
    const res= checkAge(age);
    return res === 'Invalid Input: Enter non negative age';
});




