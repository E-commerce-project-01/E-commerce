const db = require("../database/index");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
JWT_SECRET = 'ascefbth,plnihcdxuwy';

const validatePassword = (password) => {
    const errors = [];
    const passwordChecking = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (password.length < 8) {
        errors.push('Password should be 8 characters or more.');
    }
    if (!passwordChecking.test(password)) {
        errors.push('Password must have uppercase, lowercase, and a symbol.');
    }
    return {
        isValid: errors.length === 0,
        errors: errors,
    };
};

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const signup = async (req, res) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            birthMonth,
            birthDay,
            birthYear
        } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).send('Missing required fields');
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                message: 'Password is too weak',
                errors: passwordValidation.errors
            });
        }

        const existingUser = await db.user.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const monthName = monthNames[parseInt(birthMonth) - 1] || null;

        const userData = {
            email,
            firstName,
            lastName,
            password: hashedPassword,
            month: monthName,  
            day: birthDay || null,
            year: birthYear || null,
            type: 'user', 
        };

        const user = await db.user.create(userData);

        return res.status(201).json(user);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.errors.map(err => err.message),
            });
        }
        console.error(error);
        res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user = await db.user.findOne({ where: { email } });//this is to find the user in the database with the email address the user used to login 

        if (!user) {//if the email address is not in our database, an error message will be shown indicaing that we do not have this user
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);//this to compare if the given password is the same as the hashed one in our database

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });//if the password is not the same, it displays an error 
        }

        const token = jwt.sign(//json web token to give a token to the user once they are logged in 
            { id: user.id, name: user.name, email: user.email , avatar: user.avatar},//the token will include these
            JWT_SECRET,
            { expiresIn: '5h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type,
                avatar: user.avatar 

            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const updateAvatar = async (req, res) => {
    try {
        const { avatar } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        const user = await db.user.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ avatar });

        res.status(200).json({ 
            message: 'Avatar updated successfully',
            avatar: avatar 
        });
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).json({ message: 'Error updating avatar' });
    }
};

module.exports = { signup, login, updateAvatar };
