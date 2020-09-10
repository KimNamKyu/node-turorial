const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { //유효기간
        type: Number
    }
})

userSchema.pre('save', function(next){
    //비밀번호를 암호화시킨다. 저장하기전에
    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err)
                user.password = hash    //hash 된 비밀번호로 변경
                next()
            })
        })
    }else{
        next()
    }
}) //mongoose method

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword 12341234  암호화된 비밀번호 >> 복호화X 암호화해서 비교
    console.log(plainPassword)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        console.log(err)
        if(err) return cb(err),
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    //jsonwebtoken을 활용하여 토큰 생성
    let user = this;
    let token = jwt.sign(user._id.toHexString(), 'secrectToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)  //모델을 스키마에 넣어준다.
module.exports = {User}