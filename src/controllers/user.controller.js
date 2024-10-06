const { User } = require('../models/user.models.js');

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating tokens");
    }
};

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if ([email, username, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (existedUser) return res.status(400).json({ error: 'User already exists' });

        const user = await User.create({
            email,
            password,
            username: username.toLowerCase()
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");
        if (!createdUser) {
            return res.status(500).json({ error: 'Something went wrong!!' });
        }

        return res.status(201).json({ user: createdUser });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong!!' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const user = await User.findOne({ $or: [{ username: email }, { email }] });
        if (!user) return res.status(400).json({ error: 'User not found!!' });

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password!!' });

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = { httpOnly: true };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ user: loggedInUser });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong!!' });
    }
};

const logout = async (req, res) => {
    try {
        const logout = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { refreshToken: undefined } },
            { new: true }
        );

        const options = { httpOnly: true, secure: false };

        if (!logout) return res.status(500).json({ error: 'Error logging out' });

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "User logged out" });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong!!' });
    }
};

module.exports = {
    register,
    login,
    logout
};
