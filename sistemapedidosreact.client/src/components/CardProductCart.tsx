import "./CardProductCart.css";
import { useContext, useEffect, useState } from "react";
import imgDefault from "../assets/logo/logo_gray_top.jpeg";
import { formatMoney } from '../utils/formatMoney.ts';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { CartContext } from "../context/CartContext.tsx";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CardProductCart({ product }: any) {
    const [item, setItem] = useState<any>();
    const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);
    const cartContext = useContext<any>(CartContext);

    useEffect(() => {
        setItem(product);
    }, [product]);

    useEffect(() => {
        if (item) {
            setCartItemQuantity(cartContext.cartItems.find((cartItem: any) => item.id === cartItem.id)?.quantity || 0);
        }
    }, [cartContext.cartItems, item]);


    const addDefaultImg = (event: any) => {
        event!.target!.src = imgDefault
    }

    return (
        <>
            {item !== undefined &&
                <div className="card__product__cart flex relative bg-white text-left rounded-md shadow-md shadow-gray-500/40 mb-5 m-auto ">
                    <img src={item.imageUrl && item.imageUrl != '' ? item.imageUrl : imgDefault} alt={item.name} onError={addDefaultImg}
                        className="w-25 md:w-40 object-fit rounded-t-md" />
                    <section className="md:flex w-full px-3 py-3 md:p-4 justify-between">
                        <div className="w-full">
                            <h3 className="font-bold">{item.name}</h3>
                            {/* <p className="text-cyan-500">{item.category?.name}</p> */}
                            <p className="text-cyan-700 font-bold">{formatMoney(item.price)}</p>
                            <footer className="w-full flex justify-between items-center mt-3">
                                <div className="flex justify-between items-center w-25">
                                    <button className="button__add__outlined rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                        onClick={cartContext.updateQuantity.bind(null, item!.id, item!.quantity - 1)}>
                                        <FaMinus />
                                    </button>
                                    <span className="font-semibold text-gray-400 md:mx-2">{cartItemQuantity}</span>
                                    <button className="button__add__outlined rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                        onClick={cartContext.addToCart.bind(null, item)}>
                                        <FaPlus />
                                    </button>
                                </div>
                                <button className="button__danger__outlined rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                    onClick={cartContext.removeFromCart.bind(null, item!.id)}>
                                    <FaRegTrashAlt />
                                </button>
                            </footer>
                        </div>
                    </section>
                </div>
            }
        </>
    )
}