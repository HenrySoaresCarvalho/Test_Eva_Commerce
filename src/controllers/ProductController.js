const Product = require("../models/Product")
module.exports ={
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
        res.json(product)
    }
}