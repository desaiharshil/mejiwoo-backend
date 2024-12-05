const User = require('../model/user');
const ErrorHandler = require('../midlewere/errorhandler');
const bcrypt = require('bcryptjs'); 
const { StatusCodes } = require('http-status-codes');

// Login Function
exports.Logindata = async (req, res, next) => {
    try {
        console.log("Login request body:", req.body);
        const { email, password } = req.body;

        
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }

       
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid password. Please try again.' });
        }

       
        return res.status(StatusCodes.OK).json({ message: 'Login successful', user: existingUser });
    } catch (error) {
        next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

// Register Function
exports.registerUser = async (req, res, next) => {
    try {
        console.log("Register request body:", req.body);
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword); 

        
        const newUser = new User({
            email,
            password: hashedPassword
        });

        
        await newUser.save();

        return res.status(StatusCodes.CREATED).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
};
