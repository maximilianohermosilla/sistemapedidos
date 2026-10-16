import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchOrdersByCustomer } from "../services/order-service";
import CardOrder from "../components/CardOrder";

export default function Orders() {
    const [inputSearch, setInputSearch] = useState('');
    const [orders, setOrders] = useState<any[] | undefined>(undefined);

    const handleSearch = async (queryToSearch?: string) => {
        const query = typeof queryToSearch === 'string' ? queryToSearch : inputSearch;
        setOrders(undefined);
        if (query) {
            const response = await SearchOrdersByCustomer(query);
            if(response && response.length > 0) {
                setOrders(response);
            }
            else{
                setOrders([]);
            }
        }        
    }

    useEffect(() => {
        const savedEmail = localStorage.getItem('customerEmail');
        const savedPhone = localStorage.getItem('customerPhoneNumber') || localStorage.getItem('customerPhone');
        const searchValue = (savedEmail && savedEmail.trim() !== '')
            ? savedEmail.trim()
            : ((savedPhone && savedPhone.trim() !== '') ? savedPhone.trim() : '');

        if (searchValue) {
            setInputSearch(searchValue);
            handleSearch(searchValue);
        }
    }, []);

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="main__container w-full flex flex-col justify-start p-2 pt-5">
            <section className="">
                <h1 className="text-primary text-2xl font-semibold w-full text-center mb-1">Pedidos</h1>
                <div className="search-input-container m-auto w-80 mt-3 gap-1">
                    <input
                        type="text"
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ingrese email o teléfono"
                        className="w-full px-4 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                    <button className="button__primary h-10" onClick={() => handleSearch()}><FaSearch></FaSearch></button>
                </div>
            </section>
            {orders && 
            <section className="mt-5 px-1">
                {orders && orders.length > 0 
                ? orders.map((order: any, index: any) => <CardOrder key={index} order={order}></CardOrder>) 
                : <p className="text-lg font-semibold text-center text-primary w-full my-3">No hay pedidos para mostrar</p>}
            </section>
            }
        </div>
    )
}