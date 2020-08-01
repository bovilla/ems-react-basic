import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListEmployees from './components/ListEmployees';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
// import CreateEmploy from './components/CreateEmploy';
// import UpdateEmploy from './components/UpdateEmploy';
import CreateUpdateEmploy from './components/CreateUpdateEmploy';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListEmployees}></Route>
            <Route path="/employees" component={ListEmployees}></Route>
            {/* <Route path="/add-employ" component={CreateEmploy}></Route> */}
            {/* <Route path="/update-employ/:id" component={UpdateEmploy}></Route> */}
            <Route path="/create-update-employ" component={CreateUpdateEmploy} exact />
            <Route path="/create-update-employ/:id" component={CreateUpdateEmploy} exact />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
