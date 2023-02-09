import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone_number: {
        type: DataTypes.STRING(25),
        allowNull: false,
        len: [10, 15],
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
      },

      age: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },

      nationality: {
        type: DataTypes.STRING,
      },
      aadhar_number: {
        type: DataTypes.STRING(25),

        len: [10, 15],
      },
      status: {
        type: DataTypes.STRING(25),
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
