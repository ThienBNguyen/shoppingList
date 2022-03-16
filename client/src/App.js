import './App.css';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux'
import store from './flux/store'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <ShoppingList></ShoppingList>
      </div>
    </Provider>

  );
}

export default App;
