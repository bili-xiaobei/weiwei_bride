const mysql = require('../mysql');
const express = require('express');

const router = express.Router();

// 获取指定类型的攻略数据
router.get('/style/:index', (req, res) => {
    mysql.query('select * from hs_strategy where h_style=?', [req.params.index], (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取攻略成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '获取攻略失败'
            })
        }
    })
})











module.exports = router;