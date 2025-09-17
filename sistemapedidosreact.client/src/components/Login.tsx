import React, { useState } from 'react';
import type { LoginForm } from '../interfaces/login-form';
import { LoginPost } from '../services/login-service';

export interface LoginProps {
    onLoginSuccess: (userName: string, token: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [formData, setFormData] = useState<LoginForm>({ userName: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!formData.userName || !formData.password) {
            setError('Por favor, ingresa usuario y password.');
            return;
        }

        try {
            const response = await LoginPost(formData)
            if (response) {
                onLoginSuccess(formData?.userName, response?.token);
            }
            else {
                setError('Credenciales incorrectas.');
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <>
            <h1 className="text-primary text-2xl font-semibold w-full text-center mb-3">Ingresar</h1>
            <form onSubmit={handleSubmit} className="p-4 bg-gray-400 rounded-md max-w-xl">
                <div className="m-auto flex justify-between px-2 mb-3 mt-8">
                    <label htmlFor="userName" className="text-white mr-3">Usuario:</label>
                    <input className="border-1 border-gray-400 rounded-sm px-2 bg-white w-50 sm:w-100"
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="m-auto flex justify-between px-2 my-3">
                    <label htmlFor="password" className="text-white mr-3">Password:</label>
                    <input className="border-1 border-gray-400 rounded-sm px-2 bg-white w-50 sm:w-100"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {error && <p className="text-danger font-semibold px-2">{error}</p>}
                <div className="w-full flex mb-3">
                    <button type="submit" className="button__primary mt-2 m-auto">Iniciar sesión</button>
                </div>
            </form>
        </>
    );
};