import { Op } from "sequelize";

import { User } from "../models/index.js";

export const getUserById = async (id) => {
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [{ id }],
      },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "phone_number",
        "email",
        "gender",
        "age",
        "aadhar_number",
        "address",
        "nationality",
        "status",
        "date_of_birth",
      ],
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const findUser = async (email) => {
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (email, password) => {
  try {
    const user = await User.update({ password }, { where: { email } });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, data) => {
  try {
    const user = await User.update(data, { where: { id } });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await User.destroy({ where: { id } });
    return user;
  } catch (error) {
    console.log(error);
  }
};
