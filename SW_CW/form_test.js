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
    // Tests for checkAge function
    test('calculate for high age', () => {
        const age = "1000";
        const res = checkAge(age);
        return res === 'Invalid Input: Age too high';
    });
    
    test('calculate for negative age', () => {
        const age = "-1";
        const res = checkAge(age);
        return res === 'Invalid Input: Enter non-negative age';
    });
    test('Test for age with letters', () => {
        const age = "e";
        const res = checkAge(age);
        return res === 'Invalid Input: Age cannot contain letters';
    });

    // Tests for checkName function
    test('Check that name does not have numbers', () => {
        const name = "123";
        const res = checkName(name);
        return res === 'Invalid Input: Name cannot contain numbers';
    });
    
    test('Check that name is not empty', () => {
        const name = "";
        const res = checkName(name);
        return res === 'Invalid Input: Enter a name';
    });
    
    test('Check that name is not too long', () => {
        const name = "a".repeat(31); // 31 characters to test the limit
        const res = checkName(name);
        return res === 'Invalid Input: Name too long';
    });

    test('Check that name is not too short', () => {
        const name = "a"; // 1 character to test the limit
        const res = checkName(name);
        return res === 'Invalid Input: Name too short';
    });

    test('Check that name does not have special characters', () => {
        const name = "a@";
        const res = checkName(name);
        return res === 'Invalid Input: Name cannot contain special characters';
    });

    // Tests for checkEmail function
    test('Check that email is not too long', () => {
        const email = "a".repeat(247) + "@gmail.com"; // 257 characters to test the limit
        const res = checkEmail(email);
        return res === 'Invalid Input: Email too long';
    });

    test('Check that email is not empty', () => {
        const email = "";
        const res = checkEmail(email);
        return res === 'Invalid Input: Email is empty';
    });

    test('Check that email is with no .com', () => {    
        const email = "test@test";
        const res = checkEmail(email);
        return res === 'Invalid Input: Email format is incorrect';
    });

    test('Check that email is with no @', () => {
        const email = "testtest.com";
        const res = checkEmail(email);
        return res === 'Invalid Input: Email format is incorrect';
    });

    test('Check that email is with spaces', () => {
        const email = "test @test.com";
        const res = checkEmail(email);
        return res === 'Invalid Input: Email format is incorrect';
    });

    //Tests for DOB function
    test('Check that DOB is not empty', () => {
        const year = NaN;
        const month = NaN;
        const day = NaN;
        const res = checkDOB(year, month, day);
        return res === "Invalid Input: Year, month, and day must be provided";
    });

    test('Check that leap year is valid', () => {
        const year = "2023";
        const month = "02";
        const day = "29";
        const res = checkDOB(year, month, day);
        return res;
    });

    test('Check that Month is valid', () => {
        const year = "2023";
        const month = "22";
        const day = "29";
        const res = checkDOB(year, month, day);
        return res === "Invalid Input: Month must be between 1 and 12";
    });

    test('Check that Year is valid', () => {
        const year = "202";
        const month = "04";
        const day = "23";
        const res = checkDOB(year, month, day);
        return res === "Invalid Input: Year must be a 4-digit number and not before 1900";
    });

    test('Check that Day is valid', () => {
        const year = "2023";
        const month = "04";
        const day = "32";
        const res = checkDOB(year, month, day);
        return res === "Invalid Input: Day must be between 1 and 31";
    });

    test('Check that day cant be negative', () => {
        const year = "2023";
        const month = "04";
        const day = "-1";
        const res = checkDOB(year, month, day);
        return res === "Invalid Input: Day must be between 1 and 31";
    });

    // Tests for checkLeapYear function
    test('Check that leap year is valid', () => {
        const year = 2020;
        const res = checkLeapYear(year);
        return res === true;
    });

    test('Check that leap year is invalid', () => {
        const year = "2023";
        const res = checkLeapYear(year);
        return res === false;
    });

    test('Check that leap year is invalid', () => {
        const year = "-2021";
        const res = checkLeapYear(year);
        return res === false;
    });
   
    // Tests for isValidDate function
    test('Check that date is valid', () => {
        const month = "4";
        const day = "28";
        const res = isValidDate(day, month);
        return res === true;
    });
    test('Check that date is invalid', () => {
        const month = "4";
        const day = "31";
        const res = isValidDate(day, month);
        return res === false;
    });

    // Tests for ageDOBcheck function
    test('Check that age is valid', () => {
        const year = "2000";
        const month = "04";
        const day = "28";
        const age = "21";
        const res = ageDOBCheck(age, year, month, day);
        return res;
    });

    test('Check that age is invalid', () => {
        const year = "2000";
        const month = "04";
        const day = "28";
        const age = "20";
        const res = ageDOBCheck(year, month, day, age);
        return res === "Invalid Input: Age does not match date of birth";
    });

    // Test for nonEmptyCountry function
    test('Check for when country is empty', () => {
        const country = "";
        const res = nonEmptyCountry(country);
        return res === "Invalid Input: Please select a country";
    });

    test('Check for when country is not empty', () => {
        const country = "United Kingdom";
        const res = nonEmptyCountry(country);
        return res === "";
    });

    // Tests for checkBox function
    test('Check that checkbox is checked', () => {
        const checked = false;
        const res = checkBox(checked);
        return res === "You must agree to the terms and conditions";
    });

    // Tests for checkTitle function
    test('Check that title is empty', () => {
        const title = "";
        const res = checkTitle(title);
        return res === "Invalid Input: Please select a title";
    });
    test('Check that title is not empty', () => {
        const title = "Mr";
        const res = checkTitle(title);
        return res === "";
    });