import showToast from "./toast-service";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function GetAllCategories() {
    const response = await fetch(`${apiUrl}/api/Category/GetAll`);
    if (response.ok) {
        const data = await response.json().catch((err: any) => {
            showToast({title: 'Error', description: err.message, error: true});
            return [];
        });
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText !== '' ? response.statusText : "Ocurrió un error al obtener las categorías.", error: true });
        return [];
    }
}
