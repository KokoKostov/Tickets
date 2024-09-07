const { verifyToken } = require('../helpers/helpers');

const authenticateToken = async (req, res, next) => {
    

    const authHeader = req.headers['authorization'];
    
    
    const token = authHeader && authHeader.split(' ')[1];
   console.log(token);
   
    
    if (!token) return res.sendStatus(401);
    try {
        
        const payload = await verifyToken(token);
        if (!payload) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.user = payload.data;  
        next(); 
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = authenticateToken;
