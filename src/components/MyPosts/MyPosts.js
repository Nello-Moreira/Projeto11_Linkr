import CircleLoader from "../loaders/CircleLoader";
import Header from "../Header/Header";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import HashtagBox from "../HashtagBox/HashtagBox";
import Post from "../_shared/Post";
import { getUserPosts } from "../../API/requests";
import routes from "../../routes/routes";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


export default function MyPosts() {
	const { loggedUser } = useContext(UserContext);
	const { user, token } = loggedUser;
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [postList, setPostList] = useState([]);

	useEffect(() => {
		if (!loggedUser.token) return history.push(routes.login);

		getUserPosts({ id: user.id, token: token })
			.then((response) => {
				setPostList(response.data.posts);
				setLoading(false);
			})
			.catch(() => {
				alert("Ops, algo deu errado.");
				setLoading(false);
			});
	}, [loggedUser]);

	return (
		<PageContainer>
			{loading ?
				<CircleLoader customStyle={{ height: '50vh' }} />
				:
				<>
					<Header />

					<ContentContainer>
						<PageTitle>my posts</PageTitle>

						{postList.map(
							(postData, index) => <Post postData={postData} key={index} />
						)}
					</ContentContainer>

					<HashtagBox />
				</>
			}
		</PageContainer>
	);
}
