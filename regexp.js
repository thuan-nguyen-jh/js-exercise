function checkEmail(email) {
    // https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
    const pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return pattern.test(email);
}

function checkPassword(password) {
    // https://owasp.org/www-community/password-special-characters  " !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/;
    return pattern.test(password);
}

console.log(checkEmail('abc@gmail.com'));
console.log(checkPassword('Abc1213>'));