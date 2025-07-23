import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authentication = async (req, res, next) => {
    try {
        // Extract token
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(400).json({
                message: "Token not found",
            });
        }

        // Decode token and verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.userId);
        if (!user) {
            res.status(400).json(
                {
                    message: "user not found"
                }
            )

        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication middleware error:", error);
        return res.status(500).json({
            message: "Internal server error",

        });


    }
};

export default authentication;
