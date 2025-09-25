import showToast from "./toast-service";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function GetParameterByKey(key: string) {
    const response = await fetch(`${apiUrl}/api/parameter/getbykey/${key}`);
    if (response.ok) {
        const data = await response?.json().catch((err: any) => showToast({title: 'Error', description: err.message, error: true}));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al obtener el parámetro ${key}.`, error: true });
    }
}

export async function CreateParameter(parameter: any) {
    const response = await fetch(`${apiUrl}/api/parameter/Create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({title: 'Error', description: err.message, error: true}));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al crear el parámetro ${parameter?.key}.`, error: true });
    }
}

export async function UpdateParameter(parameter: any) {
    const response = await fetch(`${apiUrl}/api/parameter/Update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({title: 'Error', description: err.message, error: true}));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al actualizar el parámetro ${parameter?.key}.`, error: true });
    }
}