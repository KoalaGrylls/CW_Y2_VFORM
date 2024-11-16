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
    const date = document.getElementById("date").value;
    const country = document.getElementById("countryDropdown").value;

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

        // Save the data to the backend
        fetch("/save_form_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to save data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                alert("Form submitted successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred while submitting the form.");
            });
    } else {
        alert("Please fix the errors in the form.");
    }
}

function checkAge(age) {
    if (age <= 0) return "Invalid Input: Enter non-negative age";
    if (age > 120) return "Invalid Input: Age too high";
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

function checkDOB(date) {
    const today = new Date();
    const dob = new Date(date);
    if (dob >= today) return "Invalid Input: Date of birth cannot be today or in the future";
    if (dob.getFullYear() < 1900) return "Invalid Input: Date of birth cannot be before 1900";
    return "Pass";
}

function nonEmptyCountry(country) {
    if (!country) return "Invalid Input: Please select a country";
    return "Pass";
}
