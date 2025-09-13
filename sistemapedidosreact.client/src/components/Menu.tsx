import "./Menu.css";
import "../App.css";
import { useRef } from "react";
import CardProduct from "./CardProduct";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";


export default function Menu({items, title}: any) {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            (scrollContainerRef!.current! as HTMLDivElement).scrollLeft -= 200;
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            (scrollContainerRef!.current! as HTMLDivElement).scrollLeft += 200;
        }
    };

    const contents = items === undefined || items.length === 0 ? 
        <p className="text-lg font-semibold text-center text-cyan-700 w-full my-3">No hay productos para mostrar</p> :
        <> {items?.map((item: any, index: any) => <CardProduct key={index} product={item}></CardProduct>)} </>;

    return (
        <section className="menu__carrousel">
            <h2 className="w-full text-center text-2xl font-bold text-gray-600 my-3">{title}</h2>
            <div className="menu__container">
                {items?.length > 0 && <BsArrowLeftCircleFill className="arrow arrow-left" onClick={scrollLeft}></BsArrowLeftCircleFill>}
                <div ref={scrollContainerRef} className="horizontal__scrol__wrapper menu__section flex-column md:flex gap-5 overflow-x-auto mb-3">
                    {contents}
                </div>
                {items?.length > 0 && <BsArrowRightCircleFill className="arrow arrow-right" onClick={scrollRight}></BsArrowRightCircleFill>}
            </div>
        </section>
    )
}