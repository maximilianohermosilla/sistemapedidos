const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function GetParameterByKey(key: string) {
    const response = await fetch(`${apiUrl}/api/parameter/getbykey/${key}`);
    if (response.ok) {
        const data = await response?.json();
        return data;
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
        const data = await response.json();
        return data;
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
        const data = await response.json();
        return data;
    }
}