import { useEffect, useState } from "react";
import Dialog from "./Dialog";
import { FaPencil } from "react-icons/fa6";
import { FaPlus, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import { GetAllCategories } from "../services/category-service";
import { CreateCategorySchedule, DeleteCategorySchedule, UpdateCategorySchedule } from "../services/category-schedule-service";
import showToast from "../services/toast-service";

const DAYS_OF_WEEK = [
    { code: 0, name: "Domingo" },
    { code: 1, name: "Lunes" },
    { code: 2, name: "Martes" },
    { code: 3, name: "Miércoles" },
    { code: 4, name: "Jueves" },
    { code: 5, name: "Viernes" },
    { code: 6, name: "Sábado" }
];

export default function CardCategorySchedule({ scheduleItem, onSave }: any) {
    const [item, setItem] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        id: scheduleItem?.id || 0,
        categoryId: scheduleItem?.categoryId || '',
        description: scheduleItem?.description || '',
        dayCode: scheduleItem?.dayCode !== undefined ? scheduleItem.dayCode : 0,
        dayWeek: scheduleItem?.dayWeek || 'Domingo',
        isOpen: scheduleItem?.isOpen !== undefined ? scheduleItem.isOpen : true,
        openingTime: scheduleItem?.openingTime || '19:45',
        closingTime: scheduleItem?.closingTime || '23:00',
        openingScheduleTime: scheduleItem?.openingScheduleTime || '10:30',
        closingScheduleTime: scheduleItem?.closingScheduleTime || '20:00'
    });

    useEffect(() => {
        setItem(scheduleItem);
        setFormData({
            id: scheduleItem?.id || 0,
            categoryId: scheduleItem?.categoryId || '',
            description: scheduleItem?.description || '',
            dayCode: scheduleItem?.dayCode !== undefined ? scheduleItem.dayCode : 0,
            dayWeek: scheduleItem?.dayWeek || 'Domingo',
            isOpen: scheduleItem?.isOpen !== undefined ? scheduleItem.isOpen : true,
            openingTime: scheduleItem?.openingTime || '19:45',
            closingTime: scheduleItem?.closingTime || '23:00',
            openingScheduleTime: scheduleItem?.openingScheduleTime || '10:30',
            closingScheduleTime: scheduleItem?.closingScheduleTime || '20:00'
        });
    }, [scheduleItem]);

    useEffect(() => {
        if (isModalOpen && categories.length === 0) {
            GetAllCategories().then(data => {
                if (data) {
                    setCategories(data.filter((cat: any) => !cat.name.toUpperCase().includes('SALSA') && !cat.name.toUpperCase().includes('ITEM')));
                }
            });
        }
    }, [isModalOpen, categories.length]);

    const openModal = (event?: any) => {
        event?.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = (event?: any) => {
        event?.preventDefault();
        setIsModalOpen(false);
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleCategoryChange = (e: any) => {
        setFormData({
            ...formData,
            categoryId: Number(e.target.value)
        });
    };

    const handleDayChange = (e: any) => {
        const code = Number(e.target.value);
        const day = DAYS_OF_WEEK.find(d => d.code === code);
        setFormData({
            ...formData,
            dayCode: code,
            dayWeek: day ? day.name : ''
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formData.categoryId) {
            showToast({ title: 'Error', description: 'Por favor seleccione una categoría.', error: true });
            return;
        }

        const payload = {
            id: formData.id,
            categoryId: Number(formData.categoryId),
            description: formData.description?.trim() || '',
            dayCode: Number(formData.dayCode),
            dayWeek: formData.dayWeek,
            isOpen: formData.isOpen,
            openingTime: formData.openingTime,
            closingTime: formData.closingTime,
            openingScheduleTime: formData.openingScheduleTime || null,
            closingScheduleTime: formData.closingScheduleTime || null
        };

        if (formData.id > 0) {
            const res = await UpdateCategorySchedule(payload);
            if (res) {
                showToast({ title: 'Éxito', description: 'Configuración de horario actualizada.' });
                onSave();
                closeModal();
            }
        } else {
            const res = await CreateCategorySchedule(payload);
            if (res) {
                showToast({ title: 'Éxito', description: 'Configuración de horario creada.' });
                onSave();
                closeModal();
            }
        }
    };

    const handleDelete = async (event?: any) => {
        event?.preventDefault();
        if (!formData.id || formData.id === 0) {
            showToast({ title: 'Error', description: 'No se puede eliminar un registro sin ID.', error: true });
            return;
        }

        const confirmed = window.confirm('¿Está seguro de eliminar este horario por categoría?');
        if (!confirmed) return;

        const deleted = await DeleteCategorySchedule(formData.id);
        if (deleted !== false) {
            showToast({ title: 'Éxito', description: 'Configuración eliminada correctamente.' });
            onSave();
            closeModal();
        }
    };

    return (
        <>
            {item !== undefined && (
                <div className="flex w-full bg-white text-left rounded-md shadow-md shadow-gray-500/40 mb-4 m-auto">
                    {item.id > 0 ? (
                        <section className="flex w-full p-3 justify-between">
                            <div className="data">
                                <header className="flex gap-2 items-center">
                                    <h3 className="text-primary font-semibold text-sm">
                                        {item?.category?.name || categories.find((c: any) => c.id === item?.categoryId)?.name || `Categoría #${item?.categoryId}`}
                                    </h3>
                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                                        {item?.dayWeek}
                                    </span>
                                    <span className={item?.isOpen ? 'text-green-600 font-semibold text-xs' : 'text-red-400 font-semibold text-xs'}>
                                        {item?.isOpen ? 'ABIERTO' : 'CERRADO'}
                                    </span>
                                </header>
                                {item?.description && (
                                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                )}
                                <p className="text-xs w-full text-gray-500 mt-1">Horario: {item?.openingTime} - {item?.closingTime} hs</p>
                                {(item?.openingScheduleTime || item?.closingScheduleTime) && (
                                    <p className="text-xs w-full text-gray-400">Entregas: {item?.openingScheduleTime || '--:--'} - {item?.closingScheduleTime || '--:--'} hs</p>
                                )}
                            </div>
                            <aside className="flex flex-col justify-center gap-1 items-center mt-1">
                                <button
                                    className="button__primary__outlined mx-0 rounded-full hover:cursor-pointer hover:opacity-90 hover:shadow-lg shadow-gray-500/40"
                                    onClick={openModal}
                                >
                                    <FaPencil />
                                </button>
                            </aside>
                        </section>
                    ) : (
                        <button
                            className="button__primary__outlined rounded-full hover:cursor-pointer flex justify-center hover:opacity-90 hover:shadow-lg shadow-gray-500/40 w-full items-center gap-2 mx-auto"
                            onClick={openModal}
                        >
                            <FaPlus /> Agregar Horario por Categoría
                        </button>
                    )}

                    {item !== undefined && isModalOpen && (
                        <Dialog
                            title={formData.id > 0 ? "Detalle Horario por Categoría" : "Nuevo Horario por Categoría"}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                        >
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* 1. Selección de Categoría */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                    <select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleCategoryChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    >
                                        <option value="" disabled>Seleccione una categoría</option>
                                        {categories.map((cat: any) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* 2. Selección de Día de la semana */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Día de la semana</label>
                                    <select
                                        name="dayCode"
                                        value={formData.dayCode}
                                        onChange={handleDayChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    >
                                        {DAYS_OF_WEEK.map((d) => (
                                            <option key={d.code} value={d.code}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Descripción / Motivo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción / Motivo (opcional)</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Ej: Turno tarde, Pedidos especiales..."
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                {/* Toggle Abierto / Cerrado */}
                                <div className="flex align-center space-x-3 p-1 rounded-lg pb-0">
                                    <input
                                        type="checkbox"
                                        id={`isOpen-${formData.id}`}
                                        name="isOpen"
                                        className="border border-gray-400 rounded-sm px-2 text-sm"
                                        checked={formData.isOpen}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`isOpen-${formData.id}`} className="font-semibold text-gray-800 text-sm mb-0">
                                        {formData.isOpen ? 'ABIERTO' : 'CERRADO'}
                                    </label>
                                </div>

                                {/* 3. Horarios de Apertura/Cierre y Horarios de Entrega */}
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity ${!formData.isOpen ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-primary uppercase mb-1">Horarios de Atención</h3>
                                        <div>
                                            <label className="block text-xs text-gray-500">Apertura</label>
                                            <input
                                                type="time"
                                                name="openingTime"
                                                value={formData.openingTime}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                required
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
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-primary uppercase mb-1">Horarios de Entrega</h3>
                                        <div>
                                            <label className="block text-xs text-gray-500">Desde</label>
                                            <input
                                                type="time"
                                                name="openingScheduleTime"
                                                value={formData.openingScheduleTime || ''}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500">Hasta</label>
                                            <input
                                                type="time"
                                                name="closingScheduleTime"
                                                value={formData.closingScheduleTime || ''}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 py-1">
                                    {formData.id > 0 && (
                                        <button
                                            type="button"
                                            className="button__danger__outlined flex items-center gap-1 my-5 mx-auto"
                                            onClick={handleDelete}
                                        >
                                            <FaRegTrashAlt /> Borrar
                                        </button>
                                    )}
                                    <button type="submit" className="button__primary flex items-center gap-3 my-5 mx-auto">
                                        <FaRegSave /> Guardar
                                    </button>
                                </div>
                            </form>
                        </Dialog>
                    )}
                </div>
            )}
        </>
    );
}
