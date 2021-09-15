import { useEffect, useContext, useState } from "react";
import { getPosts } from "../../API/requests";

import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";
import Header from "../Header/Header";
import PublishBox from "./PublishBox";
import HashtagBox from "../_shared/hashtagBox/HashtagBox";
import UserContext from "../../contexts/UserContext";

export default function Timeline() {

	const { loggedUser } = useContext(UserContext);

	const [timelinePosts, setTimelinePosts] = useState(null);

	function updateTimeline() {
		getPosts(loggedUser)
			.then((resp) => {
				if (resp.data.posts.length === 0)
					alert("Nenhum post encontrado");
				setTimelinePosts(resp.data.posts);
			})
			.catch(() => alert("Houve uma falha ao obter os posts, por favor atualize a página"));
	}

	useEffect(() => updateTimeline(), []);

	return (
		<PageContainer>
			<Header />

			<ContentContainer>
				<PageTitle>
					timeline
				</PageTitle>
				
				<PublishBox updateTimeline={updateTimeline} />

				{timelinePosts ? timelinePosts.map((post) =>
					<Post postData={post} />
				) : "Loading..."}
			</ContentContainer>

			<HashtagBox />
		</PageContainer>
	);
}