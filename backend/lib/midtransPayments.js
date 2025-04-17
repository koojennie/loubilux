const midtransClient = require("midtrans-client");
const dotenv = require('dotenv');

dotenv.config();

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVERKEY_MIDTRANS
})

module.exports = snap;