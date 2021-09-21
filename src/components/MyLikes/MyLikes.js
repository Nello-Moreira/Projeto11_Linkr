import CircleLoader from "../loaders/CircleLoader";
import Header from "../Header/Header";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import HashtagBox from "../HashtagBox/HashtagBox";
import Post from "../Post/Post";
import { getLikedPosts } from "../../API/requests";
import routes from "../../routes/routes";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PagePostsContext from "../../contexts/PagePostsContext";
import { InfiniteTimeline } from "../_shared/InfineTimeline";

export default function MyLikes() {
	const { loggedUser } = useContext(UserContext);
	const { pagePosts, setPagePosts } = useContext(PagePostsContext);
	const { token } = loggedUser;
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const [lastPost, setLastPost] = useState(null);

	function updateMyLikes() {
		getLikedPosts({ token, lastPost })
			.then((response) => {
				if (response.data.posts.length > 0) {
					if (response.data.posts.length > 9) {
						setLastPost(response.data.posts[9].id);
						setPagePosts(pagePosts.concat(response.data.posts));
					} else {
						setHasMore(false);
					}
				} else setLoading(false);
			})
			.catch(() => {
				alert("Ops, algo deu errado.");
				setLoading(false);
			});
	}

	useEffect(() => {
		setPagePosts([]);
		if (!loggedUser.token) return history.push(routes.login);
		updateMyLikes();
	}, [loggedUser]);

	return (
		<PageContainer>
			{loading ? (
				<CircleLoader customStyle={{ height: "50vh" }} />
			) : (
				<>
					<Header />

					<ContentContainer>
					<PageTitleContainer><h1>my likes</h1></PageTitleContainer>
						
						<InfiniteTimeline
							pageStart={0}
							loadMore={() => updateMyLikes()}
							hasMore={hasMore}
							loader={
								<div className="loader" key={0}>
									Loading ...
								</div>
							}
						>
							{pagePosts.map((postData, index) => (
								<Post postData={postData} key={index} />
							))}
						</InfiniteTimeline>
					</ContentContainer>

					<HashtagBox />
				</>
			)}
		</PageContainer>
	);
}
