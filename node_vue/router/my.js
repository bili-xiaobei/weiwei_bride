const mysql = require('../mysql');
const express = require('express');

const router = express.Router();


// 获取购物车中的商品详情
router.get('/shop_cart', (req, res) => {
    mysql.query('select g.h_title,g.h_style,g.h_price,g.h_photos,s.h_size,s.h_color,s.h_goods_id from hs_goods g,hs_shopcart s where g.hid=s.h_goods_id', (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '购物车列表获取成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '购物车列表获取失败'
            })
        }
    })
})

// 获取订单中的商品详情
router.get('/order', (req, res) => {
    mysql.query('select g.h_title,g.h_style,g.h_price,g.h_photos,o.h_goods_id,o.h_date from hs_goods g,hs_order o where g.hid=o.h_goods_id', (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '购物车列表获取成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '购物车列表获取失败'
            })
        }
    })
})

// 获取优惠券的金额 和 个数
router.get('/coupon', (req, res) => {
    mysql.query('select hid,h_price from hs_coupon', (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取优惠券成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取优惠券失败'
            })
        }
    })
})

// 获取所有的动态
router.get('/dynamic', (req, res) => {
    mysql.query('select m.hid,m.h_user_id,m.h_photo,m.h_content,m.h_title,m.h_browse,m.h_fabulou,u.username,u.avatar from hs_mydynamic m,hs_user u where m.h_user_id=u.uid', (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code:200,
                    msg: '获取动态列表成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取动态列表失败'
            })
        }
    })
})




module.exports = router;