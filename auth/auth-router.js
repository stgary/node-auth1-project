const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    const userInfo = req.body;
    const isValid = validateUser(userInfo);

    if(isValid) {
        const rounds = process.env.BCRYPT_ROUNDS || 4;
        const hash = bcryptjs.hashSync(userInfo.password, rounds);
        userInfo.password = hash;

        Users.add(userInfo) 
            .then(inserted => {
                res.status(201).json({ data: inserted });
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    } else {
        res.status(400).json({  
            message: 'Invalid information, please verify and try again' 
        });
    }
});

function validateUser(user) {
    return user.username && user.password && user.role ? true : false;
}

module.exports = router;