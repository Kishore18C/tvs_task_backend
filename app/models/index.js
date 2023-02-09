import { Sequelize, DataTypes } from "sequelize";
import user from "./Users.js";
import verifyUser from "./VerifyUser.js";

const sequelize = new Sequelize("tvs_task", "root", "password", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

async function database() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  try {
    const response = await sequelize.sync({ alter: true });
    if (response) return console.log("Successfully synced the database...");
  } catch (error) {
    console.log(error);
  }
}

const User = user(sequelize);
const VerifyUser = verifyUser(sequelize);

// User.hasOne(UserDetails, {
//   foreignKey: {
//     name: "user_id",
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });
// UserDetails.belongsTo(User);

export { database, User, VerifyUser };
