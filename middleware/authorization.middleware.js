import token from 'jsonwebtoken';
export const authorization = async (req, res, next)=>{
    if(req.user.role!="admin")
    {
        return res.status(400).json(
            {
                message: "unauthorized"
            }
        )
    }
    
    next();


}

export default authorization;

