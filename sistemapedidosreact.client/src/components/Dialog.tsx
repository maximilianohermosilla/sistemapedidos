import React, { useRef, useEffect } from 'react';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
}

export default function Dialog({ isOpen, onClose, onConfirm, children }: DialogProps) {
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
        onClose();
    };

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <dialog ref={dialogRef} className="rounded-md m-auto backdrop:backdrop-brightness-30">
            <div className="px-8 py-5 bg-gray-100 text-gray-900">
                {children}
                <div className="flex justify-center gap-3">
                    <button className="button__primary__outlined mt-3 flex items-center gap-1" onClick={handleClose}>Cancelar</button>
                    <button className="button__primary mt-3 flex items-center gap-1" onClick={handleConfirm}>Confirmar</button>
                </div>
            </div>
        </dialog>
    );
}
