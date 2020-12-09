const mysql = require('../mysql');
const express = require('express');
const MD5 = require('MD5');
const bp = require('body-parser');

const router = express.Router();

// 获取美拍的数据
router.get('/all', (req, res) => {
    mysql.query('select hid,h_date,h_title,h_browse,h_fabulou,h_collection,h_photo,h_user_id from hs_meipai', (err, result) => {
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















module.exports = router;