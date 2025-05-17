function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (!password || password.length < 8) {
        return { valid: false, message: "A senha deve ter pelo menos 8 caracteres" };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "A senha deve conter uma letra maiúscula" };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: "A senha deve conter um número" };
    }
    return { valid: true };
}

function validateCaptchaToken(captchaToken) {
    return !!captchaToken;
}
function validateLoginData(email, password, captchaToken) {
    if (!email || !validateEmail(email)) {
        return { valid: false, message: 'E-mail inválido.' };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        return passwordValidation;
    }

    if (!validateCaptchaToken(captchaToken)) {
        return { valid: false, message: "Captcha não enviado." }
    }
    return { valid: true }
}

module.exports = {
    validateEmail,
    validatePassword,
    validateCaptchaToken,
    validateLoginData
};
