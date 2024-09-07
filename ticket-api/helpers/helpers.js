const jose = require('jose');



const JWT_SECRET_KEY = 'Drujba1';
const jwtSecret = new TextEncoder().encode(JWT_SECRET_KEY);

const verifyToken = async (token) => {
    try {
        console.log('VERIFY TOKEN',token);
        
        const { payload } = await jose.jwtVerify(token, jwtSecret);
        console.log(payload);
        
        return payload;
    } catch (err) {
        console.error('Token verification failed:', err);
        return false;
    }
};

const generateAccessToken = async (data) => {
    console.log(`GAT ${data}`);
    
    return await new jose.SignJWT({ data })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('15m')
        .sign(jwtSecret);
};

const generateRefreshToken = async (data) => {
    return await new jose.SignJWT({ data })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('30d')
        .sign(jwtSecret);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
