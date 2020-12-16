const mysql = require('../mysql');
const express = require('express');
const MD5 = require('MD5');
const bp = require('body-parser');

const router = express.Router();

router.use(bp.urlencoded({
    extended: false
}))


// 登录接口
router.post('/login', (req, res) => {
    mysql.query('select uid,username,password,token,sex,phone,nickname,qq,avatar from hs_user where username=? and password=?', [req.body.username, MD5(req.body.password)], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '登录成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '登录失败'
            })
        }
    });
})

// 注册接口
router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = MD5(req.body.password);
    let token = MD5(req.body.username);
    let sex = req.body.sex;
    let nickname = req.body.nickname;
    mysql.query('select username from hs_user where username=?', [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 400,
                msg: '用户名已经存在'
            })
        } else {
            // 进行用户的插入
            mysql.query('insert into hs_user(username,password,token,sex,nickname) values (?,?,?,?,?)', [username, password, token, sex, nickname], (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.send({
                        code: 200,
                        msg: '添加用户成功'
                    })
                } else {
                    res.send({
                        code: 400,
                        msg: '添加用户失败'
                    })
                }
            })
        }
    })

})

// 通过用户 id 获取用户信息
router.get('/alluser/:id', (req, res) => {
    mysql.query('select uid,username,token,sex,phone,nickname,qq,avatar from hs_user where uid=?', [req.params.id], (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '查询用户成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '查询用户失败'
            })
        }
    })
})
// 通过用户 token 获取用户信息
router.get('/login_user/:token', (req, res) => {
    mysql.query('select uid,username,token,sex,phone,nickname,qq,avatar from hs_user where token=?', [req.params.token], (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '查询用户成功'
                }
            })
        } else {
            res.send({
                code: 400,
                msg: '查询用户失败'
            })
        }
    })
})

module.exports = router;