import { useContext, useEffect, useState } from "react";
import { getUserPosts } from "../../API/requests";
import UserContext from "../../contexts/UserContext";
import Header from "../Header/Header";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import HashtagBox from "../HashtagBox/HashtagBox";
import Post from "../_shared/Post";

export default function MyPosts() {
	const { loggedUser } = useContext(UserContext);
	const { user, token } = loggedUser;
	const [postList, setPostList] = useState([]);

	useEffect(() => {
		getUserPosts({ id: user.id, token: token })
			.then((response) => setPostList(response.data.posts))
			.catch(() => "Ops, algo deu errado.");
	}, []);

	return (
		<PageContainer>
			<Header />

			<ContentContainer>
				<PageTitle>my posts</PageTitle>

				{postList.map((postData, index) => (
					<Post postData={postData} key={index} />
				))}
			</ContentContainer>

			<HashtagBox />
		</PageContainer>
	);
}
