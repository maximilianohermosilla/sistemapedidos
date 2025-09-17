import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import Contact from './pages/Contact';
import Administration from './pages/Administration';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <div className="main__height w-full bg-gray-100">
            <Header></Header>
            <main className="w-full h-full mb-0" style={{ paddingTop: "64px" }}>
                <AuthProvider>
                    <Routes>
                        <Route index element={<LandingPage />} />
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/search/:query" element={<Search />} />
                        <Route path="/shopping-cart" element={<ShoppingCart />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin" element={<Administration />} />
                        <Route path="*" element={<LandingPage />} />
                    </Routes>
                </AuthProvider>
            </main>
        </div>
    );

}

export default App;