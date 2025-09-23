const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL: '';

export async function SearchItems(query: string) {
    const response = await fetch(`${apiUrl}/api/item/search/${query}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}