import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'


const protect = async (req, res, next) => {
    
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
       
        
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            next();
        }
        catch (err) {
            res.status(401)
            throw new Error('Not Authorized , Token Failed')
            
        }

    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized , No Token')
      
    }
   


}

const isAdmin =  (req, res, next) => {
    if (req.user && req.user.isAdmin)
    {
        next()
    }
    else {
        res.status(401)
        throw new Error('not authorize as an admin')
    }
          
}

export { protect , isAdmin}


