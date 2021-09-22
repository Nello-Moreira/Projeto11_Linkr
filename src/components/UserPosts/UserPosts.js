import styled from "styled-components";
import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import Header from "../Header/Header";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import UserAvatar from "../_shared/UserAvatar";
import Post from "../Post/Post";
import FollowButton from "./FollowButton";
import HashtagBox from "../HashtagBox/HashtagBox";
import { getUserData, getUserPosts } from "../../API/requests";
import routes from "../../routes/routes";
import UserContext from "../../contexts/UserContext";
import PagePostsContext from "../../contexts/PagePostsContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { InfiniteTimeline } from "../_shared/InfineTimeline";

export default function UserPosts() {
	const { loggedUser } = useContext(UserContext);
	const { pagePosts, setPagePosts } = useContext(PagePostsContext);
	const { token } = loggedUser;
	const { id } = useParams();
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [userProfile, setUserProfile] = useState({});
	const [hasMore, setHasMore] = useState(true);
	const [lastPostId, setLastPostId] = useState(null);

	function updateUserPost(settings={ id: userProfile.id, token: token, lastPostId }) {
		getUserPosts(settings)
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

				if (posts.length > 0) {
					setLastPostId(posts[posts.length - 1].id);
				}
				
				setLoading(false);
			})
			.catch(() => {
				alert("Ops, algo deu errado.");
				setLoading(false);
			});
	}

	useEffect(() => {
		if (!loggedUser.token) return history.push(routes.login);

		getUserData({ id, token })
			.then((response) => {
				setUserProfile(response.data.user);
				updateUserPost({ id: response.data.user.id, token: token, lastPostId: null })
				setLoading(false);
			})
			.catch(() => {
				alert("Ops, algo deu errado.");
				setLoading(false);
			});

	}, [loggedUser, id]);

	return (
		<PageContainer>
			{loading ?
				<CircleLoader customStyle={{ height: "50vh" }} />
				:
				<>
					<Header />
					<ContentContainer>
						<PageTitleContainer>
							<ProfileInformations>
								<UserAvatar src={userProfile.avatar} customStyle={{ margin: '0 15px 0 0', resizeOnMobile: true }} />
								<h1>{userProfile.username}'s posts</h1>
							</ProfileInformations>

							{loggedUser.user.id != id ?
								<FollowButton userId={id} />
								:
								null
							}
						</PageTitleContainer>

						<InfiniteTimeline
							pageStart={0}
							loadMore={()=>updateUserPost()}
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
			}
		</PageContainer>
	);
}

const ProfileInformations = styled.div`
	display: flex;
	align-items: center;
`;
