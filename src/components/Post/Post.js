import styled from "styled-components";
import ButtonsContainer from "../_shared/buttons/ButtonsContainer";
import TrashButton from "../_shared/buttons/TrashButton";
import EditButton from "../_shared/buttons/EditButton";
import { Link } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import routes from "../../routes/routes";
import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import { edit } from "../../API/requests";
import autosize from "autosize";
import PagePostsContext from "../../contexts/PagePostsContext";
import Like from "./Like";
import Snippet from "./Sinippet";
import UserAvatar from "../_shared/UserAvatar";

export default function Post({ postData }) {
	const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } =
		postData;

	const { loggedUser } = useContext(UserContext);
	const { setDeletingPostId } = useContext(PagePostsContext);

	const [isEditing, setEdit] = useState(false);
	const inputRef = useRef();
	const [postText, setPostText] = useState(text);
	const [editText, setEditText] = useState(text);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isEditing) {
			inputRef.current.focus();
			autosize(inputRef.current);
		}
	}, [isEditing]);

	function editPost() {
		if (!isEditing) {
			setEdit(true);
			return;
		}

		setEditText(postText);
		setEdit(false);
	}

	function submitEdit() {
		setLoading(true);
		edit({ text: editText, id, token: loggedUser.token })
			.then((response) => {
				setPostText(response.data.post.text);
				setEdit(false);
				setLoading(false);
			})
			.catch(() => {
				alert("Não foi possível salvar as alterações.");
				setLoading(false);
			});
	}

	function handleKeys(e) {
		if (e.key === "Enter") {
			e.preventDefault();

			if (e.repeat) {
				return;
			}
			submitEdit();
		}

		if (e.key === "Escape") {
			setEditText(postText);
			editPost();
		}
	}

	return (
		<PostContainer>
			<LeftContainer>
				<Link to={routes.user.replace(":id", user.id)}>
					<UserAvatar
						src={user.avatar}
						alt="profile"
						customStyle={{ resizeOnMobile: true }}
					/>
				</Link>
				<Like likes={likes} postId={id} loggedUser={loggedUser} />
			</LeftContainer>

			<RightContainer>
				<UserContainer>
					<h2>{user.username}</h2>{" "}
					{loggedUser.user.id !== user.id ? null : (
						<ButtonsContainer customStyle={{ separationMargin: "0 0 0 5px" }}>
							<EditButton disabled={loading} onClick={() => editPost()} />
							<TrashButton onClick={() => setDeletingPostId(postData.id)} />
						</ButtonsContainer>
					)}
				</UserContainer>

				{isEditing ? (
					<InputText
						value={editText}
						ref={inputRef}
						onChange={(e) => setEditText(e.target.value)}
						onKeyPress={(e) => handleKeys(e, id)}
						loading={loading}
						disabled={loading}
					/>
				) : (
					<p>
						<ReactHashtag
							renderHashtag={(hashtagValue) => (
								<Link
									to={routes.trending.replace(
										":HASHTAG",
										hashtagValue.slice(1)
									)}
								>
									{hashtagValue}
								</Link>
							)}
						>
							{postText}
						</ReactHashtag>
					</p>
				)}

				<Snippet
					link={link}
					linkTitle={linkTitle}
					linkDescription={linkDescription}
					linkImage={linkImage}
				/>
			</RightContainer>
		</PostContainer>
	);
}

const PostContainer = styled.div`
	width: 100%;
	background-color: #171717;
	border-radius: 16px;
	padding: 20px 20px 20px 0;
	display: flex;
	margin-bottom: 15px;

	button {
		background: none;
		border: none;
	}

	@media (max-width: 611px) {
		border-radius: 0px;
	}
`;

const LeftContainer = styled.div`
	height: 100%;
	width: 15%;
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		font-size: 11px;
		color: #fff;
	}

	@media (max-width: 611px) {
		padding: 3px;
		p {
			font-size: 9px;
		}
	}
`;

const UserContainer = styled.div`
	font-size: 19px;
	color: rgb(255, 255, 255);
	margin-bottom: 12px;
	display: flex;
	justify-content: space-between;
`;

const RightContainer = styled.div`
	height: 100%;
	width: 83%;

	a {
		color: rgb(234, 232, 232);
		text-decoration: none;
		margin-bottom: 10px;
		cursor: pointer;

		:hover {
			color: rgb(255, 255, 255);
		}
	}

	h2 {
		font-size: 19px;
		color: #fff;
	}

	> p {
		font-size: 17px;
		color: #aaaaaa;
		line-height: 18px;
		margin-bottom: 15px;
		word-wrap: break-word;
	}

	@media (max-width: 611px) {
		width: calc(100% - 30px);

		h2 {
			font-size: 17px;
			margin-left: 5px;
		}

		p {
			font-size: 15px;
			margin-left: 5px;
		}
	}
`;

const InputText = styled.textarea`
	width: 100%;
	font-size: 17px;
	font-family: "Lato", sans - serif;
	background-color: ${({ loading }) =>
		loading ? "rgb(242, 242, 242)" : "rgb(255,255,255)"};
	word-wrap: break-word;
	border-radius: 7px;
	margin-bottom: 5px;
	padding: 8px;
	resize: vertical;

	:focus {
		outline: none !important;
	}

	@media (max-width: 611px) {
		font-size: 15px;
	}
`;
