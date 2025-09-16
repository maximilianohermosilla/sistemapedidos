import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';

function App() {
    return (
        <main className="main__height w-full bg-gray-100">
            <Header></Header>
            <div className="w-full h-full mb-0" style={{paddingTop: "64px"}}>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/shopping-cart" element={<ShoppingCart />} />
                    <Route path="*" element={<LandingPage />} />
                </Routes>
            </div>
        </main>
    );

}

export default App;