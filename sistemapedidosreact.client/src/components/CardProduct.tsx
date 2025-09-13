import "./CardProduct.css";
import { useEffect, useState } from "react";
import imgDefault from "../assets/logo/logo_gray_top.jpeg";
import { formatMoney } from '../utils/formatMoney.ts';
import { FaPlus } from "react-icons/fa6";

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
                <div className="card__product bg-white text-left rounded-md hover:shadow-lg shadow-gray-500/40 hover:cursor-pointer mx-auto md:mx-2">
                    <img src={item.imageUrl && item.imageUrl != '' ? item.imageUrl : imgDefault} alt={item.name} onError={addDefaultImg}
                        className="w-full h-48 object-cover rounded-t-md" />
                    <footer className="flex p-4 justify-between">
                        <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-cyan-500">{item.category?.name}</p>
                            <p className="text-cyan-700 font-bold">{formatMoney(item.price)}</p>
                        </div>
                        <div className="">
                            <button className="button__add rounded-full p-2 mt-5 hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40">
                                <FaPlus color="white"/>
                            </button>
                        </div>
                    </footer>
                </div>
            }
        </>
    )
}