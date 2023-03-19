const express = require("express"); 
const { error, success } = require("../common/errorHandler");
const router = express.Router()
const Spending = require('../model/Spending') // import file model ở trên vào
const Budget = require('../model/Budget') // import file model ở trên vào
router.get('/', (req, res)=>{
    res.send("dday la trang spending")
})
router.get("/all", (req, res) => {    
    Spending.find({})
            .then(data => res.json(data))
            .catch(err => res.status(500).json({error: 'Error when get Spending'}))
});

// Get spending by month
// {
//     "timestamp": 1678517300000
// }
router.post("/month", async (req, res) => {
    console.log('tien nhan timestamp ', req.body.timestamp)
    if (!req.body.timestamp) {
        return error(res, 'Timestamp is missing')
    }
    const spendings = await Spending.find({})
    const timestampReq = parseFloat(req.body.timestamp)
    const monthReq = new Date(timestampReq).getMonth() + 1
    const yearReq = new Date(timestampReq).getFullYear()
    // console.log(monthReq + "/" + yearReq)
    let flag = false
    let result = []
    spendings.forEach((item, index) => {
        let month = new Date(item.timestamp).getMonth() + 1
        let year = new Date(item.timestamp).getFullYear()
        // console.log(month + "/" + year)
        if (month === monthReq && year === yearReq) {
            result.push(item)
        }
    })  
    return res.json(result)
})

router.post("/add", async (req, res) => {    
    const newSpending = new Spending({
        timestamp: req.body.timestamp,
        name: req.body.name,
        value: req.body.value
    })
    try{
        await newSpending.save()
        const budgets = await Budget.find({})
        let reqMonth = new Date(newSpending.timestamp).getMonth() + 1;
        let reqYear = new Date(newSpending.timestamp).getFullYear();
        budgets.forEach(async (item, index) => {
            let itemMonth = new Date(item.timestamp).getMonth() + 1;
            let itemYear = new Date(item.timestamp).getFullYear();
            if(itemMonth === reqMonth && itemYear === reqYear){
                console.log('tien',item._id)
                await Budget.findByIdAndUpdate(item._id, {used: item.used + newSpending.value})
                return;
            }
        })
        res.json(newSpending)
    }
    catch(err){
        error(res, err)
    }
});

router.post("/delete", async (req, res) => {    
    const spending = await Spending.findById(req.body._id)
    if(!spending) error(res, 'This spending is not existed')
    else {
        try{
            const budgets = await Budget.find({})
            let reqMonth = new Date(spending.timestamp).getMonth() + 1;
            let reqYear = new Date(spending.timestamp).getFullYear();
            budgets.forEach(async (item, index) => {
                let itemMonth = new Date(item.timestamp).getMonth() + 1;
                let itemYear = new Date(item.timestamp).getFullYear();
                if(itemMonth === reqMonth && itemYear === reqYear){
                    await Budget.findByIdAndUpdate(item._id, {used: item.used - spending.value})
                    await Spending.deleteOne({_id: spending._id})
                    return;
                }
            })
            success(res, 'Remove successfull')
        }
        catch(err){
            error(res, err)
        }
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

router.patch('/update', async (req, res ) => {
    try{
        const {_id} = req.body
    const oldSpending = await Spending.findById(_id)
    if(!oldSpending) throw (res, 'This spending is not existed')
    const data = {
        name: req.body.name,
        value: req.body.money,
        timestamp: req.body.timestamp,
    }
    const oldSpendingMonth = new Date(oldSpending.timestamp).getMonth() + 1
    const oldSpendingYear = new Date(oldSpending.timestamp).getFullYear()
    const newSpendingMonth = new Date(data.timestamp).getMonth() + 1
    const newSpendingYear = new Date(data.timestamp).getFullYear()
    console.log(oldSpendingMonth + " - " + newSpendingMonth+ "-"+ data.timestamp)
    console.log(oldSpendingYear + " - " + newSpendingYear)
    if(oldSpendingMonth !== newSpendingMonth)throw(res, 'You cannot change month of spending')
    if(oldSpendingYear !== newSpendingYear)throw(res, 'You cannot change year of spending')
        await Spending.findByIdAndUpdate(_id, data, {new: true})
        res.json({
            isError: false,
            msg: 'Update successful'
        })
    }
    catch(err){
        error(res, err)
    }
})

module.exports = router
