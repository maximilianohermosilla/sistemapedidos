import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ShoppingCart() {
    const cartContext = useContext<any>(CartContext);
    
    return (
        <main className="w-full">
            <header className="grid m-auto">
                <h1 className="text-2xl font-semibold w-full text-center">Carrito de compras</h1>
                <button className="btn-primary button__primary m-auto my-3" onClick={cartContext.clearCart}>Vaciar carrito</button>
            </header>
        </main>
    )
}