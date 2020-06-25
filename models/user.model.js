module.exports = (sequelize, DataTypes) =>{
    var User = sequelize.define('user', {
        id_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,      
        },
        name: {
            type: DataTypes.STRING,      
        },
        email: {
            type: DataTypes.STRING,      
        },
        telephone: {
            type: DataTypes.STRING,      
        },
        address: {
            type: DataTypes.STRING,      
        },
        password: {
            type: DataTypes.STRING,      
        },
        admin: {
            type: DataTypes.INTEGER,
        }
    }, {
        timestamps: false
    });

    return User;
}