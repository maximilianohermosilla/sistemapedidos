import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';

function App() {
    return (
        <main className="w-full min-h-screen bg-gray-100">
            <Header></Header>
            <div className="w-full pt-5 px-3 min-h-screen">
                <Menu></Menu>
            </div>
        </main>
    );

}

export default App;