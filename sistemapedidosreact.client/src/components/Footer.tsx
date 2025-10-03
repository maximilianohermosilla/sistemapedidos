import { FaSync } from "react-icons/fa";
import { formatDate } from "../utils/FormatMoney copy";
import { useEffect, useState } from "react";
import { GetParameterByKey } from "../services/parameter-service";
import { ParameterEnum } from "../enums/parameter";
import { FaCheck } from "react-icons/fa6";

export default function Footer({ menu }: any) {
    const [updateMenu, setUpdateMenu] = useState(false);

    useEffect(() => {
        handleUpdateMenu();
    }, []);

    const handleUpdateMenu = async () => {
        const updateMenuParameter = await GetParameterByKey(ParameterEnum.UPDATE_MENU);
        if (updateMenuParameter?.value == "SI") {
            setUpdateMenu(true);
        }
    }

    return (
        <footer className="bg-gray-900 text-center text-white mt-3 px-0 text-sm py-1 flex justify-center align-center gap-2">
            {updateMenu ? <FaSync className="my-auto" size={10}/> : <FaCheck className="my-auto" size={10}/>} 
            Última actualización: {formatDate(menu?.createdAt)}
        </footer>
    )
}