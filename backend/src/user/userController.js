var userModel = require('./userModel');

var createUserControllerFn = async (req, res) => {
    try {
        const body = req.body
        const userModelData = new userModel()
        userModelData.firstname = body.firstname
        userModelData.lastname = body.lastname
        userModelData.email = body.email
        userModelData.mobile = body.mobile
        userModelData.gender = body.gender
        userModelData.pwd = body.pwd
        await userModelData.save()

        res.status(200).send({
            "status": true, "message": "User created successfully"
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createUserControllerFn
};