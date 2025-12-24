import showToast from "./toast-service";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function GetAllSpecialSchedules() {
    const response = await fetch(`${apiUrl}/api/SpecialSchedule/GetAll`);
    if (response.ok) {
        const data = await response?.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al obtener los días.`, error: true });
    }
}

export async function GetSpecialScheduleByDate(date: any) {
    const response = await fetch(`${apiUrl}/api/SpecialSchedule/GetByDayWeek/${date}`);
    if (response.ok) {
        const data = await response?.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al obtener el día ${date}.`, error: true });
    }
}

export async function CreateSpecialSchedule(parameter: any) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/SpecialSchedule/Create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al crear el parámetro ${parameter?.key}.`, error: true });
    }
}

export async function UpdateSpecialSchedule(parameter: any) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/SpecialSchedule/Update`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al actualizar el parámetro ${parameter?.key}.`, error: true });
    }
}

export async function DeleteSpecialSchedule(id: number) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/SpecialSchedule/Delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al eliminar el registyro ${id}.`, error: true });
    }
}