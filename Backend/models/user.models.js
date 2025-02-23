const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type : string,
            required: true
        },
        username: {
            type: string,
            required: true
        },
        email: {
            type: string,
            required: true,
            unique: true
        }
    }
)