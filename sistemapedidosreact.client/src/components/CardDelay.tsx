import { useEffect, useState } from "react";
import Dialog from "./Dialog.tsx";
import { FaPencil } from "react-icons/fa6";
import { FaPlus, FaRegSave } from "react-icons/fa";
import { CreateParameter, UpdateParameter } from "../services/parameter-service.ts";
import showToast from "../services/toast-service.ts";
import { GetAllCategories } from "../services/category-service.ts";

export default function CardDelay({ delayItem, onSave }: any) {
    const [item, setItem] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>();
    const [categories, setCategories] = useState<any[]>([]);

    const getCategoryName = (key: string) => {
        if (!key) return '';
        return key.startsWith('DELAY ') ? key.substring(6) : key;
    };

    const [formData, setFormData] = useState({
        id: delayItem?.id || 0,
        category: getCategoryName(delayItem?.key),
        delayValue: delayItem?.value || ''
    });

    useEffect(() => {
        setItem(delayItem);
        setFormData({
            id: delayItem?.id || 0,
            category: getCategoryName(delayItem?.key),
            delayValue: delayItem?.value || ''
        });
    }, [delayItem]);

    useEffect(() => {
        if (isModalOpen && categories.length === 0) {
            GetAllCategories().then(data => {
                if (data) setCategories(data.filter((cat: any) => !cat.name.toUpperCase().includes('SALSA') && !cat.name.toUpperCase().includes('ITEM')));
            });
        }
    }, [isModalOpen, categories.length]);

    const openModal = (event?: any) => { event?.preventDefault(); setIsModalOpen(true) };
    const closeModal = (event?: any) => { event?.preventDefault(); setIsModalOpen(false) };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formData.category.trim()) {
            showToast({ title: 'Error', description: 'Por favor ingrese una categoría', error: true });
            return;
        }

        if (!formData.delayValue.trim()) {
            showToast({ title: 'Error', description: 'Por favor ingrese un valor de demora', error: true });
            return;
        }

        const parameterToSave = {
            id: formData.id,
            key: `DELAY ${formData.category.trim().toUpperCase()}`,
            value: formData.delayValue
        };

        if (formData.id > 0) {
            await UpdateParameter(parameterToSave);
            showToast({ title: 'Éxito', description: 'Demora actualizada correctamente.' });
            onSave();
            closeModal();
        }
        else {
            await CreateParameter(parameterToSave);
            showToast({ title: 'Éxito', description: 'Demora creada correctamente.' });
            onSave();
            closeModal();
        }
    };

    return (
        <>
            {item !== undefined &&
                <div className={`flex w-full bg-white text-left rounded-md shadow-md shadow-gray-500/40 mb-4 m-auto`}>
                    {item.id > 0 ?
                        <section className="flex w-full p-3 justify-between">
                            <div className="data">
                                <header className="flex gap-2 align-center">
                                    <h3 className='text-primary font-semibold text-sm'>{getCategoryName(item?.key)}</h3>
                                </header>
                                <p className="text-xs w-40 text-gray-600">Demora: {item?.value} minutos</p>
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
                            <FaPlus /> Agregar Demora por Categoría
                        </button>
                    }
                    {item !== undefined && isModalOpen &&
                        <Dialog title="Detalle Demora por Categoría" isOpen={isModalOpen || false} onClose={closeModal}>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 mt-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                        {item.id > 0 ? (
                                            <input
                                                type="text"
                                                name="category"
                                                value={formData.category}
                                                disabled
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100 text-gray-500"
                                            />
                                        ) : (
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                required
                                            >
                                                <option value="" disabled>Seleccione una categoría</option>
                                                {categories.map((cat: any) => (
                                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Demora (minutos)</label>
                                        <input
                                            type="text"
                                            name="delayValue"
                                            value={formData.delayValue}
                                            onChange={handleChange}
                                            placeholder="Ej: 45"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 py-1">
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
