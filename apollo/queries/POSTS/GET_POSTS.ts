import { gql } from '@apollo/client';

const GET_POSTS = gql`
	query GET_POSTS {
		posts {
			nodes {
				databaseId
				title
			}
		}
	}
`;

export default GET_POSTS;
