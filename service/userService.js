import bcrypt from "bcrypt";
import User from "../model/User.js";
import "dotenv/config";

const registerUser = async (userData) => {
    try {
        const oldUser = await User.findOne({
            $or: [{ username: userData.username }, { email: userData.email }],
        });

        if (oldUser) {
            if (userData.username === oldUser.username) {
                return { error: "Username already exists !" };
            } else {
                return { error: "Email already exists !" };
            }
        }

        const salt = await bcrypt.genSalt(1);
        const password_hashed = await bcrypt.hash(userData.password, salt);

        const user = new User({
            username: userData.username,
            email: userData.email,
            password: password_hashed,
        });
        const newUser = await user.save();
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};

const loginUser = async (userData) => {
    try {
        const checkLogin = await User.findOne({ username: userData.username });
        if (!checkLogin) return { error: "Username not exists !" };

        const checkLogin_password = await bcrypt.compare(
            userData.password,
            checkLogin.password
        );
        if (!checkLogin_password) return { error: "Wrong password !" };

        if (checkLogin && checkLogin_password) {
            const { password, ...restUser } = checkLogin._doc;
            return { ...restUser };
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const userService = {
    registerUser,
    loginUser,
};
