import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Department} from './Department';
import {Navigation} from './Navigation';

import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Employee} from './Employee';

function App() {
  return (
    <BrowserRouter> 
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">React Tutorials New</h3>
    </div>
    <Navigation />
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/department" component={Department} />
        <Route path="/employee" component={Employee} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
