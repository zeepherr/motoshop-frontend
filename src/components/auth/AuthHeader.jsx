import { Link } from "react-router";
import { ThemeSwitcher } from "../theme/ThemeToggle";

export default function AuthHeader() {
  return (
    <header className="h-16 border-b border-border bg-card">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            H
          </div>

          <span className="text-sm font-semibold">HrungMoto</span>
        </Link>

        {/* Actions */}
        <nav className="flex items-center gap-2">
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
