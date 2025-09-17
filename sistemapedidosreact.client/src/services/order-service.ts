import type { Order } from "../interfaces/order";

export async function GetOrders(storeId: string) {
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

export async function CreateOrder(order: Order) {
    const response = await fetch(`https://localhost:7011/api/order/Create`, {
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