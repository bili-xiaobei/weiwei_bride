## 数据库设计

### 四大模块：

表名：hs_title

| 字段名  | 字段类型   | NOT NULL | 默认值 | 注解 + 约束                     |
| ------- | ---------- | -------- | ------ | ------------------------------- |
| hid     | int        | true     | null   | auto_increment<br />primary key |
| h_title | varchar(5) | true     | null   | 标题内容                        |

### 轮播图: （ 轮播 + 风格 ）

表名: hs_banner_style

| 字段名     | 字段类型       | NOT NULL | 默认值 | 注解 + 约束       |
| ---------- | -------------- | -------- | ------ | ----------------- |
| hid        | int            | true     | null   | primary key       |
| h_photo    | varchar（255） | true     | null   |                   |
| h_goods_id | int            | true     | null   | h_goods中对应的id |

### 风格导航:

表名: hs_style_han / fa / ou / zhong

| 字段名  | 字段类型       | NOT NULL | 默认值 | 注解 + 约束               |
| ------- | -------------- | -------- | ------ | ------------------------- |
| hid     | int            | true     | null   | auto_incrementprimary key |
| h_title | varchar（10）  | true     | null   | 标题                      |
| h_photo | varchar（255） | true     | null   | 图片                      |

## 攻略:

### 贴士: / 风格: / 咨询: / 注意: / 姿势: / 礼服:

表名: hs_strategy_tips / style / consult / beCareful / posture / fullDress /

| 字段名    | 字段类型      | NOT NULL | 默认值     | 注解 + 约束 |
| --------- | ------------- | -------- | ---------- | ----------- |
| hid       | int           | true     | null       | primary key |
| h_date    | varchar（50） |          | 2020-12-12 | 时间        |
| h_title   | varchar（30） | true     |            | 贴士标题    |
| h_content | varchar       |          | 暂无       | 贴士内容    |

### 美拍:

表名: hs_meiPai

| 字段名       | 字段类型       | NOT NULL | 默认值     | 注解 + 约束          |
| ------------ | -------------- | -------- | ---------- | -------------------- |
| hid          | int            | true     | null       | primary key          |
| h_date       | varchar（50）  |          | 2020-12-12 | 时间                 |
| h_title      | varchar（50）  | true     |            | 标题                 |
| h_avatar     | varchar（255） |          | 此处应该有 | 用户头像             |
| h_nickname   | varchar（20）  |          | 匿名       | 昵称                 |
| h_browse     | int            |          | 10         | 浏览量               |
| h_fabulou    | int            |          | 10         | 点赞                 |
| h_collection | int            |          | 10         | 收藏                 |
| h_photo      | varchar（255） |          |            | 图片                 |
| h_user_id    | int            | true     |            | 用户表中对应用户的id |

### 用户:

表名: hs_user

| 字段名   | 字段类型      | NOT NULL | 默认值 | 注解 + 约束               |
| -------- | ------------- | -------- | ------ | ------------------------- |
| hid      | int           | true     | null   | auto_incrementprimary key |
| username | varchar（20） | true     |        | 用户名  unique唯一        |
| password | varchar（32） | true     |        | MD5（模块）加密           |
| token    | varchar（32） | true     |        | 暂定（MD5（用户名））     |
| sex      | int           |          | 1      | 1~男  0~女  -1~保密       |
| phone    | varchar（11） |          |        | 电话                      |
| nickname | varchar（20） |          | 匿名   |                           |
| qq       | varchar（10） |          |        |                           |

### 商品:

表名: hs_goods

| 字段名   | 字段类型      | NOT NULL | 默认值 | 注解 + 约束               |
| -------- | ------------- | -------- | ------ | ------------------------- |
| hid      | int           | true     | null   | auto_incrementprimary key |
| h_title  | varchat（50） | true     |        |                           |
| h_price  | int           | true     |        |                           |
| h_photos | varchar       | true     |        | 获取时注意                |

 

## 关联到个人的表格:

### 购物车: hs_shoppingCart _个人id

| 字段名     | 字段类型 | NOT NULL | 默认值 | 注解 + 约束               |
| ---------- | -------- | -------- | ------ | ------------------------- |
| hid        | int      | true     | null   | auto_incrementprimary key |
| h_goods_id | int      | true     |        | 加入购物车时携带商品id    |

### 订单: hs_order_个人id

| 字段名     | 字段类型 | NOT NULL | 默认值 | 注解 + 约束               |
| ---------- | -------- | -------- | ------ | ------------------------- |
| hid        | int      | true     | null   | auto_incrementprimary key |
| h_goods_id | int      | true     |        | 购买后也需携带商品的id    |

### 优惠券: hs_coupon_个人id

| 字段名    | 字段类型 | NOT NULL | 默认值 | 注解 + 约束               |
| --------- | -------- | -------- | ------ | ------------------------- |
| hid       | int      | true     | null   | auto_incrementprimary key |
| h_price   | int      | true     |        |                           |
| 购物卡    |          |          |        |                           |
| hid       | int      | true     | null   | auto_incrementprimary key |
| h_deserve | int      | true     |        |                           |

### 我的动态: hs_myDynamic_个人id

| 字段名    | 字段类型 | NOT NULL | 默认值 | 注解 + 约束               |
| --------- | -------- | -------- | ------ | ------------------------- |
| hid       | int      | true     | null   | auto_incrementprimary key |
| h_user_id | int      | true     |        | 用到user表中的数据        |

 

 

## 注意事项:

轮播图中包含商品表中商品的id；

风格导航/购物车/订单下商品包含商品表中商品的id；

轮播图中图片为商品表中的图片；

风格导航下商品同样为商品表中的数据；

因为每个人的“我的”中数据都不一样，所以都要为每一个用户创建“我的”下的所有表，

所以，当用户注册时，会创建一个专属于自己的一组表，而各个用户的专属表得后缀名为本身的id

而每当用户登录的时候要携带自己的id，如何在去他组件中获取用户id :  暂定方案: window.sessionStorage.setItem("user_id", 用户id值)，登录时就将之保存到浏览器中。