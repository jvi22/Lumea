const userModel = require('../models/user.model');

module.exports.createUser = async ({
    username, fullname, email, password
}) => {
    if (!username || !fullname || !email || !password) {
        throw new Error("All fields are required");
    }
    const user = userModel.create({
        username,
        fullname,
        email,
        password
    })
    return user;
}