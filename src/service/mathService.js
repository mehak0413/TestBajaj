const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a, b) => {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
};

export const getFibonacci = (n) => {
    if (n < 0) return [];
    if (n === 0) return []; 
    
    if (n === 1) return [0];

    const result = [0];
    if (n > 1) result.push(1);
    
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
};

export const getPrimes = (arr) => {
    // Check if input is array
    if (!Array.isArray(arr)) return [];

    const isPrime = (num) => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    };
    
    return arr.filter(num => Number.isInteger(num) && isPrime(num));
};

export const getLcm = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return 0;
    // LCM of array
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = lcm(result, arr[i]);
    }
    return result;
};

export const getHcf = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return 0;
    // HCF of array (GCD)
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(result, arr[i]);
    }
    return result;
};
