import { useEffect, useState } from "react";
import GetLastMenu from "../services/menu.service";
import Menu from "../components/Menu";
import Delay from "../components/Delay";
import ViewCartButton from "../components/ViewCartButton";
import Footer from "../components/Footer";

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
        setMenuOffers(data.items.filter((e: any) => e.categoryId == 4));
    }

    return (
        <div className="main__container h-full flex flex-col justify-between">
            <div>
                <Delay></Delay>
                {menuFavs?.length > 0 && <Menu items={menuFavs} title={"Favoritos"}></Menu>}
                {menuCombos?.length > 0 && <Menu items={menuCombos} title={"Combos"}></Menu>}
                {menuOffers?.length > 0 && <Menu items={menuOffers} title={"Ofertas"}></Menu>}
                {menuOffers?.length > 0 && <Menu items={menuOffers} title={"Pizzas"}></Menu>}
            </div>
            <Footer menu={menu}></Footer>
            <ViewCartButton></ViewCartButton>
        </div>
    )
}
