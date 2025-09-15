import { useEffect, useState } from "react";
import { formatMoney } from "../utils/formatMoney";
import { FaCheck } from "react-icons/fa6";

export default function ShoppingCartConfirm({ prop, onConfirm }: any) {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [inputNameValue, setInputNameValue] = useState<string>('');
    const [inputEmailValue, setInputEmailValue] = useState<string>('');
    const [inputPhoneValue, setInputPhoneValue] = useState<string>('');


    useEffect(() => {
        setShoppingCart(prop);
    }, [prop])


    const renderCartDetail = () => {
        console.log(shoppingCart)
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
    
    const handleNameValue = (event: any) => {
        setInputNameValue(event?.target?.value);
    }
    
    const handleEmailValue = (event: any) => {
        setInputEmailValue(event?.target?.value);
    }
    const handlePhoneValue = (event: any) => {
        setInputPhoneValue(event?.target?.value);
    }

    const handleConfirm = () => {
        alert(`${inputNameValue}, ${inputEmailValue}, ${inputPhoneValue}`);
        setInputNameValue('');
        setInputEmailValue('');
        setInputPhoneValue('');
        onConfirm();
    }

    return (
        <div>
            <h3 className="text-primary font-semibold">Resumen de compra</h3>
            <ul>{renderCartDetail()}</ul>
            <section className="mt-5 mb-3">
                <h3 className="text-primary font-semibold">Datos de contacto</h3>
                <div className="flex justify-between my-3">
                    <label className="text-secondary text-sm font-semibold mr-2">Nombre:</label>
                    <input type="text" className="border-1 border-gray-400 rounded-sm px-2" value={inputNameValue} onChange={handleNameValue}/>
                </div>
                <div className="flex justify-between my-3">
                    <label className="text-secondary text-sm font-semibold mr-2">Correo:</label>
                    <input type="text" className="border-1 border-gray-400 rounded-sm px-2" value={inputEmailValue} onChange={handleEmailValue}/>
                </div>
                <div className="flex justify-between my-3">
                    <label className="text-secondary text-sm font-semibold mr-2">Teléfono:</label>
                    <input type="text" className="border-1 border-gray-400 rounded-sm px-2" value={inputPhoneValue} onChange={handlePhoneValue}/>
                </div>
                <p className="text-gray-500 text-center text-sm">* Debe ingresar al menos un método de contacto.</p>
            </section>
            <footer>
                <button className="button__primary m-auto my-3 flex items-center gap-2" onClick={handleConfirm}>
                    <FaCheck />Confirmar <div></div>
                </button>
            </footer>
        </div>
    )
}
