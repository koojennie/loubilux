const testController = async (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'hello this is message from TestController '
    })
}

module.exports = {testController};