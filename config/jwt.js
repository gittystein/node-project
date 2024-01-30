import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    let token = jwt.sign(
        { _id: user._id, userName: user.name, roles: user.role },
        process.env.JWT_SECRET ,
        {
            expiresIn: "104m"
        }
    )

    return token;

}

