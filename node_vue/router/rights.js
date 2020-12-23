const express = require('express');
const mysql = require('../mysql');
const router = express.Router();

const bodyParse = require('body-parser');

const bp = bodyParse.urlencoded({extended: false})

router.get('/rights_user', (req, res) => {
    mysql.query('select * from hs_power', (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                list: result,
                meta: { state: 200, msg: '获取权限列表成功' }
            })
        } else {
            res.send({
                meta: { state: 400, msg: '获取权限列表失败' }
            })
        }
    })
})




















module.exports = router;