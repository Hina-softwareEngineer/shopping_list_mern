import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/Shopping.list';
import ItemModal from './components/ItemModal'
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';



function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar />
      <Container>
          <ItemModal />
          <ShoppingList />
      </Container>
    </div>
    </Provider>
  );
}

export default App;
