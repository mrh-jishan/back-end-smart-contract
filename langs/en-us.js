'use strict'

var module, exports;

module.exports.errors = {
  INTERNAL_ERROR: {
    message: "Internal Server Error",
    code: 500
  },
  NO_API_FOUND: {
    message: "This Api Is Not Implemented Till Now",
    code: 404
  },
  RESOURCE_NOT_FOUND: {
    message: "Oops! Something went wrong.Try again…",
    code: 404
  },
  NO_DATA_FOUND: {
    message: "No Data Found!!",
    code: 401
  },
  ACC_DENIED: {
    message: "Access denied",
    code: 403
  },
  PASSWORD_MISMATCH: {
    message: "Password is incorrect",
    code: 401
  },
  USER_NOT_FOUND: {
    message: "Requested user not found",
    code: 401
  },
  CUSTOM_MESSAGE: {
    message: "Please include a message for this response",
    code: 404
  },
  DATABASE_ERROR: {
    message: "We have found some database errors in servers",
    code: 500
  },
  INVALID_EMAIL: {
    message: "Oops! We need a valid email address",
    code: 401
  },
  INVALID_MOBILE: {
    message: "Please enter a valid mobile number",
    code: 401
  },
  UNAUTHORIZED_TOKEN: {
    message: "Unauthorized",
    code: 403
  },
  UNAUTHORIZED_API_KEY: {
    message: "Unauthorized API key",
    code: 403
  },
  BAD_REQ: {
    message: "BAD_REQ",
    code: 401
  },
  INV_CAPTCHA: {
    message: "Oops! That’s an invalid Captcha",
    code: 403
  },
  ALREADY_REGISTERED: {
    message: "An account with this email already exists",
    code: 403
  },
  TKN_TIME_OUT: {
    message: "Your session has expired. Please refresh the page or try to log in again.",
    code: 405
  },
  TKN_MISSMATCH: {
    message: "code mismatch. Please enter correct verification code.",
    code: 403
  },
  VERIFICATION_TKN_REQ: {
    message: "verification token required",
    code: 403
  },
  TRY_AFTER_SOMETIME: {
    message: "Can not send email. Please try after sometime",
    code: 401
  },
  CAPTCHA_KEY_REQ: {
    message: "Captcha key is required",
    code: 401
  },
  OLD_PWD_REQ: {
    message: "Oops! Your old password is required",
    code: 401
  },
  OLD_PWD_MISMATCH: {
    message: "Oops! Your password does not match",
    code: 401
  },
  SOMTHING_WENT_WRONG: {
    message: "Something went wrong. Please try again",
    code: 401
  },
  NOT_ALLOWED: {
    message: "This action is not allowed at this point.",
    code: 401
  },
  UNAUTH_SECRET: {
    message: "Unauthorized secret key",
    code: 403
  },
  PWDE_REQ: {
    message: "Oops! A password is required",
    code: 403
  },
  CNFPWD_REQ: {
    message: "Oops! You will need to confirm your password",
    code: 403
  },
  CNFPWD_MISMATCH: {
    message: "Confirm password  should match with password",
    code: 403
  },
  AMT_REQ: {
    message: "Oops! You will need to enter a payment amount",
    code: 403
  },
  INV_OTP: {
    message: "Oops! OTP invalid…",
    code: 403
  },
  USED_VOUCHER_CODE: {
    message: "Oops! It's already Redeemed…",
    code: 403
  },
  EXP_OTP: {
    message: "Oops! OTP has expired. Please request for new OTP",
    code: 403
  },

}

module.exports.success = {
  SUCCESS: {
    message: "success",
    code: 200
  }
}
