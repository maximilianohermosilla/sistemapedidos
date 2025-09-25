import "./ProductInfoTopping.css";
import { useEffect, useState } from "react";
import ProductInfoToppingItem from "./ProductInfoToppingItem";
import ProductInfoToppingItemCheckbox from "./ProductInfoToppingItemCheckbox";

export default function ProductInfoToppings({ toppingProp, checked, multipleChecked, productNumber, setSelectedTopping }: any) {
    const [topping, setTopping] = useState<any>();
    const [categoryRequired, setCategoryRequired] = useState<boolean>(false);
    const [categoryMultiple, setCategoryMultiple] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTopping(toppingProp);
        setCategoryRequired(toppingProp?.category?.maxQty === 1);
        setCategoryMultiple(toppingProp?.category?.maxQty > 1);
        setCategoryMultiple(true);
    }, [toppingProp]);

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    const renderToppings = () => {
        if (categoryMultiple) {
            const checkedIds = multipleChecked?.map((item: any) => item.id);
            return topping?.items?.map((item: any) =>
                <ProductInfoToppingItemCheckbox key={`${item.id}_${productNumber}`} item={item} setSelectedOption={setSelectedTopping} productNumber={productNumber}
                    checked={checkedIds?.includes(item.id)}></ProductInfoToppingItemCheckbox>
            )
        }
        else {
            return topping?.items?.map((item: any) =>
                <ProductInfoToppingItem key={`${item.id}_${productNumber}`} item={item} setSelectedOption={setSelectedTopping} productNumber={productNumber}                    
                    checked={checked?.id === item.id}></ProductInfoToppingItem>
            )
        }
    }

    return (
        <details open={isOpen} onToggle={toggleDetails} className="">
            <summary className="text-primary font-semibold bg-blue-100 p-2 mb-2 cursor-pointer hover:opacity-70 flex justify-between">
                <p className="w-full flex justify-between text-sm">{topping?.category?.name} {productNumber > 0 && productNumber + 1}
                    {categoryRequired && <span className="bg-red-400 text-white p-1 px-2 text-xs rounded-sm h-6">Obligatorio</span>}</p>
            </summary>
            {topping && renderToppings()}
        </details>
    );
}
