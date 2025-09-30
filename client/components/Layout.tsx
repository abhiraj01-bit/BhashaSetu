import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Fragment } from "react";

export default function Layout() {
  const { pathname } = useLocation();
  const nav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];
  return (
    <Fragment>
      <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="group inline-flex items-center gap-2">
            <svg className="h-7 w-7 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 16c4-6 14-6 18 0" className="stroke-amber-500" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 16c3-4.5 11-4.5 14 0" className="stroke-emerald-600" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 16c2-3 8-3 10 0" className="stroke-sky-600" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-extrabold tracking-tight text-lg text-foreground">BhashaSetu</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {nav.map((n) => (
              <Link
                key={n.href}
                to={n.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === n.href
                    ? "text-foreground bg-accent/60"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/40",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="secondary" size="sm">
              <a href="#try">Try it</a>
            </Button>
          </div>
        </div>
      </header>
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      <footer className="border-t border-border/50 bg-background/60">
        <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} BhashaSetu. AI/ML OCR + MT for Nepali & Sinhala → English.
          </p>
          <div className="flex items-center gap-4">
            <a className="hover:text-foreground" href="/about">About</a>
            <a className="hover:text-foreground" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
