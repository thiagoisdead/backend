const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

function validatePassword(password) {
    if (!strongPasswordRegex.test(password)) {
        const invalidSpecialCharRegex = /[^A-Za-z\d!@#$%^&*]/;
        
        if (invalidSpecialCharRegex.test(password)) {
            return { valid: false, message: "A senha contém caracteres especiais não permitidos." };
        }
        return { valid: false, message: "A senha precisa ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais." };
    }
    return { valid: true };
}

module.exports = validatePassword;