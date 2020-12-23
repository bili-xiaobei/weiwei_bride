const express = require('express');

const router = express.Router();

// 获取用户列表
router.get('/menuList', (req, res) => {
    res.send({
        list: [{
            id: 100,
            authName: '用户管理',
            path: 'users',
            order: 1,
            children: [{
                id: 110,
                authName: '用户列表',
                path: 'users',
                order: 2
            }]
        }, {
            id: 200,
            authName: '权限管理',
            path: 'rights',
            order: 2,
            children: [{
                id: 210,
                authName: '权限列表',
                path: 'rights_user',
                order: 2
            }, {
                id: 220,
                authName: '路径列表',
                path: 'rights',
                order: 3
            }]
        }, {
            id: 300,
            authName: '商品管理',
            path: 'goods',
            order: 1,
            children: [{
                id: 310,
                authName: '商品列表',
                path: 'goods_list',
                order: 2
            },{
                id: 330,
                authName: '商品分类',
                path: 'goods',
                order: 2
            }]
        }, {
            id: 400,
            authName: '订单管理',
            path: 'orders',
            order: 1,
            children: [{
                id: 410,
                authName: '订单列表',
                path: 'orders_list',
                order: 2
            },{
                id: 420,
                authName: '购物车列表',
                path: 'shop_list',
                order: 2
            }]
        }, {
            id: 500,
            authName: '数据统计',
            path: 'reports',
            order: 2,
            children: [{
                id: 510,
                authName: '统计图',
                path: 'reports',
                order: 2
            }]
        }],
        meta: {
            message: '获取列表',
            state: 200
        },
        powerList: [{
            id: 100,
            roleName: '超级管理员',
            roleDesc: '最高执行者',
            children: [{
                id: 101,
                authName: '商品管理',
                path: null,
                children: [{
                    id: 102,
                    authName: '商品列表',
                    path: null,
                    children: [{
                        id: 103,
                        authName: '添加商品',
                        path: null
                    }, {
                        id: 104,
                        authName: '商品修改',
                        path: null
                    }, {
                        id: 105,
                        authName: '商品删除',
                        path: null
                    }, {
                        id: 106,
                        authName: '更新商品图片',
                        path: null
                    }, {
                        id: 107,
                        authName: '更新商品属性',
                        path: null
                    }, {
                        id: 108,
                        authName: '更新商品状态',
                        path: null
                    }, {
                        id: 109,
                        authName: '获取商品信息',
                        path: null
                    }]
                }, {
                    id: 110,
                    authName: '分类参数',
                    path: null,
                    children: [{
                        id: 111,
                        authName: '获取参数列表',
                        path: null
                    }, {
                        id: 112,
                        authName: '创建商品参数',
                        path: null
                    }, {
                        id: 113,
                        authName: '删除商品参数',
                        path: null
                    }]
                }, {
                    id: 114,
                    authName: '商品分类',
                    path: null,
                    children: [{
                        id: 115,
                        authName: '添加分类',
                        path: null
                    }, {
                        id: 116,
                        authName: '删除分类',
                        path: null
                    }, {
                        id: 117,
                        authName: '获取分类详情',
                        path: null
                    }]
                }]
            }, {
                id: 118,
                authName: '订单管理',
                path: null,
                children: [{
                    id: 119,
                    authName: '订单列表',
                    path: null,
                    children: [{
                        id: 120,
                        authName: '添加订单',
                        path: null
                    }, {
                        id: 121,
                        authName: '订单更新',
                        path: null
                    }, {
                        id: 122,
                        authName: '获取订单详情',
                        path: null
                    }]
                }]
            }, {
                id: 123,
                authName: '权限管理',
                path: null,
                children: [{
                    id: 124,
                    authName: '角色列表',
                    path: null,
                    children: [{
                        id: 125,
                        authName: '添加角色',
                        path: null
                    }, {
                        id: 126,
                        authName: '删除角色',
                        path: null
                    }, {
                        id: 127,
                        authName: '角色授权',
                        path: null
                    }, {
                        id: 128,
                        authName: '取消角色授权',
                        path: null
                    }, {
                        id: 129,
                        authName: '获取角色列表',
                        path: null
                    }, {
                        id: 130,
                        authName: '获取角色详情',
                        path: null
                    }, {
                        id: 131,
                        authName: '更新角色信息',
                        path: null
                    }, {
                        id: 132,
                        authName: '更新角色权限',
                        path: null
                    }]
                }, {
                    id: 133,
                    authName: '权限列表',
                    path: null,
                    children: [{
                        id: 134,
                        authName: '查看权限',
                        path: null
                    }]
                }]
            }, {
                id: 135,
                authName: '用户管理',
                path: null,
                children: [{
                    id: 136,
                    authName: '用户列表',
                    path: null,
                    children: [{
                        id: 137,
                        authName: '添加用户',
                        path: null
                    }, {
                        id: 138,
                        authName: '删除用户',
                        path: null
                    }, {
                        id: 139,
                        authName: '更新用户',
                        path: null
                    }, {
                        id: 140,
                        authName: '获取用户详情',
                        path: null
                    }, {
                        id: 141,
                        authName: '分配用户角色',
                        path: null
                    }, {
                        id: 142,
                        authName: '设置管理状态',
                        path: null
                    }]
                }]
            }, {
                id: 143,
                authName: '数据统计',
                path: null,
                children: [{
                    id: 144,
                    authName: '数据报表',
                    path: null,
                    children: [{
                        id: 145,
                        authName: '查看数据',
                        path: null
                    }]
                }]
            }]
        }, {
            id: 146,
            roleName: '管理员',
            roleDesc: '特权执行者',
            children: [{
                id: 147,
                authName: '商品管理',
                path: null,
                children: [{
                    id: 148,
                    authName: '商品列表',
                    path: null,
                    children: [{
                        id: 149,
                        authName: '添加商品',
                        path: null
                    }, {
                        id: 150,
                        authName: '商品修改',
                        path: null
                    }, {
                        id: 151,
                        authName: '商品删除',
                        path: null
                    }]
                }, {
                    id: 152,
                    authName: '分类参数',
                    path: null,
                    children: [{
                        id: 153,
                        authName: '获取参数列表',
                        path: null
                    }, {
                        id: 154,
                        authName: '创建商品参数',
                        path: null
                    }]
                }, {
                    id: 155,
                    authName: '商品分类',
                    path: null,
                    children: [{
                        id: 156,
                        authName: '添加分类',
                        path: null
                    }]
                }]
            }, {
                id: 157,
                authName: '订单管理',
                path: null,
                children: [{
                    id: 158,
                    authName: '订单列表',
                    path: null,
                    children: [{
                        id: 159,
                        authName: '添加订单',
                        path: null
                    },{
                        id: 160,
                        authName: '获取订单详情',
                        path: null
                    }]
                }]
            }, {
                id: 161,
                authName: '权限管理',
                path: null,
                children: [{
                    id: 162,
                    authName: '角色列表',
                    path: null,
                    children: [{
                        id: 163,
                        authName: '添加角色',
                        path: null
                    }, {
                        id: 164,
                        authName: '获取角色列表',
                        path: null
                    }, {
                        id: 165,
                        authName: '获取角色详情',
                        path: null
                    }]
                }, {
                    id: 166,
                    authName: '权限列表',
                    path: null,
                    children: [{
                        id: 167,
                        authName: '查看权限',
                        path: null
                    }]
                }]
            }, {
                id: 168,
                authName: '用户管理',
                path: null,
                children: [{
                    id: 169,
                    authName: '用户列表',
                    path: null,
                    children: [{
                        id: 170,
                        authName: '添加用户',
                        path: 171
                    }, {
                        id: 172,
                        authName: '获取用户详情',
                        path: null
                    }, {
                        id: 173,
                        authName: '分配用户角色',
                        path: null
                    }]
                }]
            }, {
                id: 174,
                authName: '数据统计',
                path: null,
                children: [{
                    id: 175,
                    authName: '数据报表',
                    path: null,
                    children: [{
                        id: 176,
                        authName: '查看数据',
                        path: null
                    }]
                }]
            }]
        }, {
            id: 177,
            roleName: '特权用户',
            roleDesc: '拥有特权的用户',
            children: [{
                id: 178,
                authName: '商品管理',
                path: null,
                children: [{
                    id: 179,
                    authName: '商品列表',
                    path: null,
                    children: [{
                        id: 180,
                        authName: '添加商品',
                        path: null
                    }]
                }]
            }, {
                id: 181,
                authName: '订单管理',
                path: null,
                children: [{
                    id: 182,
                    authName: '订单列表',
                    path: null,
                    children: [{
                        id: 183,
                        authName: '添加订单',
                        path: null
                    }, {
                        id: 184,
                        authName: '获取订单详情',
                        path: null
                    }]
                }]
            }, {
                id: 185,
                authName: '数据统计',
                path: null,
                children: [{
                    id: 186,
                    authName: '数据报表',
                    path: null,
                    children: [{
                        id: 187,
                        authName: '查看数据',
                        path: null
                    }]
                }]
            }]
        }, {
            id: 188,
            roleName: '普通用户',
            roleDesc: '大部分人的权限',
            children: [{
                id: 189,
                authName: '数据统计',
                path: null,
                children: [{
                    id: 190,
                    authName: '数据报表',
                    path: null,
                    children: [{
                        id: 191,
                        authName: '查看数据',
                        path: null
                    }]
                }]
            }]
        }]
    });
})


module.exports = router