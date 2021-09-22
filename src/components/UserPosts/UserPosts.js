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
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function UserPosts() {
	const { loggedUser } = useContext(UserContext);
	const { token } = loggedUser;
	const { id } = useParams();
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [userProfile, setUserProfile] = useState({});
	const [postList, setPostList] = useState([]);

	useEffect(() => {
		if (!loggedUser.token) return history.push(routes.login);

		getUserData({ id, token })
			.then((response) => {
				setUserProfile(response.data.user);
				setLoading(false);
			})
			.catch(() => {
				alert("Ops, algo deu errado.");
				setLoading(false);
			});

		getUserPosts({ id, token })
			.then((response) => {
				setPostList(response.data.posts);
				setLoading(false);
			})
			.catch(() => {
				alert("Ops, algo deu errado.");
				setLoading(false);
			});
	}, []);

	return (
		<PageContainer>
			{loading ? (
				<CircleLoader customStyle={{ height: "50vh" }} />
			) : (
				<>
					<Header />
					<ContentContainer>
						<PageTitleContainer>
							<ProfileInformations>
								<UserAvatar
									src={userProfile.avatar}
									customStyle={{ margin: "0 15px 0 0", resizeOnMobile: true }}
								/>
								<h1>{userProfile.username}'s posts</h1>
							</ProfileInformations>

							{loggedUser.user.id != id ? <FollowButton userId={id} /> : null}
						</PageTitleContainer>

						{postList.map((postData, index) => (
							<Post postData={postData} key={index} />
						))}
					</ContentContainer>

					<HashtagBox />
				</>
			)}
		</PageContainer>
	);
}

const ProfileInformations = styled.div`
	display: flex;
	align-items: center;
`;
