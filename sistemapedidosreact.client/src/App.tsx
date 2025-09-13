import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import { FaRegClock } from 'react-icons/fa6';

function App() {
    return (
        <main className="w-full min-h-screen bg-gray-100">
            <Header></Header>
            <div className="w-full pt-5 px-3 min-h-screen">
                <h3 className="header__info flex w-full gap-3 justify-center items-center text-sm border-2 border-gray-300 rounded-md m-auto
                    font-bold mb-3 text-center text-gray-400">
                    <FaRegClock />Demora: <p className="font-medium text-sm">10-15 min</p>
                </h3>
                <Menu></Menu>
                <Menu></Menu>
            </div>
        </main>
    );

}

export default App;