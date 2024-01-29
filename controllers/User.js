import { User } from "../models/User.js";
import bcyript from "bcryptjs"
import { generateToken } from "../config/jwt.js";

export const addUser = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;
        if (!name || !email || !password)
            return res.status(404).send("somssing faild email or password");

        let hashPassword = await bcyript.hash(password, 15); 

        let newUser = new User({ name, password: hashPassword, email, role });  
        await newUser.save(); 

        let { _id, name: u, email: e, role: r } = newUser;

        let token = generateToken(newUser);

        res.json({ _id, name: u, token, email: e });

    }
    catch (err) {
        res.status(500).send("somsing is wrong " + err)
    }
}

export const enterUser = async (req, res) => {
    try {
        let { name, password } = req.body;

        if (!name || !password)
            return res.status(400).send("name or password faild");

        let loggedInUser = await User.findOne({ name });
        if (!loggedInUser)
            return res.status(404).send("not found this user")

        let { name: n, _id, email, role } = loggedInUser;

        let token = generateToken(loggedInUser);

        res.json({ _id, role, name: n, token, email })

    }
    catch (err) {
        res.status(500).send("somsing is wrong")
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find({}, "-password")
        res.json(allUsers);
    }

    catch (err) {
        res.status(500).send("somssing is wrong");
    }
}

