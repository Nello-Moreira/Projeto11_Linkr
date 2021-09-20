import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import Header from "../Header/Header";
import { PageTitle } from "../_shared/PageTitle";
import HashtagBox from "../HashtagBox/HashtagBox";
import Post from "../Post/Post";
import { getTrendingPosts } from "../../API/requests";
import routes from "../../routes/routes";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function TrendingPage() {
	const { HASHTAG } = useParams();
	const { loggedUser } = useContext(UserContext);
	const { pagePosts, setPagePosts } = useContext(PagePostsContext);
	const history = useHistory();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!loggedUser.token) return history.push(routes.login);

		setPagePosts([]);

		getTrendingPosts({ topic: HASHTAG, token: loggedUser.token })
			.then((response) => {
				setPagePosts(response.data.posts);

				setLoading(false);
			})
			.catch(() => {
				alert(
					"Houve um erro ao carregar essa página. Por favor, atualize a página."
				);
				setLoading(false);
			});
	}, [HASHTAG]);

	return (
		<PageContainer>
			{loading ? (
				<CircleLoader customStyle={{ height: "50vh" }} />
			) : (
				<>
					<Header />

					<ContentContainer>
						<PageTitle>{`# ${HASHTAG}`}</PageTitle>

						{pagePosts.map((post) => (
							<Post postData={post} key={post.id} />
						))}
					</ContentContainer>

					<HashtagBox />
				</>
			)}
		</PageContainer>
	);
}
