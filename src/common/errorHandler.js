const error=(res, err) =>{
    return res.json({
        isError: true,
        msg: err.toString()
    })
}

const success=(res, msg) => {
    return res.json({
        isError: false,
        msg: msg
    })
}

module.exports = {
    error, success
}