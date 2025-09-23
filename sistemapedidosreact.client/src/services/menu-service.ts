const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function GetLastMenu() {
    const response = await fetch(`${apiUrl}/api/menu/getlastmenu`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}