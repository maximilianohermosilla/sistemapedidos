import "./Menu.css";
import "../App.css";
import { useEffect, useRef, useState } from "react";
import GetLastMenu from "../services/menu.service";
import CardProduct from "./CardProduct";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";


export default function Menu() {
    const [menu, setMenu] = useState<any>();
    const scrollContainerRef = useRef(null);

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

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            (scrollContainerRef!.current! as HTMLDivElement).scrollLeft -= 200; // Adjust scroll amount as needed
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            (scrollContainerRef!.current! as HTMLDivElement).scrollLeft += 200; // Adjust scroll amount as needed
        }
    };

    const contents = menu === undefined ? <p className="text-lg font-semibold text-center text-cyan-700 w-full my-3">No hay productos para mostrar</p> :
        <> {menu?.items?.map((item: any) => <CardProduct key={item.id} product={item}></CardProduct>)} </>;

    return (
        <section className="menu__carrousel">
            <h2 className="w-full text-center text-2xl font-bold text-gray-600 my-3">Menu</h2>
            <div className="menu__container">
                <BsArrowLeftCircleFill className="arrow arrow-left" onClick={scrollLeft}></BsArrowLeftCircleFill>
                <div ref={scrollContainerRef} className="horizontal__scrol__wrapper menu__section flex-column md:flex gap-5 overflow-x-auto mb-3">
                    {contents}
                </div>
                <BsArrowRightCircleFill className="arrow arrow-right" onClick={scrollRight}></BsArrowRightCircleFill>
            </div>
        </section>
    )
}