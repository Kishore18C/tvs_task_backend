import { VerifyUser } from "../models/index.js";

export const createVerifyUser = async (data) => {
  try {
    const user = await VerifyUser.create(data);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const findVerifyUser = async (id) => {
  try {
    const user = await VerifyUser.findOne({ where: { id } });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateVerifyUser = async (id, email_otp) => {
  try {
    const user = await VerifyUser.update({ email_otp }, { where: { id } });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const deleteVerifyUser = async (id) => {
  try {
    const user = await VerifyUser.destroy({ where: { id } });
    return user;
  } catch (error) {
    console.log(error);
  }
};
