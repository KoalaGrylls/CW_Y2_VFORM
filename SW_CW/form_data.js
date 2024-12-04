document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");
    if (!form) {
        console.error("Form not found in the DOM.");
        return;
    }

    
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission
        validateForm(); // Calls my validateForm function
        if (validateForm() === true) {
            window.location.href = "veri.html";
        }
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
            data.forEach((country) => { // loops through all the countries and appends them to the dropdown
                const option = document.createElement("option");
                option.value = country.name;
                option.text = country.name;
                countryDropdown.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching countries:", error));
});

function validateForm() {
    canSubmit = false;
    // Get the input elements and their values
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const check = document.getElementById("check").checked;
    const country = document.getElementById("countryDropdown").value;
    const day = document.getElementById("dob-day").value;
    const month = document.getElementById("dob-month").value;
    const year = document.getElementById("dob-year").value;

    
    // Display error messages for invalid inputs
    document.getElementById("age_message").textContent = checkAge(age);
    document.getElementById("name_message").textContent = checkName(name);
    document.getElementById("surname_message").textContent = checkName(surname);
    document.getElementById("email_message").textContent = checkEmail(email);
    document.getElementById("checkB_message").textContent = checkBox(check);
    document.getElementById("dob_message").textContent = checkDOB(year, month, day);
    // document.getElementById("dob_message").textContent = ageDOBCheck(age, year, month, day); // need to give this a differnt message
    document.getElementById("country_message").textContent = nonEmptyCountry(country);

    // If all validations pass, send data to be saved and send user to splash page
    try {
        (
            checkAge(age) === "Pass" &&
            checkName(name) === "Pass"  &&
            checkName(surname) === "Pass" &&
            checkEmail(email) === "Pass" &&
            checkBox(check) === "Pass" &&
            checkDOB(year,month,day) === "Pass" 
        ) ? canSubmit = true : canSubmit = false;
    } catch (error) {
        console.error("Error validating form:", error);
    }
    return canSubmit;
    
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
    if (/\W/.test(name)) return "Invalid Input: Name cannot contain special characters";
    if (name.includes(" ")) return "Invalid Input: Name cannot contain spaces";
    return "Pass";
}

function checkEmail(email) { // checks if the email is validm uses a regex and checks the length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length > 256) return "Invalid Input: Email too long";
    if (!email) return "Invalid Input: Email is empty";
    if (!emailRegex.test(email)) return "Invalid Input: Email format is incorrect";
    return "Pass";
}

function checkBox(checked) { // simple check to see if the checkbox is checked
    if (!checked) return "You must agree to the terms and conditions";
    return "Pass";
}

function checkDOB(year, month, day) {
    // Convert inputs to integers for validation
    year = parseInt(year, 10);
    month = parseInt(month, 10);
    day = parseInt(day, 10);

    // Validate year, month, and day ranges
    if (!year || !month || !day) {
        return "Invalid Input: Year, month, and day must be provided";
    }
    if (year.toString().length !== 4 || year < 1900) {
        return "Invalid Input: Year must be a 4-digit number and not before 1900";
    }
    if (month < 1 || month > 12) {
        return "Invalid Input: Month must be between 1 and 12";
    }
    if (day < 1 || day > 31) {
        return "Invalid Input: Day must be between 1 and 31";
    }

    console.log(year, month, day);

    // Validate February dates for leap years
    if (month === 2) {
        // console.log("Checking February leap year");
        const isLeap = checkLeapYear(year);
        console.log(`Day: ${day}, Is Leap: ${isLeap}, Year: ${year}`);
    
        if (day > 29) {
            // console.log("Day exceeds 29 for February");
            return "Not a leap year, February can't have more than 29 days";
        }
    
        if (day === 29 && !isLeap) {
            console.log("29th February on a non-leap year");
            return "Not a leap year, February can't have 29 days";
        }
    }

    // Validate day for months with 30 days
    if (!isValidDate(day, month)) {
        return "Invalid Input: Invalid date";
    }

    // Validate the date using Date object
    const inputDate = new Date(year, month - 1, day); 
    if (
        inputDate.getFullYear() !== year ||
        inputDate.getMonth() + 1 !== month ||
        inputDate.getDate() !== day
    ) {
        return "Invalid Input: Invalid date";
    }

    // Validate against today's date
    const today = new Date();
    if (inputDate >= today) {
        return "Invalid Input: Date of birth cannot be today or in the future";
    }

    console.log("Validation passed");
    return "Pas";
}

function checkLeapYear(year) {
    // Returns true if the year is a leap year
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function isValidDate(day, month) {// Each number has a key value pair to check if the day is valid for the month.
    const daysInMonth = {
        1: 31, 2: 29, 3: 31, 4: 30,
        5: 31, 6: 30, 7: 31, 8: 31,
        9: 30, 10: 31, 11: 30, 12: 31
    };
    if (!daysInMonth[month] || day > daysInMonth[month]) {
        return false;
    }
    return true;
}

function nonEmptyCountry(country) {// Basic check to see if the country is empty.
    if (!country) return "Invalid Input: Please select a country";
    return "Pass";
}

function ageDOBCheck(age, year, month, day) {// This is to check if DoB matches age.
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    // console.log(birthDate);
    // console.log(today);
    const ageDiff = today.getFullYear() - birthDate.getFullYear();
    // console.log(ageDiff);
    if (ageDiff != age) return "Invalid Input: Age does not match date of birth";
    return "Pass";
}

function runAnotherFile(filePath) {// This is to get the form_test.js file and run my unit tests.
    const script = document.createElement("script");
    script.src = filePath;
    script.type = "text/javascript";
    script.onload = () => console.log(`${filePath} loaded successfully.`);
    script.onerror = () => console.error(`Error loading ${filePath}.`);
    document.head.appendChild(script);
}

runAnotherFile("form_test.js");