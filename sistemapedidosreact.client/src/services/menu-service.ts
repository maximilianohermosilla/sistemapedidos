import showToast from "./toast-service";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function GetLastMenu() {
    const response = await fetch(`${apiUrl}/api/menu/getlastmenu`);
    if (response.ok) {
        const data = await response?.json().catch((err: any) => showToast({title: 'Error', description: err.message, error: true}));
        return data;
    }
    else{
        showToast({title: 'Error', description: response.statusText != '' ? response.statusText : "Ocurrió un error al obtener el último menú.", error: true});
    }
}