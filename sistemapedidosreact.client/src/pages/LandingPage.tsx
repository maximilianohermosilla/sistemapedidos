import { useEffect, useState } from "react";
import { GetLastMenu } from "../services/menu-service";
import Menu from "../components/Menu";
import ViewCartButton from "../components/ViewCartButton";
import Delay from "../components/Delay";
import Footer from "../components/Footer";
import { GetParameterByKey } from "../services/parameter-service";
import Spinner from "../components/Spinner";
import { isTimeBetweenHours } from "../utils/TimeValidation";
import { ParameterEnum } from "../enums/parameter";

export default function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [delay, setDelay] = useState<string>('10-15 min');
    const [menu, setMenu] = useState<any>();
    const [menuFavs, setMenuFavs] = useState<any>();
    const [menuGrouped, setMenuGrouped] = useState<any>();
    const [validationError, setValidationError] = useState('');

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
        handleTimeChange();
    }

    const groupProducts = (items: any[]) => {
        const map = new Map<string, { category: any; items: Omit<any, "category" | "children">[] }>();

        items?.forEach((item: any) => {
            const { category, ...rest } = item;

            if (!map.has(category.id)) {
                map.set(category.id, { category, items: [] });
            }

            map.get(category.id)!.items.push({ ...rest, category: category });
        });
        const productsGrouped = Array.from(map.values());
        productsGrouped.sort((a: any, b: any) => a.category?.sortingPosition - b.category?.sortingPosition);

        return productsGrouped;
    }

    const getParameterByKey = async () => {
        const delayParameter = await GetParameterByKey('DELAY');
        if (delayParameter) setDelay(delayParameter?.value);
    }
    
    const handleTimeChange = async () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeValue = `${hours}:${minutes}`;
        console.log("Current time:", timeValue);

        const startHour = await GetParameterByKey(ParameterEnum.OPENING_HOURS);
        const endHour = await GetParameterByKey(ParameterEnum.CLOSING_HOURS);
        const isValid = isTimeBetweenHours(timeValue, startHour?.value || '20:00', endHour?.value || '23:00');

        if (!isValid) {
            setValidationError(`Los pedidos solo pueden realizarse entre las ${startHour?.value || '20:00'} y las ${endHour?.value || '23:00'} hs.`);
        } else {
            getParameterByKey();
            setValidationError('');
        }
    };

    return (
        <div className="main__container flex flex-col justify-between">
            {loading
                ? <Spinner text={"Cargando productos..."} />
                : <section className="pt-3">
                    {validationError 
                        ? <p className="bg-white text-center text-red-500 text-shadow-sm shadow-sm font-light leading-5 mt-2 border-2 border-red-300 mx-2 rounded-sm p-2">{validationError}</p>
                        : <Delay delay={delay}></Delay>
                    }
                    {menuFavs?.length > 0 && <Menu items={menuFavs} title={"Favoritos"}></Menu>}
                    {menuGrouped?.map((group: any, index: any) => <Menu key={index} items={group!.items} title={group!.category!.name}></Menu>)}
                </section>
            }
            {!loading && <Footer menu={menu}></Footer>}
            {!loading && <ViewCartButton></ViewCartButton>}
        </div>
    )
}
