import { gql } from "@apollo/client";

export const QUERY_CURRENT_USER = gql`
	query {
		me {
			name {
				firstname
				lastname
				fullname
			}
			avatar {
				small
				full
			}
			meta {
				user_since
				birthdate
				steam_account_created
			}
			username
			sub
			steamid
		}
	}
`;
