import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../Post/Post";
import Header from "../Header/Header";
import PublishBox from "./PublishBox";
import HashtagBox from "../HashtagBox/HashtagBox";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { getPosts } from "../../API/requests";
import routes from "../../routes/routes";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { InfiniteTimeline } from "../_shared/InfineTimeline";

export default function Timeline() {
	const { loggedUser } = useContext(UserContext);
	const { pagePosts, setPagePosts } = useContext(PagePostsContext);
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [lastPost, setLastPost] = useState(null);
	const [hasMore, setHasMore] = useState(true);

	function updateTimeline() {
		if (!loggedUser.token) return history.push(routes.login);

		getPosts(loggedUser, lastPost)
			.then((resp) => {
				if (resp.data.posts.length === 0) alert("Nenhum post encontrado");
				setPagePosts(pagePosts.concat(resp.data.posts));
				if (resp.data.posts.length > 9) setLastPost(resp.data.posts[9].id);
				else setHasMore(false);
				setLoading(false);
			})
			.catch(() => {
				alert("Houve uma falha ao obter os posts, por favor atualize a página");
				setLoading(false);
			});
	}

	useEffect(() => {
		updateTimeline();
		// setPagePosts([]);
	}, []);

	return (
		<PageContainer>
			{loading ? (
				<CircleLoader customStyle={{ height: "50vh" }} />
			) : (
				<>
					<Header />

					<ContentContainer>
						<PageTitle>timeline</PageTitle>

						<PublishBox updateTimeline={updateTimeline} />
						<InfiniteTimeline
							pageStart={0}
							loadMore={updateTimeline}
							hasMore={hasMore}
							loader={
								<div className="loader" key={0}>
									Loading ...
								</div>
							}
						>
							{pagePosts.map((post) => (
								<Post postData={post} key={post.id} />
							))}
						</InfiniteTimeline>
					</ContentContainer>

					<HashtagBox />
				</>
			)}
		</PageContainer>
	);
}
