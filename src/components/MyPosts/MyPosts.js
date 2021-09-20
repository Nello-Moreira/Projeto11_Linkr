import CircleLoader from "../loaders/CircleLoader";
import Header from "../Header/Header";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import HashtagBox from "../HashtagBox/HashtagBox";
import Post from "../Post/Post";
import { getUserPosts } from "../../API/requests";
import routes from "../../routes/routes";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function MyPosts() {
	const { loggedUser } = useContext(UserContext);
	const { pagePosts, setPagePosts } = useContext(PagePostsContext);
	const { user, token } = loggedUser;
	const history = useHistory();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!loggedUser.token) return history.push(routes.login);

		setPagePosts([]);

		getUserPosts({ id: user.id, token: token })
			.then((response) => {
				setPagePosts(response.data.posts);

				setLoading(false);
			})
			.catch(() => {
				alert("Ops, algo deu errado.");
				setLoading(false);
			});
	}, [loggedUser]);

	return (
		<PageContainer>
			{loading ? (
				<CircleLoader customStyle={{ height: "50vh" }} />
			) : (
				<>
					<Header />

					<ContentContainer>
						<PageTitleContainer><h1>my posts</h1></PageTitleContainer>

						{pagePosts.map((postData, index) => (
							<Post postData={postData} key={index} />
						))}
					</ContentContainer>

					<HashtagBox />
				</>
			)}
		</PageContainer>
	);
}
