import { useEffect, useState } from "react";
import Dialog from "./Dialog.tsx";
import { FaRegListAlt } from "react-icons/fa";
import { formatDate } from "../utils/FormatMoney copy.ts";
import { formatMoney } from "../utils/FormatMoney.ts";
import imgDefault from "../assets/logo/logo_gray_top.jpeg";

export default function CardOrder({ order }: any) {
    const [item, setItem] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>();

    useEffect(() => {
        setItem(order);
    }, [order]);

    const addDefaultImg = (event: any) => {
        event!.target!.src = imgDefault
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const renderOrderDetail = () => {
        return item?.orderDetail?.orderItems?.map((orderItem: any) => {
            return (
                <li key={orderItem.id} className="flex flex-col justify-between my-1 decoration-0">
                    <div className="w-full flex justify-between gap-3">
                        <p className="font-semibold">{orderItem?.quantity} x {orderItem?.item?.name}</p>
                        <span className="text-green-800 pr-2">{formatMoney(orderItem?.price)}</span>
                    </div>
                    <p className="text-gray-500 whitespace-break-spaces">{orderItem?.orderSubItems?.map((topping: any) => topping?.item?.name).join('\n')}</p>
                </li>
            )
        })
    }
    return (
        <>
            {item !== undefined &&
                <div className={`${item?.orderStateId ? 'opacity-60' : ''} flex w-full bg-white text-left rounded-md shadow-md shadow-gray-500/40 mb-5 m-auto pr-4`}>
                    <section className="flex w-full py-2 justify-between">
                        <img src={item.imageUrl && item.imageUrl != '' ? item.imageUrl : imgDefault} alt={item.name} onError={addDefaultImg}
                            className="w-25 object-fill rounded-l-md" />
                        <div className="data">
                            <h3 className={item?.orderStateId ? 'text-gray-400' : 'text-primary font-semibold'}>{item?.orderState?.name ?? 'PENDIENTE'}</h3>
                            <p className="text-xs w-30">{formatDate(item?.orderDetail?.createdAt!)}</p>
                            <p className="text-green-600">{formatMoney(item?.orderDetail?.totals?.totalToPay)}</p>
                        </div>
                        <aside className="w-full flex flex-col justify-start gap-1 items-end mt-1">
                            <p className="text-xs text-gray-500 font-semibold pr-3">N°{order?.id}</p>
                            <button className="button__primary mx-0 rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                onClick={openModal}>
                                <FaRegListAlt />
                            </button>
                        </aside>
                    </section>
                    {item !== undefined && isModalOpen &&
                        <Dialog title={item.name} isOpen={isModalOpen || false} onClose={closeModal}>
                            <>
                            <h3 className="text-primary font-semibold text-lg border-1 px-2 py-1 mb-5">Detalle de pedido N°{item?.id}</h3>
                            {item && isModalOpen && renderOrderDetail()}
                            <h3 className="mt-5 mb-3 flex justify-between font-semibold text-primary border-1 px-2 py-1 border-top">Total: <span className="text-green-600">{formatMoney(item?.orderDetail?.totals?.totalToPay)}</span></h3>
                            </>
                        </Dialog>
                    }
                </div>
            }
        </>
    )
}