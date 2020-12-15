const express = require('express');
const mysql = require('../mysql');

const router = express.Router();


router.get('/good_all', (req, res) => {
    mysql.query('select * from hs_goods', (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取商品成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取商品失败'
            })
        }
    })
})






module.exports = router
