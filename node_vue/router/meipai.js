const mysql = require('../mysql');
const express = require('express');
const MD5 = require('MD5');
const bp = require('body-parser');

const router = express.Router();

// 获取美拍的数据
router.get('/all', (req, res) => {
    mysql.query('select hid,h_date,h_title,h_browse,h_fabulou,h_collection,h_photo,h_user_id,h_goods_id,h_author,u.avatar from hs_meipai,hs_user u where u.uid=h_user_id', (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取美拍数据成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取美拍数据失败'
            })
        }
    })
})

// 通过 美拍中返回的用户 id 来访问用户详情
// 可以访问  user 路由中的 ' /alluser/:id ' 来进行访问

// 通过 美拍中返回的商品 id 来访问商品详情
// 可以访问  home 路由中的 ' /index/activity/:id ' 来进行访问













module.exports = router;