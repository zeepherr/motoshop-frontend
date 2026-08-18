import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.35Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.98-.9 6.64-2.42l-3.24-2.51c-.9.6-2.05.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.9A6.02 6.02 0 0 1 6.08 12c0-.66.11-1.3.31-1.9V7.51H3.04A10 10 0 0 0 2 12c0 1.61.39 3.13 1.04 4.49l3.35-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.97c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.51L6.39 10.1C7.18 7.73 9.39 5.97 12 5.97Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
    </svg>
  );
}

export default function Test() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Connect your login API here.
  };

  return (
    <main className="min-h-dvh bg-neutral-100 p-2 sm:p-4 lg:p-6">
      <section
        className="
          relative mx-auto flex min-h-[calc(100dvh-1rem)] max-w-305
          overflow-hidden rounded-[22px] border border-neutral-200 bg-white
          shadow-[0_18px_55px_rgba(0,0,0,0.08)]
          sm:min-h-[calc(100dvh-2rem)]
          lg:min-h-190 lg:max-h-225
        "
      >
        {/* subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-65"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(17,17,17,.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,.045) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* scattered squares */}
        <div className="pointer-events-none absolute left-[16%] top-0 size-10 bg-neutral-50" />
        <div className="pointer-events-none absolute left-[30%] top-0 size-10 bg-neutral-50" />
        <div className="pointer-events-none absolute left-0 top-[24%] size-10 bg-neutral-50" />
        <div className="pointer-events-none absolute left-[34%] top-[14%] size-10 bg-neutral-100/80" />
        <div className="pointer-events-none absolute right-[8%] top-[6%] size-10 bg-neutral-100/80" />
        <div className="pointer-events-none absolute right-[2%] top-[44%] size-10 bg-neutral-100/80" />

        <div className="relative z-10 grid w-full lg:grid-cols-[1fr_1.08fr]">
          {/* Left: login form */}
          <div className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14">
            <div className="w-full max-w-92.5">
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 grid size-9 place-items-center rounded-xl bg-neutral-950 text-white shadow-sm">
                  <span className="text-lg font-black leading-none">H</span>
                </div>

                <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-neutral-950">
                  Sign in to HrungMoto
                </h1>

                <p className="mt-1.5 text-sm text-neutral-500">Welcome back.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-neutral-900"
                  >
                    Email or username
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="username"
                    placeholder="Email or username"
                    className="
                      h-11 w-full rounded-xl border border-neutral-200 bg-white
                      px-3.5 text-sm text-neutral-950 outline-none transition
                      placeholder:text-neutral-400
                      focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100
                    "
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-neutral-900"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs text-neutral-500 transition hover:text-neutral-950"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="
                        h-11 w-full rounded-xl border border-neutral-200 bg-white
                        px-3.5 pr-11 text-sm text-neutral-950 outline-none transition
                        placeholder:text-neutral-400
                        focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100
                      "
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="
                        absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1
                        text-neutral-500 transition hover:bg-neutral-100
                        hover:text-neutral-950
                      "
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="
                    h-11 w-full rounded-xl bg-neutral-950 px-4 text-sm
                    font-semibold text-white shadow-sm transition
                    hover:bg-neutral-800 active:scale-[0.99]
                    focus:outline-none focus:ring-4 focus:ring-neutral-200
                  "
                >
                  Sign in
                </button>
              </form>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-neutral-200" />
                <span className="text-xs text-neutral-400">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-neutral-200" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="
                    flex h-11 items-center justify-center gap-2 rounded-xl
                    border border-neutral-200 bg-white text-sm font-medium
                    text-neutral-900 transition hover:bg-neutral-50
                  "
                >
                  <GoogleIcon />
                  Google
                </button>

                <button
                  type="button"
                  className="
                    flex h-11 items-center justify-center gap-2 rounded-xl
                    border border-neutral-200 bg-white text-sm font-medium
                    text-neutral-900 transition hover:bg-neutral-50
                  "
                >
                  <AppleIcon />
                  Apple
                </button>
              </div>

              <p className="mt-7 text-center text-sm text-neutral-500">
                Need an account?{" "}
                <button
                  type="button"
                  className="font-medium text-neutral-950 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          {/* Right: visual panel */}
          <div className="hidden items-center justify-center p-8 lg:flex xl:p-12">
            <div
              className="
                relative h-1660 w-full max-w-125 overflow-hidden
                rounded-[22px] border border-white/70
                bg-[linear-gradient(145deg,#d9ebf6_0%,#eaf4fa_42%,#d0e5f1_100%)]
                shadow-[inset_0_1px_0_rgba(255,255,255,.9)]
              "
            >
              <div className="absolute left-[-28%] top-[-8%] h-[125%] w-[72%] rotate-11 rounded-[48%] border-[3px] border-white/55 bg-white/10 blur-[0.2px]" />
              <div className="absolute right-[-20%] top-[-12%] h-[72%] w-[80%] rotate-[-24deg] rounded-[45%] border-[3px] border-white/60 bg-white/10" />
              <div className="absolute bottom-[-32%] left-[2%] h-[88%] w-[82%] rotate-[5deg] rounded-[48%] border-[3px] border-white/60 bg-white/10" />
              <div className="absolute bottom-[17%] right-[-22%] h-[40%] w-[88%] rotate-[-10deg] rounded-[45%] border-2 border-white/50 bg-white/10" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,.70),transparent_32%),radial-gradient(circle_at_35%_70%,rgba(255,255,255,.50),transparent_36%)]" />

              <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
