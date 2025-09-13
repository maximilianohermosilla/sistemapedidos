import { useEffect, useState } from "react";
import GetLastMenu from "../services/menu.service";
import Menu from "../components/Menu";
import Delay from "../components/Delay";

export default function LandingPage() {
    const [menu, setMenu] = useState<any>();
    const [menuFavs, setMenuFavs] = useState<any>();
    const [menuCombos, setMenuCombos] = useState<any>();
    const [menuOffers, setMenuOffers] = useState<any>();

    useEffect(() => {
        getLastMenu();
    }, []);

    async function getLastMenu() {
        const data = await GetLastMenu();
        data!.items!.push(...data.items);
        data!.items!.push(...data.items);
        console.log(data);
        setMenu(data);
        setMenuFavs(data.items);
        setMenuCombos(data.items.filter((e: any) => e.imageUrl != ''));
        setMenuOffers(data.items.filter((e: any) => e.categoryId == 3));
    }

    return (
        <div className="main__container">            
            <Delay></Delay>
            <Menu items={menuFavs} title={"Favoritos"}></Menu>
            <Menu items={menuCombos} title={"Combos"}></Menu>
            <Menu items={menuOffers} title={"Pizzas"}></Menu>
        </div>
    )
}
