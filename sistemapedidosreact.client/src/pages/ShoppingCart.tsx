import "./ShoppingCart.css"
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import CardProductCart from "../components/CardProductCart";
import { formatMoney } from "../utils/FormatMoney";
import { BsCartXFill } from "react-icons/bs";
import DialogConfirm from "../components/DialogConfirm";
import Dialog from "../components/Dialog";
import ShoppingCartConfirm from "../components/ShoppingCartConfirm";

export default function ShoppingCart() {
    const cartContext = useContext<any>(CartContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenClear, setIsModalOpenClear] = useState(false);

    useEffect(() => {
        setCartItems(cartContext.cartItems);
        const total = cartContext?.cartItems.reduce((accumulator: any, product: any) => {
            return accumulator + product.totalPrice;
        }, 0);
        setTotalPrice(total);
    }, [cartContext.cartItems, cartContext.cartItems.quantity]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModalClear = () => setIsModalOpenClear(true);
    const closeModalClear = () => setIsModalOpenClear(false);

    const handleConfirmClear = () => {
        cartContext.clearCart.bind(null)();
        closeModalClear();
        closeModal();
    }

    return (
        <div className="main__container w-full flex flex-col justify-between p-2 pt-5">
            <section className="products">
                <h1 className="text-primary text-2xl font-semibold w-full text-center mb-3">Carrito de compras</h1>
                {cartItems && cartItems!.length > 0 ?
                    cartItems.map((item: any) => <CardProductCart key={item.id} product={item} />) :
                    <p className="text-center m-auto mt-6 flex flex-col gap-4"><BsCartXFill size={64} className="text-gray-500 m-auto" /><span className="mt-3 font-semibold text-primary">Tu carrito se encuentra vacío</span></p>}
            </section>
            <footer>
                {cartItems && cartItems!.length > 0 && <p className="text-center font-bold text-gray-700">Total: {formatMoney(totalPrice)}</p>}
                <div className="flex justify-center gap-5">
                    <button className="button__primary__outlined my-3 flex items-center gap-1" onClick={openModalClear} disabled={cartItems!.length == 0}>
                        <FaRegTrashAlt /> Vaciar carrito
                    </button>
                    <button className="button__primary my-3 flex items-center gap-2" onClick={openModal} disabled={cartItems!.length == 0}>
                        <FaCartShopping />Confirmar <div></div>
                    </button>
                </div>
            </footer>
            {cartItems!.length > 0 !== undefined && isModalOpen &&
                <Dialog title="Confirmación" isOpen={isModalOpen} onClose={closeModal}>
                    <ShoppingCartConfirm prop={cartItems} totalPrice={totalPrice} onConfirm={handleConfirmClear}></ShoppingCartConfirm>
                </Dialog>
            }
            {cartItems!.length > 0 !== undefined && isModalOpenClear &&
                <DialogConfirm title="Confirmación" message="¿Desea vaciar el carrito?"
                    isOpen={isModalOpenClear} onClose={closeModalClear} onConfirm={handleConfirmClear}>
                </DialogConfirm>
            }
        </div>
    )
}