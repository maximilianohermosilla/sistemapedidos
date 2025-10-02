import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchItems } from "../services/item-service";
import CardProduct from "../components/CardProduct";
import Spinner from "../components/Spinner";

export default function Search() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<any>();
    const { query } = useParams();

    useEffect(() => {
        searchItems();
    }, [query]);

    const searchItems = async () => {
        const response = await SearchItems(query!);
        setLoading(false);
        setItems(response);
    }

    const contents = items === undefined || items.length === 0 ?
        <p className="text-lg font-semibold text-center text-cyan-700 w-full my-3">No hay productos para mostrar</p> :
        <> {items?.map((item: any, index: any) => <CardProduct key={index} product={item}></CardProduct>)} </>;

    return (
        <div className="main__container w-full flex flex-col justify-start p-2 pt-5">
            <section className="products">
                <h1 className="text-primary text-2xl font-semibold w-full text-center mb-1">Resultados de búsqueda</h1>
                <p className="text-gray-500 text-center mb-2">Buscar: {query}</p>
            </section>
            {loading
                ? <Spinner text={"Cargando productos..."} />
                : <section className="m-auto">
                    {items?.length > 0
                        ? contents
                        : <p className="text-lg font-semibold text-center text-cyan-700 w-full my-3">No hay productos para mostrar</p>
                    }
                </section>}
        </div>
    )
}