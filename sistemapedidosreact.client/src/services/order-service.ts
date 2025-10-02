import type { Order } from "../interfaces/order";
import showToast from "./toast-service";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function GetOrders(storeId: string) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${apiUrl}/api/orders?storeid=${storeId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({title: 'Error', description: err.message, error: true}));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : "Ocurrió un error al obtener los pedidos.", error: true });
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
        const data = await response.json().catch((err: any) => showToast({title: 'Error', description: err.message, error: true}));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : "Ocurrió un error al crear el pedido.", error: true });
    }
}

export async function SearchOrdersByCustomer(query: string) {
    const response = await fetch(`${apiUrl}/api/order/${query}`);
    if (response.ok) {
        const data = await response.json().catch((err: any) => showToast({title: 'Error', description: err.message, error: true}));
        return data;
    }
    else {
        showToast({ title: 'Error', description: response.statusText != '' ? response.statusText : "Ocurrió un error en la búsqueda.", error: true });
    }
}