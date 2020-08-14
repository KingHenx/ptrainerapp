import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Trainings from './components/Trainings';
import Error from './components/Error';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
       <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      
    </div>
        <div>
          
            <Switch>
             <Route path="/" component={Home} exact><Customerlist/></Route>
             <Route path="/trainings" component={Trainings}></Route>
            <Route component={Error}/>
           </Switch>
           
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;
