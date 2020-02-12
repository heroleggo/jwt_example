module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(16),
      allowNull: false,
    }
  },{
    timestamps: false
  }
  )
}