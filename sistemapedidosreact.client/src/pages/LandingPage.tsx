import { useEffect, useState } from "react";
import { GetLastMenu } from "../services/menu-service";
import { GetAllCategorySchedules } from "../services/category-schedule-service";
import { isCategoryScheduleActive, shouldShowCategoryBySchedule } from "../utils/TimeValidation";
import Menu from "../components/Menu";
import ViewCartButton from "../components/ViewCartButton";
import Delay from "../components/Delay";
import Footer from "../components/Footer";
import { GetParameterByKey } from "../services/parameter-service";
import Spinner from "../components/Spinner";
import { ParameterEnum } from "../enums/parameter";
import { GetDaySchedule, IsOpen } from "../services/weekly-schedule-service";
import { dateToString } from "../utils/ParseDateUtil";
import imgDefault from "../assets/bg-blue.png";

export default function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [delay, setDelay] = useState<string>('0 min');
    const [menu, setMenu] = useState<any>();
    const [menuFavs, setMenuFavs] = useState<any>();
    const [menuSpecial, setMenuSpecial] = useState<any>();
    const [menuGrouped, setMenuGrouped] = useState<any>();
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        getLastMenu();
    }, []);

    const addDefaultImg = (event: any) => {
        event!.target!.src = imgDefault
    }

    async function getLastMenu() {
        const [data, categorySchedules] = await Promise.all([
            GetLastMenu(),
            GetAllCategorySchedules()
        ]);
        const schedules = categorySchedules || [];

        const productsSpecial = data?.items?.filter((item: any) =>
            item?.category?.name?.toUpperCase() === 'MENU FIESTAS' &&
            shouldShowCategoryBySchedule(item?.category?.id, schedules)
        ) || [];

        const productsWithoutPicadas = data?.items?.filter((item: any) =>
            item?.category?.name?.toUpperCase() !== 'PICADAS' &&
            item?.category?.name?.toUpperCase() !== 'MENU FIESTAS' &&
            shouldShowCategoryBySchedule(item?.category?.id, schedules)
        ) || [];

        const productsGrouped = groupProducts(productsWithoutPicadas, schedules);
        setLoading(false);

        setMenu(data);
        setMenuFavs(productsWithoutPicadas);
        setMenuSpecial(productsSpecial);
        setTimeout(() => {
            setMenuGrouped(productsGrouped);
        }, 200);
        handleTimeChange();
    }

    const groupProducts = (items: any[], categorySchedules: any[] = []) => {
        const map = new Map<string, { category: any; items: Omit<any, "category" | "children">[] }>();
        const disallowedCategoryIds = new Set<any>();

        items?.forEach((item: any) => {
            const { category, ...rest } = item;
            if (!category) return;

            if (disallowedCategoryIds.has(category.id)) {
                return;
            }

            if (!map.has(category.id)) {
                const specialSchedules = category.categorySchedules?.length
                    ? category.categorySchedules
                    : (categorySchedules?.filter((s: any) => s.categoryId === category.id) || []);

                // Si la categoría tiene al menos una configuración especial
                if (specialSchedules.length > 0) {
                    // Validar si alguna configuración coincide con el día de la semana actual y horario entre openingTime y closingTime
                    const matchesCurrentDayAndTime = specialSchedules.some((schedule: any) =>
                        isCategoryScheduleActive(schedule)
                    );

                    // Si ninguna de las configuraciones especiales coincide con el día y hora actual, no se muestra en el menú
                    if (!matchesCurrentDayAndTime) {
                        disallowedCategoryIds.add(category.id);
                        return;
                    }
                }

                map.set(category.id, { category, items: [] });
            }

            map.get(category.id)!.items.push({ ...rest, category: category });
        });
        const productsGrouped = Array.from(map.values());
        productsGrouped.sort((a: any, b: any) => a.category?.sortingPosition - b.category?.sortingPosition);

        return productsGrouped;
    }

    const getParameterByKey = async () => {
        const delayParameter = await GetParameterByKey(ParameterEnum.DELAY);
        if (delayParameter) setDelay(delayParameter?.value);
    }

    const handleTimeChange = async () => {
        const now = new Date();

        const startHour = await GetParameterByKey(ParameterEnum.OPENING_HOURS);
        const endHour = await GetParameterByKey(ParameterEnum.CLOSING_HOURS);

        const isValid = await IsOpen({ dayOfWeek: dateToString(now) }, false);

        if (!isValid) {
            const dateSchedules = await GetDaySchedule({ dayOfWeek: dateToString(now) });
            setValidationError(`Los pedidos pueden retirarse de martes a domingos entre las ${dateSchedules?.openingTime || startHour?.value || '20:00'} 
                                y las ${dateSchedules?.closingTime || endHour?.value || '23:00'} hs.`);
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
                    {menuSpecial?.length > 0 && <Menu items={menuSpecial} title={"Menús Especiales"}></Menu>}
                    {menuFavs?.length > 0 && <Menu items={menuFavs} title={"Favoritos"}></Menu>}
                    {menuGrouped?.map((group: any, index: any) => <Menu key={index} items={group!.items} title={group!.category!.name}></Menu>)}
                    <a href="/picadas" className="w-full flex flex-col m-auto md:w-300 justify-center border-b-3 border-white p-3 rounded-md hover:cursor-pointer hover:opacity-60">
                        <img src="https://ayresit.ar/ayrespop_imagenes/00461/00004970_2025_10_15_12_19_08.jpg" alt="Picadas" className="w-full mb-3 relative opacity-90 rounded-md" onError={addDefaultImg} />
                        <h2 className="w-full md:w-300 text-center font-semibold text-4xl text-white my-3 text-shadow-gray-700 text-shadow-sm absolute mb-5">Picadas</h2>
                    </a>
                </section>
            }
            {!loading && <Footer menu={menu}></Footer>}
            {!loading && <ViewCartButton></ViewCartButton>}
        </div>
    )
}
