import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({});

export const CartProvider = ({ children }: any) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);


    const addToCart = (item: any) => {
        setCartItems((prevItems: any) => {
            const itemExists = prevItems.find((cartItem: any) => cartItem.id === item.id);
            if (itemExists) {
                return prevItems.map((cartItem: any) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: any) => {
        setCartItems((prevItems: any) => prevItems.filter((item: any) => item.id !== itemId));
    };

    const updateQuantity = (itemId: any, newQuantity: any) => {
        if(newQuantity === 0) removeFromCart(itemId);
        setCartItems((prevItems: any) =>
            prevItems.map((item: any) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};