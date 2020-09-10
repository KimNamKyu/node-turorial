//server 시작점
const express = require('express') //express module 가져옴
const app = express()
const port = 5000 //5000포트
const bodyParser = require('body-parser');
const {User} = require('./model/User');
const config = require('./config/key');

// applicatiion/ x-www-form-urlencoded 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}));    
// application/json 가져오기
app.use(bodyParser.json());

//몽구스를 이용하여 몽고디비 연결
const mongoose = require("mongoose")
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!'))

//회원가입 라우터
app.post('/register', (req, res) => {
    //클라이언트에서 보내주는 데이터들을 가져오면
    //그것들을 데이터베이스에 넣어준다.
    // req.body 안에 객체 형식으로 데이터를 받아옴 body-parser에 의하여
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success:true
        })
    }) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))