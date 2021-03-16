const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = 'cf1ee8d115083b3463e667029ec7f67c5d9b0b0a58f3e2beda1f2bec60fe42a05f8658e64bcb1d18274b7d224ffd649f3151f518ad4d5757445f8e36efbd48c8'

module.exports = {
    test(req,res){
        return res.json({
            name: req.name
        })
    },
    async store(req,res){
        try{
            const { name, email, password } = req.body
            const hashed_password = await bcrypt.hash(password,10)
            const user = await User.create({
                name,
                email,
                password:hashed_password
            })
            return res.send({
                message: "Created",
                user:{
                    name,email,password
                }
            },201)
        }catch{
            return res.send({
                message: "Failed"
            })
        }
 
    },
    async user_login(req,res){
        const {email,password} = req.body
        
        const user = await User.findOne({
            where:{
                email
            }
        })
        const hashed_password = user.dataValues.password

        const comparator = await bcrypt.compare(password,hashed_password)
        if(comparator){
            const user_auth = {
                user_id: user.dataValues.id,
                username:user.dataValues.name,
                
            }
            const accessToken = jwt.sign(user_auth,ACCESS_TOKEN_SECRET)
            return res.json({
                message: "Logged in",
                accessToken
            })
        }else{
            return res.json({
                message:"Failed"
            })
        }

    },
    authenticator(req,res,next){
        const auth_header = req.headers['authorization']
        const token = auth_header && auth_header.split(" ")[1]

        if(token == null){
            return res.json({
                message:"Insufficient permissions, a token MUST be passed"
            },401)
        }

        jwt.verify(token,ACCESS_TOKEN_SECRET,(err,user,id)=>{
            if(err) return res.send({
                message:"Invalid token"
            },401)
            req.name = user
            req.id = id
            next()
        })
            
        

    }
}