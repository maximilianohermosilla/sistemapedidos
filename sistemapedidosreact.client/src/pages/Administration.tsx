import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";

export default function Administration() {
    const { isLoggedIn, login, logout } = useAuth();

    const handleLoginSuccess = (userName?: any, token?: any) => {
        login(userName, token);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="w-full flex flex-col justify-between h-full p-2">
            {!isLoggedIn
                ? <section className="flex flex-col justify-center items-center h-full m-auto">
                    <Login onLoginSuccess={handleLoginSuccess}></Login>
                </section>
                : <section className="flex flex-col justify-between h-fit">
                    <h1 className="text-primary text-2xl font-semibold w-full text-center mb-1 mt-5">Administración</h1>
                    <button className="button__danger mt-5 m-auto" onClick={handleLogout}>Cerrar sesión</button>
                </section>
            }
        </div>
    )
}
