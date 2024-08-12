const jwt = require('jsonwebtoken');


// Verify token and isAdmin:
function verifyTokenAndAdmin(req, res, next) {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken.split(' ')[1];
        try {
            const decodedPayload = jwt.verify(token, "wahbiDevCode");
            req.user = decodedPayload;
            if(req.user.isAdmin){
                next()
            }else{
                return res.status(401).json({  message: 'Not allowed, only Admin' });
            }
            
        } catch (error) {
            res.status(401).json({ message: 'Invalid token, access denied' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided, access denied' });
    }
}



// Verify token and isAdmin:
function verifyTokenAndOnlyUser(req, res, next) {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken.split(' ')[1];
        try {
            const decodedPayload = jwt.verify(token, "wahbiDevCode");
            req.user = decodedPayload;
            if(!req.user.isAdmin){
                next()
            }else{
                return res.status(401).json({  message: 'Not allowed, only user' });
            }
            
        } catch (error) {
            res.status(401).json({ message: 'Invalid token, access denied' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided, access denied' });
    }
}

// Verify Token:
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    
    if (authToken) {
        const token = authToken.split(' ')[1];
        try {
            const decodedPayload = jwt.verify(token, "wahbiDevCode");
            req.user = decodedPayload;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token, access denied' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided, access denied' });
    }
}





// Verify token and isAdmin or isTechnicien:
function verifyTokenAndAdminORTechnicien(req, res, next) {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken.split(' ')[1];
        try {
            const decodedPayload = jwt.verify(token, "wahbiDevCode");
            req.user = decodedPayload;
            if( (req.user.isAdmin) || (req.user.isTechnicien) ){
                next()
            }else{
                return res.status(401).json({  message: 'Not allowed, only Admin or Technicien' });
            }
            
        } catch (error) {
            res.status(401).json({ message: 'Invalid token, access denied' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided, access denied' });
    }
}







module.exports= {
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyToken,
    verifyTokenAndAdminORTechnicien
}