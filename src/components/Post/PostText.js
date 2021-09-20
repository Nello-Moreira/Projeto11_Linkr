import ReactHashtag from "react-hashtag";
import routes from "../../routes/routes";
import { Link } from "react-router-dom";

export default function PostText({ postText }) {
	return (
		<p>
			<ReactHashtag
				renderHashtag={(hashtagValue) => (
					<Link to={routes.trending.replace(":HASHTAG", hashtagValue.slice(1))}>
						{hashtagValue}
					</Link>
				)}
			>
				{postText}
			</ReactHashtag>
		</p>
	);
}
