
const validate = (name, email, password, confirmPassword) => {

    const error = {};

    if (password.length < 6) {
        error.message = "Password should be atleast 6 characters";
    };

    if (password !== confirmPassword) {
        error.message = "Passwords should match!";
    };

    if (!validateEmail(email)) {
        error.message = "Please enter valid email!";
    };

    if (!name || !email || !password) {
        error.message = "All fields are required"
    };

    return error;
    
};

export default validate;

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}