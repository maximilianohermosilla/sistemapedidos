import { useEffect, useState } from "react";
import { GetLastMenu } from "../services/menu-service";
import Menu from "../components/Menu";
import ViewCartButton from "../components/ViewCartButton";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

export default function PicadasPage() {
    const [loading, setLoading] = useState(true);
    const [menu, setMenu] = useState<any>();
    const [products, setProducts] = useState<any>();

    useEffect(() => {
        getLastMenu();
    }, []);

    async function getLastMenu() {
        const data = await GetLastMenu();
        const productsFiltered = data.items.filter((item: any) => item?.category?.name?.toUpperCase() === 'PICADAS')
    
        setMenu(data);
        setProducts(productsFiltered);
        setLoading(false);
    }    

    return (
        <div className="main__container flex flex-col justify-between">
            {loading 
                ? <Spinner text={"Cargando productos..."} /> 
                : <section className="pt-3">
                        {products?.length > 0 && <Menu items={products} title={"Picadas"}></Menu>}    
                    </section>
            }
            <p className="text-center text-gray-500 text-sm px-2">* Las picadas deben encargarse para una fecha y hora determinadas luego de su confirmación.</p>
            {!loading && <Footer menu={menu}></Footer>}
            {!loading && <ViewCartButton></ViewCartButton>}
        </div>
    )
}
