const error=(res, err) =>{
    return res.json({
        isError: true,
        msg: err.toString()
    })
}

module.exports = {
    error
}