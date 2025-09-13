import "./ShoppingCart.css"
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import CardProductCart from "../components/CardProductCart";
import { formatMoney } from "../utils/formatMoney";


export default function ShoppingCart() {
    const cartContext = useContext<any>(CartContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setCartItems(cartContext.cartItems);
        const total = cartContext?.cartItems.reduce((accumulator: any, product: any) => {
            return accumulator + (product.price * product.quantity);
        }, 0);
        setTotalPrice(total);
    }, [cartContext.cartItems, cartContext.cartItems.quantity]);

    return (
        <main className="w-full flex flex-col justify-between h-full px-2">
            <section className="products">
            <h1 className="text-2xl font-semibold w-full text-center mb-3">Carrito de compras</h1>
                {cartItems && cartItems!.length > 0 ?
                    cartItems.map((item: any) => <CardProductCart key={item.id} product={item} />) :
                    <p className="text-center">No hay productos en el carrito</p>}
            </section>
            <footer>
                <p className="text-center font-bold text-gray-700">Total: {formatMoney(totalPrice)}</p>
                <div className="flex justify-center gap-3">
                    <button className="button__primary__outlined my-3 flex items-center gap-1" onClick={cartContext.clearCart}><FaRegTrashAlt /> Vaciar carrito</button>
                    <button className="button__primary my-3 flex items-center gap-2" onClick={cartContext.clearCart}><FaCartShopping /> Confirmar <div></div></button>
                </div>
            </footer>
        </main>
    )
}