import './Spinner.css';

export default function Spinner({text}: any) {
    return <><div className="loading-spinner mx-auto mt-auto"></div><p className="mx-auto mb-auto mt-5 text-gray-400">{text ?? "Cargando..."}</p></>;
};