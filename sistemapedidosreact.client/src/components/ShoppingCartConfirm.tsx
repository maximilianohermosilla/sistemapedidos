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
    const [scheduledOrderSpecial, setScheduledOrderSpecial] = useState<boolean>(false);
    const [scheduledSpecialOrder, setScheduledSpecialOrder] = useState<boolean>(false);
    const [minutes, setMinutes] = useState(0);
    const [dateOrderScheduled, setDateOrderScheduled] = useState('');
    const [messageValidation, setMessageValidation] = useState(validationError);
    const [delay, setDelay] = useState<string>('10-15 min');
    const [selectedDate, setSelectedDate] = useState('2025-12-24');
    const [selectedTime, setSelectedTime] = useState('12:00');

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    useEffect(() => {
        prop.forEach((item: any) => {
            if (item?.category?.name?.toUpperCase() === 'PICADAS' || item?.category?.name?.toUpperCase() === 'PICADA') {
                setScheduledOrder(true);
            }

            if (item?.category?.name?.toUpperCase() === 'MENU FIESTAS') {
                setScheduledOrderSpecial(true);
            }
        });

        getDelayParameterByKey();
        setShoppingCart(prop);
    }, [prop])

    const getDelayParameterByKey = async () => {
        const delayParameter = await GetParameterByKey(ParameterEnum.DELAY);
        if (delayParameter) setDelay(delayParameter?.value);
    }

    const handleSelectedDateChange = (e: any) => {
        setSelectedDate(e.target.value);
        setDateOrderScheduled(formatDateHHMM(`${e.target.value}T${selectedTime}:00.000`));
        const minutes = calculateMinutesBetweenDates(new Date(), new Date(`${e.target.value}T${selectedTime}:00.000`));
        setMinutes(minutes);
    };

    const handleSelectedTimeChange = (e: any) => {
        setSelectedTime(e.target.value);
        setDateOrderScheduled(formatDateHHMM(`${selectedDate}T${e.target.value}:00.000`));
        const minutes = calculateMinutesBetweenDates(new Date(), new Date((`${selectedDate}T${e.target.value}:00.000`)));
        setMinutes(minutes);
    };

    const renderCartDetail = () => {
        return shoppingCart.map((item: any) => {
            return (
                <li key={item.id} className="flex flex-col justify-between my-1 decoration-0">
                    <div className="w-full flex justify-between gap-1">
                        <p className="font-semibold w-fit leading-5" style={{ maxWidth: '200px' }}>{item.quantity} x {item.name}</p>
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

        //MENU FIESTAS
        if (scheduledOrderSpecial) {
            const isValid = isTimeBetweenHours(dateOrderScheduled.split(' ')[1] || '20:00', '09:00', '15:00');

            if (!isValid) {
                newErrors!.hours = `Horario de retiro: 09 - 15hs.`;
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
            //console.log(event.toISOString())
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
                cookingTime: scheduledOrder || scheduledOrderSpecial ? minutes : undefined,
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

        //console.log(order);
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

                    {!scheduledOrder && !scheduledOrderSpecial && <section className="flex flex-col mt-3">
                        <Delay delay={delay} />
                    </section>}

                    {!scheduledOrder && !scheduledOrderSpecial && <div className="flex justify-between items-center my-3">
                        <label htmlFor="updateMenu" className="text-gray-600 text-sm mr-2">Seleccionar horario de retiro:</label>
                        <input type="checkbox" className="border-1 border-gray-400 rounded-sm px-2 text-sm"
                            onChange={handleCheckboxScheduled} checked={scheduledSpecialOrder} />
                    </div>}

                    {scheduledSpecialOrder && !scheduledOrder && <section className="mt-3">
                        <h3 className="text-primary font-semibold mt-3">Horario de retiro</h3>
                        <DatePicker date={today} emitDate={handleDate}></DatePicker>
                    </section>}

                    {/* MENU FIESTAS */}
                    {scheduledOrderSpecial && <section className="flex flex-col mt-3">
                        <h3 className="text-primary font-semibold mt-3">Horario de retiro</h3>
                        <div className="flex gap-3 justify-between my-2">
                            <p className="text-md mt-1">Seleccione Día:</p>
                            <select className="w-30 px-1 rounded-sm text-sm" onChange={handleSelectedDateChange}>
                                <option value="2025-12-24">24/12/2025</option>
                                <option value="2025-12-31">31/12/2025</option>
                            </select>
                        </div>

                        <div className="flex gap-3 justify-between mt-2 mb-4">
                            <p className="text-md mt-1">Seleccione Horario:</p>
                            <input className="w-30 px-2 rounded-sm text-sm"
                                type="time"
                                value={selectedTime}
                                onChange={handleSelectedTimeChange}
                            />
                        </div>
                        <p className="text-center text-primary text-shadow-sm font-light leading-6 my-2 whitespace-break-spaces" style={{ maxWidth: '360px' }}>
                            El pedido debe ser reservado abonando el 50% del valor total. 
                            Comuníquese a través de nuestro whatsapp o instagram luego de confirmar el pedido.
                        </p>
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
