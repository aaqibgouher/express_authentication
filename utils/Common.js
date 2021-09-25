
const generate_token = () => {
    return Math.random().toString(36).substring(2, 20);
}

const generate_otp = () => {
    return Math.random().toString(36).substring(2, 8);
}

module.exports = {
    generate_token, 
    generate_otp
};