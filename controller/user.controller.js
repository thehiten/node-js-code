import createTokenAndSaveCookie from "../jwt/token.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'


export const signUp = async (req, res) => {
    const { name, email, password, confirmPassword , role} = req.body;
    try {
        if (password != confirmPassword) {
            return res.status(400).json({
                message: "password does not match"
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "user already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
            role
        });

        await newUser.save();

        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res); // ✅ Fixed this line
            return res.status(201).json({
                message: "user successfully register"
            });
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" }); // ✅ Fixed error response
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(
                { message: "user does not exists" }
            )
        }
       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(
                {
                    message: "password does not match"
                }
            )
        }

         createTokenAndSaveCookie(user._id, res);

        return res.status(201).json(
            {
                message: "user login successfully"
            }
        )


    }

    catch (error) {
        res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }


};

export const logout = async(req, res)=>{
    res.clearCookie("jwt")
    try{
         res.status(200).json({message: "user logout succesfully"})

    }
    catch(error)
    {
        res.status(500).json({
            message: "user logout succesful"
        })

    }
};

