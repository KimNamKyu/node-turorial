//server 시작점
const express = require('express') //express module 가져옴
const app = express()
const port = 5000 //5000포트

//몽고디비 생성및 몽고디비 유저 생성 southkyu / qwer1234


//몽구스를 이용하여 몽고디비 연결
const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://sothkyu:qwer1234@nodedbs.q5h1l.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))