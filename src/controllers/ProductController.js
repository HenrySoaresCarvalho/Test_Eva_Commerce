const Product = require("../models/Product")
module.exports ={
    async get_all_products(req,res){
        const products = await Product.findAll()
        return res.json(products)
    },
    async get_product_by_id(req,res){
        const {id} = req.params
        const product = await Product.findByPk(id)
       
        return res.json(product)

    },
    async remove_product(req,res){
        const {id} = req.params
        const remover = await Product.destroy({
            where:{
                id
            }
        })
        return res.json({
            message:"Removed"
        })
    },
    async store(req,res){
        const { name, description, price, image1, image2, image3 } = req.body
        const {user_id} = req.name
        const new_product = {
            name,
            description,
            price,
            image1,
            image2,
            image3,
            creator_id: user_id
        }
        const product = await Product.create(new_product)
        res.json({
            message: "Created",
            product
        },200)
    }
}