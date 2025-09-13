import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';

function App() {
    return (
        <main className="w-full min-h-screen bg-gray-100">
            <Header></Header>
            <div className="w-full pt-5 px-3 min-h-screen">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/shopping-cart" element={<ShoppingCart />} />
                </Routes>
            </div>
        </main>
    );

}

export default App;