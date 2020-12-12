const mysql = require('../mysql');
const express = require('express');
const MD5 = require('MD5');
const bp = require('body-parser');
const router = express.Router();


// 获取首页中 banner 图片
router.get('/index/banner', (req, res) => {
    mysql.query('select hid,h_photo from hs_home_banner', (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取图片成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取图片失败'
            })
        }
    })
})

// 获取首页中 banner 图片 以及要链接的商品
router.get('/index/banner/:index', (req, res) => {
    mysql.query('select * from hs_goods where hid=(select h_goods_id from hs_home_banner where hid=?)', [req.params.index], (err, result) => {
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


// 获取风格的图片
router.get('/index/style', (req, res) => {
    mysql.query('select hid,h_photo from hs_home_style', (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取风格图片成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取风格图片失败'
            })
        }
    })
})

// 点击进入对应的风格导航商品中
router.get('/index/style/:index', (req, res) => {
    mysql.query('select hid,h_title,h_photo,h_browse,h_fabulou,h_collection,h_goods_id from hs_style where h_style=?', [req.params.index], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取对应风格的 id 成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取对应风格的 id 失败'
            })
        }

    })
})

// 获取参与活动的商品
router.get('/index/activity', (req, res) => {
    mysql.query('select hid,h_title,h_price,h_photos from hs_goods where hid<=10', (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取参与活动的商品成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取参与活动的商品失败'
            })
        }
    })
})

// 点击获取参与活动的商品  跳转到对应的商品
router.get('/index/activity/:id', (req, res) => {
    mysql.query('select hid,h_title,h_style,h_price,h_photos from hs_goods where hid=?', [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '查找到对应的商品'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '没有该商品'
            })
        }
    })
})




module.exports = router;