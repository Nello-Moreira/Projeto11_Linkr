import styled from "styled-components";
import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import Header from "../Header/Header";
import Post from "../Post/Post";
import CustomButton from "../_shared/buttons/CustomButton";
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
	const [selected, setSelected] = useState(false);
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

	function FollowUser() {
		setSelected(!selected);
	}

	return (
		<PageContainer>
			{loading ? (
				<CircleLoader customStyle={{ height: "50vh" }} />
			) : (
				<>
					<Header />
					<ContentContainer>
						<ProfileTitle>
							<div>
								<ProfilePicture src={userProfile.avatar} />{" "}
								<h1>{userProfile.username}'s posts</h1>
							</div>
							<FollowButton
								customStyle={{
									width: "112px",
									height: "31px",
									fontFamily: "Lato",
									fontSize: "14px",
									fontWeight: "bold",
								}}
								selected={selected}
								onClick={FollowUser}
							>
								{selected ? "Unfollow" : "Follow"}
							</FollowButton>
						</ProfileTitle>

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

const ProfilePicture = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 15px;

	@media (max-width: 611px) {
		height: 40px;
		width: 40px;
	}
`;

const ProfileTitle = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: "Oswald", sans-serif;
	font-weight: bold;
	font-size: 43px;
	color: white;
	margin: 60px 0 40px;

	div {
		display: flex;
		align-items: center;
	}

	h1 {
		margin-top: -15px;
	}

	@media (max-width: 611px) {
		padding: 19px 17px;

		h1 {
			font-size: 33px;
		}
	}
`;

const FollowButton = styled(CustomButton)`
	color: ${({ selected }) => (selected ? "#1877F2" : "#fff")};
	background-color: ${({ selected }) => (selected ? "#fff" : "#1877F2")};
`;
