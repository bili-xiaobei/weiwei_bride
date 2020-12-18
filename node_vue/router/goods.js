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



// 商品的模糊查询
router.get('/search_like/:str', (req, res, next) => {
    // if(req.params.str) next()
    // else{
        mysql.query('select hid,h_title from hs_goods where h_title like ?', ['%'+req.params.str+'%'], (err, result) => {
            if(err) throw err;
            if(result.length > 0) {
                res.send({
                    data: result,
                    meta: {
                        code: 200,
                        mag: '查询成功'
                    }
                })
            } else {
                res.send({
                    code: 400,
                    msg: '查询失败'
                })
            }
        })
    // }
})

// 用户输入后 删除输入框中内容
router.get('/search_like', (req, res) => {
    res.send({
        code: 400,
        msg: '查询失败'
    })
})





module.exports = router
