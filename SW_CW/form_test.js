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
        return res === 'Invalid Input: Enter non negative age';
    });


    // Tests for checkName function
    test('Check that name does not have numbers', () => {
        const name = "123";
        const res = checkName(name);
        return res === 'Invalid Input: Enter a name';
    });
    
    test('Check that name is not empty', () => {
        const name = "";
        const res = checkName(name);
        return res === 'Invalid Input: Enter a name';
    });
    
    test('Check that name is not too long', () => {
        const name = "abcdefghijklmnopqrstuvwxyzabcde"; // 31 characters to test the limit
        const res = checkName(name);
        return res === 'Invalid Input: Name too long';
    });

    test('Check that name is not too short', () => {
        const name = "a"; // 1 character to test the limit
        const res = checkName(name);
        return res === 'Invalid Input: Name too short';
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

    // Tests for DOB function
    test('Check that DOB is not empty', () => {
        const year = " ";
        const month = " ";
        const day = " ";
        const res = checkDOB(year, month, day);
        return res === 'Invalid Input: Date of Birth is empty';
    });

    test('Check that Day is valid', () => {
        const year = "2020";
        const month = "02";
        const day = "30";
        const res = checkDOB(year, month, day);
        return res === 'Invalid Input: Invalid date of birth';
    });
        