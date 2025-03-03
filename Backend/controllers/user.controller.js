const User = require('../models/user.models');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.find().select('name username email phoneNumber role');
        return res.status(200).json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users
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

// get user by id
exports.getUserbyId = async(req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        return res.status(200).json({
            status: 'success',
            message: `User found successfully`,
            data: user
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

// update user
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check apakah user ada
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.body.username) updates.username = req.body.username;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.phoneNumber) updates.phoneNumber = req.body.phoneNumber;
        if (req.body.role) updates.role = req.body.role;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        return res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
// delete user
exports.deleteUser = async(req, res) => {
    try{
        const userId = req.params.id;

        // check if user exist
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        await user.remove();

        return res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
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