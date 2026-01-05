module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    UserID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID,
    },
    First_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Last_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Is_Admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    Orders: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  console.log(User === sequelize.models.User);
  return User;
};
