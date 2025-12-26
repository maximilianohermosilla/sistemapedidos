import "./ShoppingCart.css"
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CardProductCart from "../components/CardProductCart";
import { formatMoney } from "../utils/FormatMoneyUtil";
import { BsCartXFill, BsGift } from "react-icons/bs";
import DialogConfirm from "../components/DialogConfirm";
import Dialog from "../components/Dialog";
import ShoppingCartConfirm from "../components/ShoppingCartConfirm";
import { GetParameterByKey } from "../services/parameter-service";
import { ParameterEnum } from "../enums/parameter";
import { IoCartOutline, IoTimeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { IsOpen } from "../services/weekly-schedule-service";
import { dateToString } from "../utils/ParseDateUtil";

export default function ShoppingCart() {
    const cartContext = useContext<any>(CartContext);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsScheduled, setCartItemsScheduled] = useState([]);
    const [cartItemsScheduledSpecial, setCartItemsScheduledSpecial] = useState([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalPriceStandard, setTotalPriceStandard] = useState<number>(0);
    const [totalPriceScheduled, setTotalPriceScheduled] = useState<number>(0);
    const [totalPriceScheduledSpecial, setTotalPriceScheduledSpecial] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenScheduled, setIsModalOpenScheduled] = useState(false);
    const [isModalOpenScheduledSpecial, setIsModalOpenScheduledSpecial] = useState(false);
    const [isModalOpenClear, setIsModalOpenClear] = useState(false);
    const [isModalOpenConfirmation, setIsModalOpenConfirmation] = useState(false);
    const [inProcess, setInProcess] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [order, setOrder] = useState<any>(undefined);

    useEffect(() => {
        const itemsStandard = cartContext.cartItems.filter(
            (item: any) => item?.category?.name?.toUpperCase() !== 'PICADAS' && item?.category?.name?.toUpperCase() !== 'MENU FIESTAS');
        const itemsScheduled = cartContext.cartItems.filter(
            (item: any) => item?.category?.name?.toUpperCase() === 'PICADAS');
        const itemsScheduledSpecial = cartContext.cartItems.filter(
            (item: any) => item?.category?.name?.toUpperCase() === 'MENU FIESTAS');

        const total = cartContext?.cartItems.reduce((accumulator: any, product: any) => { return accumulator + product.totalPrice; }, 0);
        const totalStandard = itemsStandard.reduce((accumulator: any, product: any) => { return accumulator + product.totalPrice; }, 0);
        const totalScheduled = itemsScheduled.reduce((accumulator: any, product: any) => { return accumulator + product.totalPrice; }, 0);
        const totalScheduledSpecial = itemsScheduledSpecial.reduce((accumulator: any, product: any) => { return accumulator + product.totalPrice; }, 0);

        setCartItems(itemsStandard);
        setCartItemsScheduled(itemsScheduled);
        setCartItemsScheduledSpecial(itemsScheduledSpecial);
        setTotalPrice(total);
        setTotalPriceStandard(totalStandard);
        setTotalPriceScheduled(totalScheduled);
        setTotalPriceScheduledSpecial(totalScheduledSpecial);
        handleTimeChange();
    }, [cartContext.cartItems, cartContext.cartItems.quantity]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModalScheduled = () => setIsModalOpenScheduled(true);
    const closeModalScheduled = () => setIsModalOpenScheduled(false);

    const openModalScheduledSpecial = () => setIsModalOpenScheduledSpecial(true);
    const closeModalScheduledSpecial = () => setIsModalOpenScheduledSpecial(false);

    const openModalClear = () => setIsModalOpenClear(true);
    const closeModalClear = () => setIsModalOpenClear(false);

    const handleConfirm = (element: any) => {
        setOrder(element);
        setIsModalOpenConfirmation(true);

        handleConfirmClear();
    }

    const handleConfirmScheduled = (element: any) => {
        setOrder(element);
        setIsModalOpenConfirmation(true);

        handleConfirmClearScheduled();
    }
    
    const handleConfirmScheduledSpecial = (element: any) => {
        setOrder(element);
        setIsModalOpenConfirmation(true);

        handleConfirmClearScheduledSpecial();
    }

    const handleConfirmClear = (clear: boolean = false) => {
        if (cartItemsScheduled.length === 0 || clear) {
            cartContext.clearCart.bind(null)();
        }
        else {
            cartItems.forEach((item: any) => {
                cartContext.removeFromCart.bind(item, item!.id)();
            });
        }
        closeModalClear();
        closeModal();
    }

    const handleConfirmClearScheduled = () => {
        if (cartItems.length === 0) {
            cartContext.clearCart.bind(null)();
        }
        else {
            cartItemsScheduled.forEach((item: any) => {
                cartContext.removeFromCart.bind(item, item!.id)();
            });
        }
        closeModalScheduled();
        closeModal();
    }
    
    const handleConfirmClearScheduledSpecial = () => {
        if (cartItems.length === 0) {
            cartContext.clearCart.bind(null)();
        }
        else {
            cartItemsScheduledSpecial.forEach((item: any) => {
                cartContext.removeFromCart.bind(item, item!.id)();
            });
        }
        closeModalScheduledSpecial();
        closeModal();
    }

    const handleInProcess = (status: boolean) => {
        setInProcess(status);
    }

    const handleTimeChange = async () => {
        const now = new Date();

        const startHour = await GetParameterByKey(ParameterEnum.OPENING_HOURS);
        const endHour = await GetParameterByKey(ParameterEnum.CLOSING_HOURS);
        //const isValid = isTimeBetweenHours(timeValue, startHour?.value || '20:00', endHour?.value || '23:00');
        const isValid = await IsOpen({ dayOfWeek: dateToString(now) }, false);
        
        if (!isValid) {
            //const dateSchedules = await GetDaySchedule({ dayOfWeek: dateToString(now) });
            setValidationError(`Los pedidos pueden retirarse de martes a domingos entre las ${startHour?.value || '20:00'} 
                                    y las ${endHour?.value || '23:00'} hs.`);
        } else {
            setValidationError('');
        }
    };

    return (
        <div className="main__container w-full flex flex-col justify-between p-2 pt-5">
            <section className="products">
                <h1 className="flex text-primary text-2xl font-semibold w-full text-center mb-3 justify-center items-center gap-3"><span><IoCartOutline /></span>Carrito de compras</h1>
                {cartItems && cartItems!.length > 0 &&
                    cartItems.map((item: any) => <CardProductCart key={item.id} product={item} />)
                }

                {cartItemsScheduled && cartItemsScheduled!.length > 0 &&
                    <>
                        <h1 className="flex text-primary text-2xl font-semibold w-full text-center mb-3 justify-center items-center gap-3"><span><IoTimeOutline /></span>Pedidos programados</h1>
                        {cartItemsScheduled.map((item: any) => <CardProductCart key={item.id} product={item} />)}
                    </>
                }

                {cartItemsScheduledSpecial && cartItemsScheduledSpecial!.length > 0 &&
                    <>
                        <h1 className="flex text-primary text-2xl font-semibold w-full text-center mb-3 justify-center items-center gap-3"><span><BsGift /></span>Pedidos especiales</h1>
                        {cartItemsScheduledSpecial.map((item: any) => <CardProductCart key={item.id} product={item} />)}
                    </>
                }

                {cartItems.length == 0 && cartItemsScheduled.length == 0 && <p className="text-center m-auto mt-6 flex flex-col gap-4"><BsCartXFill size={64} className="text-gray-500 m-auto" /><span className="mt-3 font-semibold text-primary">Tu carrito se encuentra vacío</span></p>}
            </section>

            <footer>
                {cartItems && cartItems!.length > 0 && <p className="text-center font-bold text-gray-700">Total: {formatMoney(totalPrice)}</p>}

                <div className="flex justify-center gap-2 my-3 px-2">
                    <button className="button__primary__outlined flex items-center gap-1" onClick={openModalClear}
                        disabled={cartItems!.length == 0 && cartItemsScheduled!.length == 0}>
                        <FaRegTrashAlt /> {!cartItemsScheduled || cartItemsScheduled!.length === 0 && <span>Vaciar</span>}
                    </button>
                    <button className="button__primary flex items-center gap-2" onClick={openModal}
                        disabled={cartItems!.length == 0 || inProcess}>
                        <IoCartOutline />Confirmar <div></div>
                    </button>
                    {cartItemsScheduled && cartItemsScheduled!.length > 0 &&
                        <button className="button__primary flex items-center gap-2" onClick={openModalScheduled}
                            disabled={cartItemsScheduled!.length == 0 || inProcess}>
                            <IoTimeOutline />Confirmar <div></div>
                        </button>}
                </div>

                {cartItemsScheduledSpecial && cartItemsScheduledSpecial!.length > 0 &&
                    <div className="flex justify-center gap-2 my-3 px-2">
                        <button className="button__primary flex items-center gap-2" onClick={openModalScheduledSpecial}
                            disabled={cartItemsScheduledSpecial!.length == 0 || inProcess}>
                            <BsGift />Confirmar <div></div>
                        </button>
                    </div>}
            </footer>


            {/* DIALOGS */}
            {cartItems!.length > 0 !== undefined && isModalOpen &&
                <Dialog title="Confirmación" isOpen={isModalOpen} onClose={closeModal}>
                    <ShoppingCartConfirm prop={cartItems} totalPrice={totalPriceStandard} validationError={validationError}
                        onConfirm={handleConfirm} onClose={closeModal} onProcess={handleInProcess}></ShoppingCartConfirm>
                </Dialog>
            }

            {cartItemsScheduled!.length > 0 !== undefined && isModalOpenScheduled &&
                <Dialog title="Confirmación" isOpen={isModalOpenScheduled} onClose={closeModalScheduled}>
                    <ShoppingCartConfirm prop={cartItemsScheduled} totalPrice={totalPriceScheduled}
                        onConfirm={handleConfirmScheduled} onClose={closeModalScheduled} onProcess={handleInProcess}></ShoppingCartConfirm>
                </Dialog>
            }
            
            {cartItemsScheduledSpecial!.length > 0 !== undefined && isModalOpenScheduledSpecial &&
                <Dialog title="Confirmación" isOpen={isModalOpenScheduledSpecial} onClose={closeModalScheduledSpecial}>
                    <ShoppingCartConfirm prop={cartItemsScheduledSpecial} totalPrice={totalPriceScheduledSpecial}
                        onConfirm={handleConfirmScheduledSpecial} onClose={closeModalScheduledSpecial} onProcess={handleInProcess}></ShoppingCartConfirm>
                </Dialog>
            }

            {cartItems!.length > 0 !== undefined && isModalOpenClear &&
                <DialogConfirm title="Confirmación" message="¿Desea vaciar el carrito?"
                    isOpen={isModalOpenClear} onClose={closeModalClear} onConfirm={() => handleConfirmClear(true)}>
                </DialogConfirm>
            }

            {isModalOpenConfirmation && order &&
                <DialogConfirm title={order?.title} message={order?.description} hiddenCancelButton={true}
                    isOpen={isModalOpenConfirmation} onClose={() => setIsModalOpenConfirmation(false)} onConfirm={() => setIsModalOpenConfirmation(false)}>
                </DialogConfirm>
            }
        </div>
    )
}