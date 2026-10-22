import "./Menu.css";
import { useEffect, useState } from "react";
import { GetLastMenu } from "../services/menu-service";
import { GetAllCategorySchedules } from "../services/category-schedule-service";
import { isCategoryScheduleActive } from "../utils/TimeValidation";
import Spinner from "../components/Spinner";
import MenuList from "../components/MenuList";
import logo from '../assets/logo/logo_black_bottom.jpeg';

export default function MenuPage() {
    const [loading, setLoading] = useState(true);
    const [menuGrouped, setMenuGrouped] = useState<any>();

    useEffect(() => {
        getLastMenu();
    }, []);

    async function getLastMenu() {
        const [data, categorySchedules] = await Promise.all([
            GetLastMenu(),
            GetAllCategorySchedules()
        ]);
        const productsGrouped = groupProducts(data?.items, categorySchedules || []);
        setMenuGrouped(productsGrouped);
        setLoading(false);
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

        return Array.from(map.values());
    }


    return (
        <div className="main__menu bg-secondary min-h-screen w-full z-60 absolute" style={{ marginTop: "-64px" }}>
            {loading
                ? <div className="bg-white flex flex-col m-auto h-screen text-white"><Spinner text={"Cargando menú..."} /></div>
                : <article className="menu__body bg-primary w-full border-5 border-white">
                    <a href="/" className="shrink-0 hover:cursor-pointer hover:opacity-75 active:ring-2 active:ring-blue-400">
                        <img src={logo} alt="Logo Header" width={300} height={100} className="m-auto mt-3 mb-5 shadow-lg shadow-gray-800" />
                    </a>
                    <section className="flex flex-col pt-3 mx-0 px-5 px-md-0 w-full mt-5">
                        {menuGrouped?.map((group: any, index: any) => <MenuList key={index} items={group!.items} title={group!.category!.name}></MenuList>)}
                        <h2 className="category__title w-full text-center text-2xl font-bold text-white my-3 mb-5  text-shadow-gray-700 text-shadow-sm">(CONSULTAR PLATOS DEL DÍA)</h2>
                    </section>

                </article>
            }
        </div>
    )
}

