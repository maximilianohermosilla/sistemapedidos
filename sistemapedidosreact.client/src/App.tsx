import { useEffect, useState } from 'react';
import './App.css';
import GetLastMenu from './services/menu.service';
import Header from './components/Header';

function App() {
    const [menu, setMenu] = useState<any>();

    useEffect(() => {
        getLastMenu();
        //GetOrders(storeId);
    }, []);

    async function getLastMenu() {
        const data = await GetLastMenu();
        console.log(data);
        setMenu(data);
    }

    const contents = menu === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <article>
            {menu?.items?.map((item: any) =>
                <div key={item.id} className="bg-white p-4 mx-1 mb-2 text-left rounded-md hover:opacity- hover:shadow-lg shadow-gray-500/40 hover:cursor-pointer">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-500">SKU: {item.sku}</p>
                    <p className="text-amber-500">{item.category?.name}</p>
                    <p className="text-green-500 font-bold">$ {item.price}</p>
                </div>
            )}
        </article>
        ;

    return (
        <main className="w-full min-h-screen bg-gray-100">
            <Header></Header>
            <div className="w-full pt-5 px-3 min-h-screen">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold">🍔 EL REFUGIO 🍔</h1>
                    <p className="text-sm text-gray-500">Haz tu pedido online</p>
                </header>

                {contents}
            </div>
        </main>
    );

}

export default App;