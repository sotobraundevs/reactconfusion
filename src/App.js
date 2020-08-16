import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from  'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore(); //El store esta habilitado



class App extends Component {

  render() {
    return (

      // Ahora el store esa habilitado para toda la aplicación
      <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>     
    );
  }
}


export default App;
