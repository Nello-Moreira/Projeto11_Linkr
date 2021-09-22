import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import Header from "../Header/Header";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import HashtagBox from "../HashtagBox/HashtagBox";
import Post from "../Post/Post";
import { getTrendingPosts, post } from "../../API/requests";
import routes from "../../routes/routes";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { InfiniteTimeline } from "../_shared/InfineTimeline";

export default function TrendingPage() {
	const { HASHTAG } = useParams();
	const { loggedUser } = useContext(UserContext);
	const { pagePosts, setPagePosts } = useContext(PagePostsContext);
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const [lastPostId, setLastPostId] = useState(null);

	function updateTrendingPosts(settings = { topic: HASHTAG, token: loggedUser.token, lastPostId }) {
		getTrendingPosts(settings)
			.then((response) => {
				const posts = response.data.posts;

				if (posts.length < 10) {
					setHasMore(false);
				}

				if (!settings.lastPostId) {
					setPagePosts(posts);
				} else {
					setPagePosts([...pagePosts, ...posts]);
				}

				setLastPostId(posts[posts.length - 1].id);
				setLoading(false);
			})
			.catch(() => {
				alert("Ops, algo deu errado.");
				setLoading(false);
			});
	}

	useEffect(() => {
		if (!loggedUser.token) return history.push(routes.login);
	}, [loggedUser]);

	useEffect(() => {
		window.scrollTo(0, 0);
		updateTrendingPosts({ topic: HASHTAG, token: loggedUser.token, lastPostId: null })
	}, [HASHTAG]);

	return (
		<PageContainer>
			{loading ? (
				<CircleLoader customStyle={{ height: "50vh" }} />
			) : (
				<>
					<Header />

					<ContentContainer>
						<PageTitleContainer><h1>{`# ${HASHTAG}`}</h1></PageTitleContainer>

						<InfiniteTimeline
							pageStart={0}
							loadMore={() => updateTrendingPosts()}
							hasMore={hasMore}
							loader={
								<div className="loader" key={0}>
									Loading ...
								</div>
							}
						>
							{pagePosts.map(postData => (
								<Post postData={postData} key={postData.id} />
							))}
						</InfiniteTimeline>
					</ContentContainer>

					<HashtagBox />
				</>
			)}
		</PageContainer>
	);
}
