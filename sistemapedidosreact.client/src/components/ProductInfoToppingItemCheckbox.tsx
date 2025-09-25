import "./ProductInfoToppingItemCheckbox.css"
import { formatMoney } from "../utils/FormatMoney";
import { useEffect, useState } from "react";

export default function ProductInfoToppingItemCheckbox({ item, setSelectedOption, checked, productNumber }: any) {
    const [topping, setTopping] = useState<any>();
    const [toppingChecked, setToppingChecked] = useState<boolean>(false);

    const handleChange = () => {
        setSelectedOption({...topping, productNumber: productNumber, checked: !toppingChecked});
        setToppingChecked(!toppingChecked);
    };

    useEffect(() => {
        item.productNumber = productNumber;
        item.multiple = true;
        setTopping(item);
        setToppingChecked(checked);
    }, [item, productNumber])

    return (
        <div className="flex justify-between mb-2 p-2 hover:opacity-70">
            {item &&
                <>
                    <label className="flex gap-2 font-semibold cursor-pointer items-center text-sm">
                        <input
                            id={`${topping?.categoryId}_${productNumber}_${topping?.id}`}
                            type="checkbox"
                            name={`${topping?.categoryId}_${productNumber}_${topping?.id}`}
                            value={topping?.id}
                            checked={toppingChecked}
                            onChange={handleChange}
                        />
                        {topping?.name}
                    </label >
                    <span className="text-green-700 font-semibold text-sm">{formatMoney(topping?.price || 0)}</span>
                </>
            }
        </div>
    )
}
