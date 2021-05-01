import './App.css';
import CarRental from './components/car_rental.js';
import CarHomePage from './components/car_homepage.js';
import Admin from './components/admin'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import ListCar from './components/list_car'
import AddCar from './components/add_car'

function App() {
  return (
    <Router>
      
        <Switch>
            <Route exact path="/">
                  <CarHomePage/>
            </Route>
              <Route exact path="/vehicles">
                  <CarRental/>
            </Route>
            <Route exact path="/admin">
                  <Admin/>
            </Route>
            <Route exact path="/admin/vehicles" >
                  <Admin com={<ListCar/>}/>
            </Route>
            <Route exact path="/admin/add-vehicles">
                  <Admin com={<AddCar/>}/>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
