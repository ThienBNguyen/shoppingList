import './App.css';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux'
import store from './flux/store'
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>

      </div>
    </Provider>

  );
}

export default App;
