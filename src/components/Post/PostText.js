import ReactHashtag from "react-hashtag";
import routes from "../../routes/routes";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function PostText({ postText }) {
	return (
		<Text>
			<ReactHashtag
				renderHashtag={(hashtagValue) => (
					<Link to={routes.trending.replace(":HASHTAG", hashtagValue.slice(1))}>
						{hashtagValue}
					</Link>
				)}
			>
				{postText}
			</ReactHashtag>
		</Text>
	);
}

const Text = styled.p`
	font-size: 17px;
	color: #aaaaaa;
	line-height: 18px;
	margin-bottom: 15px;
	word-wrap: break-word;

	@media (max-width: 611px) {
		font-size: 15px;
		margin-left: 5px;
	}
`;
