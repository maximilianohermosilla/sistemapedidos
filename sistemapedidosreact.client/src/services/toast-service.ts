import { toast } from "sonner";

interface ToastProps {
    title: string;
    description: string;
    error?: boolean;
    onClose?: () => void;
}
export default function showToast({ title, description, error, onClose }: ToastProps) {
    if (error) {
        toast.error(title, {
            description: description,
            action: {
                label: 'X',
                onClick: () => onClose,
            },
            style: {
                backgroundColor: '#FECACA',
                color: 'darkred'
            },
            actionButtonStyle: {
                backgroundColor: 'darkred',
                color: 'white'
            }
        });

    }
    else {
        toast.success(title, {
            description: description,
            action: {
                label: 'X',
                onClick: () => onClose,
            },
            style: {
                backgroundColor: '#A2FCA2',
                color: 'darkgreen'
            },
            actionButtonStyle: {
                backgroundColor: 'darkgreen',
                color: 'white'
            },
        });
    }
};