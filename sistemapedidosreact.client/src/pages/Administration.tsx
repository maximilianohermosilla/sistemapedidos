import { FaRegClock } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { GetParameterByKey, UpdateParameter } from "../services/parameter-service";
import Login from "../components/Login";
import { MdLogout } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

export default function Administration() {
    const [formData, setFormData] = useState<any>({ delay: '' });
    const [error, setError] = useState<string | null>(null);
    const { isLoggedIn, login, logout } = useAuth();

    useEffect(() => {
        getParameterByKey();
    }, []);

    const handleLoginSuccess = (userName?: any, token?: any) => {
        login(userName, token);
    };

    const handleLogout = () => {
        logout();
    };

    const getParameterByKey = async () => {
        const delayParameter = await GetParameterByKey('DELAY');
        console.log(delayParameter)
        if (delayParameter) {
            setFormData({ ...formData, delay: delayParameter?.value });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        console.log(formData)
        
        if (!formData.delay) {
            console.log("error")
            setError('Por favor, ingresa tiempo de demora.');
            return;
        }
        else{
            const response = await UpdateParameter({ key: 'DELAY', value: formData?.delay });
            console.log(response);
        }

    }

    return (
        <div className="main__container w-full flex flex-col justify-between">
            {!isLoggedIn
                ? <section className="flex flex-col justify-center items-center m-auto">
                    <Login onLoginSuccess={handleLoginSuccess}></Login>
                </section>
                : <section className="main__container flex flex-col justify-between h-fit">
                    <form>
                        <h1 className="text-primary text-2xl font-semibold w-full text-center mb-1 mt-5">Administración</h1>
                        <div className="header__info flex w-full gap-3 justify-center items-center text-sm border-2 mt-5 
                            border-gray-400 rounded-md mx-auto py-1 font-semibold mb-3 text-center text-gray-400">
                            <label htmlFor="delay" className="flex gap-1 text-xs items-center"><FaRegClock />Demora:</label>
                            <input className="bg-white px-2 font-medium text-sm rounded-sm border-1 text-secondary"
                                id="delay" name="delay" type="text" value={formData?.delay} onChange={handleChange} />
                        </div>
                        {error && <p className="text-danger text-center text-sm font-semibold px-2">{error}</p>}
                    </form>
                    <footer className="flex gap-3">
                        <button className="button__danger__outlined flex items-center gap-1 my-5 mx-auto" onClick={handleLogout}><MdLogout />Cerrar sesión</button>
                        <button className="button__primary flex items-center gap-3 my-5 mx-auto" onClick={handleSubmit}><FaRegSave />Guardar</button>
                    </footer>
                </section>
            }
        </div>
    )
}
