import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Manager from './Pages/Manager/Manager';

function App() {
    return (
        <Router basename="/CommerceFrontEnd">
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/manager" element={<Manager />} />
                    {/* Adicione outras rotas conforme necessário */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
