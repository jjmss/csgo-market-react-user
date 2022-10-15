import Cookies from "js-cookie";
import USER from "./utils/userStates";

const UserReducer = (state, action) => {
	switch (action.type) {
		case USER.ACTIONS.SIGN_IN:
			return {
				...state,
				user: action.payload,
				authenticated: true,
			};
		case USER.ACTIONS.SIGN_OUT:
			Cookies.remove("token");
			return {
				...state,
				user: action.payload,
				authenticated: false,
			};
		default:
			return state;
	}
};

export default UserReducer;
