const {Model, DataTypes} =  require('sequlize')
const sequelize = require('sequelize')
const bcrypt = require('bcypt')
const exp = require('constants')


class User extends Model {

}

User.init (
    {

        id:{

        },
        username:{

        },
        email: {

        },
        password:{

        }
}
)