import { gql } from '@apollo/client';

const CREATE_POSTS = gql`
	mutation CREATE_POSTS {
		createPost1: createPost(input: {
			title: "Post Title 1",
			content: "Content for post 1",
			status: PUBLISH
		} ) {
			post {
				id
				title
				content
			}
		}
		createPost2: createPost(input: {
			title: "Post Title 2",
			content: "Content for post 2",
			status: PUBLISH
		} ) {
			post {
				id
				title
				content
			}
		}
	}
`;

export default CREATE_POSTS;
