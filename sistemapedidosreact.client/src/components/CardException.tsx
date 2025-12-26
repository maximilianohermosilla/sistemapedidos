import { useEffect, useState } from "react";
import Dialog from "./Dialog.tsx";
import { formatDateOnly } from "../utils/FormatDateUtil.ts";
import { FaPencil } from "react-icons/fa6";
import { FaPlus, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import { CreateSpecialSchedule, DeleteSpecialSchedule, UpdateSpecialSchedule } from "../services/special-schedule-service.ts";
import showToast from "../services/toast-service.ts";

export default function CardException({ exception, onSave }: any) {
    const [item, setItem] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>();
    const [formData, setFormData] = useState({ ...exception, date: exception.date.split('T')[0] });

    useEffect(() => {
        setItem(exception);
    }, [exception]);

    const openModal = () => { event?.preventDefault(); setIsModalOpen(true) };
    const closeModal = () => { event?.preventDefault(); setIsModalOpen(false) };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if(formData.id > 0) {
            await UpdateSpecialSchedule(formData);
            onSave();
        }
        else{
            await CreateSpecialSchedule(formData);
            onSave();
        }

    };

    const deleteException = async () => {
        const deleteException = await DeleteSpecialSchedule(exception?.id);
        if(deleteException) {
            showToast({ title: 'Excepción', description: 'Excepción eliminada correctamente.' });
            onSave();
        }
    }

    return (
        <>
            {item !== undefined &&
                <div className={`flex w-full bg-white text-left rounded-md shadow-md shadow-gray-500/40 mb-4 m-auto`}>
                    {item.id > 0 ?
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
                                <button className="button__primary__outlined mx-0 rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                    onClick={openModal}>
                                    <FaPencil />
                                </button>
                            </aside>
                        </section>
                        :
                        <button className="button__primary__outlined rounded-full hover:cursor-pointer flex justify-center
                            hover:opacity-90 hover:shadow-lg shadow-gray-500/40 w-full items-center gap-2 mx-auto" onClick={openModal}>
                            <FaPlus /> Agregar Excepción
                        </button>
                    }
                    {item !== undefined && isModalOpen &&
                        <Dialog title="Detalle Excepción" isOpen={isModalOpen || false} onClose={closeModal}>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Fila: Fecha y Descripción */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Motivo / Descripción</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Ej: Feriado, Evento privado..."
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Toggle: Estado Abierto/Cerrado */}
                                <div className="flex align-center space-x-3 p-1 rounded-lg pb-0">
                                    <input type="checkbox" id="isOpen" name="isOpen" className="border border-gray-400 rounded-sm px-2 text-sm"
                                        checked={formData.isOpen}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="isOpen" className="font-semibold text-gray-800 text-sm mb-0">
                                        {formData.isOpen ? 'ABIERTO' : 'CERRADO'}
                                    </label>
                                </div>

                                {/* Sección de Horarios (Solo visible/editable si está abierto) */}
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity ${!formData.isOpen ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-primary uppercase mb-1">Horario de Atención</h3>
                                        <div>
                                            <label className="block text-xs text-gray-500">Apertura</label>
                                            <input
                                                type="time"
                                                name="openingTime"
                                                value={formData.openingTime}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500">Cierre</label>
                                            <input
                                                type="time"
                                                name="closingTime"
                                                value={formData.closingTime}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-primary uppercase mb-1">Horario de Pedidos</h3>
                                        <div>
                                            <label className="block text-xs text-gray-500">Inicio Recepción</label>
                                            <input
                                                type="time"
                                                name="openingScheduleTime"
                                                value={formData.openingScheduleTime}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500">Fin Recepción</label>
                                            <input
                                                type="time"
                                                name="closingScheduleTime"
                                                value={formData.closingScheduleTime}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 py-1">
                                    <button className="button__danger__outlined flex items-center gap-1 my-5 mx-auto" onClick={deleteException} disabled={exception?.id == 0}>
                                        <FaRegTrashAlt /> Borrar
                                    </button>
                                    <button type="submit" className="button__primary flex items-center gap-3 my-5 mx-auto">
                                        <FaRegSave /> Guardar
                                    </button>
                                </div>
                            </form>
                        </Dialog>
                    }
                </div>
            }
        </>
    )
}