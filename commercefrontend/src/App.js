import React from 'react';
import { Route, Switch } from 'wouter';
import Home from './Pages/Home/Home';
import Manager from './Pages/Manager/Manager';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" component={Home} />
                <Route path="/manager" component={Manager} />
                {/* Add other routes as needed */}
            </Switch>
        </div>
    );
}

export default App;
