module.exports = (sequelize, DataTypes) =>{
    var Status = sequelize.define('status', {
        id_status: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,      
        }
    }, {
        timestamps: false
    });

    return Status;
}