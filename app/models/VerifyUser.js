import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "verify_users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },

      phone_number: {
        type: DataTypes.STRING(25),
        len: [10, 15],
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      email_otp: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
