import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import Post from "../Post/Post";
import Header from "../Header/Header";
import PublishBox from "./PublishBox";
import HashtagBox from "../HashtagBox/HashtagBox";
import WarningParagraph from "../_shared/WarningParagraph";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { getPosts, getFollows } from "../../API/requests";
import routes from "../../routes/routes";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { InfiniteTimeline } from "../_shared/InfineTimeline";

export default function Timeline() {
	const { loggedUser } = useContext(UserContext);
	const { pagePosts, setPagePosts } = useContext(PagePostsContext);
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [lastPostId, setLastPostId] = useState(null);
	const [hasMore, setHasMore] = useState(true);
	const [followingList, setFollowingList] = useState([]);

	function updateTimeline() {
		getPosts({ token: loggedUser.token, lastPostId })
			.then((response) => {
				const posts = response.data.posts;

				if (posts.length < 10) {
					setHasMore(false);
				}

				if (!lastPostId) {
					setPagePosts(posts);
				} else {
					setPagePosts([...pagePosts, ...posts]);
				}

				if (posts.length > 0) {
					setLastPostId(posts[posts.length - 1].id);
				}

				setLoading(false);
			})
			.catch((error) => {
				alert("Houve uma falha ao obter os posts, por favor atualize a página");
				setLoading(false);
				console.log(error)
			});
	}

	function getFollowingList() {
		getFollows({ token: loggedUser.token })
			.then(response => {
				setFollowingList(response.data.users);
			})
			.catch(error => alert('Algo deu errado. Por favor, recarregue a página.'));
	}

	useEffect(() => {
		if (!loggedUser.token) return history.push(routes.login);

		getFollowingList();
		updateTimeline();
	}, [loggedUser]);

	return (
		<PageContainer>
			{loading ? (
				<CircleLoader customStyle={{ height: "50vh" }} />
			) : (
				<>
					<Header />

					<ContentContainer>
						<PageTitleContainer><h1>timeline</h1></PageTitleContainer>

						<PublishBox updateTimeline={updateTimeline} />


						{followingList.length === 0 ?
							<WarningParagraph>
								Você não segue ninguém ainda, procure por perfis na busca
							</WarningParagraph>
							:
							pagePosts.length === 0 ?
								<WarningParagraph>
									Nenhuma publicação encontrada
								</WarningParagraph>
								:
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
									{
										pagePosts.map((post) => (
											<Post postData={post} key={post.id} />
										))
									}
								</InfiniteTimeline>
						}


					</ContentContainer>

					<HashtagBox />
				</>
			)}
		</PageContainer>
	);
}
