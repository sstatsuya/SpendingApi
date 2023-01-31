const express = require("express");
const router = express.Router();
router.use('/spending', require('./spending'))
module.exports = router;