const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        "response": req.body
    })
})

module.exports = router