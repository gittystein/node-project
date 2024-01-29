import { User } from "../models/User.js";
import bcyript from "bcryptjs"
import { generateToken } from "../config/jwt.js";

export const addUser = async (req, res) => {
    try {
        let { name, email, password, role } = req.body; //משתנים המאותחלים למה שהתקבל מהמשתמש
        if (!name || !email || !password)
            return res.status(404).send("אחד הפרמטרים חסר, שם מייל או סיסמה")

        let hashPassword = await bcyript.hash(password, 15); //הצפנת הסיסמה עי פונקציית הש

        let newUser = new User({ name, password: hashPassword, email, role });  // יצירת משתמש חדש עם הסיסמה המוצפנת
        await newUser.save(); //המתנה עד לשמירת המשתמש

        let { _id, name: u, email: e, role: r } = newUser;//שליפת הנתונים של המשתמש החדש

        let token = generateToken(newUser);//שליפת הסיסמה המוצפנת

        res.json({ _id, name: u, token, email: e });//החזרת הנתונים למשתמש

    }
    catch (err) {
        res.status(500).send("נוצרה שגיאה" + err)
    }
}

export const enterUser = async (req, res) => {
    try {
        let { name, password } = req.body;

        if (!name || !password)
            return res.status(400).send("חסר שם או סיסמה")

        let loggedInUser = await User.findOne({ name });
        if (!loggedInUser)
            return res.status(404).send("לא קיים משתמש עם פרטים אלו")

        let { name: n, _id, email, role } = loggedInUser;

        let token = generateToken(loggedInUser);

        res.json({ _id, role, name: n, token, email })

    }
    catch (err) {
        res.status(500).send("התרחשה שגיאה")
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find({}, "-password")//יחזיר בלי שדה סיסמה
        res.json(allUsers);
    }
    
    catch (err) {
        res.status(500).send("התרחשה תקלה");
    }
}

