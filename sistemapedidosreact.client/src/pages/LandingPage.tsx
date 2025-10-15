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
    const [menuGrouped, setMenuGrouped] = useState<any>();

    useEffect(() => {
        getLastMenu();
    }, []);

    async function getLastMenu() {
        const data = await GetLastMenu();
        const productsWithoutPicadas = data.items.filter((item: any) => item?.category?.name?.toUpperCase() !== 'PICADAS');
        const productsGrouped = groupProducts(productsWithoutPicadas);
        setLoading(false);

        setMenu(data);
        setMenuFavs(productsWithoutPicadas);
        setTimeout(() => {
            setMenuGrouped(productsGrouped);            
        }, 200);        
        getParameterByKey();
    }

    const groupProducts = (items: any[]) => {
        const map = new Map<string, { category: any; items: Omit<any, "category" | "children">[] }>();

        items?.forEach((item: any) => {
            const { category, ...rest } = item;

            if (!map.has(category.id)) {
                map.set(category.id, { category, items: [] });
            }

            map.get(category.id)!.items.push({ ...rest, category: category});
        });
        const productsGrouped = Array.from(map.values());
        productsGrouped.sort((a: any, b: any) => a.category?.sortingPosition - b.category?.sortingPosition);
        
        return productsGrouped;
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
                        {menuGrouped?.map((group: any, index: any) => <Menu key={index} items={group!.items} title={group!.category!.name}></Menu>)}
                </section>
            }
            {!loading && <Footer menu={menu}></Footer>}
            {!loading && <ViewCartButton></ViewCartButton>}
        </div>
    )
}
