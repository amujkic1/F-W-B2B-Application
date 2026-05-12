import { useState } from "react";
import { Link } from "react-router-dom";

import { useRegisterMutation } from "@/queries/useAuth.js";
import { useCompanyTypes } from "@/queries/useCompanyTypes.js";
import { useIndustries } from "@/queries/useIndustries.js";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";

const COMPANY_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201+"];
const REGISTRATION_STEPS = [
  {
    title: "Company basics",
    description: "Start with the company workspace.",
  },
  {
    title: "Company context",
    description: "Add details that improve matching.",
  },
  {
    title: "Your profile",
    description: "Tell partners who they will meet.",
  },
  {
    title: "Secure access",
    description: "Create your sign-in credentials.",
  },
];

function splitFullName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");

  return {
    firstName,
    lastName: lastName || firstName,
  };
}

function getItems(data) {
  return Array.isArray(data) ? data : data?.items || [];
}

export function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [companyTypeId, setCompanyTypeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerMutation = useRegisterMutation();
  const industriesQuery = useIndustries({ limit: 100 });
  const companyTypesQuery = useCompanyTypes({ limit: 100 });
  const isPending = registerMutation.isPending;
  const industries = getItems(industriesQuery.data);
  const companyTypes = getItems(companyTypesQuery.data);
  const isLastStep = currentStep === REGISTRATION_STEPS.length - 1;
  const activeStep = REGISTRATION_STEPS[currentStep];

  function clearFeedback() {
    setMessage("");
    setErrorMessage("");
  }

  function validateStep(step = currentStep) {
    if (step === 0 && !companyName.trim()) {
      return "Enter your company name.";
    }

    if (step === 1 && !companySize) {
      return "Select your company size.";
    }

    if (step === 2) {
      if (!fullName.trim()) {
        return "Enter your full name.";
      }

      if (!position.trim()) {
        return "Enter your position.";
      }
    }

    if (step === 3) {
      if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
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
    }

    return "";
  }

  function handleNext() {
    clearFeedback();
    const stepError = validateStep();

    if (stepError) {
      setErrorMessage(stepError);
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, REGISTRATION_STEPS.length - 1));
  }

  function handleBack() {
    clearFeedback();
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isLastStep) {
      handleNext();
      return;
    }

    clearFeedback();
    const stepError = validateStep(3);

    if (stepError) {
      setErrorMessage(stepError);
      return;
    }

    const { firstName, lastName } = splitFullName(fullName);

    registerMutation.mutate(
      {
        email,
        password,
        profile: {
          first_name: firstName,
          last_name: lastName,
          position,
        },
        company: {
          company_name: companyName,
          company_size: companySize,
          industry_id: industryId || null,
          company_type_id: companyTypeId || null,
        },
      },
      {
        onSuccess: () => {
          setMessage("Registration successful. You can sign in now.");
          setCompanyName("");
          setFullName("");
          setPosition("");
          setCompanySize("");
          setIndustryId("");
          setCompanyTypeId("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setTermsAccepted(false);
          setCurrentStep(0);
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
            <span className="section-label text-accent">
              Step {currentStep + 1} of {REGISTRATION_STEPS.length}
            </span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl md:text-4xl">Company Registration</CardTitle>
            <CardDescription>
              {activeStep.description}
            </CardDescription>
          </div>
          <div className="grid grid-cols-4 gap-2" aria-label="Registration progress">
            {REGISTRATION_STEPS.map((step, index) => (
              <div
                key={step.title}
                className={`h-2 rounded-full transition-colors ${
                  index <= currentStep ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">{activeStep.title}</p>
              <p className="text-sm text-muted-foreground">
                {currentStep === 0 && "This becomes the company profile your team will use."}
                {currentStep === 1 && "Optional fields can be updated later from your profile."}
                {currentStep === 2 && "Your name and role help partners understand the right contact."}
                {currentStep === 3 && "Use your business email and a password you can remember."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {currentStep === 0 && (
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
              )}

              {currentStep === 1 && (
                <>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="companySize">Company size</Label>
                    <Select value={companySize} onValueChange={setCompanySize}>
                      <SelectTrigger id="companySize">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPANY_SIZE_OPTIONS.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={industryId}
                      onValueChange={setIndustryId}
                      disabled={industriesQuery.isLoading}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder={industriesQuery.isLoading ? "Loading..." : "Optional"} />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.id} value={industry.id}>
                            {industry.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyType">Company type</Label>
                    <Select
                      value={companyTypeId}
                      onValueChange={setCompanyTypeId}
                      disabled={companyTypesQuery.isLoading}
                    >
                      <SelectTrigger id="companyType">
                        <SelectValue placeholder={companyTypesQuery.isLoading ? "Loading..." : "Optional"} />
                      </SelectTrigger>
                      <SelectContent>
                        {companyTypes.map((companyType) => (
                          <SelectItem key={companyType.id} value={companyType.id}>
                            {companyType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
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
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      type="text"
                      placeholder="Founder, CEO..."
                      value={position}
                      onChange={(event) => setPosition(event.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
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
                </>
              )}
            </div>

            {currentStep === 3 && (
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="size-4 rounded border-input text-primary focus:ring-2 focus:ring-accent/20"
                  checked={termsAccepted}
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                />
                I accept the terms of use
              </label>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={currentStep === 0 || isPending}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending ? "Creating..." : isLastStep ? "Create account" : "Continue"}
              </Button>
            </div>
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
