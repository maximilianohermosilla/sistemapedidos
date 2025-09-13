import "./CardProduct.css";
import { useEffect, useState } from "react";
import imgDefault from "../assets/logo/logo_gray_top.jpeg";
import { formatMoney } from '../utils/formatMoney.ts';

export default function CardProduct({ product }: any) {
    const [item, setItem] = useState<any>();

    useEffect(() => {
        setItem(product);
    }, [product]);

    const addDefaultImg = (event: any) => {
        event!.target!.src = imgDefault
    }

    return (
        <>
            {item === undefined ? <p>No se encontraron datos</p> :
                <div className="card__product bg-white p-4 text-left rounded-md hover:opacity-75 hover:shadow-lg shadow-gray-500/40 hover:cursor-pointer">
                    <img src={item.imageUrl && item.imageUrl == '' ? item.imageUrl : imgDefault} alt={item.name} onError={addDefaultImg} className="w-full h-48 object-cover mb-4" />
                    <h3 className="font-bold">{item.name}</h3>
                    {/* <p className="text-gray-500">SKU: {item.sku}</p> */}
                    <p className="text-amber-500">{item.category?.name}</p>
                    <p className="text-green-500 font-bold">{formatMoney(item.price)}</p>
                </div>
            }
        </>
    )
}