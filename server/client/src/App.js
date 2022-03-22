import './App.css';
import React, { useEffect } from 'react';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authAction';
function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	});
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
