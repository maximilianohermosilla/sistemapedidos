import { useEffect, useState } from "react";
import { GetLastMenu } from "../services/menu-service";
import Menu from "../components/Menu";
import ViewCartButton from "../components/ViewCartButton";
import Delay from "../components/Delay";
import Footer from "../components/Footer";
import { GetParameterByKey } from "../services/parameter-service";
import Spinner from "../components/Spinner";

export default function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [delay, setDelay] = useState<string>('10-15 min');
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
        setLoading(false);

        setMenu(data);
        setMenuFavs(data.items);
        setMenuCombos(data.items.filter((item: any) => item.combo));
        setMenuGrouped(productsGrouped);
        getParameterByKey();
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

    const getParameterByKey = async () => {
        const delayParameter = await GetParameterByKey('DELAY');
        if(delayParameter) setDelay(delayParameter?.value);
    }

    return (
        <div className="main__container flex flex-col justify-between">
            {loading 
                ? <Spinner text={"Cargando productos..."} /> 
                : <section className="pt-3">
                        <Delay delay={delay}></Delay>
                        {menuFavs?.length > 0 && <Menu items={menuFavs} title={"Favoritos"}></Menu>}
                        {menuCombos?.length > 0 && <Menu items={menuCombos} title={"Combos"}></Menu>}                
                        {menuGrouped?.map((group: any, index: any) => <Menu key={index} items={group!.items} title={group!.category!.name}></Menu>)}
                </section>
            }
            {!loading && <Footer menu={menu}></Footer>}
            {!loading && <ViewCartButton></ViewCartButton>}
        </div>
    )
}
