import { useEffect, useState } from "react";
import { GetLastMenu } from "../services/menu-service";
import Menu from "../components/Menu";
import ViewCartButton from "../components/ViewCartButton";
import Delay from "../components/Delay";
import Footer from "../components/Footer";

export default function LandingPage() {
    const [menu, setMenu] = useState<any>();
    const [menuFavs, setMenuFavs] = useState<any>();
    const [menuCombos, setMenuCombos] = useState<any>();
    const [menuGrouped, setMenuGrouped] = useState<any>();

    useEffect(() => {
        getLastMenu();
    }, []);

    async function getLastMenu() {
        const data = await GetLastMenu();
        const productsGrouped = groupProducts(data?.items);
        //data!.items!.push(...data.items);
        //data!.items!.push(...data.items);
        //console.log(data);
        //console.log(productsGrouped);

        setMenu(data);
        setMenuFavs(data.items);
        setMenuCombos(data.items.filter((item: any) => item.combo));
        setMenuGrouped(productsGrouped);
    }

    const groupProducts = (items: any[]) => {
        const map = new Map<string, { category: any; items: Omit<any, "category" | "children">[] }>();

        items?.forEach((item: any) => {
            const { category, ...rest } = item;

            if (!map.has(category.id)) {
                map.set(category.id, { category, items: [] });
            }

            map.get(category.id)!.items.push(rest);
        });

        return Array.from(map.values());
    }

    return (
        <div className="main__container h-full flex flex-col justify-between">
            <section className="pt-3">
                <Delay></Delay>
                {menuFavs?.length > 0 && <Menu items={menuFavs} title={"Favoritos"}></Menu>}
                {menuCombos?.length > 0 && <Menu items={menuCombos} title={"Combos"}></Menu>}                
                {menuGrouped?.map((group: any, index: any) => <Menu key={index} items={group!.items} title={group!.category!.name}></Menu>)}
            </section>
            <Footer menu={menu}></Footer>
            <ViewCartButton></ViewCartButton>
        </div>
    )
}
