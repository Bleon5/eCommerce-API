import { Sequelize,DataTypes } from "sequelize";
import { config } from "dotenv";

config();

const DB_URL=process.env.DB_URL;

const sequelize= new Sequelize(DB_URL,{logging:false});

const Product=sequelize.define(
    'Product',
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        categoryId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'category',
                key:'id'
            }
        }
    },
{
    tableName:'product'
});

sequelize.sync({force:true});

export default Product;