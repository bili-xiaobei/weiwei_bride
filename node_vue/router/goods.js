const express = require('express');
const mysql = require('../mysql');
const bodyParser = require('body-parser');
const bp = bodyParser.urlencoded({extended:false});

const router = express.Router();

// 获取所有商品
router.get('/good_all', (req, res) => {
    mysql.query('select * from hs_goods', (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
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

// 获取指定风格的商品
router.get('/good_style/:style', (req, res) => {
    mysql.query('select * from hs_goods where h_style=?', [req.params.style], (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '获取指定风格的商品成功'
                }
            })
        } else {
            res.send({
                meta: {
                    code: 400,
                    msg: '获取指定风格的商品失败'
                }
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

// 获取数据库总数据量
router.get('/goods_pagenum', (req, res) => {
    mysql.query('select * from hs_goods', (err, result) => {
        if(err) throw err;
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

// 查询商品列表   分组
router.get('/goods_limit/:pagenum&:pagesize', (req, res) => {
    // console.log(req.params);
    var pagenum = (parseInt(req.params.pagenum)-1)*parseInt(req.params.pagesize);
    var pagesize = parseInt(req.params.pagesize);
    mysql.query('select * from hs_goods limit ?, ?',[isNaN(pagenum) ? 1:pagenum, isNaN(pagesize)?5:pagesize], (err, result) => {
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

// 商品的模糊查询
router.get('/search_like/:str', (req, res) => {
    mysql.query('select * from hs_goods where h_title like ?', ['%' + req.params.str + '%'], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                data: result,
                meta: {
                    code: 200,
                    mag: '查询成功'
                }
            })
        } else {
            res.send({
                meta: {
                    code: 400,
                    msg: '查询失败'
                }
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

// 添加商品
router.post('/add_goods', bp, (req, res) => {
    console.log(req.body)
    mysql.query('insert into hs_goods set ?', [req.body], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                meta: {
                    state: 200,
                    msg: '添加成功'
                }
            })
        } else {
            res.send({
                meta: {
                    state: 400,
                    msg: '添加失败'
                }
            })
        }
    })
})

// 通过 hid 修改商品
router.put('/update_goods_hid', bp, (req, res) => {
    // console.log(req.body);
    mysql.query('update hs_goods set ? where hid=?', [req.body, req.body.hid], (err, result) => {
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
})

// 通过 hid 查询商品
router.get('/search_goods_hid/:hid', (req, res) => {
    mysql.query('select * from hs_goods where hid=?', [req.params.hid], (err, result) => {
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

// 通过 hid 删除商品
router.delete('/delete_goods_hid/:hid', (req, res) => {
    mysql.query('delete from hs_goods where hid=?', [req.params.hid], (err, result) => {
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

// 修改要购买商品的个数
router.put('/update_goods_num', bp, (req, res) => {
    // console.log(req.body);
    mysql.query('update hs_shopcart set h_num=? where h_goods_id=?', [req.body.num, req.body.hid], (err, result) => {
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
})

// 想购物车中添加商品
router.get('/add_goods/:g_id', (req, res) => {
    mysql.query('select h_goods_id from hs_shopcart where h_goods_id=?', [req.params.g_id], (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            res.send({
                code: 201,
                msg: '购物车中已存在该商品'
            })
        } else {
            mysql.query('insert into hs_shopcart(h_goods_id) values (?)', [req.params.g_id], (err, result) => {
                if(err) throw err;
                if(result.affectedRows > 0){
                    res.send({
                        code: 200,
                        msg: '添加购物车成功'
                    })
                } else {
                    res.send({
                        code: 400,
                        msg: '添加购物车失败'
                    })
                }
            })
        }
    })
})

// 删除商品
router.delete('/delete_goods/:g_id', (req, res) => {
    mysql.query('delete from hs_shopcart where h_goods_id=?', [req.params.g_id], (err, result) => {
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({
                code: 200,
                msg: '删除成功'
            })
        } else {
            res.send({
                code: 400,
                msg: '删除失败'
            })
        }
    })
})

// 要购买的单个的商品
router.get('/buy_goods/:g_id', (req, res) => {
    mysql.query('select * from hs_goods where h_goods_id=?', [req.params.g_id], (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send({
                data: result,
                meta: {
                    code: 200,
                    msg: '购买单个商品'
                }
            })
        } else {
            res.send({
                meta: {
                    code: 400,
                    msg: '购买单个商品失败'
                }
            })
        }
    })
})





module.exports = router