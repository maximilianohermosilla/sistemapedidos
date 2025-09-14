import { useEffect, useState } from "react";
import imgDefault from "../assets/logo/logo_gray_top.jpeg";
import { formatMoney } from "../utils/formatMoney";

export default function ProductInfo({ product }: any) {
    const [item, setItem] = useState<any>();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setItem(product);
        setTotalPrice(product?.price)
    }, [product]);

    const addDefaultImg = (event: any) => {
        event!.target!.src = imgDefault
    }

    return (
        <>
            {item &&
                <div className="product__container">
                    <img src={item?.imageUrl && item?.imageUrl != '' ? item?.imageUrl : imgDefault} alt={item?.name} onError={addDefaultImg}
                        className="w-full h-48 object-fill rounded-t-md" />
                    <section className="mt-2">
                        <div className="product__info">
                            <p className="text-cyan-700 font-bold">{formatMoney(item?.price || 0)}</p>
                            <p className="text-cyan-500">{item?.category?.name}</p>
                            <p className="text-gray-500">{item?.description}</p>
                        </div>
                        <div className="product__toppings">
                            {item?.children && item?.children.map((child: any) => <p key={child.id}>{child.name}</p>)}
                        </div>
                    </section>
                    <footer>
                        <button className="button__primary mt-5 m-auto flex items-center gap-1">Agregar {formatMoney(totalPrice || 0)}</button>
                    </footer>
                </div>
            }
        </>
    )
}
