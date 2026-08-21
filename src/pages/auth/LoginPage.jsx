import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Navigate, useNavigate } from "react-router";

import { login } from "@/api/auth/auth.api";
import { establishSession } from "@/api/auth/auth.session";
import { FormField } from "@/components/auth/FormField";
import { ContentLoader } from "@/components/loading/ContentLoader";
import { Input } from "@/components/ui/input";
import { getRoleHome } from "@/constants/role";
import useAuthStore from "@/stores/auth.store";
import { getApiError } from "@/utils/api.error";
import { loginSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export default function LoginPage() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const user = useAuthStore((store) => store.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setServerError("");
      const data = await login(values);
      const user = await establishSession(data);
      navigate(getRoleHome(user.role), { replace: true });
      toast.success(data.message, { position: "top-center" });
    } catch (error) {
      const apiError = error.apiError ?? getApiError(error);
      setServerError(apiError.message);
    }
  };

  if (user) {
    return <Navigate to={getRoleHome(user.role)} replace />;
  }

  return (
    <>
      <Card
        className="w-full max-w-md border-none sm:px-4  px-2 hover:border-primary/50 min-h-fit h-115 flex justify-center
        hover:shadow-[0_10px_30px_var(--glow-primary)] transition-all duration-300 ease-linear hover:-translate-y-2 focus:scale-125"
      >
        <CardHeader>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
              H
            </div>

            <span className="text-xs font-medium">HrungMoto</span>
          </div>

          <CardTitle className="text-2xl">Welcome back</CardTitle>

          <CardDescription>
            Sign in to continue to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <FormField id="email" label="Email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
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
                placeholder="Enter your password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password")}
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

            <Button type="submit" className="w-full cursor-pointer">
              {isSubmitting ? "Loging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Create account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
      {isSubmitting && <ContentLoader />}
    </>
  );
}
