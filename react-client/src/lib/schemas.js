import { z } from "zod";

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email je obavezno polje")
    .email("Unesite validan email"),
  password: z
    .string()
    .min(1, "Lozinka je obavezno polje")
    .min(6, "Lozinka mora imati najmanje 6 karaktera"),
  rememberMe: z.boolean().default(false),
});

export const loginDefaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};

/**
 * Registration form validation schema
 */
export const registrationSchema = z
  .object({
    companyName: z
      .string()
      .min(1, "Naziv firme je obavezno polje")
      .min(2, "Naziv firme mora imati najmanje 2 karaktera")
      .max(100, "Naziv firme ne smije biti duži od 100 karaktera"),
    fullName: z
      .string()
      .min(1, "Ime i prezime je obavezno polje")
      .min(2, "Ime i prezime mora imati najmanje 2 karaktera")
      .max(100, "Ime i prezime ne smije biti duže od 100 karaktera"),
    email: z
      .string()
      .min(1, "Email je obavezno polje")
      .email("Unesite validan email"),
    password: z
      .string()
      .min(1, "Lozinka je obavezno polje")
      .min(8, "Lozinka mora imati najmanje 8 karaktera")
      .max(50, "Lozinka ne smije biti duža od 50 karaktera")
      .regex(/[A-Z]/, "Lozinka mora sadržavati barem jedno velika slova")
      .regex(/[a-z]/, "Lozinka mora sadržavati barem jedno mala slova")
      .regex(/[0-9]/, "Lozinka mora sadržavati barem jedan broj"),
    confirmPassword: z
      .string()
      .min(1, "Potvrda lozinke je obavezno polje"),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: "Moraš prihvatiti uslove korištenja",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lozinka i potvrda lozinke se ne podudaraju",
    path: ["confirmPassword"], // This sets which field the error appears on
  });

export const registrationDefaultValues = {
  companyName: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};
