import jwt from "jsonwebtoken";

export const genAccessToken = async (id) => {
    return await jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
};

export const genRefreshToken = async (id) => {
    return await jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10d" });
}