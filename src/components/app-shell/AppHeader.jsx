import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

// export function AppHeader({ section = "Admin", title = "Dashboard", actions }) {
//   const { theme, setTheme } = useTheme();

//   const isDark = theme === "dark";

//   const toggleTheme = () => {
//     setTheme(isDark ? "light" : "dark");
//   };
//   return (
//     <header
//       className="
//          sticky top-0 z-40
//         flex h-14 shrink-0 items-center
//         border-b bg-background/95
//         px-4 backdrop-blur-md
//         sm:px-6
//       "
//     >
//       {/* Current page */}
//       <div className="min-w-0">
//         <p className="text-xs text-muted-foreground">
//           {section} / {title}
//         </p>

//         <h2 className="truncate text-sm font-semibold">{title}</h2>
//       </div>

//       {/* Right side */}
//       {/* Search */}
//       {/* <button
//           type="button"
//           className="
//             hidden h-9 w-44 items-center gap-2
//             rounded-lg
//             bg-muted
//             px-3
//             text-sm
//             text-muted-foreground
//             md:flex
//           "
//         >
//           <Search className="size-4" />

//           <span>Search HurngMoto...</span>
//         </button> */}

//       {/* Custom actions */}

//       <div className="ml-auto flex items-center">
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           onClick={toggleTheme}
//           aria-label="Toggle theme"
//           className="
//             size-9 rounded-lg
//             text-muted-foreground
//             hover:bg-muted
//             hover:text-foreground
//           "
//         >
//           {isDark ? (
//             <Moon className="size-4.5" />
//           ) : (
//             <Sun className="size-4.5" />
//           )}
//         </Button>
//       </div>
//     </header>
//   );
// }

export function AppHeader({
  section = "Admin",
  title = "Dashboard",
  icon: Icon,
}) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <>
      {/* Left current-page control */}
      <div
        className="
          absolute left-10 top-3 z-30
          flex h-12 items-center gap-3
          rounded-xl
          bg-muted/80
          px-3
          shadow-sm
          backdrop-blur-md
          sm:left-6
        "
      >
        {Icon && (
          <div className="flex size-8 items-center justify-center rounded-lg bg-background">
            <Icon className="size-4 text-muted-foreground" />
          </div>
        )}

        <div className="min-w-0 leading-tight">
          <p className="truncate text-[11px] text-muted-foreground">
            {section} / {title}
          </p>

          <p className="truncate text-sm font-semibold">{title}</p>
        </div>
      </div>

      {/* Right theme control */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="
          absolute right-6 top-3 z-40
          size-12 rounded-full
          text-muted-foreground
          shadow-sm
          backdrop-blur-md
          transition-all
          hover:bg-muted
          hover:text-foreground
          sm:right-
          cursor-pointer
        "
      >
        {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
      </Button>
    </>
  );
}
