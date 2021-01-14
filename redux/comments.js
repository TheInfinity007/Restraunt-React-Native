import * as ActionTypes from './ActionTypes';

// reducer - reducer are the function which take the previous state and action
// and return next state
export const comments = (state = {
	isLoading: true,
	errMess: null,
	comments: []
}, action) => {
	switch(action.type){
		case ActionTypes.ADD_COMMENTS:
			return {...state, errMess: null, comments: action.payload};

		case ActionTypes.COMMENTS_FAILED:
			return {...state, errMess: action.payload, comments: []};

		case ActionTypes.ADD_COMMENT:
			var comment = action.payload;
			return{...state, errMess: null, comments: state.comments.concat(comment)};

		default:
			return state;
	}
}