const express = require("express");
const { error } = require("../common/errorHandler");
const router = express.Router()
const Budget = require('../model/Budget') // import file model ở trên vào
const { timeStampToText } = require("../common/helper");

router.get('/', (req, res) => {
    res.send("dday la trang budget")
})
router.get("/all", (req, res) => {
    Budget.find({})
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: 'Error when get Spending' }))
});

//Find by month
// {
//     timestamp: 1676729511000
// }
router.post("/month", async (req, res) => {
    if (!req.body.timestamp) {
        return error(res, 'Month is missing')
    }
    const budgets = await Budget.find({})
    const timestampReq = parseFloat(req.body.timestamp)
    const monthReq = new Date(timestampReq).getMonth() + 1
    const yearReq = new Date(timestampReq).getFullYear()
    let flag = false
    let result = null
    budgets.forEach((item, index) => {
        let month = new Date(item.timestamp).getMonth() + 1
        let year = new Date(item.timestamp).getFullYear()
        if (month === monthReq && year === yearReq) {
            result = item
            flag = !flag
            return
        }
    })
    if (flag) return res.json(result)
    return error(res, 'This time is not existed')
});

// Add new budget
// {
//     timestamp: 
//     budget:
//     used:
// }
router.post('/add', async (req, res) => {
    const budgets = await Budget.find({})
    // console.log(req.body.timestamp)
    const timestampReq = parseFloat(req.body.timestamp)
    const monthReq = new Date(timestampReq).getMonth() + 1
    let existed = false
    budgets.forEach((item, index) => {
        let month = new Date(item.timestamp).getMonth() + 1
        if (month === monthReq) {
            existed = true
            return
        }
    })
    if (existed) {
        return res.json({
            error: true,
            message: "This month have existed"
        })
    }
    else {
        const newBudget = new Budget({
            label: timeStampToText('month', timestampReq),
            timestamp: req.body.timestamp,
            budget: req.body.budget,
            used: req.body.used
        })
        await newBudget.save()
        return res.json(newBudget)
    }
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body
    try {
        await Budget.deleteOne({ _id: id })
        return res.json({
            isError: false,
            msg: 'Remove successful'
        })
    }
    catch (err) {
        return error(res, err)
    }
})

module.exports = router
