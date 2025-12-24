import { useEffect, useState } from "react";
import Dialog from "./Dialog.tsx";
import { formatDate, formatDateOnly } from "../utils/FormatDateUtil.ts";
import { formatMoney } from "../utils/FormatMoneyUtil.ts";
import { FaPencil } from "react-icons/fa6";

export default function CardException({ exception }: any) {
    const [item, setItem] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>();

    useEffect(() => {
        setItem(exception);
    }, [exception]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const renderexceptionDetail = () => {
        return item?.exceptionDetail?.exceptionItems?.map((exceptionItem: any) => {
            return (
                <li key={exceptionItem.id} className="flex flex-col justify-between my-2 decoration-0">
                    <div className="w-full flex justify-between gap-3">
                        <p className="font-semibold">{exceptionItem?.quantity} x {exceptionItem?.item?.name}</p>
                        <span className="text-green-600 pr-2">{formatMoney(exceptionItem?.price)}</span>
                    </div>
                    <p className="text-gray-500 whitespace-break-spaces text-xs">{exceptionItem?.exceptionSubItems?.map((topping: any) => topping?.item?.name).join('\n')}</p>
                </li>
            )
        })
    }
    return (
        <>
            {item !== undefined &&
                <div className={`flex w-full bg-white text-left rounded-md shadow-md shadow-gray-500/40 mb-4 m-auto`}>
                    <section className="flex w-full p-3 justify-between">                        
                        <div className="data">
                            <header className="flex gap-2 align-center">
                                <h3 className='text-primary font-semibold text-sm'>{item?.description}</h3>
                                <h3 className={item?.isOpen ? 'text-green-600 font-semibold text-sm' : 'text-red-400 font-semibold text-sm'}>{item?.isOpen ? 'ABIERTO' : 'CERRADO'}</h3>
                            </header>
                            <p className="text-xs w-40">Fecha: {formatDateOnly(item?.date)}</p>                            
                            <p className="text-xs w-40 text-gray-400">Horario: {item?.openingTime} - {item?.closingTime}hs</p>
                            <p className="text-xs w-40 text-gray-400">Retiros: {item?.openingScheduleTime} - {item?.closingScheduleTime}hs</p>
                        </div>
                        <aside className="flex flex-col justify-center gap-1 items-center mt-1">
                            <button className="button__primary mx-0 rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                onClick={openModal}>
                                <FaPencil />
                            </button>
                        </aside>
                    </section>
                    {item !== undefined && isModalOpen &&
                        <Dialog title={item.name} isOpen={isModalOpen || false} onClose={closeModal}>
                            <>
                                <h3 className="text-primary font-semibold text-lg bexception-2 px-2 py-1 mb-2 text-shadow-sm text-gray-900">Detalle de pedido N°{item?.id}</h3>
                                <p className="mt-1 text-xs"><strong>Estado:</strong> {item?.state ?? 'PENDIENTE'}</p>
                                <p className="mt-1 text-xs"><strong>Fecha:</strong> {formatDate(item?.exceptionDetail?.createdAt!)}</p>
                                <p className="mt-1 mb-5 text-xs"><strong>Cliente:</strong> {item?.customer?.firstName}</p>
                                {item && isModalOpen && renderexceptionDetail()}
                                <h3 className="mt-5 mb-3 flex justify-between font-semibold text-primary bexception-2 px-2 py-1 bexception-top text-shadow-sm text-gray-900">Total: <span className="text-green-600 text-shadow-sm shadow-gray-900">{formatMoney(item?.exceptionDetail?.totals?.totalToPay)}</span></h3>
                            </>
                        </Dialog>
                    }
                </div>
            }
        </>
    )
}