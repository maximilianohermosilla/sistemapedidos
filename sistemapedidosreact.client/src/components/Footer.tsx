export default function Footer({ menu }: any) {

    return (
        <footer className="bg-gray-900 text-center text-white mt-3 px-0 text-sm py-1">
            Última actualización: {new Date(menu?.createdAt)!.toLocaleString("es-AR", { hour12: false })}
        </footer>
    )
}