import "./ProductInfoTopping.css";
import { useEffect, useState } from "react";
import ProductInfoToppingItem from "./ProductInfoToppingItem";

export default function ProductInfoToppings({ toppingProp, checked, productNumber, setSelectedTopping }: any) {
    const [topping, setTopping] = useState<any>();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTopping(toppingProp);
    }, [toppingProp]);

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    const renderToppings = () => {
        return topping?.items?.map((item: any) =>
            <ProductInfoToppingItem key={`${item.id}_${productNumber}`} item={item} setSelectedOption={setSelectedTopping} productNumber={productNumber}
                checked={checked?.id === item.id}></ProductInfoToppingItem>
        )
    }

    return (
        <details open={isOpen} onToggle={toggleDetails} className="">
            <summary className="text-primary font-semibold bg-blue-100 p-2 mb-2 cursor-pointer hover:opacity-70 flex justify-between">
                {topping?.category?.name} {productNumber > 0 && productNumber + 1}
            </summary>
            {renderToppings()}
        </details>
    );
}
