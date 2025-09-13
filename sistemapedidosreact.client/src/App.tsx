import './App.css';
import Header from './components/Header';
import HeaderInfo from './components/HeaderInfo';
import Menu from './components/Menu';

function App() {
    return (
        <main className="w-full min-h-screen bg-gray-100">
            <Header></Header>
            <div className="w-full pt-5 px-3 min-h-screen">
                <HeaderInfo></HeaderInfo>
                <Menu></Menu>
                <Menu></Menu>
            </div>
        </main>
    );

}

export default App;