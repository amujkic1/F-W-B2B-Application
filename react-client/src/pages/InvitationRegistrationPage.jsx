import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
import {
  useInvitationRegisterMutation,
  useLoginMutation,
} from "@/queries/useAuth.js";

function splitFullName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");

  return {
    firstName,
    lastName: lastName || firstName,
  };
}

export function InvitationRegistrationPage() {
  const navigate = useNavigate();
  const { token = "" } = useParams();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const invitationRegisterMutation = useInvitationRegisterMutation();
  const loginMutation = useLoginMutation();
  const isPending =
    invitationRegisterMutation.isPending || loginMutation.isPending;
  const submitLabel = loginMutation.isPending
    ? "Signing in..."
    : invitationRegisterMutation.isPending
      ? "Joining..."
      : "Join company";

  function clearFeedback() {
    setMessage("");
    setErrorMessage("");
  }

  function validateForm() {
    if (!token.trim()) {
      return "Invitation token is missing.";
    }

    if (!email.trim() || !fullName.trim() || !position.trim()) {
      return "Fill in all required profile fields.";
    }

    if (!password.trim() || !confirmPassword.trim()) {
      return "Fill in all required account fields.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (password.length > 50) {
      return "Password cannot be longer than 50 characters.";
    }

    if (password !== confirmPassword) {
      return "Password and confirmation password do not match.";
    }

    if (!termsAccepted) {
      return "You must accept the terms of use.";
    }

    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearFeedback();

    const formError = validateForm();
    if (formError) {
      setErrorMessage(formError);
      return;
    }

    const submittedEmail = email.trim();
    const submittedPassword = password;
    const { firstName, lastName } = splitFullName(fullName);

    invitationRegisterMutation.mutate(
      {
        email: submittedEmail,
        password: submittedPassword,
        invitation_token: token.trim(),
        profile: {
          first_name: firstName,
          last_name: lastName,
          position,
        },
      },
      {
        onSuccess: () => {
          setMessage("Invitation accepted. Signing you in...");
          loginMutation.mutate(
            { email: submittedEmail, password: submittedPassword },
            {
              onSuccess: () => {
                navigate("/matchmaking", { replace: true });
              },
              onError: (error) => {
                setErrorMessage(
                  error.message ||
                    "Your account was created, but automatic sign-in failed.",
                );
              },
            },
          );
        },
        onError: (error) => {
          setErrorMessage(error.message);
        },
      },
    );
  }

  return (
    <main className="app-shell grid min-h-screen place-items-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.03]" />

      <Card className="relative z-10 w-full max-w-md animate-reveal">
        <CardHeader className="space-y-4">
          <div className="section-pill w-fit">
            <span className="section-pill-dot animate-pulse-dot" />
            <span className="section-label text-accent">Invitation access</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl md:text-4xl">Join Company</CardTitle>
            <CardDescription>
              Create your account with the email address that was invited.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="inviteEmail">Email</Label>
              <Input
                id="inviteEmail"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="inviteFullName">Full name</Label>
                <Input
                  id="inviteFullName"
                  type="text"
                  autoComplete="name"
                  placeholder="First Last"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="invitePosition">Position</Label>
                <Input
                  id="invitePosition"
                  type="text"
                  placeholder="Sales Manager"
                  value={position}
                  onChange={(event) => setPosition(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invitePassword">Password</Label>
                <Input
                  id="invitePassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="8-50 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inviteConfirmPassword">Confirm password</Label>
                <Input
                  id="inviteConfirmPassword"
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
              {submitLabel}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-3">
          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}
          <p className="text-sm text-muted-foreground">{message || " "}</p>
          <p className="text-sm text-muted-foreground">
            Already joined?{" "}
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
