document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");
    if (!form) {
        console.error("Form not found in the DOM.");
        return;
    }

    
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission
        validateForm(); // Calls my validateForm function
    });

    const countryDropdown = document.getElementById("countryDropdown");
    if (!countryDropdown) {
        console.error("Country dropdown not found in the DOM.");
        return;
    }

    // Populate the country dropdown using the REST Countries API
    fetch("https://restcountries.com/v2/all")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((country) => {
                const option = document.createElement("option");
                option.value = country.name;
                option.text = country.name;
                countryDropdown.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching countries:", error));
});

function validateForm() {
    // Get the input elements and their values
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const check = document.getElementById("check").checked;
    // const date = document.getElementById("dob-year" + "dob-month" + "dob-day").value;
    const country = document.getElementById("countryDropdown").value;
    const day = document.getElementById("dob-day").value;
    const month = document.getElementById("dob-month").value;
    const year = document.getElementById("dob-year").value;
    const date = year + month + day;
    console.log(month);
    console.log(date);
    
    // Display error messages for invalid inputs
    document.getElementById("age_message").textContent = checkAge(age);
    document.getElementById("name_message").textContent = checkName(name);
    document.getElementById("surname_message").textContent = checkName(surname);
    document.getElementById("email_message").textContent = checkEmail(email);
    document.getElementById("checkB_message").textContent = checkBox(check);
    document.getElementById("dob_message").textContent = checkDOB(date);

    // If all validations pass, send data to be saved
    if (
        !checkAge(age) === "Pass" &&
        !checkName(name) === "Pass"  &&
        !checkName(surname) === "Pass" &&
        !checkEmail(email) === "Pass" &&
        !checkBox(check) === "Pass" &&
        !checkDOB(date) === "Pass" &&
        !nonEmptyCountry(country) === "Pass" 
    ) {
        const formData = {
            name: name,
            surname: surname,
            email: email,
            age: age,
            date: date,
            country: country,
        };
        saveData(formData);
    }
}

function checkAge(age) {
    if (age <= 0) return "Invalid Input: Enter non-negative age";
    if (age > 120) return "Invalid Input: Age too high";
    if (/\D/.test(age)) return "Invalid Input: Age cannot contain letters";
    return "Pass";
}

function checkName(name) {
    if (!name) return "Invalid Input: Enter a name";
    if (name.length > 30) return "Invalid Input: Name too long";
    if (name.length < 2) return "Invalid Input: Name too short";
    if (/\d/.test(name)) return "Invalid Input: Name cannot contain numbers";
    return "Pass";
}

function checkEmail(email) {
    if (!email) return "Invalid Input: Email is empty";
    if (!email.includes("@")) return "Invalid Input: Email has no @ symbol";
    if (!email.includes(".")) return "Invalid Input: Email has no .";
    return "Pass";
}

function checkBox(checked) {
    if (!checked) return "You must agree to the terms and conditions";
    return "Pass";
}

function checkDOB(year, month, day) {
    
    if(( month === 0o2 && day > 29) || 
    (month === 0o2 && day > 28) || 
    (['04', '06', '09', '11'].includes(month) && day > 30) || 
    (['01', '03', '05', '07', '08', '10', '12'].includes(month) && day > 31)) 
    return "Invalid Input: Invalid date of birth";
    
    const date = year + month + day;
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0].replace(/-/g, '');
    console.log(formattedToday);
    console.log(today.getFullYear());
    if (date >= formattedToday) return "Invalid Input: Date of birth cannot be today or in the future";
    if (date < 19000101) return "Invalid Input: Date of birth cannot be before 1900";

    return "Pass";
}

function nonEmptyCountry(country) {
    if (!country) return "Invalid Input: Please select a country";
    return "Pass";
}
