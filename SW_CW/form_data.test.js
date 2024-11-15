const form_data = ('./form_data.js');

describe('validateForm', () => {
    // test('should return true if the form is valid', () => {
    //     // Arrange
    //     const form = document.createElement('form');
    //     const input = document.createElement('input');
    //     input.name = 'name';
    //     input.value = 'John Doe';
    //     form.appendChild(input);

    //     // Act
    //     const result = form_data.validateForm(form);

    //     // Assert
    //     expect(result).toBe(true);
    // });

    // test('should return false if the form is invalid', () => {
    //     // Arrange
    //     const form = document.createElement('form');
    //     const input = document.createElement('input');
    //     input.name = 'name';
    //     form.appendChild(input);

    //     // Act
    //     const result = form_data.validateForm(form);

    //     // Assert
    //     expect(result).toBe(false);
    // });



    test('calculate for high age', () => {
        const age = 1000;
        const res = form_data.checkAge(age);
        // Assert
        expect(res).toBe(false);
        return res === 'Invalid Input: Age too high';
    });
    
    test('calculate for negative age', () => {
        const age = -1;
        const res = checkAge(age);
        return res === 'Invalid Input: Enter non negative age';
    });
    
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
    

});