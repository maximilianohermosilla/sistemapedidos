import type { LoginForm } from "../interfaces/login-form";
import showToast from "./toast-service";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function LoginPost(loginForm: LoginForm) {
    const response = await fetch(`${apiUrl}/api/Menu/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({title: 'Error', description: err.message, error: true}));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : "Ocurrió un error al iniciar sesión.", error: true });
    }
}