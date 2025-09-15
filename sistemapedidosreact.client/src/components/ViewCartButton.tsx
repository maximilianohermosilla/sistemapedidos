import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";

export default function ViewCartButton() {
    const cartContext = useContext<any>(CartContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const navigate = useNavigate();
    const redirect = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        setCartItems(cartContext.cartItems);
        const total = cartContext?.cartItems.reduce((accumulator: any, product: any) => {
            return accumulator + (product.totalPrice);
        }, 0);
        setTotalPrice(total);
    }, [cartContext.cartItems, cartContext.cartItems.quantity]);

    return (
        <>
            {cartItems?.length > 0 &&
                <div className="w-full fixed bottom-3">
                    <button className="button__primary flex items-center gap-2 my-3 m-auto" onClick={() => redirect('/shopping-cart')}><FaCartShopping />
                        <span className="text-md font-semibold">Ver carrito: </span>{formatMoney(totalPrice)}
                    </button>
                </div>}
        </>
    );
}