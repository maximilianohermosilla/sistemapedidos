import type { LoginForm } from "../interfaces/login-form";

export async function LoginPost(loginForm: LoginForm) {
    const response = await fetch(`/api/Menu/Login`, {
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