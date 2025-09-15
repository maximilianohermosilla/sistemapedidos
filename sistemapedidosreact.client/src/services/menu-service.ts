export async function GetLastMenu() {
    const response = await fetch(`https://localhost:7011/api/menu/getlastmenu`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}