import { z } from "zod"

const emailValidator = z
    .string()
    .trim()
    .email("El correo electrónico no es válido")
    .toLowerCase()
    .endsWith("@gmail.com", "El correo debe ser de Gmail")

const passwordValidator = z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(30, "La contraseña no puede superar los 30 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/\d/, "La contraseña debe contener al menos un número")
    .regex(/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/, "La contraseña debe contener al menos un carácter especial")

export const registerUserValidator = z.object({
    username: z
        .string()
        .trim()
        .min(2, "El nombre de usuario debe tener al menos 2 caracteres")
        .max(30, "El nombre de usuario no puede superar los 30 caracteres")
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre de usuario solo puede contener letras"),

    email: emailValidator,

    password: passwordValidator
})

export const loginUserValidator = z.object({
    email: emailValidator,

    password: z
        .string()
        .min(1, "La contraseña es obligatoria")
})