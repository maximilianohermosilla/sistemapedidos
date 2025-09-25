import showToast from "./toast-service";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function SearchItems(query: string) {
    const response = await fetch(`${apiUrl}/api/item/search/${query}`);
    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({title: 'Error', description: err.message, error: true}));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : "Ocurrió un error en la búsqueda.", error: true });
    }
}