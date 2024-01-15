import { gql } from '@apollo/client';

const CREATE_POST = gql`
	mutation CREATE_POST(
		$title: String
	) {
		createPost(
			input: {
				title:  $title,
				status: PUBLISH
			}
		) {
			post {
				databaseId
				title
			}
		}
	}
`;

export default CREATE_POST;
