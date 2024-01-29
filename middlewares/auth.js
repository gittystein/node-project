import jwt from "jsonwebtoken"; // עאימות זהות

//אימות משתמש
export const authUser = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).send("missing token please sign in first");
    try {
        req.tryUser = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        res.status(401).send("this token is not authorized")
    }
}


//אימות מנהל
export const authDirector = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).send("missing token please sign in first");
    try {
        let user = jwt.verify(token, process.env.JWT_SECRET);
        if (user.role == "MANAGER") {
            req.tryUser = user;
            next();
        }
        else
            return res.status(403).send("u cant do this act because u are not a manager");
    }
    catch (err) {
        res.status(401).send("this token is not authorized")
    }
}
