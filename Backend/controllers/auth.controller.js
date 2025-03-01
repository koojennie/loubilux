const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register user
exports.register = async(req, res) => {
    try{
        const {name, username, password, email, phoneNumber, role, confirmPassword} = req.body;

        // check if fields are empty
        if(!name || !username || !password || !email || !role || !confirmPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Name, Username, password, email and role fields are required'
            });
        }

        // check password length
        if(username.length < 6 || username.length > 30) {
            return res.status(400).json({
                status: 'error',
                message: 'Username must be between 6 to 30 characters'
            });
        }

        // check length password
        if(password.length<=8){
            return res.status(400).json({
                status: 'error',
                message: 'Password must be at least 8 characters'
            });
        }

        const upperCase = /[A-Z]/.test(password);
        const lowerCase = /[a-z]/.test(password);
        const number = /[0-9]/.test(password);
        const specialChar = /[\W_]/.test(password);

        if (!upperCase || !lowerCase || !number || !specialChar) {
            return res.status(400).json({
                status: 'error',
                message: "Password must contain at least uppercase letter, lowercase letter, number, and special character",
            });
        }

        // valid confirm
        if(password !== confirmPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Password does not match'
            });
        }


        // check existing user
        const userExist = await User.findOne({username: username, email: email});
        
        if(userExist) {
            return res.status(400).json({
                message: 'User already exist username and email must be unique'
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // insert into database
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
            email: email,
            phoneNumber: phoneNumber,
            role: role
        });
        await newUser.save();

        return res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: newUser
        })

    } catch(error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error message ',
            error: error.message
        });
    }
}

// login user
exports.login = async(req, res) => {
    try{
        const {username, password} = req.body;

        // check if user exist
        const user = await User.findOne({username: username});
        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials Password'
            });
        }

        // generate token
        const token= jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
        await res.cookie("jwt-loubilux", token, {
			httpOnly: true,
			maxAge: 3 * 24 * 60 * 60 * 1000,
			sameSite: "strict",
            
		});

        return res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            role: user.role,
            token: token
        })

    } catch(error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error message ',
            error: error.message
        });
    }
}

// logout user
exports.logout = (req, res) =>{
    res.clearCookie("jwt-loubilux");
    res.status(200).json({
        message: "Logout successfully",
    });
}


