import "./MenuList.css";
import { formatMoney } from "../utils/FormatMoneyUtil";

export default function Menu({ items, title }: any) {

    const contents = items === undefined || items.length === 0 
        ? <p className="text-lg font-semibold text-center text-cyan-700 w-full my-5">No hay productos para mostrar</p> 
        : <> {items?.map((item: any, index: any) => 
        <li key={index} className="flex justify-between text-white w-full mb-3 gap-5">
            <p className="text-shadow-gray-700 text-shadow-sm">{item.name}</p><p className="text-secondary text-end font-bold">{formatMoney(item.price)}</p>
        </li>)} </>;

    return (
        <section className="w-full mb-3">
            <div className="w-full flex flex-col m-auto md:w-200 justify-between border-b-3 border-white pb-3">
                <h2 className="category__title w-full text-start text-3xl text-white my-3 text-shadow-gray-700 text-shadow-sm">{title?.toUpperCase()}</h2>
                {contents}
            </div>
        </section>
    )
}

