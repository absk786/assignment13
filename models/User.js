const {Model, DataTypes, STRING} =  require('sequelize')
const sequelize = require('sequelize')
const bcrypt = require('bcypt')
const exp = require('constants')
class User extends Model {

}

User.init (
    {

        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }

        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[4]
            }
        }
},
{
    hooks:{
        
    },
    sequelize,
    timestamps:true,
    freezeTableName:true,
    underscored:true,
    modelName:'User'
}
)

module.exports = User;