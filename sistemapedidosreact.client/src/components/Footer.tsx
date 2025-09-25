import { formatDate } from "../utils/FormatMoney copy";

export default function Footer({ menu }: any) {

    return (
        <footer className="bg-gray-900 text-center text-white mt-3 px-0 text-sm py-1">
            Última actualización: {formatDate(menu?.createdAt)}
        </footer>
    )
}