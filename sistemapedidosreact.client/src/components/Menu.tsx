import "./Menu.css";
import "../App.css";
import { useEffect, useState } from "react";
import GetLastMenu from "../services/menu.service";
import CardProduct from "./CardProduct";

export default function Menu() {
    const [menu, setMenu] = useState<any>();

    useEffect(() => {
        getLastMenu();
    }, []);

    async function getLastMenu() {
        const data = await GetLastMenu();
        console.log(data);
        data!.items!.push(...data.items);
        data!.items!.push(...data.items);
        setMenu(data);
    }

    const contents = menu === undefined ? <p className="text-lg font-semibold text-center text-cyan-700 w-full my-3">No hay productos para mostrar</p> :
        <> {menu?.items?.map((item: any) => <CardProduct key={item.id} product={item}></CardProduct>)} </>;

    return (
        <>
            <h2 className="w-full text-center text-2xl font-bold text-gray-600 my-3">Menu</h2>
            <section className="horizontal__scrol__wrapper menu__section flex-column md:flex gap-5 overflow-x-auto mb-3">
                {contents}
            </section>
        </>
    )
}