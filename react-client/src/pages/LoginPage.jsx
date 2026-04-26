import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button, buttonVariants } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useLoginMutation } from "../queries/useAuth";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const fromPath = location.state?.from?.pathname || "/dashboard";
  const fromSearch = location.state?.from?.search || "";
  const fromHash = location.state?.from?.hash || "";

  const { 
    mutate: login, 
    isPending, 
    error, 
    reset // Funkcija za čišćenje error stanja ako zatreba
  } = useLoginMutation();

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
          setRememberMe(false);
          navigate(`${fromPath}${fromSearch}${fromHash}`, { replace: true });
        },
      }
    );
  }

  return (
    <main className="app-shell grid min-h-screen place-items-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.03]" />
      
      <Card className="relative z-10 w-full max-w-md animate-reveal">
        <CardHeader className="space-y-4">
          <div className="section-pill w-fit">
            <span className="section-pill-dot animate-pulse-dot" />
            <span className="section-label text-accent">Secure access</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl md:text-4xl">Prijava</CardTitle>
            <CardDescription>
              Prijavi se na svoj B2B račun da nastaviš.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ime@firma.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) reset(); // Briše grešku dok korisnik ponovo tipka
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) reset();
                }}
                required
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="size-4 rounded border-input text-primary"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Zapamti me
            </label>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Prijava u toku..." : "Prijavi se"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-3">
          {error && (
            <p className="text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
              {error.message}
            </p>
          )}
          
          <p className="text-sm text-muted-foreground">
            Nemaš račun?{" "}
            <Link
              to="/register"
              className={buttonVariants({
                variant: "link",
                className: "h-auto p-0",
              })}
            >
              Registruj se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}