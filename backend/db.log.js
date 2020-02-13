module.exports = (sequelize, DataTypes) => {
  return sequelize.define('log', {
    idx: {
      type: DataTypes.INTEGER(11),
    },
    createAt: {
      type: DataTypes.STRING(100),
    }
  },
  {
    timestamps: false
  })
}