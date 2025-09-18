export async function GetLastMenu() {
    const response = await fetch(`/api/menu/getlastmenu`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}