export const VALIDATION_RULES = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    aadhaar: /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/,
    phone: /^[6-9]\d{9}$/,
};

export const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
};

export const formatAadhaar = (value: string) => value.replace(/\s/g, '').slice(0, 12).replace(/(\d{4})/g, '$1 ').trim();