import bcrypt from "bcrypt";

import * as userService from "../services/user.service.js";
import * as verifyUserService from "../services/verifyUser.service.js";
import raiseError from "../utils/raiseError.js";
import requiredFields from "../utils/requiredFields.js";
import generateOTP from "../utils/otpGenerator.js";
import sendEmail from "../utils/email.js";

//get User
export const getUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(raiseError("Please provide agent id in request parameters"));
    }
    const user = await userService.getUserById(req.params.id);

    if (!user) next(raiseError("There is no user with the given Id", 400));
    return res
      .send({
        status: "Success",
        data: user,
      })
      .status(200);
  } catch (error) {
    console.log(error);
  }
};

// User
export const createUser = async (req, res, next) => {
  try {
    requiredFields(req.body, ["id", "email_otp"]);

    const user = await verifyUserService.findVerifyUser(req.body.id);

    if (!user) {
      return next(raiseError("Error occurred, Register again.", 500));
    }

    const newUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      password: user.password,
    };

    if (req.body.email_otp === user.email_otp) {
      const verifiedUser = await userService.createUser(newUser);
      if (verifiedUser)
        res.status(200).send({
          status: "Success",
          message: "Data saved successfully",
          user_id: user.id,
        });

      return await verifyUserService.deleteVerifyUser(user.id);
    }
    return next(raiseError("Incorrect OTP", 400));
  } catch (error) {
    console.log(error);
  }
};

// verify User
export const verifyUser = async (req, res, next) => {
  try {
    requiredFields(req.body, [
      "first_name",
      "last_name",
      "phone_number",
      "email",
      "password",
    ]);

    // if(req.body.phone_number.starts)

    req.body.phone_number = `+91${req.body.phone_number}`;

    let user = await userService.findUser(req.body.email);
    if (user) {
      return next(raiseError("This Email id already exist.", 400));
    }

    const otp = generateOTP(6);

    sendEmail(req.body.email, otp);

    req.body.email_otp = otp;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;

    user = await verifyUserService.createVerifyUser(req.body);

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

export const resendOtp = async (req, res, next) => {
  requiredFields(req.body, ["id"]);

  const otp = generateOTP(6);

  try {
    const user = await verifyUserService.findVerifyUser(req.body.id);
    if (!user) {
      return next(raiseError("Error occurred, Register again.", 500));
    }
    await verifyUserService.updateVerifyUser(user.id, otp);

    sendEmail(user.email, otp);
    return res.status(200).send({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(raiseError("Please provide agent id in request parameters"));
    }
    let user = await userService.getUserById(req.params.id);

    if (!user) next(raiseError("There is no user with the given Id", 400));
    user = await userService.updateUser(user.id, req.body);
    if (user) {
      return res.status(200).send({
        status: "Success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(raiseError("Please provide agent id in request parameters"));
    }
    let user = await userService.getUserById(req.params.id);

    if (!user) next(raiseError("There is no user with the given Id", 400));
    user = await userService.deleteUser(user.id);
    if (user) {
      return res.status(200).send({
        status: "Success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
