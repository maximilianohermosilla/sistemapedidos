import { useEffect, useState } from "react";
import { formatMoney } from "../utils/FormatMoneyUtil";
import { FaCheck } from "react-icons/fa6";
import type { Order } from "../interfaces/order";
import { CreateOrder } from "../services/order-service";
import DatePicker from "./DatePicker";
import { calculateMinutesBetweenDates, dateToString, parseDDMMYYYYHHMM } from "../utils/ParseDateUtil";
import Spinner from "./Spinner";
import { GetParameterByKey } from "../services/parameter-service";
import { ParameterEnum } from "../enums/parameter";
import { formatDateHHMM } from "../utils/FormatDateUtil";
import { isTimeBetweenHours } from "../utils/TimeValidation";
import Delay from "./Delay";

export default function ShoppingCartConfirm({ prop, totalPrice, onConfirm, onClose, onProcess, validationError }: any) {
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState<any>({});
    const [scheduledOrder, setScheduledOrder] = useState<boolean>(false);
    const [scheduledSpecialOrder, setScheduledSpecialOrder] = useState<boolean>(false);
    const [minutes, setMinutes] = useState(0);
    const [dateOrderScheduled, setDateOrderScheduled] = useState('');
    const [messageValidation, setMessageValidation] = useState(validationError);
    const [delay, setDelay] = useState<string>('10-15 min');

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    useEffect(() => {
        prop.forEach((item: any) => {
            if (item?.category?.name?.toUpperCase() === 'PICADAS' || item?.category?.name?.toUpperCase() === 'PICADA') {
                setScheduledOrder(true);
            }
        });

        getDelayParameterByKey();
        setShoppingCart(prop);
        handleTimeChange();
    }, [prop])

    const getDelayParameterByKey = async () => {
        const delayParameter = await GetParameterByKey(ParameterEnum.DELAY);
        if (delayParameter) setDelay(delayParameter?.value);
    }

    const handleTimeChange = async () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeValue = `${hours}:${minutes}`;
        console.log("Current time:", timeValue);

        // const startHour = await GetParameterByKey(ParameterEnum.OPENING_HOURS);
        // const endHour = await GetParameterByKey(ParameterEnum.CLOSING_HOURS);
        // const isValid = isTimeBetweenHours(timeValue, startHour?.value || '20:00', endHour?.value || '22:00');
    };


    const renderCartDetail = () => {
        return shoppingCart.map((item: any) => {
            return (
                <li key={item.id} className="flex flex-col justify-between my-1 decoration-0">
                    <div className="w-full flex justify-between gap-1">
                        <p className="font-semibold">{item.quantity} x {item.name}</p>
                        <span className="text-green-600">{formatMoney(item.totalPrice)}</span>
                    </div>
                    <p className="text-gray-500">{item.toppings.map((topping: any) => topping.name).join(', ')}</p>
                </li>
            )
        })
    }

    const handleChange = (event: any) => {
        setFormData({ ...formData, [event?.target.name]: event?.target.value });
    };

    const validate = async () => {
        const newErrors: any = {};
        if (!formData.name) {
            newErrors!.name = 'Nombre es requerido';
        }

        if (!formData.phone) {
            newErrors!.phone = 'Teléfono es requerido';
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors!.email = 'Formato de mail es incorrecto';
        }

        if (scheduledOrder) {
            const threeHoursInMilliseconds = 3 * 60 * 60 * 1000;

            const now = new Date();
            const dateSelected = parseDDMMYYYYHHMM(dateOrderScheduled);

            const isValid = isTimeBetweenHours(dateOrderScheduled.split(' ')[1], '10:30', '21:00');

            if ((dateSelected.getTime() < (now.getTime() + threeHoursInMilliseconds)) || !isValid) {
                newErrors.hours = `Horario de retiro: ${'10:30'} - ${'21:00'}hs. Mínimo 3 horas de anticipación.`;
            }
        }

        if (scheduledSpecialOrder) {
            const startHour = await GetParameterByKey(ParameterEnum.OPENING_HOURS);
            const endHour = await GetParameterByKey(ParameterEnum.CLOSING_HOURS);

            const isValid = isTimeBetweenHours(dateOrderScheduled.split(' ')[1] || '20:00', startHour?.value || '20:00', endHour?.value || '23:00');

            if (!isValid) {
                newErrors!.hours = `Horario de retiro: ${startHour?.value || '20:00'} - ${endHour?.value || '23:00'}hs.`;
            }
        }

        setErrors(newErrors);
        setVerifying(false);
        return Object.keys(newErrors).length === 0;
    };


    const handleConfirm = async (event?: any) => {
        event?.preventDefault();
        setVerifying(true);
        if (await validate()) {
            await createOrder();
            setFormData({ name: '', email: '', phone: '' });
        }
    }

    const handleDate = (event?: any) => {
        const date = new Date(event);
        if (!isNaN(date.getTime())) {
            setDateOrderScheduled(formatDateHHMM(event.toISOString()));
            const minutes = calculateMinutesBetweenDates(new Date(), event);
            setMinutes(minutes);
        }
    }

    const createOrder = async () => {
        setLoading(true);
        onProcess(true);
        const orderDetail = shoppingCart.map((item: any) => ({
            id: 0,
            itemId: item.id,
            itemName: item.name,
            orderDetailId: 0,
            comments: "",
            price: item.price,
            quantity: item.quantity,
            maxLimit: 0,
            sortingPosition: 0,
            orderSubItems: item.toppings?.map((topping: any) => ({
                id: 0,
                itemId: topping.id,
                itemName: topping.name,
                orderItemId: 0,
                price: topping.price,
                quantity: topping.quantity || 1,
                maxLimit: topping.maxLimit || 0,
                sortingPosition: 0
            }))
        }));

        const order: Order = {
            id: 0,
            storeId: 1,
            state: "",
            delay: 0,
            customerName: formData!.name,
            orderStateId: undefined,
            customerId: undefined,
            orderDetail: {
                id: 0,
                orderId: 0,
                deliveryOperationType: "Regular",
                createdAt: dateToString(new Date()),
                cookingTime: scheduledOrder ? minutes : undefined,
                deliveryMethod: "Pickup",
                mesaId: 1,
                cantidadCubiertos: "1",
                paymentMethodId: 1,
                tip: 0,
                deliveryInformationId: undefined,
                deliveryInformation: {
                    id: 0,
                    city: '',
                    completeAdress: '',
                    streetNumber: '',
                    neighborhood: '',
                    complement: scheduledSpecialOrder ? `${formData!.name} - ( ${dateOrderScheduled.split(' ')[1] || '20:00'}hs )` : formData!.name,
                    postalCode: '',
                    streetName: '',
                },
                billingInformationId: 1,
                deliveryDiscountId: 1,
                totalsId: undefined,
                totals: {
                    id: 0,
                    totalProducts: totalPrice,
                    totalDiscounts: 0,
                    totalOrder: totalPrice,
                    totalToPay: totalPrice,
                    chargesId: 0,
                    otherTotalsId: 0,
                    charges: {
                        id: 0,
                        shipping: 0,
                        serviceFee: 0
                    },
                    otherTotals: {
                        id: 0,
                        tip: 0
                    }
                },
                orderItems: orderDetail,
                discounts: [{
                    id: 0,
                    title: "",
                    value: 0,
                    description: "",
                    orderDetailId: 0,
                    itemId: undefined,
                    sku: "",
                    type: "",
                    rawValue: 0,
                    typeValue: "",
                    maxValue: 0,
                    includesToppings: false,
                    percentageBySystem: 0,
                    percentageByPartners: 0,
                    ammountBySystem: 0,
                    ammountByPartners: 0,
                    discountProductUnits: 0,
                    discountProductUnitValue: 0
                }],
            },
            customer: {
                firstName: formData?.name,
                lastName: "",
                phoneNumber: formData?.phone,
                documentNumber: formData?.phone,
                userType: "",
                email: formData?.email
            }
        };

        let response = await CreateOrder(order);

        if (response) {
            const delayParameter = await GetParameterByKey(ParameterEnum.DELAY);
            let messageDelay = delayParameter?.value ? `\nPuede retirarlo dentro de ${delayParameter?.value}.` : '';
            messageDelay = (response?.orderDetail?.cookingTime > 0 || scheduledSpecialOrder) && dateOrderScheduled != '' ? `\nPuede retirarlo a partir de ${dateOrderScheduled}hs.` : messageDelay;

            setLoading(false);
            onProcess(false);
            //showToast({ title: `Código: ${response?.id}`, description: `Su pedido está en proceso.` });
            onConfirm({ title: `Código: ${response?.id}`, description: `Su pedido está en proceso. ${messageDelay}` });
        }
        else {
            setLoading(false);
            onProcess(false);
            onClose();
        }
    }

    const handleCheckboxScheduled = () => {
        setMessageValidation(scheduledSpecialOrder ? validationError : "");
        setScheduledSpecialOrder(!scheduledSpecialOrder);
    }



    return (<>
        {loading
            ? <Spinner text={"Generando pedido..."} />
            : <div>
                <h3 className="text-primary font-semibold">Resumen de compra</h3>
                <ul>{renderCartDetail()}</ul>
                <form className="mt-5 mb-3">
                    <h3 className="text-primary font-semibold">Datos de contacto</h3>
                    <div className="flex justify-between my-3">
                        <label htmlFor="name" className="text-secondary text-sm font-semibold mr-2">Nombre:</label>
                        <input type="text" id="name" name="name" className="border-1 border-gray-400 rounded-sm px-2"
                            value={formData?.name} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between my-3">
                        <label htmlFor="phone" className="text-secondary text-sm font-semibold mr-2">Teléfono:</label>
                        <input type="text" id="phone" name="phone" className="border-1 border-gray-400 rounded-sm px-2"
                            value={formData?.phone} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between my-3">
                        <label htmlFor="email" className="text-secondary text-sm font-semibold mr-2">Correo:</label>
                        <input type="text" id="email" name="email" className="border-1 border-gray-400 rounded-sm px-2"
                            value={formData?.email} onChange={handleChange} />
                    </div>
                    <section className="flex flex-col">
                        {errors.name && <span className="text-red-600">* {errors.name}</span>}
                        {errors.email && <span className="text-red-600">* {errors.email}</span>}
                        {errors.phone && <span className="text-red-600">* {errors.phone}</span>}
                    </section>
                    {scheduledOrder && <section className="">
                        <h3 className="text-primary font-semibold mt-3">Horario de retiro</h3>
                        <DatePicker date={today} emitDate={handleDate}></DatePicker>
                    </section>}

                    {!scheduledOrder && <section className="flex flex-col mt-3">
                        <Delay delay={delay} />
                    </section>}

                    {!scheduledOrder && <div className="flex justify-between items-center my-3">
                        <label htmlFor="updateMenu" className="text-gray-600 text-sm mr-2">Seleccionar horario de retiro:</label>
                        <input type="checkbox" className="border-1 border-gray-400 rounded-sm px-2 text-sm"
                            onChange={handleCheckboxScheduled} checked={scheduledSpecialOrder} />
                    </div>}

                    {scheduledSpecialOrder && !scheduledOrder && <section className="mt-3">
                        <h3 className="text-primary font-semibold mt-3">Horario de retiro</h3>
                        <DatePicker date={today} emitDate={handleDate}></DatePicker>
                    </section>}

                    <section className="flex flex-col">
                        {errors.hours && <span className="text-red-600 text-center">* {errors.hours}</span>}
                    </section>

                    {messageValidation && <p className="text-center text-red-500 text-shadow-sm font-light leading-6 my-2" style={{ maxWidth: '360px' }}>{messageValidation}</p>}
                    <footer>
                        {verifying ? <Spinner text={"Generando pedido..."} /> 
                            : <button className="button__primary m-auto my-3 flex items-center gap-2" onClick={handleConfirm}
                            disabled={messageValidation && messageValidation !== ''}>
                            <FaCheck />Confirmar <div></div>
                        </button>}
                    </footer>
                </form>
            </div>}
    </>)
}
