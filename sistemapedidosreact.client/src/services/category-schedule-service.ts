import showToast from "./toast-service";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function GetAllCategorySchedules() {
    const response = await fetch(`${apiUrl}/api/CategorySchedule/GetAll`);
    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    } else {
        showToast({ title: 'Error', description: response.statusText !== '' ? response.statusText : 'Ocurrió un error al obtener las configuraciones por categoría.', error: true });
        return [];
    }
}

export async function GetCategoryScheduleById(id: number) {
    const response = await fetch(`${apiUrl}/api/CategorySchedule/GetById/${id}`);
    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    } else {
        showToast({ title: 'Error', description: response.statusText !== '' ? response.statusText : `Ocurrió un error al obtener la configuración ${id}.`, error: true });
    }
}

export async function GetAllCategorySchedulesByCategoryId(categoryId: number) {
    const response = await fetch(`${apiUrl}/api/CategorySchedule/GetAllByCategoryId/${categoryId}`);
    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    } else {
        showToast({ title: 'Error', description: response.statusText !== '' ? response.statusText : `Ocurrió un error al obtener las configuraciones para la categoría ${categoryId}.`, error: true });
        return [];
    }
}

export async function CreateCategorySchedule(categorySchedule: any) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/CategorySchedule/Create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categorySchedule)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    } else {
        showToast({ title: 'Error', description: response.statusText !== '' ? response.statusText : 'Ocurrió un error al crear la configuración por categoría.', error: true });
    }
}

export async function UpdateCategorySchedule(categorySchedule: any) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/CategorySchedule/Update`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categorySchedule)
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    } else {
        showToast({ title: 'Error', description: response.statusText !== '' ? response.statusText : 'Ocurrió un error al actualizar la configuración por categoría.', error: true });
    }
}

export async function DeleteCategorySchedule(id: number) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/CategorySchedule/Delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({ title: 'Error', description: err.message, error: true }));
        return data;
    } else {
        showToast({ title: 'Error', description: response.statusText !== '' ? response.statusText : `Ocurrió un error al eliminar la configuración ${id}.`, error: true });
        return false;
    }
}
