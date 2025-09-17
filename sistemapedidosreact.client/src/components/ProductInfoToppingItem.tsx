import { formatMoney } from "../utils/FormatMoney";
import "./ProductInfoToppingItem.css"
import { useEffect, useState } from "react";

export default function ProductInfoToppingItem({ item, setSelectedOption, checked, productNumber }: any) {
    const [topping, setTopping] = useState<any>();

    const handleChange = () => {
        setSelectedOption({...topping, productNumber: productNumber});
    };

    useEffect(() => {
        item.productNumber = productNumber;
        setTopping(item);
    }, [item, productNumber])

    return (
        <div className="flex justify-between mb-2 p-2 hover:opacity-70">
            {item &&
                <>
                    <label className="flex gap-2 font-semibold cursor-pointer items-center">
                        <input
                            id={`${topping?.categoryId}_${productNumber}`}
                            type="radio"
                            name={`${topping?.categoryId}_${productNumber}`}
                            value={topping?.id}
                            checked={checked}
                            onChange={handleChange}
                        />
                        {topping?.name}
                    </label >
                    <span className="text-green-700 font-semibold">{formatMoney(topping?.price || 0)}</span>
                </>
            }
        </div>
    )
}
