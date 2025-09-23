import type { Order } from "../interfaces/order";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL: '';

export async function GetOrders(storeId: string) {
    const response = await fetch(`${apiUrl}/api/orders?storeid=${storeId}`, {
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

export async function CreateOrder(order: Order) {
    const response = await fetch(`${apiUrl}/api/order/Create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    });
    
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}