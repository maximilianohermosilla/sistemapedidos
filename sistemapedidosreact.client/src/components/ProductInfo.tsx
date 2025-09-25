import { useContext, useEffect, useState } from "react";
import imgDefault from "../assets/logo/logo_gray_top.jpeg";
import ProductInfoTopping from "./ProductInfoTopping";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { CartContext } from "../context/CartContext";
import { formatMoney } from "../utils/FormatMoney.ts";
import showToast from "../services/toast-service.ts";

export default function ProductInfo({ product, onConfirm }: any) {
    const [item, setItem] = useState<any>();
    const [itemQuantity, setItemQuantity] = useState<number>(1);
    const [toppings, setToppings] = useState<any>();
    const [selectedToppings, setSelectedToppings] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [requiredToppings, setRequiredToppings] = useState<boolean>(false);
    // const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);
    const cartContext = useContext<any>(CartContext);

    useEffect(() => {
        if (product) {
            product.quantity = product.quantity || 1;
            setItem(product);
            setTotalPrice(product?.totalPrice || product?.price);
            setToppings(groupToppings(product?.children));
        }
    }, [product]);

    useEffect(() => {
        const sumToppings = selectedToppings.reduce((accumulator: any, topping: any) => accumulator + topping?.price, 0);
        setTotalPrice((item?.price * itemQuantity) + sumToppings);
        validateToppings();
    }, [selectedToppings, item?.price, itemQuantity]);

    useEffect(() => {
        setSelectedToppings(cartContext.cartItems.find((cartItem: any) => item?.id === cartItem.id)?.toppings || []);
        setItemQuantity(cartContext.cartItems.find((cartItem: any) => item?.id === cartItem.id)?.quantity || 1);
    }, [cartContext.cartItems, item]);

    const addDefaultImg = (event: any) => {
        event!.target!.src = imgDefault
    }

    const groupToppings = (children: any[]) => {
        const map = new Map<string, { category: any; items: Omit<any, "category" | "children">[] }>();

        children.forEach((child) => {
            const { category, ...rest } = child;

            if (!map.has(category.id)) {
                map.set(category.id, { category, items: [] });
            }

            map.get(category.id)!.items.push(rest);
        });

        return Array.from(map.values());
    }

    const handleTopping = (topping: any) => {
        if (topping?.multiple) {
            updateToppingMultiple(topping);
        }
        else {
            updateToppingUnique(topping);
        }
    }

    const updateToppingMultiple = (topping: any) => {
        const selectedToppingsTemp = [...selectedToppings];

        if (topping?.checked) {
            setSelectedToppings([...selectedToppingsTemp, topping]);
        }
        else {
            const index = selectedToppingsTemp.findIndex((selectedTopping: any) =>
                selectedTopping.categoryId === topping.categoryId
                && selectedTopping.productNumber === topping.productNumber
                && selectedTopping.id === topping.id);

            selectedToppingsTemp.splice(index, 1);
            if (index >= 0) {
                setSelectedToppings([...selectedToppingsTemp]);
            }
        }
    }

    const updateToppingUnique = (topping: any) => {
        const selectedToppingsTemp = [...selectedToppings];

        const index = selectedToppingsTemp.findIndex((selectedTopping: any) =>
            selectedTopping.categoryId === topping.categoryId && selectedTopping.productNumber === topping.productNumber);

        if (index >= 0) {
            selectedToppingsTemp[index] = topping;
            setSelectedToppings([...selectedToppingsTemp]);
        }
        else {
            setSelectedToppings([...selectedToppings, topping]);
        }
    }

    const handleDiscount = () => {
        const newQuantity = itemQuantity - 1;
        const newSelectedToppings = selectedToppings.filter((topping: any) => topping.productNumber !== newQuantity);
        setItemQuantity(newQuantity > 0 ? newQuantity : 1);
        setSelectedToppings([...newSelectedToppings]);
    }

    const handleConfirm = () => {
        const product = { ...item, quantity: itemQuantity, toppings: selectedToppings, totalPrice: totalPrice }
        cartContext.addToCart.bind(null, product)();
        showToast({title: 'Producto', description:  `${product?.name} agregado correctamente.`});
        onConfirm();
    }

    const validateToppings = () => {
        let toppingIncomplete: boolean = false;
        for (let index = 0; index <= itemQuantity-1; index++) {
            toppings?.forEach((topping: any) => {
                if (topping?.category?.maxQty > 0) {
                    const toppingChecked = selectedToppings.find((t: any) => t.categoryId === topping?.category?.id && t.productNumber === index);                    
                    if (!toppingChecked) {
                        toppingIncomplete = true;
                    }
                }
            })
        }
        setRequiredToppings(toppingIncomplete);
    }

    const renderToppings = (_item: any, index: number) => {
        if (toppings) {
            return toppings.map((topping: any) =>
                <ProductInfoTopping key={`${topping.category.id}_${itemQuantity}`} toppingProp={topping} productNumber={index} setSelectedTopping={handleTopping}
                    checked={selectedToppings.find((t: any) => t.categoryId === topping.category.id && t.productNumber === index)}
                    multipleChecked={selectedToppings.filter((t: any) => t.categoryId === topping.category.id && t.productNumber === index)}
                />);
        }
    }

    return (
        <>
            {item &&
                <div className="product__container">
                    <img src={item?.imageUrl && item?.imageUrl != '' ? item?.imageUrl : imgDefault} alt={item?.name} onError={addDefaultImg}
                        className="w-full h-50 md:h-80 object-fill rounded-t-md" />
                    <section className="mt-2">
                        <div className="product__info">
                            <p className="text-cyan-700 font-bold">{formatMoney(item?.price || 0)}</p>
                            <p className="text-cyan-500">{item?.category?.name}</p>
                            <p className="text-gray-500">{item?.description}</p>
                        </div>
                        <div className="product__toppings my-3">
                            {Array.from({ length: itemQuantity }).map((item, index) => (
                                renderToppings(item, index)
                            ))}
                        </div>
                    </section>
                    <footer className="flex justify-between items-center mt-5">
                        <div className="flex justify-between items-center w-20">
                            <button className="button__add__outlined rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                onClick={handleDiscount}>
                                <FaMinus />
                            </button>
                            <span className="font-semibold text-gray-400 md:mx-2">{itemQuantity}</span>
                            <button className="button__add__outlined rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                onClick={() => setItemQuantity(itemQuantity + 1)}>
                                <FaPlus />
                            </button>
                        </div>
                        <button tabIndex={0} className="button__primary flex items-center gap-1" onClick={handleConfirm} disabled={requiredToppings}>
                            Agregar {formatMoney(totalPrice || 0)}
                        </button>
                    </footer>
                </div>
            }
        </>
    )
}
