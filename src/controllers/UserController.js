const User = require("../models/User")
const bcrypt = require('bcrypt')

module.exports = {
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
            return res.json({
                message: "Logged in"
            })
        }else{
            return res.json({
                message:"Failed"
            })
        }

    }
}