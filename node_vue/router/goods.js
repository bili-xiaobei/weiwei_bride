const express = require('express');
const mysql = require('../mysql');

const router = express.Router();

// 获取所有商品
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

// 获取指定 id 的商品
router.get('/good_hid/:hid', (req, res) => {
    mysql.query('select * from hs_goods where hid=?', [req.params.hid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取商品 id 成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取商品 id 失败'
            })
        }

    })
})





module.exports = router
