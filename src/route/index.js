const express = require("express");
const router = express.Router();
router.use('/spending', require('./spending'))
router.use('/budget', require('./budget'))
module.exports = router;