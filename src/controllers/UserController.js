const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = 'cf1ee8d115083b3463e667029ec7f67c5d9b0b0a58f3e2beda1f2bec60fe42a05f8658e64bcb1d18274b7d224ffd649f3151f518ad4d5757445f8e36efbd48c8'

module.exports = {
    async get_all_users(req,res){
        const users = await User.findAll()
        
        let formated_users = []

        users.forEach(element => {
            const value = {
                id: element.id,
                name: element.name,
                email: element.email
            }
            formated_users.push(value)
        });

        return res.json(formated_users)

    },
    async get_user(req,res){
        const { id } = req.params
        
        const user = await User.findByPk(id)
        const user_template = {
            name: user.name,
            email: user.email
        }
        return res.json(user_template)
    },
    async store(req,res){

        const { name, email, password } = req.body

        if((!name) || (!email) || (!password)) return res.json({
            message: "Missining data"
        })
        try{


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
                message: "Email Already Exists"
            })
        }
 
    },
    async user_login(req,res){
        const { email, password } = req.body
    
        if((!email) || (!password)) return res.json({
            message: "Missining data"
        })
        try{
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
                    message:"Wrong values"
                })
            }
        }catch{
            return res.json({
                message:"Wrong values"
            })
        }
        

    },
    authenticator(req,res,next){
        const auth_header = req.headers['authorization']
        if(!auth_header) return res.json({
            message: "Authentication Header is required"
        })
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