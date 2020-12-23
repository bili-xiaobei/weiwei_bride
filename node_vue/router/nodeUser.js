const express = require('express');
const mysql = require('../mysql')
const router = express.Router();
const bodyParser = require('body-parser');
const bp = bodyParser.urlencoded({extended:false});



// 查询用户列表
router.get('/user_list/:pagenum&:pagesize', (req, res) => {
    // console.log(req.params);
    var pagenum = (parseInt(req.params.pagenum)-1)*parseInt(req.params.pagesize);
    var pagesize = parseInt(req.params.pagesize);
    mysql.query('select * from hs_user limit ?, ?',[isNaN(pagenum) ? 1:pagenum, isNaN(pagesize)?5:pagesize], (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            res.send({
                data: result,
                meta: { state: 200, msg: '获取用户数据成功' }
            });
        } else {
            res.send({meta: {state: 400, msg: '获取用户列表失败'}})
        }
    })
})
// 获取数据库总数据量
router.get('/user_pagenum', (req, res) => {
    mysql.query('select * from hs_user', (err, result) => {
        if(err) throw err;
        // console.log(result.length)
        if(result.length > 0){
            res.send({
                data: { pagenum: result.length },
                meta: { state: 200, msg: '获取数据库数量成功' }
            })
        } else {
            res.send({meta: { state: 400, msg: '获取数据库数量失败' }})
        }
    })
})
// post 登录
// router.post('/list_post', (req, res) => {
//     console.log(req.body);
//     mysql.query('select * from hs_user where username=? and password=?',[req.body.username, req.body.password], (err, result) => {
//         if(err) throw err;
//         if(result.length > 0) {
//             res.send({code: 200, token: 'bilibili_xb', msg: '登录成功'});
//         } else {
//             res.send({code: 400, msg: '登录失败'})
//         }
//     })
// })
// get 登录
// router.get('/list_get', (req, res) => {
//     mysql.query('select * from hs_user', (err, result) => {
//         if(err) throw err;
//         if(result.length > 0) {
//             res.send({code: 200, msg: '登录成功'});
//         } else {
//             res.send({code: 400, msg: '登录失败'});
//         }
//     })
// })
// 模糊搜索查询用户
router.get('/user_search/:username', (req, res) => {
    var searchName = '%' + req.params.username + '%';
    mysql.query('select * from hs_user where username like ?', [searchName], (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: { state: 200, msg: '查询成功' },
                pagenum: result.length
            })
        } else {
            res.send({meta: { state:400, msg: '查询失败' }})
        }
    })
})
// 添加用户
router.post('/add_user', bp, (req, res) => {
    // console.log(req.body)
    mysql.query('select username from hs_user where username=?', [req.body.username], (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                code: 400,
                msg: '用户名重复'
            })
        } else {
            mysql.query('insert into hs_user set ?', [req.body], (err, result) => {
                if(err) throw err;
                if(result.affectedRows > 0){
                    res.send({
                        meta: { state: 200, msg: '添加成功' }
                    })
                } else {
                    res.send({
                        meta: { state: 400, msg: '添加失败' }
                    })
                }
            })
        }
    })
})
// 更新是否在线
router.put('/change_online', bp, (req, res) => {
    // console.log(req.body.isOnLine);
    mysql.query('update hs_user set isOnLine=? where uid=?',[req.body.isOnLine, req.body.uid], (err, result) => {
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({
                meta: { state: 200, msg: '更新成功' }
            })
        } else {
            res.send({
                meta: { state: 400, msg: '更新失败' }
            })
        }
    })
})
// 通过 uid 查询用户
router.get('/search_user_uid/:uid', (req, res) => {
    mysql.query('select * from hs_user where uid=?', [req.params.uid], (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            res.send({
                data: result,
                meta: { state: 200, msg: '查询成功' }
            })
        } else {
            res.send({
                meta: { state:400, msg: '查询失败' }
            })
        }
    })
})
// 通过 uid 修改用户
router.put('/update_user_uid', bp, (req, res) => {
    console.log(req.body);
    mysql.query('update hs_user set ? where uid=?', [req.body, req.body.uid], (err, result) => {
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({
                meta: { state: 200, msg: '修改成功' }
            })
        } else {
            res.send({
                meta: { state: 400, msg: '修改失败' }
            })
        }
    })
    // res.send('jsjklhgfal')
})
// 通过 uid 删除用户
router.delete('/delete_user_uid/:uid', (req, res) => {
    mysql.query('delete from hs_user where uid=?', [req.params.uid], (err, result) => {
        if(err) throw err;
        if(result.affectedRows != 0) {
            res.send({
                meta: { state: 200, msg: '删除成功' }
            })
        } else {
            res.send({
                meta: { state: 400, msg: '删除失败' }
            })
        }
    })
})

// get 注册
router.get('/register/:username&:password', (req, res) => {
    // console.log(req.config.data);
    console.log(req.params);
    // console.log(req.query);
    mysql.query('insert into xz_user(username, password) value (?, ?)', [req.params.username, req.params.password], (err, result) => {
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({code: 200, msg: '注册成功'});
        } else {
            res.send({code: 400, msg: '注册失败'});
        }
    })
    // res.send('req.body');
})

// post 注册
router.post('/register', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    // console.log(req.query);
    mysql.query('insert into xz_user(username, password) value (?, ?)', [req.body.username, req.body.password], (err, result) => {
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({code: 200, msg: '注册成功'});
        } else {
            res.send({code: 400, msg: '注册失败'});
        }
    })
    // res.send('req.body');
})

module.exports = router
