import { useEffect, useState } from 'react';
import './App.css';
import getOrders from './services/api';
import GetLastMenu from './services/menu.service';

function App() {
    const [menu, setMenu] = useState<any>();

    useEffect(() => {
        getLastMenu();
        //GetOrders(storeId);
    }, []);
    
    async function getLastMenu(){
        const data = await GetLastMenu();
        console.log(data);
        setMenu(data);
    }

    const contents = menu === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {menu?.items?.map((item: any) =>
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.sku}</td>
                        <td>{item.category?.name}</td>
                        <td>$ {item.price}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1>EL REFUGIO</h1>
            {contents}
        </div>
    );

}

export default App;