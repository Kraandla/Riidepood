module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      UserID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      IsAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
  
      RefreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }
  );
  console.log(User === sequelize.models.User);
  return User;
};
