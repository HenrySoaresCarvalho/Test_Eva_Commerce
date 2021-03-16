const { Model, DataTypes, Sequelize } = require('sequelize')

class Product extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.DOUBLE,
            image1:DataTypes.STRING,
            image2:DataTypes.STRING,
            image3:DataTypes.STRING
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.User, {
            foreignKey:'creator_id',
            as: 'owner'
        })
    }
}

module.exports = Product;