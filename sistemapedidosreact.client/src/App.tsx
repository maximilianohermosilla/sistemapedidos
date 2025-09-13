import './App.css';
import Header from './components/Header';
import HeaderInfo from './components/HeaderInfo';
import LandingPage from './components/LandingPage';

function App() {
    return (
        <main className="w-full min-h-screen bg-gray-100">
            <Header></Header>
            <div className="w-full pt-5 px-3 min-h-screen">
                <HeaderInfo></HeaderInfo>
                <LandingPage></LandingPage>
            </div>
        </main>
    );

}

export default App;