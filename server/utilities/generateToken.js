const jwt = require('jsonwebtoken');

const generateToken = (user, role = "user") => {
    try {
        const token = jwt.sign(
            {
                id: user.id,
                role: role,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Optional: add token expiry
        );
        return token;
    } catch (error) {
        console.log(error);
    }
};

module.exports = generateToken;