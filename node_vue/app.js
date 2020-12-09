const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/user');
const indexRouter = require('./router/home');
const meipaiRouter = require('./router/meipai');
var app = express();

app.use('/api/user', userRouter)
app.use('/api/home', indexRouter)
app.use('/api/meipai', meipaiRouter)

app.use(bodyParser.urlencoded({
    extended: false
}))

app.listen(3000, () => {
    console.log('Vue_project Runing...')
})