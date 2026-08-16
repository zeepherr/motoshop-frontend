import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { verifyRegistrationEmail } from "@/api/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiError } from "@/utils/api.error";
import { verifyEmailSchema } from "@/validations/auth.schema";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AttemptsExceededDialog } from "./AttemptsExceededDialog";
import { FormField } from "./FormField";
import { OtpCountdown } from "./OtpCountdown";
import { ResendCodeButton } from "./ResendCodeButton";

export function VerifyEmailForm({
  email,
  onVerified,
  onAttemptsExceeded,
  expiresAt,
  resendAvailableAt,
}) {
  const [serverError, setServerError] = useState("");
  const [attemptLimitError, setAttemptLimitError] = useState("");

  const [attemptsRemaining, setAttemptsRemaining] = useState(null);

  const [verificationBlocked, setVerificationBlocked] = useState(false);

  const [currentExpiresAt, setCurrentExpiresAt] = useState(expiresAt);

  const [currentResendAvailableAt, setCurrentResendAvailableAt] =
    useState(resendAvailableAt);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setFocus,
    resetField,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyEmailSchema),

    defaultValues: {
      code: "",
    },
  });
  const navigate = useNavigate();
  async function onSubmit(values) {
    try {
      setServerError("");
      setAttemptsRemaining(null);

      const data = await verifyRegistrationEmail({
        email,
        code: values.code,
      });

      onVerified();
      toast.success(data.message, { position: "top-center" });
    } catch (error) {
      const apiError = error.apiError ?? getApiError(error);

      handleVerificationError(apiError);
    }
  }

  const handleVerificationError = (apiError) => {
    if (apiError.code === "INVALID_VERIFICATION_CODE") {
      if (apiError.attemptsRemaining === 0) {
        setAttemptLimitError(apiError.message);
        return;
      }

      setError("code", {
        type: "server",
        message: apiError.message,
      });

      setAttemptsRemaining(apiError.attemptsRemaining);
      setFocus("code");

      return;
    }

    if (apiError.code === "TOO_MANY_VERIFICATION_ATTEMPTS") {
      setAttemptLimitError(apiError.message);
      return;
    }

    if (apiError.code === "VERIFICATION_CODE_EXPIRED") {
      setVerificationBlocked(true);
      setServerError(
        "Your verification code has expired. Please request a new code.",
      );
      return;
    }

    setServerError(apiError.message);
  };

  function handleResent(data) {
    setServerError("");
    setAttemptsRemaining(null);
    setVerificationBlocked(false);
    setCurrentExpiresAt(data.expiresAt);
    setCurrentResendAvailableAt(data.resendAvailableAt);
    clearErrors("code");
    resetField("code");
    setFocus("code");
  }
  const handleOtpExpired = useCallback(() => {
    setVerificationBlocked(true);
    setServerError(
      "Your verification code has expired. Please request a new code.",
    );
    setAttemptLimitError("Timeout please register again!");
  }, []);

  return (
    <>
      <div className="space-y-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <FormField
            id="code"
            label="Verification code"
            error={errors.code?.message}
            autofocus
          >
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="000000"
              autoFocus
              disabled={verificationBlocked}
              className="text-center text-lg tracking-[0.5em]"
              {...register("code")}
            />
          </FormField>
          <OtpCountdown
            expiresAt={currentExpiresAt}
            onExpired={handleOtpExpired}
          />

          {attemptsRemaining !== null && (
            <p className="text-sm text-muted-foreground">
              {attemptsRemaining} attempts remaining
            </p>
          )}

          {serverError && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              {serverError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitting || verificationBlocked}
          >
            {isSubmitting ? "Verifying..." : "Verify email"}
          </Button>
        </form>

        <ResendCodeButton
          email={email}
          resendAvailableAt={currentResendAvailableAt}
          onResent={handleResent}
        />
      </div>
      <AttemptsExceededDialog
        message={attemptLimitError}
        onConfirm={() => {
          setAttemptLimitError("");
          onAttemptsExceeded();
          navigate("/register");
        }}
      />
    </>
  );
}
