import { useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface DialogConfirmProps {
    title: string;
    message: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DialogConfirm({ title, message, isOpen, onClose, onConfirm }: DialogConfirmProps) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (dialogRef.current) {
            if (isOpen) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [isOpen]);

    const handleClose = () => {
        if (onClose != undefined)
            onClose!();
    };

    const handleConfirm = () => {
        if (onConfirm != undefined)
            onConfirm!();
    };

    return (
        <dialog ref={dialogRef} className="rounded-md m-auto backdrop:backdrop-brightness-30" onClick={handleClose}>
            <div className="p-5 bg-gray-100 text-gray-900" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between gap-3">
                    <h3 className="font-semibold my-2 overflow-x-auto">{title}</h3>
                    <button className="btn-close p-0" onClick={handleClose}><IoClose /></button>
                </div>
                <p className="my-2 overflow-x-auto">{message}</p>
                <div className="flex justify-center gap-3">
                    <button className="button__primary__outlined mt-3 flex items-center gap-1" onClick={handleClose}>Cancelar</button>
                    <button className="button__primary mt-3 flex items-center gap-1" onClick={handleConfirm}>Confirmar</button>
                </div>
            </div>
        </dialog>
    );
}
