import "./CardProduct.css";
import { useContext, useEffect, useState } from "react";
import imgDefault from "../assets/logo/logo_gray_top.jpeg";
import { formatMoney } from '../utils/formatMoney.ts';
import { FaPlus } from "react-icons/fa6";
import { CartContext } from "../context/CartContext.tsx";
import Dialog from "./Dialog.tsx";
import ProductInfo from "./ProductInfo.tsx";

export default function CardProduct({ product }: any) {
    const [item, setItem] = useState<any>();
    const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>();
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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {item !== undefined &&
                <div className="card__product relative bg-white text-left rounded-md shadow-md hover:shadow-lg 
                    shadow-gray-500/40 hover:cursor-pointer mx-auto md:mx-2" onClick={openModal}>
                    <img src={item.imageUrl && item.imageUrl != '' ? item.imageUrl : imgDefault} alt={item.name} onError={addDefaultImg}
                        className="w-full h-48 object-cover rounded-t-md" />
                    <footer className="flex p-4 justify-between">
                        <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-cyan-500">{item.category?.name}</p>
                            <p className="text-cyan-700 font-bold">{formatMoney(item.price)}</p>
                        </div>
                        <div className="">
                            <button className="button__add relative rounded-full p-2 mt-5 hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                onClick={openModal}>
                                {cartItemQuantity > 0 && <span className="absolute bg-green-500 text-white text-xs font-medium px-2.5 rounded-full my-5 -mx-3 leading-6 right-0">{cartItemQuantity}</span>}
                                <FaPlus color="white" />
                            </button>
                        </div>
                    </footer>
                </div>
            }
            {item !== undefined && isModalOpen &&
                <Dialog title={item.name} isOpen={isModalOpen || false} onClose={closeModal}>
                    {item && isModalOpen && <ProductInfo product={item} onConfirm={closeModal}></ProductInfo>}
                </Dialog>
            }
        </>
    )
}