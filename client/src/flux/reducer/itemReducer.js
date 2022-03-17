// import {
//     GET_ITEMS,
//     ADD_ITEM,
//     DELETE_ITEM,
//     ITEMS_LOADING
// } from '../actions/types';
// import { IAction, IItem } from '../../types/interfaces';

// const initialState = {
//     items: [],
//     loading: false
// };

// interface IState {
//     items: IItem[];
// }

// export default function (state: IState = initialState, action: IAction) {
//     switch (action.type) {
//         case GET_ITEMS:
//             return {
//                 ...state,
//                 items: action.payload,
//                 loading: false
//             };
//         case DELETE_ITEM:
//             return {
//                 ...state,
//                 items: state.items.filter(item => item._id !== action.payload)
//             };
//         case ADD_ITEM:
//             return {
//                 ...state,
//                 items: [action.payload, ...state.items]
//             };
//         case ITEMS_LOADING:
//             return {
//                 ...state,
//                 loading: true
//             };
//         default:
//             return state;
//     }
// }
import { v4 as uuid } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../../actions/types';
const initialState = {
	items: [
		{ id: uuid(), name: 'eggs' },
		{ id: uuid(), name: 'milk' },
		{ id: uuid(), name: 'tools' },
		{ id: uuid(), name: 'bread' }
	]
};

const itemReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state
			};
		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload)
			};
		case ADD_ITEM:
			return {
				...state,
				items: [ action.payload, ...state.items ]
			};

		default:
			return state;
	}
};
export default itemReducer;
