
export default async function getOrders(storeId: string) {
    const response = await fetch(`https://localhost:7011/api/orders?storeid=${storeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}