import showToast from "./toast-service";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function GetAllWeeklySchedules() {
    const response = await fetch(`${apiUrl}/api/WeeklySchedule/GetAll`);
    if (response.ok) {
        const data = await response?.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al obtener los días.`, error: true });
    }
}

export async function GetWeeklyScheduleByDayWeek(dayWeek: number) {
    const response = await fetch(`${apiUrl}/api/WeeklySchedule/GetByDayWeek/${dayWeek}`);
    if (response.ok) {
        const data = await response?.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al obtener el día ${dayWeek}.`, error: true });
    }
}

export async function CreateWeeklySchedule(parameter: any) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/WeeklySchedule/Create`, {
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

export async function UpdateWeeklySchedule(parameter: any) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/WeeklySchedule/Update`, {
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

export async function UpdateAllWeeklySchedules(parameters: any) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/WeeklySchedule/UpdateAll`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al actualizar los parámetros.`, error: true });
    }
}

export async function IsOpen(parameter: any, isScheduledOrder: boolean) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/WeeklySchedule/IsOpen?isScheduledOrder=${isScheduledOrder.toString()}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter.dayOfWeek)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al crear el parámetro ${parameter?.key}.`, error: true });
    }
}

export async function GetDaySchedule(parameter: any) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/WeeklySchedule/GetDaySchedule`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter.dayOfWeek)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : `Ocurrió un error al crear el parámetro ${parameter?.key}.`, error: true });
    }
}