import "./Menu.css";
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
        setMenu(data);
    }

    const contents = menu === undefined ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p> :
        <> {menu?.items?.map((item: any) => <CardProduct key={item.id} product={item}></CardProduct>)} </>;

    return (
        <section>
            {contents}
        </section>
    )
}