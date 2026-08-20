export function getApiError(error, fallbackMessage = "Something went wrong.") {
  if (error?.code === "ERR_CANCELED" || error?.name === "CanceledError") {
    return {
      status: 0,
      code: "REQUEST_CANCELED",
      message: "",
      fieldErrors: null,
      isCanceled: true,
    };
  }

  if (error?.code === "ECONNABORTED") {
    return {
      status: 0,
      code: "REQUEST_TIMEOUT",
      message: "The request took too long. Please try again.",
      fieldErrors: null,
      isCanceled: false,
    };
  }

  if (!error?.response) {
    return {
      status: 0,
      code: "NETWORK_ERROR",
      message: "Unable to connect to the server.",
      fieldErrors: null,
      isCanceled: false,
    };
  }

  const status = error.response.status;
  const body = error.response.data ?? {};
  const serverError = body.error;

  const errorDetails =
    typeof serverError === "object" && serverError !== null ? serverError : {};

  const code = body.code ?? errorDetails.code ?? `HTTP_${status}`;

  const fieldErrors = body.errors ?? errorDetails.fields ?? null;

  const serverMessage =
    body.message ??
    (typeof serverError === "string" ? serverError : serverError?.message);

  const firstFieldError = Array.isArray(fieldErrors)
    ? fieldErrors[0]?.message
    : null;
  let message;
  if (status >= 500) {
    message = "The server is temporarily unavailable. Please try again.";
  } else if (code === "VALIDATINO_ERROR") {
    message = firstFieldError ?? serverError ?? fallbackMessage;
  } else {
    message = serverMessage ?? fallbackMessage;
  }
  return {
    status,
    code,
    message,
    fieldErrors,
    isCanceled: false,

    attemptsRemaining:
      body.attemptsRemaining ?? errorDetails.attemptsRemaining ?? null,

    retryAfterSeconds:
      body.retryAfterSeconds ?? errorDetails.retryAfterSeconds ?? null,

    expiresAt: body.expiresAt ?? errorDetails.expiresAt ?? null,

    resendAvailableAt:
      body.resendAvailableAt ?? errorDetails.resendAvailableAt ?? null,
  };
}
