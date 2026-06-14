import "./ShoppingCart.css"
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CardProductCart from "../components/CardProductCart";
import { formatMoney } from "../utils/FormatMoneyUtil";
import { BsCartXFill, BsGift } from "react-icons/bs";
import DialogConfirm from "../components/DialogConfirm";
import Dialog from "../components/Dialog";
import ShoppingCartConfirm from "../components/ShoppingCartConfirm";
import Spinner from "../components/Spinner";
import { GetParameterByKey, GetAllParameters } from "../services/parameter-service";
import { ParameterEnum } from "../enums/parameter";
import { IoCartOutline, IoTimeOutline } from "react-icons/io5";


import { IsOpen } from "../services/weekly-schedule-service";
import { dateToString } from "../utils/ParseDateUtil";

export default function ShoppingCart() {
    const cartContext = useContext<any>(CartContext);
    const [loadingParameters, setLoadingParameters] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsScheduled, setCartItemsScheduled] = useState([]);
    const [cartItemsScheduledSpecial, setCartItemsScheduledSpecial] = useState([]);

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
    const [delayParameters, setDelayParameters] = useState<any[]>([]);
    const [delayedSubcarts, setDelayedSubcarts] = useState<{ [category: string]: any[] }>({});
    const [isModalOpenDelayed, setIsModalOpenDelayed] = useState<{ [category: string]: boolean }>({});
    const [isModalOpenClearDelayed, setIsModalOpenClearDelayed] = useState<{ [category: string]: boolean }>({});

    useEffect(() => {
        GetAllParameters().then((params) => {
            if (params) {
                const delayParams = params.filter((p: any) => p.key && p.key.startsWith('DELAY '));
                setDelayParameters(delayParams);
            }
            setLoadingParameters(false);
        }).catch(() => {
            setLoadingParameters(false);
        });
    }, []);

    useEffect(() => {
        const itemsScheduled = cartContext.cartItems.filter(
            (item: any) => item?.category?.name?.toUpperCase() === 'PICADAS');
        const itemsScheduledSpecial = cartContext.cartItems.filter(
            (item: any) => item?.category?.name?.toUpperCase() === 'MENU FIESTAS');

        const subcarts: { [category: string]: any[] } = {};
        const itemsStandard = cartContext.cartItems.filter((item: any) => {
            const catName = item?.category?.name?.toUpperCase();
            if (catName === 'PICADAS' || catName === 'MENU FIESTAS') {
                return false;
            }

            const hasCustomDelay = delayParameters.find(p => p.key === `DELAY ${catName}`);
            if (hasCustomDelay) {
                if (!subcarts[catName]) subcarts[catName] = [];
                subcarts[catName].push(item);
                return false;
            }

            return true;
        });


        const totalStandard = itemsStandard.reduce((accumulator: any, product: any) => { return accumulator + product.totalPrice; }, 0);
        const totalScheduled = itemsScheduled.reduce((accumulator: any, product: any) => { return accumulator + product.totalPrice; }, 0);
        const totalScheduledSpecial = itemsScheduledSpecial.reduce((accumulator: any, product: any) => { return accumulator + product.totalPrice; }, 0);

        setCartItems(itemsStandard);
        setCartItemsScheduled(itemsScheduled);
        setCartItemsScheduledSpecial(itemsScheduledSpecial);
        setDelayedSubcarts(subcarts);


        setTotalPriceStandard(totalStandard);
        setTotalPriceScheduled(totalScheduled);
        setTotalPriceScheduledSpecial(totalScheduledSpecial);
        handleTimeChange();
    }, [cartContext.cartItems, cartContext.cartItems.quantity, delayParameters]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModalScheduled = () => setIsModalOpenScheduled(true);
    const closeModalScheduled = () => setIsModalOpenScheduled(false);

    const openModalScheduledSpecial = () => setIsModalOpenScheduledSpecial(true);
    const closeModalScheduledSpecial = () => setIsModalOpenScheduledSpecial(false);


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

    const handleConfirmDelayed = (category: string, element: any) => {
        setOrder(element);
        setIsModalOpenConfirmation(true);
        handleConfirmClearDelayed(category);
    }

    const handleConfirmClearDelayed = (category: string) => {
        const itemsToClear = delayedSubcarts[category];
        if (cartContext.cartItems.length === itemsToClear?.length) {
            cartContext.clearCart.bind(null)();
        } else {
            itemsToClear?.forEach((item: any) => {
                cartContext.removeFromCart.bind(item, item!.id)();
            });
        }
        setIsModalOpenDelayed(prev => ({ ...prev, [category]: false }));
        setIsModalOpenClearDelayed(prev => ({ ...prev, [category]: false }));
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
            {loadingParameters ? (
                <div className="m-auto mt-10"><Spinner text="Cargando..." /></div>
            ) : (
                <section className="products">
                    {cartItems && cartItems!.length > 0 &&
                        <>
                            <h1 className="flex text-primary text-2xl font-semibold w-full text-center mb-3 justify-center items-center gap-3"><span><IoCartOutline /></span>Carrito de compras</h1>
                            {cartItems.map((item: any) => <CardProductCart key={item.id} product={item} />)}
                            <footer className="mt-4 mb-8">
                                <p className="text-center font-bold text-gray-700">Total: {formatMoney(totalPriceStandard)}</p>
                                <div className="flex justify-center gap-2 my-3 px-2">
                                    <button className="button__primary flex items-center gap-2" onClick={openModal} disabled={inProcess}>
                                        <IoCartOutline />Confirmar<div></div>
                                    </button>
                                </div>
                            </footer>
                        </>
                    }

                    {Object.keys(delayedSubcarts).map((categoryName: string) => {
                        const items = delayedSubcarts[categoryName];
                        const totalDelayed = items.reduce((acc: any, prod: any) => acc + prod.totalPrice, 0);
                        if (items.length === 0) return null;
                        return (
                            <div key={categoryName}>
                                <h3 className="flex text-primary text-lg font-semibold w-full text-center mb-3 justify-center items-center gap-3 mt-4">
                                    <span><IoTimeOutline /></span>{categoryName}
                                </h3>
                                {items.map((item: any) => <CardProductCart key={item.id} product={item} />)}
                                <footer className="mt-4 mb-8">
                                    <p className="text-center font-bold text-gray-700">Total: {formatMoney(totalDelayed)}</p>
                                    <div className="flex justify-center gap-2 my-3 px-2">
                                        <button className="button__primary flex items-center gap-2" onClick={() => setIsModalOpenDelayed(prev => ({ ...prev, [categoryName]: true }))} disabled={inProcess}>
                                            <IoCartOutline />Confirmar<div></div>
                                        </button>
                                    </div>
                                </footer>
                            </div>
                        );
                    })}

                    {cartItemsScheduled && cartItemsScheduled!.length > 0 &&
                        <>
                            <h1 className="flex text-primary text-2xl font-semibold w-full text-center mb-3 justify-center items-center gap-3"><span><IoTimeOutline /></span>Pedidos programados</h1>
                            {cartItemsScheduled.map((item: any) => <CardProductCart key={item.id} product={item} />)}
                            <footer className="mt-4 mb-8">
                                <p className="text-center font-bold text-gray-700">Total: {formatMoney(totalPriceScheduled)}</p>
                                <div className="flex justify-center gap-2 my-3 px-2">
                                    <button className="button__primary flex items-center gap-2" onClick={openModalScheduled} disabled={inProcess}>
                                        <IoTimeOutline />Confirmar<div></div>
                                    </button>
                                </div>
                            </footer>
                        </>
                    }

                    {cartItemsScheduledSpecial && cartItemsScheduledSpecial!.length > 0 &&
                        <>
                            <h1 className="flex text-primary text-2xl font-semibold w-full text-center mb-3 justify-center items-center gap-3"><span><BsGift /></span>Pedidos especiales</h1>
                            {cartItemsScheduledSpecial.map((item: any) => <CardProductCart key={item.id} product={item} />)}
                            <footer className="mt-4 mb-8">
                                <p className="text-center font-bold text-gray-700">Total: {formatMoney(totalPriceScheduledSpecial)}</p>
                                <div className="flex justify-center gap-2 my-3 px-2">
                                    <button className="button__primary flex items-center gap-2" onClick={openModalScheduledSpecial} disabled={inProcess}>
                                        <BsGift />Confirmar<div></div>
                                    </button>
                                </div>
                            </footer>
                        </>
                    }

                    {cartItems.length == 0 && cartItemsScheduled.length == 0 && cartItemsScheduledSpecial.length == 0 && Object.keys(delayedSubcarts).length == 0 && <p className="text-center m-auto mt-6 flex flex-col gap-4"><BsCartXFill size={64} className="text-gray-500 m-auto" /><span className="mt-3 font-semibold text-primary">Tu carrito se encuentra vacío</span></p>}
                </section>
            )}




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

            {Object.keys(delayedSubcarts).map((categoryName: string) => {
                const items = delayedSubcarts[categoryName];
                const totalDelayed = items.reduce((acc: any, prod: any) => acc + prod.totalPrice, 0);
                const isModalDelayed = isModalOpenDelayed[categoryName] || false;
                const isClearModalDelayed = isModalOpenClearDelayed[categoryName] || false;

                return (
                    <div key={`dialogs-${categoryName}`}>
                        {items.length > 0 && isModalDelayed &&
                            <Dialog title={`Confirmación ${categoryName}`} isOpen={isModalDelayed} onClose={() => setIsModalOpenDelayed(prev => ({ ...prev, [categoryName]: false }))}>
                                <ShoppingCartConfirm prop={items} totalPrice={totalDelayed} validationError={validationError}
                                    onConfirm={(element: any) => handleConfirmDelayed(categoryName, element)} onClose={() => setIsModalOpenDelayed(prev => ({ ...prev, [categoryName]: false }))} onProcess={handleInProcess}></ShoppingCartConfirm>
                            </Dialog>
                        }

                        {items.length > 0 && isClearModalDelayed &&
                            <DialogConfirm title="Confirmación" message={`¿Desea vaciar el carrito de ${categoryName}?`}
                                isOpen={isClearModalDelayed} onClose={() => setIsModalOpenClearDelayed(prev => ({ ...prev, [categoryName]: false }))} onConfirm={() => handleConfirmClearDelayed(categoryName)}>
                            </DialogConfirm>
                        }
                    </div>
                );
            })}

            {isModalOpenConfirmation && order &&
                <DialogConfirm title={order?.title} message={order?.description} hiddenCancelButton={true}
                    isOpen={isModalOpenConfirmation} onClose={() => setIsModalOpenConfirmation(false)} onConfirm={() => setIsModalOpenConfirmation(false)}>
                </DialogConfirm>
            }
        </div>
    )
}