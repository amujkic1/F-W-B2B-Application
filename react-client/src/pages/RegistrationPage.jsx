import { useState } from "react";
import { Link } from "react-router-dom";

import { useRegisterMutation } from "@/queries/useAuth.js";
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

export function RegistrationPage() {
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerMutation = useRegisterMutation();
  const isPending = registerMutation.isPending;

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (
      !companyName.trim() ||
      !fullName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setErrorMessage("Fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password.length > 50) {
      setErrorMessage("Password cannot be longer than 50 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password and confirmation password do not match.");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("You must accept the terms of use.");
      return;
    }

    registerMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          setMessage("Registration successful. You can sign in now.");
          setCompanyName("");
          setFullName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setTermsAccepted(false);
        },
        onError: (error) => {
          setErrorMessage(error.message);
        },
      },
    );
  }

  return (
    <main className="app-shell grid h-screen place-items-center overflow-hidden px-4 py-4">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.03]" />
      <div className="pointer-events-none absolute left-[-12%] top-16 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-8%] bottom-[-10%] h-80 w-80 rounded-full bg-primary/10 blur-[140px]" />

      <Card className="relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-lg flex-col animate-reveal">
        <CardHeader className="space-y-4">
          <div className="section-pill w-fit">
            <span className="section-pill-dot animate-pulse-dot" />
            <span className="section-label text-accent">Create account</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl md:text-4xl">Registration</CardTitle>
            <CardDescription>
              Create a B2B account and start connecting with partners.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="companyName">Company name</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Example Ltd."
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="First Last"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="registerEmail">Business email</Label>
                <Input
                  id="registerEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registerPassword">Password</Label>
                <Input
                  id="registerPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="8-50 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="size-4 rounded border-input text-primary focus:ring-2 focus:ring-accent/20"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
              />
              I accept the terms of use
            </label>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-3">
          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}
          <p className="text-sm text-muted-foreground">{message || " "}</p>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className={buttonVariants({
                variant: "link",
                className: "h-auto p-0",
              })}
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
