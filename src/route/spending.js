const express = require("express"); 
const router = express.Router()
const Spending = require('../model/Spending') // import file model ở trên vào
router.get('/', (req, res)=>{
    res.send("dday la trang spending")
})
router.get("/all", (req, res) => {    
    Spending.find({})
            .then(data => res.json(data))
            .catch(err => res.status(500).json({error: 'Error when get Spending'}))
});
module.exports = router
