export async function SearchItems(query: string) {
    const response = await fetch(`/api/item/search/${query}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}