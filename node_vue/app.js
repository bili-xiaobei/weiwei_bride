const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/user');
const indexRouter = require('./router/home');
const meipaiRouter = require('./router/meipai');
const strategyRouter = require('./router/strategy');
const myRouter = require('./router/my');
const goodsRouter = require('./router/goods');

// 后台接口
const nodeUserRouter = require('./router/nodeUser')
const listRouter = require('./router/list')
const rightRouter = require('./router/rights')

var app = express();


app.use(bodyParser.urlencoded({
    extended: false
}))



app.use('/api/user', userRouter)
app.use('/api/home', indexRouter)
app.use('/api/meipai', meipaiRouter)
app.use('/api/strategy', strategyRouter)
app.use('/api/my', myRouter)
app.use('/api/goods', goodsRouter)

// 微微新娘后台

app.use('/api/node_user', nodeUserRouter);
app.use('/api/menu', listRouter);
app.use('/api/right', rightRouter);


app.listen(3000, () => {
    console.log('Vue_project Runing...')
})

// 部署
// app.listen(5050, () => {
//     console.log('Vue_project Runing...')
// })