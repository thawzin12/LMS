const express = require('express');
const router = express.Router();
const check = require('../utilities/custommiddleware');
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});
module.exports = router;

