const bcrypt = require('bcryptjs');
const User = require('../model/user');
const ErrorHandler = require('../midlewere/errorhandler');
const { StatusCodes } = require('http-status-codes');

exports.SingupData = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(StatusCodes.CREATED).json({
            message: 'User created successfully',
            user: newUser
        });

    } catch (error) {
        console.error(error); // For debugging
        next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
};



exports.findUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }


        const { password, ...userData } = user.toObject();
        return res.status(StatusCodes.OK).json(userData);
    } catch (error) {
        next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
};