const { Op } = require('sequelize');
const Address = require('../models/address.model');

const createAddressUser = async (req, res) => {
    try {
        const { userId, receiverName, phoneNumber, province, city, postalCode, detail } = req.body;

        if (!userId || !receiverName) {
            return res.status(400).json({
                status: "error",
                message: "userId and receiverName are required fields",
            });
        }


        const lastAddress = await Address.findOne({
            order: [['createdAt', 'DESC']],
        });

        const lastIdNumber = lastAddress ? parseInt(lastAddress.addressId.split('-')[1]) : 0;
        const newIdNumber = lastIdNumber + 1;
        const addressId = `ADDR-${newIdNumber.toString().padStart(6, '0')}`;


        const address = await Address.create({
            addressId,
            userId,
            receiverName,
            phoneNumber,
            province,
            city,
            postalCode,
            detail
        });

        return res.status(201).json({
            status: 'Success',
            message: 'Address Created Successfully',
            data: address
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}

const getAllAddressbyUser = async (req, res) => {
    const { user } = req;

    try {
        const addresses = await Address.findAll({
            where: { userId: user.id }
        });

        res.json({
            status: "Success",
            message: `Addresses for user ${user.id} retrieved successfully`,
            data: addresses,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
}

module.exports = { createAddressUser, getAllAddressbyUser }