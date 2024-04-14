import RefreshToken from "../model/RefreshToken.js";
import jwt from "jsonwebtoken";
import { userService } from "../service/userService.js";

const generateAccessToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "30s",
    });
    return accessToken;
};

const generateRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "1d",
    });
    return refreshToken;
};

const registerUser = async (req, res, next) => {
    try {
        const newUser = await userService.registerUser(req.body);
        if (newUser.error) return res.status(400).json(newUser);
        return res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const user = await userService.loginUser(req.body);
        if (user.error) return res.status(401).json(user);

        const accessToken = generateAccessToken({
            _id: user._id,
            role: user.role,
        });
        const refreshToken = generateRefreshToken({
            _id: user._id,
            role: user.role,
        });

        // Lưu trữ refresh token vào cookie của client
        res.cookie("refreshToken", refreshToken, {
            // domain:          => máy chủ nào có thể nhận cookie
            // path: /auth      => axios('http://localhost:3000/auth') không gửi lên được
            // sameSite:        => server API phải trùng với server ui, muốn khác thì cấu hình CROS (Cross-Origin Resource Sharing)
            // secure:          => chỉ gửi yêu được mã hóa https
            // httpOnly         => chỉ có trên các phiên của máy chủ, không có sẵn trong javascript
            path: "/",
            secure: false,
            httpOnly: true,
            sameSite: "strict",
        });

        // Lưu trữ refresh token vào cơ sở dữ liệu để xác minh khi cần refresh token
        const refreshToken_db = new RefreshToken({
            token: refreshToken,
        });
        await refreshToken_db.save();

        return res.status(200).json({ ...user, accessToken });
    } catch (error) {
        next(error);
    }
};

export const userController = {
    registerUser,
    loginUser,
};
