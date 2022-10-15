import React, { createContext, useContext, useState, useEffect, useReducer } from "react";
import { decodeToken, isExpired } from "react-jwt";
import Cookies from "js-cookie";
import UserReducer from "./UserReducer";
import USER from "./utils/userStates";

const UserContext = createContext();

const initialUserState = {
	user: {},
	authenticated: false,
};

export function UserProvider({ children, client }) {
	const [token] = useState(Cookies.get("token"));
	const [initialize, setInitialize] = useState(false);

	const [{ user, authenticated }, dispatch] = useReducer(UserReducer, initialUserState);

	const getToken = () => {
		return token;
	};

	const authenticateUser = async (token) => {
		if (!isExpired(token)) {
			if (!state?.user) {
				const response = await client.query({
					query: QUERY_CURRENT_USER,
				});
				dispatch({ type: USER.ACTIONS.SIGN_IN, payload: response.data.me });
			}
			return {
				status: USER.STATUS.AUTHENTICATED,
				authenticated: true,
			};
		} else {
			dispatch({ type: USER.ACTIONS.SIGN_OUT, payload: null });
			return {
				status: USER.STATUS.NOT_AUTHENTICATED,
				authenticated: false,
			};
		}
	};

	const validateToken = async () => {
		const { authenticated } = await authenticateUser(token);
		setLoggedIn(authenticated === USER.STATUS.AUTHENTICATED);
		setInitialize(true);
	};

	useEffect(() => {
		validateToken();
	}, []);

	return (
		<UserContext.Provider
			value={{
				user,
				getToken,
				authenticated,
				validateToken,
				initialize,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export default function useUserDataContext() {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error("userData must be used within a UserProvider");
	}

	return context;
}
