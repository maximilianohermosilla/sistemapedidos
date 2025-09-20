import "./CardProductCart.css";
import { useContext, useEffect, useState } from "react";
import imgDefault from "../assets/logo/logo_gray_top.jpeg";
import { formatMoney } from '../utils/FormatMoney.ts';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { CartContext } from "../context/CartContext.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import Dialog from "./Dialog.tsx";
import ProductInfo from "./ProductInfo.tsx";

export default function CardProductCart({ product }: any) {
    const [item, setItem] = useState<any>();
    const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>();
    const cartContext = useContext<any>(CartContext);

    useEffect(() => {
        setItem(product);
        setTotalPrice(product?.totalPrice || product?.price || 0);
    }, [product]);

    useEffect(() => {
        if (item) {
            setCartItemQuantity(cartContext.cartItems.find((cartItem: any) => item.id === cartItem.id)?.quantity || 0);
        }
    }, [cartContext.cartItems, item]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addDefaultImg = (event: any) => {
        event!.target!.src = imgDefault
    }

    return (
        <>
            {item !== undefined &&
                <div className="card__product__cart flex relative bg-white text-left rounded-md shadow-md shadow-gray-500/40 mb-5 m-auto ">
                    <img src={item.imageUrl && item.imageUrl != '' ? item.imageUrl : imgDefault} alt={item.name} onError={addDefaultImg}
                        className="w-25 md:w-40 object-fill bg-black rounded-l-md" />
                    <section className="md:flex w-full px-3 py-2 md:p-4 justify-between">
                        <div className="w-full">
                            <h3 className="font-bold">{item.name}</h3>
                            {/* <p className="text-cyan-500">{item.category?.name}</p> */}
                            <p className="text-cyan-700 font-bold">{formatMoney(totalPrice)}</p>
                            <footer className="w-full flex justify-between items-center mt-1">
                                <div className="flex justify-between items-center w-25">
                                    <button className="button__add__outlined mx-0 rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                        // onClick={cartContext.updateQuantity.bind(null, item!.id, item!.quantity - 1)}>
                                        onClick={openModal}>
                                        <FaMinus />
                                    </button>
                                    <span className="font-semibold text-gray-400 md:mx-1">{cartItemQuantity}</span>
                                    <button className="button__add__outlined mx-0 rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                        // onClick={cartContext.addToCart.bind(null, item)}>
                                        onClick={openModal}>
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="flex gap-1">
                                    {/* <button className="button__primary__outlined rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                        onClick={openModal}>
                                        <FaPencil />
                                    </button> */}
                                    <button className="button__danger__outlined rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                        onClick={cartContext.removeFromCart.bind(null, item!.id)}>
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </footer>
                        </div>
                    </section>
                    {item !== undefined && isModalOpen &&
                        <Dialog title={item.name} isOpen={isModalOpen || false} onClose={closeModal}>
                            {item && isModalOpen && <ProductInfo product={item} onConfirm={closeModal}></ProductInfo>}
                        </Dialog>
                    }
                </div>
            }
        </>
    )
}