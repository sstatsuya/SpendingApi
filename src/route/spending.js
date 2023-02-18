const express = require("express"); 
const { error } = require("../common/errorHandler");
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

router.post("/add", async (req, res) => {    
    const newSpending = new Spending({
        date: req.body.date,
        name: req.body.name,
        value: req.body.value
    })
    try{
        await newSpending.save()
        res.json(newSpending)
    }
    catch(err){
        error(res, err)
    }
});

router.delete('/delete', async (req, res ) => {
    const {id} = req.body
    try{
        await Spending.deleteOne({_id: id})
        res.json({
            isError: false,
            msg: 'Remove successful'
        })
    }
    catch(err){
        error(res, err)
    }
})

module.exports = router
