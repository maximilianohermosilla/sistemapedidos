import type { LoginForm } from "../interfaces/login-form";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL: '';

export async function LoginPost(loginForm: LoginForm) {
    const response = await fetch(`${apiUrl}/api/Menu/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm)
    });
    
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}