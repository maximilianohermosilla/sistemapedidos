import "./Dialog.css"
import React, { useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface DialogProps {
    title: string;
    labelConfirm?: string;
    isOpen: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    children: React.ReactNode;
}

export default function Dialog({ title, labelConfirm, isOpen, onClose, onConfirm, children }: DialogProps) {
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
            <div tabIndex={0} className="dialog__content relative p-5 bg-gray-100 text-gray-900" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between gap-3">
                    <h3 className="font-semibold my-2 overflow-x-auto">{title}</h3>
                    <button className="btn-close p-0" onClick={handleClose}><IoClose /></button>
                </div>
                {children}
                <div className="flex justify-center gap-3">
                    {onConfirm != undefined && <button className="button__primary mt-3 flex items-center gap-1" onClick={handleConfirm}>{labelConfirm || "Confirmar"}</button>}
                </div>
            </div>
        </dialog>
    );
}
