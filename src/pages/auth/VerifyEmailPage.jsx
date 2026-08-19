import { Navigate, useNavigate } from "react-router";

import { BackButton } from "@/components/auth/BackButton";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  clearPendingRegistration,
  getPendingRegistration,
} from "@/utils/pending-registration";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const pending = getPendingRegistration();

  if (!pending) {
    return <Navigate to="/register" replace />;
  }

  function handleVerified() {
    clearPendingRegistration();

    navigate("/login", {
      replace: true,
      state: {
        verified: true,
      },
    });
  }
  function handleAttemptsExceeded() {
    clearPendingRegistration();

    navigate("/register", {
      replace: true,
      state: {
        verificationFailed: true,
      },
    });
  }

  return (
    <div className="w-full max-w-md hover:border-ring ">
      <Card className=" hover:shadow-[0_10px_30px_var(--glow-primary)] transition-all duration-300 ease-linear hover:-translate-y-2 focus:scale-125">
        <CardHeader>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
              H
            </div>

            <span className="text-xs font-medium">HrungMoto</span>
          </div>

          <CardTitle className="text-3xl font-bold">
            Verify your email
          </CardTitle>
          <CardDescription className="text-lg text-chart">
            sent to : <span className="text-chart-3">{pending.email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm
            expiresAt={pending.expiresAt}
            email={pending.email}
            resendAvailableAt={pending.resendAvailableAt}
            onVerified={handleVerified}
            onAttemptsExceeded={handleAttemptsExceeded}
          />
        </CardContent>
      </Card>
      <div className="w-full mx-auto flex justify-center py-6">
        <BackButton />
      </div>
    </div>
  );
}
