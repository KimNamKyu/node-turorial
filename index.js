//server 시작점
const express = require('express') //express module 가져옴
const app = express()
const port = 5000 //5000포트
const bodyParser = require('body-parser');
const {User} = require('./model/User');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');
// applicatiion/ x-www-form-urlencoded 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}));    
// application/json 가져오기
app.use(bodyParser.json());
app.use(cookieParser());

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
app.post('/api/users/register', (req, res) => {
    //클라이언트에서 보내주는 데이터들을 가져오면
    //그것들을 데이터베이스에 넣어준다.
    // req.body 안에 객체 형식으로 데이터를 받아옴 body-parser에 의하여
    
    const user = new User(req.body)

    //비밀번호 암호화 bcrypt 라이브러리 활용
    user.save((err, userInfo) => {
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success:true
        })
    }) 
})

app.post('/api/users/login', (req, res) => {
    //1.데이터베이스에서 요청한 이메일 찾기
    //2.요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    //3.비밀번호가 맞다면 그유저에 맞는 토큰 생성
    
    User.findOne({email:req.body.email}, (err, user) => {
        
        if(!user) {
            return res.json({
                loginSucess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        
        user.comparePassword(req.body.password, (err, isMatch )=> {
            if(!isMatch) return res.json({loginSucess:false, message: "비밀번호가 틀렸습니다."})

            //토큰생성 jsonwebtoken 라이브러리 참조
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                //토큰을 저장한다. 어디에? 쿠키 or 로컬스토리지 등
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSucess:true, userId:user._id })
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    //auth 미들웨어 (중간에서 처리)
    //여기 까지 미들웨어를 통과해 왔다는 것은 Auth = true
    res.status(200).json({
        _id:req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth : true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id:req.user._id},{token: ""}, (err, user) => {
        if(err) return res.json({success:false, err})
        return res.status(200).send({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))