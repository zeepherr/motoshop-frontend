export function getOtpError(apiError) {
  if (apiError.code === "INVALID_VERIFICATION_CODE") {
    return {
      type: "invalid",
      message: apiError.message,
    };
  }

  if (apiError.code === "VERIFICATION_CODE_EXPIRED") {
    return {
      type: "expired",
      message: "Code expired. Please request a new one.",
    };
  }

  if (
    apiError.code === "TOO_MANY_VERIFICATION_ATTEMPTS" ||
    apiError.code === "REGISTRATION_SESSION_EXPIRED"
  ) {
    return {
      type: "session-expired",
    };
  }

  return {
    type: "general",
    message: apiError.message,
  };
}
