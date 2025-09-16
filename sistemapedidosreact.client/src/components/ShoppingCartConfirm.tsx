import { useEffect, useState } from "react";
import { formatMoney } from "../utils/formatMoney";
import { FaCheck } from "react-icons/fa6";
import type { Order } from "../interfaces/order";
import { CreateOrder } from "../services/order-service";

export default function ShoppingCartConfirm({ prop, totalPrice, onConfirm }: any) {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState<any>({});


    useEffect(() => {
        setShoppingCart(prop);
    }, [prop])


    const renderCartDetail = () => {
        return shoppingCart.map((item: any) => {
            return (
                <li key={item.id} className="flex flex-col justify-between my-1 decoration-0">
                    <div className="w-full flex justify-between">
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

    const validate = () => {
        const newErrors: any = {};
        if (!formData.name) {
            newErrors!.name = 'Nombre es requerido';
        }
        if ((!formData.email || !/\S+@\S+\.\S+/.test(formData.email) && !formData.phone) && !formData.phone) {
            newErrors!.email = 'Debe ingresar al menos un método válido de contacto';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirm = async (event?: any) => {
        event?.preventDefault();
        if (validate()) {
            await createOrder();
            setFormData({ name: '', email: '', phone: '' });
            onConfirm();
        }
    }

    const createOrder = async () => {
        const orderDetail = shoppingCart.map((item: any) => ({
            id: 0,
            itemId: item.id,
            orderDetailId: 0,
            comments: "",
            price: item.totalPrice,
            quantity: item.quantity,
            maxLimit: 0,
            sortingPosition: 0,
            orderSubItems: item.toppings?.map((topping: any) => ({
                id: 0,
                itemId: topping.id,
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
                createdAt: new Date().toISOString(),
                deliveryMethod: "Pickup",
                mesaId: undefined,
                cantidadCubiertos: "1",
                paymentMethodId: undefined,
                tip: 0,
                deliveryInformationId: undefined,
                billingInformationId: undefined,
                deliveryDiscountId: undefined,
                totalsId: undefined,
                totals: {
                    id: 0,
                    totalProducts: shoppingCart.length,
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
                orderItems: orderDetail
            },
            customer: {
                firstName: formData?.name,
                lastName: "",
                phoneNumber: formData?.phone,
                documentNumber: "",
                userType: "",
                email: formData?.email
            }
        };

        console.log(order);

        let response = await CreateOrder(order);
        console.log(response);
    }



    return (
        <div>
            <h3 className="text-primary font-semibold">Resumen de compra</h3>
            <ul>{renderCartDetail()}</ul>
            <form className="mt-5 mb-3" onSubmit={handleConfirm}>
                <h3 className="text-primary font-semibold">Datos de contacto</h3>
                <div className="flex justify-between my-3">
                    <label htmlFor="name" className="text-secondary text-sm font-semibold mr-2">Nombre:</label>
                    <input type="text" id="name" name="name" className="border-1 border-gray-400 rounded-sm px-2"
                        value={formData?.name} onChange={handleChange} />
                </div>
                <div className="flex justify-between my-3">
                    <label htmlFor="email" className="text-secondary text-sm font-semibold mr-2">Correo:</label>
                    <input type="text" id="email" name="email" className="border-1 border-gray-400 rounded-sm px-2"
                        value={formData?.email} onChange={handleChange} />
                </div>
                <div className="flex justify-between my-3">
                    <label htmlFor="phone" className="text-secondary text-sm font-semibold mr-2">Teléfono:</label>
                    <input type="text" id="phone" name="phone" className="border-1 border-gray-400 rounded-sm px-2"
                        value={formData?.phone} onChange={handleChange} />
                </div>
                <section className="flex flex-col">
                    {errors.name && <span className="text-red-700">* {errors.name}</span>}
                    {errors.email && <span className="text-red-700">* {errors.email}</span>}
                    {errors.phone && <span className="text-red-700">* {errors.phone}</span>}
                </section>
                {/* <p className="text-gray-500 text-center text-sm">* Debe ingresar al menos un método de contacto.</p> */}
                <footer>
                    <button className="button__primary m-auto my-3 flex items-center gap-2" type="submit">
                        <FaCheck />Confirmar <div></div>
                    </button>
                </footer>
            </form>
        </div>
    )
}
