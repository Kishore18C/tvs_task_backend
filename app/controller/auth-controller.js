import bcrypt from "bcrypt";

import requiredFields from "../utils/requiredFields.js";
import generateToken from "../utils/token.js";
import * as userService from "../services/user.service.js";
import * as verifyUserService from "../services/verifyUser.service.js";
import raiseError from "../utils/raiseError.js";
import generateOTP from "../utils/otpGenerator.js";
import sendEmail from "../utils/email.js";

export const loginUser = async (req, res, next) => {
  requiredFields(req.body, ["email", "password"]);

  const user = await userService.findUser(req.body.email);

  if (!user)
    return next(raiseError("There is no user with the given email id.", 400));

  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    return next(raiseError("The password is incorrect.", 400));
  }
  const token = generateToken({ id: user.id });
  return res.status(200).send({
    status: "Success",
    token,
  });
};

export const forgotPassword = async (req, res, next) => {
  requiredFields(req.body, ["email"]);
  try {
    let user = await userService.findUser(req.body.email);
    if (!user) {
      return next(
        raiseError("There is no account with the given email id.", 400)
      );
    }
    const otp = generateOTP(6);

    sendEmail(req.body.email, otp);

    console.log(user);

    const newUser = {
      email: user.email,
      email_otp: otp,
    };

    user = await verifyUserService.createVerifyUser(newUser);

    if (user) {
      return res.status(200).send({
        status: "Success",
        message: "Data saved successfully",
        user_id: user.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyPasswordOtp = async (req, res, next) => {
  requiredFields(req.body, ["id", "email_otp"]);
  try {
    const user = await verifyUserService.findVerifyUser(req.body.id);

    if (!user) {
      return next(raiseError());
    }
    if (req.body.email_otp === user.email_otp) {
      res.status(200).send({ status: "Success", email: user.email });
      return await verifyUserService.deleteVerifyUser(user.id);
    }
    return next(raiseError("Incorrect Otp...", 400));
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (req, res, next) => {
  requiredFields(req.body, ["email", "password"]);
  try {
    // req.body.phone_number = `+91${req.body.phone_number}`;

    let user = await userService.findUser(req.body.email);
    if (!user) {
      return next(raiseError());
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = await userService.updatePassword(req.body.email, hashedPassword);

    return res.status(200).send({
      status: "Success",
      message: "Password updated successfully...",
    });
  } catch (error) {
    console.log(error);
  }
};
