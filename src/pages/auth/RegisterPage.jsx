import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

import { registerUser } from "@/api/auth/auth.api";
import { FormField } from "@/components/auth/FormField";
import { ContentLoader } from "@/components/loading/ContentLoader";
import { Input } from "@/components/ui/input";
import { getApiError } from "@/utils/api.error";
import { savePendingRegistration } from "@/utils/pending-registration";
import { registerSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });
  const focusNextOnEnter = (event, nextField) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    setFocus(nextField);
  };
  const onSubmit = async (values) => {
    try {
      setServerError("");

      const data = await registerUser(values);
      savePendingRegistration({
        email: data.email,
        expiresAt: data.expiresAt,
        resendAvailableAt: data.resendAvailableAt,
      });

      navigate("/verify-email", {
        replace: true,
        state: {
          email: data.email,
          expiresAt: data.expiresAt,
          resendAvailableAt: data.resendAvailableAt,
        },
      });
    } catch (error) {
      const apiError = error.apiError ?? getApiError(error);

      if (apiError.code === "REGISTRATION_PENDING") {
        savePendingRegistration({
          email: values.email,
          expiresAt: apiError.expiresAt,
          resendAvailableAt: apiError.resendAvailableAt,
        });

        navigate("/verify-email", {
          replace: true,
        });

        return;
      }

      if (apiError.code === "ALREADY_REGISTERED") {
        setServerError(
          "This email is already registered. Please login instead.",
        );

        return;
      }

      if (apiError.fieldErrors) {
        Object.entries(apiError.fieldErrors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message: Array.isArray(message) ? message[0] : message,
          });
        });

        return;
      }

      setServerError(apiError.message);
    }
  };
  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
              H
            </div>

            <span className="text-xs font-medium">HrungMoto</span>
          </div>

          <CardTitle className="text-2xl">Create your account</CardTitle>

          <CardDescription>
            Register as a member to manage your motorcycles and order history.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 "
            noValidate
            aria-busy={isSubmitting}
          >
            <fieldset disabled={isSubmitting} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  id="firstName"
                  label="First name"
                  error={errors.firstName?.message}
                >
                  <Input
                    id="firstName"
                    autoComplete="given-name"
                    placeholder="First name"
                    {...register("firstName")}
                    onKeyDown={(event) => focusNextOnEnter(event, "lastName")}
                  />
                </FormField>

                <FormField
                  id="lastName"
                  label="Last name"
                  error={errors.lastName?.message}
                >
                  <Input
                    id="lastName"
                    autoComplete="family-name"
                    placeholder="Last name"
                    {...register("lastName")}
                    onKeyDown={(event) => focusNextOnEnter(event, "email")}
                  />
                </FormField>
              </div>

              <FormField id="email" label="Email" error={errors.email?.message}>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  onKeyDown={(event) => focusNextOnEnter(event, "password")}
                />
              </FormField>

              <FormField
                id="password"
                label="Password"
                error={errors.password?.message}
              >
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Create a password"
                  {...register("password")}
                  onKeyDown={(event) =>
                    focusNextOnEnter(event, "confirmPassword")
                  }
                />
              </FormField>

              <FormField
                id="confirmPassword"
                label="Confirm password"
                error={errors.confirmPassword?.message}
              >
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Repeat your password"
                  {...register("confirmPassword")}
                />
              </FormField>
              {serverError && (
                <div
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                >
                  {serverError}
                </div>
              )}
              <Button type="submit" className="w-full">
                {isSubmitting ? "Sending OTP..." : "Continue"}
              </Button>
            </fieldset>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
      {isSubmitting && <ContentLoader />}
    </>
  );
}
