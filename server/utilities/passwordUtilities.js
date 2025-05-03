const bcrypt = require("bcrypt")

const hashedPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword;
}

const comparePassword = async (password,hashedPassword) =>{
    const passwordmatch = await bcrypt.compare( password,hashedPassword )
    return passwordmatch;
}

module.exports = {
    hashedPassword,
    comparePassword
}